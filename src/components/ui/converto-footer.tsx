import React from "react";
import { Link } from "@tanstack/react-router";

interface FooterLinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLinkItem[];
}

interface ConvertoFooterProps {
  brandName?: string;
  displayWordmark?: string;
  description?: string;
  copyrightText?: string;
  creditText?: string;
  columns?: FooterColumn[];
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Quick link",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about" },
      { label: "Contact us", href: "/contact" },
      { label: "License", href: "/legal/terms" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Service", href: "/services" },
      { label: "Service details", href: "/services" },
      { label: "Project", href: "/work" },
      { label: "Project details", href: "/work" },
    ],
  },
  {
    title: "Others",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Blog details", href: "/blog" },
      { label: "404", href: "/404" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Facebook", href: "https://facebook.com", isExternal: true },
      { label: "LinkedIn", href: "https://linkedin.com", isExternal: true },
      { label: "Instagram", href: "https://instagram.com", isExternal: true },
      { label: "Twitter", href: "https://twitter.com", isExternal: true },
    ],
  },
];

export function ConvertoFooter({
  brandName = "CONVERTO",
  displayWordmark = "CONVRTO",
  description = "Reneria is a full-service interior design agency specializing in residential and commercial design.",
  copyrightText = "©2025 Converto All rights reserved.",
  creditText = "Design by Grabui - Powered by Placeholder",
  columns = DEFAULT_COLUMNS,
}: ConvertoFooterProps) {
  return (
    <footer className="w-full py-10 px-3 sm:px-6 lg:px-10">
      <div className="relative mx-auto max-w-[1360px] overflow-hidden rounded-[32px] sm:rounded-[38px] bg-[#0c0e12] border border-white/10 px-6 sm:px-12 lg:px-16 pt-14 sm:pt-16 pb-6 text-white shadow-2xl">
        
        {/* Soft emerald ambient backlight for the watermark */}
        <div className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 w-[70%] h-44 bg-emerald-500/15 blur-[100px] rounded-full" />

        {/* ── Top Grid: Brand Info + 4 Columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 sm:pb-16 relative z-10">
          {/* Brand Col */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col justify-start">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
              {brandName}
            </h3>
            <p className="mt-4 text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* 4 Link Columns */}
          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs sm:text-sm">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col space-y-3.5">
                <span className="font-semibold text-zinc-200 tracking-wide text-xs sm:text-sm">
                  {col.title}
                </span>
                <ul className="space-y-2 text-zinc-400">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors duration-150"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <a
                          href={link.href}
                          className="hover:text-white transition-colors duration-150"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Middle Divider & Credits ── */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 pb-2 text-[11px] sm:text-xs text-zinc-500 border-t border-zinc-800/80">
          <p>{copyrightText}</p>
          <p>{creditText}</p>
        </div>

        {/* ── Bottom Giant Illuminated Wordmark ── */}
        <div className="relative z-10 mt-2 sm:mt-4 flex justify-center items-end select-none pointer-events-none overflow-hidden">
          <span className="text-[13vw] font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#0c2f23] via-[#3ce09c] to-[#0f3b2d] drop-shadow-[0_12px_24px_rgba(52,211,153,0.12)]">
            {displayWordmark}
          </span>
        </div>
      </div>
    </footer>
  );
}

export default ConvertoFooter;
