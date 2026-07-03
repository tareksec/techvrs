/* Custom SVG illustration icons — cybersecurity themed, stroke-based */

type IconProps = { className?: string; size?: number };

/* ── Radar / Threat Detection ─────────────────────────────────────── */
export function IconRadar({ className = "", size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <circle cx="20" cy="20" r="1.5" fill="currentColor" />
      {/* Sweep line */}
      <line x1="20" y1="20" x2="20" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="20" x2="34" y2="12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      {/* Blip */}
      <circle cx="26" cy="10" r="2" fill="currentColor" opacity="0.9" />
      <circle cx="26" cy="10" r="4" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

/* ── Shield Lock / Hardened Infrastructure ────────────────────────── */
export function IconShieldLock({ className = "", size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path
        d="M20 3 L34 9 V21 C34 29 27 35 20 37 C13 35 6 29 6 21 V9 Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.9"
      />
      <path
        d="M20 10 L28 13.5 V21 C28 26 24.5 30 20 31.5 C15.5 30 12 26 12 21 V13.5 Z"
        stroke="currentColor" strokeWidth="1" opacity="0.4"
      />
      {/* Lock body */}
      <rect x="15" y="20" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.4" />
      {/* Lock shackle */}
      <path d="M17 20 V17 C17 14.8 23 14.8 23 17 V20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      {/* Keyhole */}
      <circle cx="20" cy="24" r="1.2" fill="currentColor" />
      <line x1="20" y1="25.2" x2="20" y2="27" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Circuit Brain / Secure AI ────────────────────────────────────── */
export function IconAISecure({ className = "", size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      {/* CPU outline */}
      <rect x="12" y="12" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      {/* Inner grid */}
      <rect x="16" y="16" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {/* Pins - top */}
      <line x1="16" y1="12" x2="16" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="20" y1="12" x2="20" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="24" y1="12" x2="24" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Pins - bottom */}
      <line x1="16" y1="28" x2="16" y2="32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="20" y1="28" x2="20" y2="32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="24" y1="28" x2="24" y2="32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Pins - left */}
      <line x1="12" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="20" x2="8" y2="20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="24" x2="8" y2="24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Pins - right */}
      <line x1="28" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="28" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="28" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="20" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}

/* ── Eye / SOC Monitoring ────────────────────────────────────────── */
export function IconEye({ className = "", size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      {/* Outer eye shape */}
      <path d="M4 20 C10 10 30 10 36 20 C30 30 10 30 4 20 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Iris */}
      <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1.5" />
      {/* Pupil */}
      <circle cx="20" cy="20" r="2.5" fill="currentColor" />
      {/* Glint */}
      <circle cx="22" cy="18" r="0.8" fill="currentColor" opacity="0.5" />
      {/* Scan lines */}
      <line x1="20" y1="14" x2="20" y2="12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <line x1="20" y1="26" x2="20" y2="28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <line x1="26" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <line x1="14" y1="20" x2="12" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/* ── Globe / Secure Web ──────────────────────────────────────────── */
export function IconSecureGlobe({ className = "", size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="1.5" />
      {/* Latitude lines */}
      <ellipse cx="20" cy="20" rx="8" ry="15" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="5" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M8 13 Q20 16 32 13" stroke="currentColor" strokeWidth="1" opacity="0.35" fill="none" />
      <path d="M8 27 Q20 24 32 27" stroke="currentColor" strokeWidth="1" opacity="0.35" fill="none" />
      {/* Lock overlay */}
      <rect x="16" y="16" width="8" height="6" rx="1" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.2" />
      <path d="M18 16 V14.5 C18 13 22 13 22 14.5 V16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="20" cy="19.5" r="1" fill="currentColor" />
    </svg>
  );
}

/* ── Antenna / SEO & Signal ────────────────────────────────────────── */
export function IconSignal({ className = "", size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      {/* Mast */}
      <line x1="20" y1="34" x2="20" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Base */}
      <line x1="14" y1="34" x2="26" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17" y1="34" x2="20" y2="26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <line x1="23" y1="34" x2="20" y2="26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      {/* Signal arcs */}
      <path d="M13 18 Q16 14 20 14 Q24 14 27 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M9 22 Q13 12 20 11 Q27 12 31 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55" />
      <path d="M5 26 Q10 10 20 8 Q30 10 35 26" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.3" />
      {/* Top node */}
      <circle cx="20" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

/* ── Terminal / Certifications generic ───────────────────────────── */
export function IconTerminal({ className = "", size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="4" y1="15" x2="36" y2="15" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="9" cy="11.5" r="1.2" fill="currentColor" opacity="0.5" />
      <circle cx="13.5" cy="11.5" r="1.2" fill="currentColor" opacity="0.4" />
      <circle cx="18" cy="11.5" r="1.2" fill="currentColor" opacity="0.3" />
      {/* Prompt */}
      <path d="M10 22 L14 25 L10 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="16" y1="28" x2="26" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Trophy / TryHackMe ──────────────────────────────────────────── */
export function IconTrophy({ className = "", size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      {/* Cup body */}
      <path d="M13 6 H27 V20 C27 26 23 29 20 30 C17 29 13 26 13 20 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Handles */}
      <path d="M13 9 H9 C9 9 7 9 7 14 C7 17 9 18 13 17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M27 9 H31 C31 9 33 9 33 14 C33 17 31 18 27 17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Stem */}
      <line x1="20" y1="30" x2="20" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Base */}
      <line x1="13" y1="34" x2="27" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Star accent */}
      <path d="M20 12 L21.2 15.6 L25 15.6 L22 17.8 L23.1 21.4 L20 19.2 L16.9 21.4 L18 17.8 L15 15.6 L18.8 15.6 Z" stroke="currentColor" strokeWidth="0.8" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/* ── Cloud / AWS ───────────────────────────────────────────────── */
export function IconCloud({ className = "", size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      {/* Cloud shape */}
      <path
        d="M30 26 H12 C8.7 26 6 23.3 6 20 C6 17 8.2 14.5 11.2 14 C11.6 10 15 7 19 7 C22.4 7 25.3 9 26.7 11.9 C28 11.3 29.5 11 31 11.5 C33.8 12.4 36 15 36 18 C36 22.4 33.5 26 30 26 Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Download arrows — cloud deploy */}
      <line x1="20" y1="30" x2="20" y2="22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      <path d="M16 26 L20 30 L24 26" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}

/* ── Check / Outcome confirmed ────────────────────────────────────── */
export function IconCheck({ className = "", size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M13 20.5 L18 26 L27 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Briefcase / Hiring ────────────────────────────────────────────── */
export function IconBriefcase({ className = "", size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <rect x="6" y="16" width="28" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 16 V12 C14 10.3 15.3 9 17 9 H23 C24.7 9 26 10.3 26 12 V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="24" x2="34" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="21" x2="20" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Search Magnifier / CySA+ ─────────────────────────────────────── */
export function IconSearch({ className = "", size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <circle cx="18" cy="18" r="11" stroke="currentColor" strokeWidth="1.5" />
      {/* Inner detail */}
      <circle cx="18" cy="18" r="6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Crosshair */}
      <line x1="18" y1="10" x2="18" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <line x1="18" y1="23" x2="18" y2="26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <line x1="10" y1="18" x2="13" y2="18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <line x1="23" y1="18" x2="26" y2="18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <circle cx="18" cy="18" r="2" fill="currentColor" opacity="0.7" />
      {/* Handle */}
      <line x1="26.5" y1="26.5" x2="34" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
