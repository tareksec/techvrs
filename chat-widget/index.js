const express = require("express");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── AI Configuration ─────────────────────────────────────────────────────────
// Uses Pollinations AI — free, no API key required, OpenAI-compatible.
// To swap in any other provider: change AI_BASE_URL and add an Authorization header.
const AI_BASE_URL = "https://text.pollinations.ai/openai";
const AI_MODEL = "openai"; // GPT-4o via Pollinations free tier

// ─── CORS ─────────────────────────────────────────────────────────────────────
// ALLOWED_ORIGINS env var controls which sites may call /api/chat from a <script>
// embed. Set it to your site's domain(s) in production, e.g.:
//   ALLOWED_ORIGINS=https://yoursite.com,https://www.yoursite.com
// Leave unset to allow all origins (useful for iframe embeds and development).
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : null; // null = wildcard

const corsOptions = {
  origin: allowedOrigins
    ? (origin, cb) => {
        // allow server-to-server (no origin) and listed origins
        if (!origin || allowedOrigins.includes(origin)) cb(null, true);
        else cb(new Error("CORS: origin not allowed"));
      }
    : "*",
  methods: ["POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(express.json({ limit: "16kb" }));
app.use(express.static(path.join(__dirname, "public")));

// ─── Rate limiting ─────────────────────────────────────────────────────────────
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,   // 1 minute
  max: 20,               // 20 requests per IP per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests — please slow down." },
});

// ─── System Prompt ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a focused website assistant. Your role is limited to three areas:

Area 1 — GREETINGS: Respond warmly to hellos, hi, hey, and similar greetings.

Area 2 — WEBSITE SUPPORT: Help visitors with questions about this website, its services, pricing, and how things work.

Area 3 — CONTACT COLLECTION: When a visitor wants to reach the team, politely gather their Name, then Email, then Message — one piece at a time. Once you have all three, confirm their details and let them know the team will follow up soon.

Behavior guidelines:
- Stay strictly within the three areas above.
- For any other topic (general knowledge, science, coding, math, trivia, or anything unrelated to this website), reply only: "I'm sorry, I can only assist with questions about this website, support, or help you get in touch with us. Is there anything along those lines I can help you with?"
- Keep every reply concise and friendly (2–4 sentences).
- Never invent contact details, phone numbers, or email addresses.`;

// ─── Chat endpoint ─────────────────────────────────────────────────────────────
app.post("/api/chat", cors(corsOptions), chatLimiter, async (req, res) => {
  try {
    const { message, history } = req.body;

    // ── Input validation ───────────────────────────────────────────────────────
    if (!message || typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({ error: "message is required" });
    }
    if (message.length > 1000) {
      return res.status(400).json({ error: "message too long (max 1000 chars)" });
    }

    // Validate and sanitize history — only accept well-formed entries
    const rawHistory = Array.isArray(history) ? history : [];
    const validHistory = rawHistory
      .filter(
        (m) =>
          m &&
          typeof m === "object" &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.length > 0 &&
          m.content.length <= 2000
      )
      .slice(-4); // keep at most the last 4 messages (2 turns)

    // ── Build messages ─────────────────────────────────────────────────────────
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...validHistory.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: message.trim() },
    ];

    // ── Call AI ────────────────────────────────────────────────────────────────
    const aiResponse = await fetch(AI_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: AI_MODEL,
        messages,
        max_tokens: 300,
        temperature: 0.65,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI API error:", aiResponse.status, errText.slice(0, 300));
      return res.status(502).json({ error: "AI service unavailable — try again shortly." });
    }

    // Check Content-Type before parsing JSON (Pollinations can return HTML on filter blocks)
    const contentType = aiResponse.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      const raw = await aiResponse.text();
      console.error("AI returned non-JSON response:", raw.slice(0, 200));
      return res.status(502).json({ error: "AI service unavailable — try again shortly." });
    }

    const data = await aiResponse.json();
    const reply = data.choices?.[0]?.message?.content?.trim() ?? "";

    if (!reply) {
      console.error("AI returned empty content. Full response:", JSON.stringify(data).slice(0, 300));
      return res.status(502).json({ error: "AI service returned an empty response." });
    }

    res.json({ reply });
  } catch (err) {
    console.error("Chat endpoint error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ─── Health check ──────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// ─── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Chat widget server running on port ${PORT}`);
  if (allowedOrigins) {
    console.log(`CORS restricted to: ${allowedOrigins.join(", ")}`);
  } else {
    console.log("CORS: open (set ALLOWED_ORIGINS env var to restrict in production)");
  }
});
