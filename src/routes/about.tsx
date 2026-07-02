import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site-chrome";
import { skills, certs } from "@/content/site-data";
import {
  IconShieldLock,
  IconSearch,
  IconTrophy,
  IconCloud,
  IconRadar,
  IconAISecure,
  IconSecureGlobe,
} from "@/components/icons";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — techvrs | SOC Analyst & Security-First Engineer" },
      {
        name: "description",
        content:
          "Operator profile: how a SOC analyst mindset shapes every deployment, audit, and AI agent I build.",
      },
      { property: "og:title", content: "About — techvrs" },
      {
        property: "og:description",
        content:
          "Operator profile: SOC-first thinking applied to detection, hardened infrastructure, and secure automation.",
      },
    ],
  }),
  component: AboutPage,
});

const STATS = [
  { value: "60+", label: "Detection rules authored" },
  { value: "42", label: "MITRE techniques mapped" },
  { value: "92%", label: "Vulns closed on re-scan" },
  { value: "22m", label: "Mean time to contain" },
];

const CERT_META: Record<string, { color: string; Icon: React.FC<{ size?: number }> }> = {
  "CompTIA Security+": { color: "#0284c7", Icon: IconShieldLock },
  "CompTIA CySA+": { color: "#d97706", Icon: IconSearch },
  "TryHackMe — Top 1%": { color: "#16a34a", Icon: IconTrophy },
  "AWS Cloud Practitioner": { color: "#f97316", Icon: IconCloud },
};

