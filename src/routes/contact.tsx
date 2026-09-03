import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionLabel } from "@/components/site-chrome";
import { IconShieldLock, IconSecureGlobe } from "@/components/icons";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — TechVRS | Start Your Project" },
      {
        name: "description",
        content:
          "Reach out to TechVRS for web development, UI/UX design, technical SEO audits, or custom secure AI automation projects. We respond within 24 hours with a scoped technical plan.",
      },
      // ── Open Graph ───────────────────────────────────────────────────────
      { property: "og:site_name", content: "TechVRS" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://techvrs.com/contact" },
      { property: "og:title", content: "Contact Us — TechVRS | Start Your Project" },
      {
        property: "og:description",
        content:
          "Reach out to TechVRS for web development, UI/UX design, technical SEO audits, or custom secure AI automation projects. We respond within 24 hours with a scoped technical plan.",
      },
      { property: "og:image", content: "https://techvrs.com/hero-main.png" },
      { property: "og:image:alt", content: "TechVRS — Start Your Project" },
      // ── Twitter / X ──────────────────────────────────────────────────────
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact Us — TechVRS | Start Your Project" },
      {
        name: "twitter:description",
        content:
          "Reach out to TechVRS for web development, UI/UX design, technical SEO audits, or custom secure AI automation projects. We respond within 24 hours with a scoped technical plan.",
      },
      { name: "twitter:image", content: "https://techvrs.com/hero-main.png" },
      { name: "twitter:image:alt", content: "TechVRS — Start Your Project" },
    ],
  }),
  component: ContactPage,
});

type Audience = "Start a Project" | "Technical SEO Audit" | "AI Consultation" | "General Inquiry";

const AUDIENCE_META: Record<Audience, { color: string; bg: string }> = {
  "Start a Project":     { color: "#0891b2", bg: "rgba(8,145,178,0.10)" },
  "Technical SEO Audit": { color: "#16a34a", bg: "rgba(22,163,74,0.10)" },
  "AI Consultation":     { color: "#7c3aed", bg: "rgba(124,58,237,0.10)" },
  "General Inquiry":     { color: "#d97706", bg: "rgba(217,119,6,0.10)" },
};

