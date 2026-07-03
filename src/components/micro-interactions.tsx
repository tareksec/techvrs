/* ── Micro-interactions ─────────────────────────────────────────────
   Scroll reveal, magnetic buttons, animated counters, cursor glow,
   and page transitions. Every effect:
   - respects prefers-reduced-motion
   - degrades safely without JS (reveal classes are applied by JS,
     so SSR/no-JS content is never hidden)
   - skips pointer effects on coarse-pointer (touch) devices */

import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

function motionOK() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function finePointer() {
  return window.matchMedia("(pointer: fine)").matches;
}

/* ── 1. Scroll reveal ────────────────────────────────────────────────
   Observes existing card/panel surfaces and fades them in as they
   enter the viewport. Elements already on screen are shown instantly
   (no hide-then-show flash). Re-runs on route change; a
   MutationObserver catches async content (e.g. the Medium feed). */
const REVEAL_SELECTOR = [".panel", ".glass-card", ".feature-card", ".glass-cta"].join(",");

export function ScrollRevealManager() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!motionOK()) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("sr-in");
            entry.target.classList.remove("sr-pending");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const attach = () => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (el.classList.contains("sr-in") || el.classList.contains("sr-pending")) return;
        /* Already visible (or above the fold): show immediately */
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("sr-in");
          return;
        }
        el.classList.add("sr-pending");
        io.observe(el);
      });
    };

    attach();
    const main = document.querySelector("main");
    const mo = new MutationObserver(attach);
    if (main) mo.observe(main, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}

/* ── 2. Magnetic buttons ─────────────────────────────────────────────
   Wrapper that eases toward the cursor while hovered and springs
   back on leave. Fine-pointer devices only. */
export function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionOK() || !finePointer()) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const render = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.15 || Math.abs(ty - cy) > 0.15) {
        raf = requestAnimationFrame(render);
      } else {
        raf = 0;
        if (tx === 0 && ty === 0) el.style.transform = "";
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [strength]);

  return (
    <div ref={ref} className={`magnetic ${className}`}>
      {children}
    </div>
  );
}

/* ── 3. Animated counters ────────────────────────────────────────────
   Eased count-up when the stat scrolls into view. Handles values like
   "60+", "92%", "22m", "1.4s", "+38%". SSR renders the final value,
   so crawlers and no-JS visitors always see the real number. */
export function AnimatedCounter({
  value,
  duration = 1400,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!el || !match || !motionOK()) {
      setDisplay(value);
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/* ── 4. Cursor interactions ──────────────────────────────────────────
   Signal-colored dot that tracks the cursor 1:1 plus a lerped trailing
   ring that scales up over interactive elements. The native cursor is
   kept (accessibility); this is an augmentation, not a replacement. */
export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (motionOK() && finePointer()) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x, ry = y;
    let hot = false;
    let visible = false;
    let raf = 0;

    const render = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0) translate(-50%, -50%) scale(${hot ? 1.7 : 1})`;
      raf = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      const t = e.target as Element | null;
      hot = !!t?.closest("a, button, [role='button'], input, textarea, select, label, .tip");
      ring.classList.toggle("cursor-ring-hot", hot);
    };
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}

/* ── 5. Page transitions ─────────────────────────────────────────────
   Soft fade/rise on route change, keyed by pathname. The animation
   fills backwards only, so no transform lingers on the wrapper after
   it finishes (a retained transform would break position:fixed
   descendants like the case-study modal). */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