const DISCIPLINES = [
  {
    Icon: IconRadar,
    title: "Threat Detection & SOC",
    body: "SIEM correlation, IDS/IPS tuning, alert triage and incident response — built on real lab environments and production-grade frameworks.",
    accent: "#0284c7",
  },
  {
    Icon: IconSecureGlobe,
    title: "Secure Infrastructure",
    body: "Zero-trust architecture, TLS 1.3 enforcement, DDoS mitigation, and CIS-benchmark hardening from OS to edge.",
    accent: "#d97706",
  },
  {
    Icon: IconAISecure,
    title: "Secure AI Automation",
    body: "Custom agents built privacy-first — scoped tokens, field-level redaction, prompt-injection defences, and full audit trails.",
    accent: "#7c3aed",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">

      {/* ── Page header ── */}
      <SectionLabel>OPERATOR PROFILE</SectionLabel>
      <h1 className="flip-fade-text font-display text-5xl md:text-6xl font-bold max-w-4xl leading-tight">
        Trained to watch{" "}
        <span className="accent-shift">what others overlook.</span>
      </h1>

      {/* ── Stats strip ── */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="glass-card brackets p-5 text-center"
            style={{ position: "relative", animationDelay: `${i * 0.08}s` }}
          >
            <span className="b-tr" /><span className="b-bl" />
            <div className="font-display text-3xl md:text-4xl font-bold text-signal leading-none mb-2 count-glow">
              {s.value}
            </div>
            <div className="mono text-[9px] uppercase tracking-widest text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Main bio ── */}
      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-6 text-foreground/85 leading-relaxed text-[1.05rem]">
          <p className="flip-text">
            I approach security the way an analyst approaches a live incident:
            methodically, skeptically, and with a bias toward evidence over assumption.
            My background is built on hands-on detection work — correlating logs,
            triaging alerts, and tracing anomalies back to root cause — combined with
            the technical range to architect and harden the systems those alerts protect.
          </p>
          <p className="flip-text">
            That dual perspective, defender and builder, is the foundation of everything
            I ship. A website isn't finished when it looks good; it's finished when it
            has been stress-tested against the same techniques an attacker would use.
            An AI agent isn't "smart" until its data handling and API integrations have
            been locked down. Security isn't a final checklist item here — it's the
            design constraint everything else is built around.
          </p>

          <blockquote
            className="mt-4 pl-6 py-3 mono text-base italic text-foreground/90 relative"
            style={{
              borderLeft: "2px solid var(--signal)",
              background: "linear-gradient(90deg, rgba(2,132,199,0.06), transparent)",
              backdropFilter: "blur(4px)",
            }}
          >
            <span
              aria-hidden
              className="absolute left-0 top-0 bottom-0 w-0.5"
              style={{
                background: "linear-gradient(to bottom, var(--signal), transparent)",
              }}
            />
            "Secure by Design means the safeguard isn't bolted on after launch — it's
            the reason the architecture looks the way it does."
          </blockquote>

          <div className="mt-2 flex flex-wrap gap-4">
            <Link
              to="/work"
              className="mono text-[11px] uppercase tracking-widest bg-signal text-signal-foreground px-6 py-3 hover:shadow-[0_0_36px_-5px_var(--signal)] transition-shadow inline-flex items-center gap-2"
            >
              View field work →
            </Link>
            <Link
              to="/contact"
              className="mono text-[11px] uppercase tracking-widest border border-signal/60 text-signal px-6 py-3 hover:bg-signal/10 transition-colors inline-flex items-center gap-2"
            >
              Open a channel →
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          {/* Certs */}
          <div className="glass-card brackets p-6" style={{ position: "relative" }}>
            <span className="b-tr" /><span className="b-bl" />
            <div className="mono text-[10px] uppercase tracking-widest text-signal mb-4 flex items-center gap-2">
              <span className="live-dot" aria-hidden />
              CERTIFICATIONS
            </div>
            <ul className="flex flex-col gap-3">
              {certs.map((c) => {
                const meta = CERT_META[c];
                return (
                  <li key={c} className="flex items-center gap-3 text-sm group">
                    <span
                      className="shrink-0"
                      style={{ color: meta?.color ?? "var(--signal)" }}
                    >
                      {meta ? <meta.Icon size={18} /> : <span>◆</span>}
                    </span>
                    <span className="text-foreground/85 group-hover:text-foreground transition-colors">
                      {c}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Current role */}
          <div className="glass-card brackets p-6" style={{ position: "relative" }}>
            <span className="b-tr" /><span className="b-bl" />
            <div className="mono text-[10px] uppercase tracking-widest text-signal mb-2 flex items-center gap-2">
              <span className="pulse-dot" aria-hidden />
              CURRENT STATUS
            </div>
            <div className="text-sm text-foreground/80 leading-relaxed">
              Freelance SOC analyst &amp; security engineer. Open to entry-level SOC
              positions and project engagements.
            </div>
          </div>

          {/* Quick links */}
          <div
            className="glass-card brackets p-6 flex flex-col gap-3"
            style={{ position: "relative" }}
          >
            <span className="b-tr" /><span className="b-bl" />
            <div className="mono text-[10px] uppercase tracking-widest text-signal mb-1">
              DIRECT CHANNELS
            </div>
            {[
              { label: "hello@techvrs.com", href: "mailto:hello@techvrs.com" },
              { label: "Medium — @mdtareksec", href: "https://medium.com/@mdtareksec" },
              { label: "GitHub — @techvrs", href: "https://github.com" },
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
        </div>
      </div>

      {/* ── Three disciplines ── */}
      <div className="mt-24">
        <SectionLabel>DISCIPLINES</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-10">
          One standard. <span className="text-signal">Three domains.</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {DISCIPLINES.map((d) => (
            <div
              key={d.title}
              className="glass-card brackets p-7 flex flex-col gap-4 hover-lift"
              style={{ position: "relative" }}
            >
              <span className="b-tr" /><span className="b-bl" />
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${d.accent}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: d.accent,
                  border: `1px solid ${d.accent}33`,
                }}
              >
                <d.Icon size={26} />
              </div>
              <h3 className="font-display font-semibold text-lg">{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Skills matrix ── */}
      <div className="mt-24">
        <SectionLabel>STACK MATRIX</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-10">
          The stack, <span className="text-signal">mapped.</span>
        </h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(skills).map(([group, items]) => (
            <div
              key={group}
              className="glass-card brackets p-5 flex flex-col gap-4"
              style={{ position: "relative" }}
            >
              <span className="b-tr" /><span className="b-bl" />
              <div className="mono text-[10px] uppercase tracking-widest text-signal border-b border-hairline pb-3">
                {group}
              </div>
              <ul className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <li
                    key={s}
                    className="mono text-[11px] px-2.5 py-1.5 border border-hairline text-foreground/75 hover:border-signal/50 hover:text-signal transition-colors cursor-default"
                    style={{ background: "rgba(255,255,255,0.4)", backdropFilter: "blur(4px)" }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
