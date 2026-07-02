import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SectionLabel } from "./site-chrome-B7XV1pVJ.mjs";
import { i as skills, n as certs } from "./site-data-CuJE2VtR.mjs";
import { a as IconSearch, i as IconRadar, l as IconTrophy, n as IconCloud, o as IconSecureGlobe, s as IconShieldLock, t as IconAISecure } from "./icons-DoyZ-jHK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-D97laCnk.js
var import_jsx_runtime = require_jsx_runtime();
var STATS = [
	{
		value: "60+",
		label: "Detection rules authored"
	},
	{
		value: "42",
		label: "MITRE techniques mapped"
	},
	{
		value: "92%",
		label: "Vulns closed on re-scan"
	},
	{
		value: "22m",
		label: "Mean time to contain"
	}
];
var CERT_META = {
	"CompTIA Security+": {
		color: "#0284c7",
		Icon: IconShieldLock
	},
	"CompTIA CySA+": {
		color: "#d97706",
		Icon: IconSearch
	},
	"TryHackMe — Top 1%": {
		color: "#16a34a",
		Icon: IconTrophy
	},
	"AWS Cloud Practitioner": {
		color: "#f97316",
		Icon: IconCloud
	}
};
var DISCIPLINES = [
	{
		Icon: IconRadar,
		title: "Threat Detection & SOC",
		body: "SIEM correlation, IDS/IPS tuning, alert triage and incident response — built on real lab environments and production-grade frameworks.",
		accent: "#0284c7"
	},
	{
		Icon: IconSecureGlobe,
		title: "Secure Infrastructure",
		body: "Zero-trust architecture, TLS 1.3 enforcement, DDoS mitigation, and CIS-benchmark hardening from OS to edge.",
		accent: "#d97706"
	},
	{
		Icon: IconAISecure,
		title: "Secure AI Automation",
		body: "Custom agents built privacy-first — scoped tokens, field-level redaction, prompt-injection defences, and full audit trails.",
		accent: "#7c3aed"
	}
];
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-20 md:py-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "OPERATOR PROFILE" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-display text-5xl md:text-6xl font-bold max-w-4xl leading-tight",
				children: [
					"Trained to watch",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "accent-shift",
						children: "what others overlook."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid grid-cols-2 md:grid-cols-4 gap-4",
				children: STATS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-card brackets p-5 text-center",
					style: {
						position: "relative",
						animationDelay: `${i * .08}s`
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-3xl md:text-4xl font-bold text-signal leading-none mb-2 count-glow",
							children: s.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mono text-[9px] uppercase tracking-widest text-muted-foreground",
							children: s.label
						})
					]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 grid gap-12 lg:grid-cols-[1fr_340px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6 text-foreground/85 leading-relaxed text-[1.05rem]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "I approach security the way an analyst approaches a live incident: methodically, skeptically, and with a bias toward evidence over assumption. My background is built on hands-on detection work — correlating logs, triaging alerts, and tracing anomalies back to root cause — combined with the technical range to architect and harden the systems those alerts protect." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "That dual perspective, defender and builder, is the foundation of everything I ship. A website isn't finished when it looks good; it's finished when it has been stress-tested against the same techniques an attacker would use. An AI agent isn't \"smart\" until its data handling and API integrations have been locked down. Security isn't a final checklist item here — it's the design constraint everything else is built around." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "mt-4 pl-6 py-3 mono text-base italic text-foreground/90 relative",
							style: {
								borderLeft: "2px solid var(--signal)",
								background: "linear-gradient(90deg, rgba(2,132,199,0.06), transparent)",
								backdropFilter: "blur(4px)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "absolute left-0 top-0 bottom-0 w-0.5",
								style: { background: "linear-gradient(to bottom, var(--signal), transparent)" }
							}), "\"Secure by Design means the safeguard isn't bolted on after launch — it's the reason the architecture looks the way it does.\""]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/work",
								className: "mono text-[11px] uppercase tracking-widest bg-signal text-signal-foreground px-6 py-3 hover:shadow-[0_0_36px_-5px_var(--signal)] transition-shadow inline-flex items-center gap-2",
								children: "View field work →"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "mono text-[11px] uppercase tracking-widest border border-signal/60 text-signal px-6 py-3 hover:bg-signal/10 transition-colors inline-flex items-center gap-2",
								children: "Open a channel →"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-card brackets p-6",
							style: { position: "relative" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mono text-[10px] uppercase tracking-widest text-signal mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "live-dot",
										"aria-hidden": true
									}), "CERTIFICATIONS"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "flex flex-col gap-3",
									children: certs.map((c) => {
										const meta = CERT_META[c];
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-center gap-3 text-sm group",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "shrink-0",
												style: { color: meta?.color ?? "var(--signal)" },
												children: meta ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(meta.Icon, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "◆" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-foreground/85 group-hover:text-foreground transition-colors",
												children: c
											})]
										}, c);
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-card brackets p-6",
							style: { position: "relative" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mono text-[10px] uppercase tracking-widest text-signal mb-2 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "pulse-dot",
										"aria-hidden": true
									}), "CURRENT STATUS"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-foreground/80 leading-relaxed",
									children: "Freelance SOC analyst & security engineer. Open to entry-level SOC positions and project engagements."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-card brackets p-6 flex flex-col gap-3",
							style: { position: "relative" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mono text-[10px] uppercase tracking-widest text-signal mb-1",
									children: "DIRECT CHANNELS"
								}),
								[
									{
										label: "hello@techvrs.com",
										href: "mailto:hello@techvrs.com"
									},
									{
										label: "Medium — @mdtareksec",
										href: "https://medium.com/@mdtareksec"
									},
									{
										label: "GitHub — @techvrs",
										href: "https://github.com"
									}
								].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: l.href,
									target: l.href.startsWith("http") ? "_blank" : void 0,
									rel: "noreferrer",
									className: "mono text-[11px] text-muted-foreground hover:text-signal transition-colors flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-signal opacity-60",
										children: "↗"
									}), l.label]
								}, l.label))
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "DISCIPLINES" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-3xl md:text-4xl font-display font-bold mb-10",
						children: ["One standard. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-signal",
							children: "Three domains."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-6 md:grid-cols-3",
						children: DISCIPLINES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-card brackets p-7 flex flex-col gap-4 hover-lift",
							style: { position: "relative" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 48,
										height: 48,
										borderRadius: 12,
										background: `${d.accent}18`,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										color: d.accent,
										border: `1px solid ${d.accent}33`
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(d.Icon, { size: 26 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display font-semibold text-lg",
									children: d.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground leading-relaxed",
									children: d.body
								})
							]
						}, d.title))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "STACK MATRIX" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-3xl md:text-4xl font-display font-bold mb-10",
						children: ["The stack, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-signal",
							children: "mapped."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5 md:grid-cols-2 lg:grid-cols-4",
						children: Object.entries(skills).map(([group, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-card brackets p-5 flex flex-col gap-4",
							style: { position: "relative" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mono text-[10px] uppercase tracking-widest text-signal border-b border-hairline pb-3",
									children: group
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "flex flex-wrap gap-2",
									children: items.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "mono text-[11px] px-2.5 py-1.5 border border-hairline text-foreground/75 hover:border-signal/50 hover:text-signal transition-colors cursor-default",
										style: {
											background: "rgba(255,255,255,0.4)",
											backdropFilter: "blur(4px)"
										},
										children: s
									}, s))
								})
							]
						}, group))
					})
				]
			})
		]
	});
}
//#endregion
export { AboutPage as component };
