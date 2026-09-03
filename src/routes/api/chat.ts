import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequestBody {
  userMessage?: string;
  history?: ChatMessage[];
}

const SYSTEM_PROMPT = `You are the official TechVRS agency assistant, embedded on the TechVRS website (a modern digital agency helping businesses build, grow, secure, and optimize their digital presence).

TECHVRS CORE SERVICES:
1. Web Development: Modern, fast, and scalable business websites and web applications (React, Next.js, TypeScript, CMS integrations, custom APIs, performance optimization).
2. Web Design: Modern UI/UX design, landing pages, corporate website redesigns, SaaS interfaces, design systems, and conversion-focused responsive layouts.
3. Secure SEO: Technical SEO audits, site architecture, Core Web Vitals optimization, crawl & indexation control, and structured data with security awareness.
4. On-Page & Off-Page SEO: Search intent keyword optimization, metadata, content hierarchy, internal linking, authority building, and digital PR.
5. AI Security & AI Solutions: Secure enterprise AI implementations, custom business workflow automation, AI agents, LLM integrations, prompt security, and data privacy guardrails.

YOUR ROLE & CAPABILITIES:
1. Greetings: Respond warmly and concisely to greetings, offering assistance with agency services or starting a project.
2. Services Guidance: Explain TechVRS services and guide visitors on which service best fits their business needs.
3. Project Inquiries: When visitors express interest in working with TechVRS or starting a project, politely gather their requirements (Name, Email, and Project Scope/Needs one step at a time), confirm the details, and invite them to visit /contact or reassure them the team will follow up.
4. Navigation Help: Direct visitors to relevant pages (/services, /work, /about, /contact, /blog).

STRICT CONSTRAINTS:
- Never invent pricing, client names, guarantees, or statistics not found on the website.
- Plain text only — no markdown headers or code blocks.
- For anything outside TechVRS agency services (general knowledge, coding homework, unrelated topics), decline politely in one short sentence and redirect to TechVRS services.
- Keep every reply concise (2–4 sentences), professional, warm, and helpful.`;

const MAX_HISTORY = 4;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_CONTENT_LENGTH = 2000;
const UPSTREAM_TIMEOUT_MS = 10_000;

// ─── Simple in-memory rate limiter ────────────────────────────────────────────
// Allows up to 20 requests per IP per 60-second window.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;

interface RateBucket {
  count: number;
  resetAt: number;
}

const rateBuckets = new Map<string, RateBucket>();

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  let bucket = rateBuckets.get(ip);
  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
    rateBuckets.set(ip, bucket);
    // Prune stale entries occasionally to avoid unbounded map growth
    if (rateBuckets.size > 5000) {
      for (const [k, v] of rateBuckets) {
        if (now >= v.resetAt) rateBuckets.delete(k);
      }
    }
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
}
// ──────────────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        // ── Rate limit ───────────────────────────────────────────────────────
        const ip = getClientIp(request);
        if (isRateLimited(ip)) {
          return Response.json(
            { error: "Too many requests — please slow down." },
            { status: 429 },
          );
        }

        try {
          // ── Body size guard (reject before full parse) ───────────────────
          const contentLength = Number(request.headers.get("content-length") ?? 0);
          if (contentLength > 32_768) {
            return Response.json({ error: "Request body too large." }, { status: 413 });
          }

          const body = (await request.json()) as ChatRequestBody;
          const userMessage = typeof body.userMessage === "string" ? body.userMessage.trim() : "";

          if (!userMessage) {
            return Response.json({ error: "userMessage is required" }, { status: 400 });
          }
          if (userMessage.length > MAX_MESSAGE_LENGTH) {
            return Response.json(
              { error: `userMessage too long (max ${MAX_MESSAGE_LENGTH} chars)` },
              { status: 400 },
            );
          }

          const history = Array.isArray(body.history)
            ? body.history
                .filter(
                  (m): m is ChatMessage =>
                    !!m &&
                    (m.role === "user" || m.role === "assistant") &&
                    typeof m.content === "string" &&
                    m.content.length > 0 &&
                    m.content.length <= MAX_HISTORY_CONTENT_LENGTH,
                )
                .slice(-MAX_HISTORY)
            : [];

          const messages = [
            { role: "system", content: SYSTEM_PROMPT },
            ...history.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: userMessage },
          ];

          // ── Upstream fetch with timeout ──────────────────────────────────
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

          let upstream: Response;
          try {
            upstream = await fetch("https://text.pollinations.ai/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                // "openai-large" was removed from Pollinations' free anonymous tier;
                // "openai-fast" is the only model currently available without an API key.
                model: "openai-fast",
                messages,
              }),
              signal: controller.signal,
            });
          } finally {
            clearTimeout(timeoutId);
          }

          if (!upstream.ok) {
            console.error("[chat] Pollinations upstream error:", upstream.status);
            return Response.json(
              { error: "The assistant is temporarily unavailable. Please try again shortly." },
              { status: 502 },
            );
          }

          const reply = (await upstream.text()).trim();
          if (!reply) {
            console.error("[chat] Pollinations returned empty response");
            return Response.json(
              { error: "The assistant is temporarily unavailable. Please try again shortly." },
              { status: 502 },
            );
          }

          return Response.json({ reply });
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            console.error("[chat] Upstream fetch timed out");
            return Response.json(
              { error: "The assistant took too long to respond. Please try again." },
              { status: 504 },
            );
          }
          console.error("[chat] Handler error:", error);
          return Response.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 },
          );
        }
      },
    },
  },
});