const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/hello@techvrs.com";

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audience, setAudience] = useState<Audience>("Start a Project");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    /* Honeypot — bots fill hidden fields; silently drop those submissions */
    if (String(data.get("_honey") ?? "") !== "") {
      setSending(false);
      setSent(true);
      return;
    }

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          inquiryType: audience,
          message: String(data.get("message") ?? ""),
          _subject: `TechVRS Inquiry — ${audience}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error(`Relay responded ${res.status}`);
      form.reset();
      setSent(true);
    } catch (err) {
      console.error("[contact] send failed:", err);
      setError("The message relay could not be reached. Please email us directly at hello@techvrs.com.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">

      {/* ── Header ── */}
      <SectionLabel>START A PROJECT</SectionLabel>
      <h1 className="flip-fade-text font-display text-5xl md:text-6xl font-bold max-w-3xl">
        Let's build something{" "}
        <span className="accent-shift">exceptional.</span>
      </h1>
      <p className="flip-text mt-5 max-w-xl text-lg text-muted-foreground leading-relaxed">
        Whether you need a high-performance web build, a conversion-focused redesign, a technical
        SEO overhaul, or secure AI automation — we'll respond within 24 hours with a scoped roadmap.
      </p>

      {/* ── Two-column layout ── */}
      <div className="mt-14 grid gap-10 lg:grid-cols-5">

        {/* Sidebar */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* What to expect */}
          <div className="glass-card brackets p-6" style={{ position: "relative" }}>
            <span className="b-tr" /><span className="b-bl" />
            <div className="mono text-[10px] uppercase tracking-widest text-signal mb-4 flex items-center gap-2">
              <IconSecureGlobe size={14} />
              WHAT TO EXPECT
            </div>
            <ul className="flex flex-col gap-3 mb-4">
              {[
                "Direct collaboration with senior engineers & designers",
                "Clear architectural plan, milestones, and timelines",
                "Performance benchmarks & Core Web Vitals targets",
                "Security by design embedded across all deliverables",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="shrink-0 text-signal/70 mt-0.5 mono text-[10px]">◈</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">
              No generic sales pitches. We evaluate your goals and provide concrete technical recommendations.
            </p>
          </div>

          {/* Core capabilities list */}
          <div className="glass-card brackets p-6" style={{ position: "relative" }}>
            <span className="b-tr" /><span className="b-bl" />
            <div className="mono text-[10px] uppercase tracking-widest text-signal mb-4 flex items-center gap-2">
              <IconShieldLock size={14} />
              SERVICES WE DELIVER
            </div>
            <ul className="flex flex-col gap-2.5 mb-2">
              {[
                "Modern Web Development (React / Next.js)",
                "Conversion UI/UX & Design Systems",
                "Technical & Secure SEO Audits",
                "On-Page & Off-Page SEO Growth",
                "AI Security & Custom Business Agents",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="shrink-0 text-signal/70 mt-0.5 mono text-[10px]">◈</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Direct channels */}
          <div className="glass-card brackets p-6 flex flex-col gap-3" style={{ position: "relative" }}>
            <span className="b-tr" /><span className="b-bl" />
            <div className="mono text-[10px] uppercase tracking-widest text-signal mb-1">
              DIRECT CHANNELS
            </div>
            {[
              { label: "hello@techvrs.com",      href: "mailto:hello@techvrs.com"                },
              { label: "LinkedIn Company",       href: "https://www.linkedin.com/in/mdtarek404/" },
              { label: "GitHub Open Source",     href: "https://github.com/tareksec"             },
              { label: "Medium Insights",        href: "https://medium.com/@mdtareksec"          },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="mono text-[11px] text-muted-foreground hover:text-signal transition-colors flex items-center gap-2"
              >
                <span className="text-signal opacity-60">↗</span>
                {l.label}
              </a>
            ))}
          </div>

          {/* Lead magnet */}
          <div
            className="glass-card brackets p-5 flex items-start gap-3"
            style={{ position: "relative" }}
          >
            <span className="b-tr" /><span className="b-bl" />
            <span className="live-dot mt-1 shrink-0" aria-hidden />
            <p className="mono text-[10px] uppercase tracking-widest text-muted-foreground leading-relaxed">
              Free resource — request the{" "}
              <span className="text-signal">27-Point Web &amp; Security Launch Checklist</span>{" "}
              in your message and we'll include it with our reply.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <div
            className="glass-cta brackets p-8 md:p-10 relative overflow-hidden"
            style={{ position: "relative" }}
          >
            <span className="b-tr" /><span className="b-bl" />
            <div className="absolute inset-0 bg-grid opacity-[0.07]" aria-hidden />
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-56 h-56 blur-[80px] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(2,132,199,0.18), transparent 70%)" }}
            />

            <div className="relative z-10">
              {sent ? (
                <div className="text-center py-16 flex flex-col items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                    style={{
                      background: "rgba(2,132,199,0.12)",
                      border: "1px solid rgba(2,132,199,0.35)",
                      color: "var(--signal)",
                    }}
                  >
                    ✓
                  </div>
                  <div className="mono text-[11px] uppercase tracking-widest text-signal">
                    INQUIRY RECEIVED
                  </div>
                  <p className="text-foreground/85 max-w-xs text-center leading-relaxed">
                    Thank you! Our technical team will review your project requirements and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-signal transition-colors"
                  >
                    Submit another inquiry →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="mono text-[10px] uppercase tracking-widest text-signal flex items-center gap-2">
                    <span className="pulse-dot" aria-hidden />
                    PROJECT INQUIRY // COMPOSE
                  </div>

                  {/* Honeypot */}
                  <input
                    type="text"
                    name="_honey"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <Field label="Your Name">
                      <input
                        required
                        name="name"
                        autoComplete="name"
                        className="w-full px-4 py-3 outline-none transition-all text-foreground placeholder:text-muted-foreground/60"
                        style={{
                          background: "rgba(255,255,255,0.5)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid var(--hairline)",
                          borderRadius: 0,
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(2,132,199,0.6)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--hairline)")}
                        placeholder="e.g. Alex Morgan"
                      />
                    </Field>
                    <Field label="Work Email">
                      <input
                        required
                        type="email"
                        name="email"
                        autoComplete="email"
                        className="w-full px-4 py-3 outline-none transition-all text-foreground placeholder:text-muted-foreground/60"
                        style={{
                          background: "rgba(255,255,255,0.5)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid var(--hairline)",
                          borderRadius: 0,
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(2,132,199,0.6)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--hairline)")}
                        placeholder="alex@company.com"
                      />
                    </Field>
                  </div>

                  <Field label="How can we help?">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(["Start a Project", "Technical SEO Audit", "AI Consultation", "General Inquiry"] as Audience[]).map((a) => {
                        const m = AUDIENCE_META[a];
                        const active = audience === a;
                        return (
                          <button
                            type="button"
                            key={a}
                            onClick={() => setAudience(a)}
                            aria-pressed={active}
                            className="mono text-[10px] uppercase tracking-widest px-2 py-3 border transition-all text-center leading-tight"
                            style={{
                              borderColor: active ? m.color : "var(--hairline)",
                              color: active ? m.color : "var(--muted-foreground)",
                              background: active ? m.bg : "rgba(255,255,255,0.35)",
                              backdropFilter: "blur(6px)",
                              boxShadow: active ? `0 0 14px -4px ${m.color}55` : "none",
                            }}
                          >
                            {a}
                          </button>
                        );
                      })}
                    </div>
                  </Field>

                  <Field label="Project Scope &amp; Goals">
                    <textarea
                      required
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 outline-none transition-all text-foreground placeholder:text-muted-foreground/60 resize-none"
                      style={{
                        background: "rgba(255,255,255,0.5)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid var(--hairline)",
                        borderRadius: 0,
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(2,132,199,0.6)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--hairline)")}
                      placeholder="Tell us about your project goals, current challenges, timeline, or key technical requirements…"
                    />
                  </Field>

                  {error && (
                    <div className="mono text-xs text-critical p-3 border border-critical/40 bg-critical/10">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 mono text-[11px] uppercase tracking-widest bg-signal text-signal-foreground font-semibold hover:shadow-[0_0_36px_-4px_var(--signal)] transition-shadow disabled:opacity-50"
                  >
                    {sending ? "Sending inquiry…" : "Submit Project Inquiry →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
