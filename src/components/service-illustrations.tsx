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

/* ── 01: SOC & Cybersecurity ────────────────────────────────────────── */
export function IllustrationSOC({ className = "", style }: SceneProps) {
  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      <picture>
        <source srcSet="/1.webp" type="image/webp" />
        <img
          src="/1.png"
          alt="SOC & Cybersecurity — security analyst and shield"
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

/* ── 02: Secure Web Deployment ────────────────────────────────────── */
export function IllustrationWebDeploy({ className = "", style }: SceneProps) {
  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      <picture>
        <source srcSet="/2.webp" type="image/webp" />
        <img
          src="/2.png"
          alt="Secure Web Deployment — shield with lock and team"
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

/* ── 03: Technical SEO / Monitoring ─────────────────────────────────── */
export function IllustrationSEO({ className = "", style }: SceneProps) {
  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      <picture>
        <source srcSet="/3.webp" type="image/webp" />
        <img
          src="/3.png"
          alt="Technical SEO — developer monitoring performance dashboard"
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

/* ── 04: Secure AI Agents ────────────────────────────────────────── */
export function IllustrationAI({ className = "", style }: SceneProps) {
  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      <picture>
        <source srcSet="/4.webp" type="image/webp" />
        <img
          src="/4.png"
          alt="Secure AI Agents — developers building an AI robot"
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
