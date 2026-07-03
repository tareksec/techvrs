/* Service card illustrations — image-based, one per service card */

type SceneProps = {
  className?: string;
  style?: React.CSSProperties;
};

const imgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
  objectPosition: "center",
  display: "block",
};

/* ── 01: SOC & Cyber Security ───────────────────────────────────────── */
export function IllustrationSOC({ className = "", style }: SceneProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        minHeight: 240,
        ...style,
      }}
    >
      <img
        src="/1.png"
        alt="SOC & Cybersecurity — security analyst and shield"
        style={imgStyle}
        loading="lazy"
      />
    </div>
  );
}

/* ── 02: Secure Web Deployment ──────────────────────────────────────── */
export function IllustrationWebDeploy({ className = "", style }: SceneProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        minHeight: 240,
        ...style,
      }}
    >
      <img
        src="/2.png"
        alt="Secure Web Deployment — shield with lock and team"
        style={imgStyle}
        loading="lazy"
      />
    </div>
  );
}

/* ── 03: Technical SEO / Monitoring ─────────────────────────────────── */
export function IllustrationSEO({ className = "", style }: SceneProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        minHeight: 240,
        ...style,
      }}
    >
      <img
        src="/3.png"
        alt="Technical SEO — developer monitoring performance dashboard"
        style={imgStyle}
        loading="lazy"
      />
    </div>
  );
}

/* ── 04: Secure AI Agents ──────────────────────────────────────────── */
export function IllustrationAI({ className = "", style }: SceneProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        minHeight: 240,
        ...style,
      }}
    >
      <img
        src="/4.png"
        alt="Secure AI Agents — developers building an AI robot"
        style={imgStyle}
        loading="lazy"
      />
    </div>
  );
}
