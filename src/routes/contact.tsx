import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionLabel } from "@/components/site-chrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — techvrs | Open a Secure Channel" },
      {
        name: "description",
        content:
          "For hiring managers and prospective clients: reach out for SOC analyst roles, security engagements, or custom AI agent work.",
      },
      { property: "og:title", content: "Contact — techvrs" },
      {
        property: "og:description",
        content: "Open a secure channel for roles, engagements, or automation projects.",
      },
    ],
  }),
  component: ContactPage,
});

type Audience = "Hiring Manager" | "Prospective Client" | "Other";

const AUDIENCE_META: Record<Audience, { color: string; bg: string }> = {
  "Hiring Manager":    { color: "#0284c7", bg: "rgba(2,132,199,0.10)"  },
  "Prospective Client":{ color: "#7c3aed", bg: "rgba(124,58,237,0.10)" },
  "Other":             { color: "#16a34a", bg: "rgba(22,163,74,0.10)"  },
};

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [audience, setAudience] = useState<Audience>("Hiring Manager");

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">

      {/* ── Header ── */}
      <SectionLabel>OPEN CHANNEL</SectionLabel>
      <h1 className="flip-fade-text font-display text-5xl md:text-6xl font-bold max-w-3xl">
        Let's start{" "}
        <span className="accent-shift">a conversation.</span>
      </h1>
      <p className="flip-text mt-5 max-w-xl text-lg text-muted-foreground leading-relaxed">
        Whether you need a SOC analyst, a hardened deployment, or a custom AI agent —
        I'll respond with a scoped plan, not a sales pitch.
      </p>

      {/* ── Two-column layout ── */}
      <div className="mt-14 grid gap-10 lg:grid-cols-5">

        {/* Sidebar */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Hiring managers */}
          <div className="glass-card brackets p-6" style={{ position: "relative" }}>
            <span className="b-tr" /><span className="b-bl" />
            <div className="mono text-[10px] uppercase tracking-widest text-signal mb-3 flex items-center gap-2">
              <span className="live-dot" aria-hidden />
              FOR HIRING MANAGERS
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              I'm actively seeking entry-level SOC Analyst opportunities where I can
              apply hands-on detection and response skills in a live environment. My
              resume, certifications, and lab write-ups are one click away.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                className="mono text-[11px] uppercase tracking-widest bg-signal text-signal-foreground px-4 py-3 hover:shadow-[0_0_30px_-5px_var(--signal)] transition-shadow inline-flex items-center gap-2"
              >
                Download resume ↓
              </a>
              <a
                href="https://www.linkedin.com/in/mdtarek404/"
                target="_blank"
                rel="noreferrer"
                className="mono text-[11px] uppercase tracking-widest border border-signal/60 text-signal px-4 py-3 hover:bg-signal/10 transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://tareksec.dev"
                target="_blank"
                rel="noreferrer"
                className="mono text-[11px] uppercase tracking-widest border border-signal/60 text-signal px-4 py-3 hover:bg-signal/10 transition-colors"
              >
                Full portfolio ↗
              </a>
            </div>
          </div>

          {/* Prospective clients */}
          <div className="glass-card brackets p-6" style={{ position: "relative" }}>
            <span className="b-tr" /><span className="b-bl" />
            <div className="mono text-[10px] uppercase tracking-widest text-signal mb-3 flex items-center gap-2">
              <span className="live-dot" aria-hidden />
              FOR PROSPECTIVE CLIENTS
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Have a security gap, a deployment that needs hardening, an SEO audit, or a
              workflow you'd like automated with a custom AI agent? Tell me what you're
              working with — I'll respond with next steps, not a sales pitch.
            </p>
          </div>

          {/* Direct channels */}
          <div className="glass-card brackets p-6 flex flex-col gap-3" style={{ position: "relative" }}>
            <span className="b-tr" /><span className="b-bl" />
            <div className="mono text-[10px] uppercase tracking-widest text-signal mb-1">
              DIRECT CHANNELS
            </div>
            {[
              { label: "hello@techvrs.com",        href: "mailto:hello@techvrs.com"                },
              { label: "Portfolio — tareksec.dev", href: "https://tareksec.dev"                    },
              { label: "LinkedIn — @mdtarek404",   href: "https://www.linkedin.com/in/mdtarek404/" },
              { label: "GitHub — @tareksec",       href: "https://github.com/tareksec"             },
              { label: "Medium — @mdtareksec",     href: "https://medium.com/@mdtareksec"          },
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
              <span className="text-signal">Secure Web Deployment Checklist</span>{" "}
              in your message and I'll include it with my reply.
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
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-grid opacity-[0.07]" aria-hidden />
            {/* Corner glow */}
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
                    MESSAGE RECEIVED
                  </div>
                  <p className="text-foreground/85 max-w-xs text-center leading-relaxed">
                    Transmission logged. I'll respond within 24–48 hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-signal transition-colors"
                  >
                    Send another →
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="flex flex-col gap-6"
                >
                  <div className="mono text-[10px] uppercase tracking-widest text-signal flex items-center gap-2">
                    <span className="pulse-dot" aria-hidden />
                    NEW TRANSMISSION // COMPOSE
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Field label="Name">
                      <input
                        required
                        className="w-full px-4 py-3 outline-none transition-all text-foreground placeholder:text-muted-foreground/60"
                        style={{
                          background: "rgba(255,255,255,0.5)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid var(--hairline)",
                          borderRadius: 0,
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(2,132,199,0.6)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--hairline)")}
                        placeholder="Your name"
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        required
                        type="email"
                        className="w-full px-4 py-3 outline-none transition-all text-foreground placeholder:text-muted-foreground/60"
                        style={{
                          background: "rgba(255,255,255,0.5)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid var(--hairline)",
                          borderRadius: 0,
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(2,132,199,0.6)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--hairline)")}
                        placeholder="you@company.com"
                      />
                    </Field>
                  </div>

                  <Field label="I am a…">
                    <div className="grid grid-cols-3 gap-2">
                      {(["Hiring Manager", "Prospective Client", "Other"] as Audience[]).map((a) => {
                        const m = AUDIENCE_META[a];
                        const active = audience === a;
                        return (
                          <button
                            type="button"
                            key={a}
                            onClick={() => setAudience(a)}
                            className="mono text-[10px] uppercase tracking-widest px-3 py-3 border transition-all"
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

                  <Field label="Message">
                    <textarea
                      required
                      rows={6}
                      className="w-full px-4 py-3 outline-none transition-all resize-none text-foreground placeholder:text-muted-foreground/60"
                      style={{
                        background: "rgba(255,255,255,0.5)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid var(--hairline)",
                        borderRadius: 0,
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(2,132,199,0.6)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--hairline)")}
                      placeholder="Tell me what you're working with..."
                    />
                  </Field>

                  <button
                    type="submit"
                    className="mono text-[11px] uppercase tracking-widest bg-signal text-signal-foreground px-8 py-4 hover:shadow-[0_0_40px_-5px_var(--signal)] transition-all self-start"
                  >
                    Send transmission →
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
    <label className="flex flex-col gap-2">
      <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
