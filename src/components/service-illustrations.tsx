/* Service card illustrations — image-based, one per service card */

type SceneProps = {
  className?: string;
  style?: React.CSSProperties;
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  minHeight: 240,
};

const imgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
  objectPosition: "center",
  display: "block",
};

/* ── 01: Web Development ────────────────────────────────────────── */
export function IllustrationWebDev({ className = "", style }: SceneProps) {
  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      <picture>
        <source srcSet="/2.webp" type="image/webp" />
        <img
          src="/2.png"
          alt="Web Development — modern web application architecture and engineering"
          width={480}
          height={480}
          style={imgStyle}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
  );
}

/* ── 02: Web Design & UI/UX ────────────────────────────────────── */
export function IllustrationWebDesign({ className = "", style }: SceneProps) {
  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      <picture>
        <source srcSet="/1.webp" type="image/webp" />
        <img
          src="/1.png"
          alt="Web Design — modern UI/UX design systems and conversion layouts"
          width={480}
          height={480}
          style={imgStyle}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
  );
}

/* ── 03: Secure SEO ─────────────────────────────────────────── */
export function IllustrationSecureSEO({ className = "", style }: SceneProps) {
  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      <picture>
        <source srcSet="/3.webp" type="image/webp" />
        <img
          src="/3.png"
          alt="Secure SEO — technical audits and Core Web Vitals monitoring"
          width={480}
          height={480}
          style={imgStyle}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
  );
}

/* ── 04: On-Page & Off-Page SEO ─────────────────────────────────── */
export function IllustrationSEO({ className = "", style }: SceneProps) {
  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      <picture>
        <source srcSet="/3.webp" type="image/webp" />
        <img
          src="/3.png"
          alt="On-Page & Off-Page SEO — search growth and authority building"
          width={480}
          height={480}
          style={imgStyle}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
  );
}

/* ── 05: AI Security & AI Solutions ──────────────────────────────── */
export function IllustrationAI({ className = "", style }: SceneProps) {
  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      <picture>
        <source srcSet="/4.webp" type="image/webp" />
        <img
          src="/4.png"
          alt="AI Security & AI Solutions — intelligent business automation with guardrails"
          width={480}
          height={480}
          style={imgStyle}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
  );
}

/* Aliases for backwards compatibility */
export const IllustrationSOC = IllustrationWebDev;
export const IllustrationWebDeploy = IllustrationWebDesign;
