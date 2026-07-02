import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SectionLabel } from "./site-chrome-B7XV1pVJ.mjs";
import { o as toolRoles, r as services, t as caseStudies } from "./site-data-CuJE2VtR.mjs";
import { i as IllustrationWebDeploy, n as IllustrationSEO, r as IllustrationSOC, t as IllustrationAI } from "./service-illustrations-BAk_b43-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services-BAdMYMQ-.js
var import_jsx_runtime = require_jsx_runtime();
var CATEGORY_COLORS = {
	SOC: "text-signal border-signal/40",
	Web: "text-amber border-amber/40",
	SEO: "text-green-400 border-green-400/40",
	"AI Agents": "text-violet-400 border-violet-400/40"
};
var SVC_CONFIG = {
	"soc-cybersecurity": {
		ambientClass: "svc-ambient-soc",
		accentColor: "rgba(2,132,199,0.12)",
		glowColor: "rgba(2,132,199,0.25)",
		tagColor: "text-signal border-signal/40",
		accent: "#0891b2",
		chipLabel: "MONITORING: ACTIVE",
		Illustration: IllustrationSOC
	},
	"secure-web-deployment": {
		ambientClass: "svc-ambient-web",
		accentColor: "rgba(217,119,6,0.10)",
		glowColor: "rgba(217,119,6,0.22)",
		tagColor: "text-amber border-amber/40",
		accent: "#d97706",
		chipLabel: "INTEGRITY: 100%",
		Illustration: IllustrationWebDeploy
	},
	"technical-secure-seo": {
		ambientClass: "svc-ambient-seo",
		accentColor: "rgba(22,163,74,0.10)",
		glowColor: "rgba(22,163,74,0.22)",
		tagColor: "text-green-400 border-green-400/40",
		accent: "#16a34a",
		chipLabel: "VISIBILITY: LIVE",
		Illustration: IllustrationSEO
	},
	"ai-agent-development": {
		ambientClass: "svc-ambient-ai",
		accentColor: "rgba(124,58,237,0.10)",
		glowColor: "rgba(124,58,237,0.22)",
		tagColor: "text-violet-400 border-violet-400/40",
		accent: "#7c3aed",
		chipLabel: "AGENT: RUNNING",
		Illustration: IllustrationAI
	}
};
function ServicesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-20 md:py-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "CAPABILITIES" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-display text-5xl md:text-6xl font-bold max-w-4xl",
				children: [
					"Four disciplines.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "accent-shift",
						children: "One security-first standard."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed",
				children: "The same four capabilities from my homepage, expanded into full engagements: how each one runs, the tooling behind it, and the outcome you can hold me to. Every service links straight to field work — proof, not promises."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 flex flex-wrap gap-3",
				children: services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: `#${s.slug}`,
					className: "mono text-[10px] uppercase tracking-widest border border-hairline px-3 py-2 text-muted-foreground hover:text-signal hover:border-signal/60 transition-colors",
					children: [
						s.index,
						" · ",
						s.title
					]
				}, s.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-20 flex flex-col gap-28",
				children: services.map((s) => {
					const proof = caseStudies.filter((c) => c.category === s.caseCategory);
					const cfg = SVC_CONFIG[s.slug];
					const { Illustration } = cfg;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: s.slug,
						className: "scroll-mt-28",
						style: { position: "relative" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"aria-hidden": true,
								style: {
									position: "absolute",
									top: -60,
									right: -40,
									width: 480,
									height: 480,
									background: `radial-gradient(circle, ${cfg.accentColor}, transparent 70%)`,
									filter: "blur(60px)",
									pointerEvents: "none",
									zIndex: 0
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid lg:grid-cols-[1fr_auto] gap-10 items-start mb-10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-4 mb-6",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "mono text-xs text-muted-foreground",
													children: ["/ ", s.index]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: `mono text-[10px] uppercase tracking-widest border px-3 py-1.5 inline-flex items-center gap-2 ${cfg.tagColor}`,
													style: {
														background: cfg.accentColor,
														backdropFilter: "blur(8px)",
														WebkitBackdropFilter: "blur(8px)"
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "live-dot",
														"aria-hidden": true
													}), s.tagline]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "text-3xl md:text-4xl font-display font-bold mb-4",
												children: s.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "max-w-2xl text-muted-foreground leading-relaxed",
												children: s.intro
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "hidden lg:flex shrink-0 items-center justify-center",
											style: {
												width: 320,
												position: "relative"
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"aria-hidden": true,
												style: {
													position: "absolute",
													inset: -30,
													background: `radial-gradient(ellipse at center, ${cfg.accentColor}, transparent 70%)`,
													filter: "blur(28px)",
													pointerEvents: "none"
												}
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													position: "relative",
													width: "100%",
													borderRadius: 16,
													border: `1px solid ${cfg.accent}44`,
													background: `linear-gradient(160deg, rgba(255,255,255,0.60) 0%, rgba(240,249,255,0.38) 100%)`,
													backdropFilter: "blur(12px) saturate(1.4)",
													WebkitBackdropFilter: "blur(12px) saturate(1.4)",
													boxShadow: `inset 0 1px 0 rgba(255,255,255,0.8), 0 12px 36px -10px ${cfg.accent}30`,
													padding: "1.5rem 1rem 1rem",
													animation: "iso-rise 0.9s cubic-bezier(0.16,1,0.3,1) both",
													overflow: "visible"
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														style: {
															position: "absolute",
															top: -13,
															left: "50%",
															transform: "translateX(-50%)",
															display: "inline-flex",
															alignItems: "center",
															gap: "0.4rem",
															fontFamily: "var(--font-mono)",
															fontSize: "0.55rem",
															letterSpacing: "0.16em",
															textTransform: "uppercase",
															whiteSpace: "nowrap",
															color: cfg.accent,
															background: "rgba(255,255,255,0.95)",
															border: `1px solid ${cfg.accent}55`,
															borderRadius: 999,
															padding: "0.28rem 0.8rem",
															boxShadow: `0 2px 10px -2px ${cfg.accent}55, 0 0 0 3px rgba(255,255,255,0.6)`,
															zIndex: 4
														},
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
															width: 6,
															height: 6,
															borderRadius: "50%",
															background: cfg.accent,
															boxShadow: `0 0 6px ${cfg.accent}, 0 0 12px ${cfg.accent}`,
															display: "inline-block"
														} }), "SYS // ACTIVE"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Illustration, { style: {
														maxHeight: 220,
														position: "relative",
														zIndex: 1,
														filter: `drop-shadow(0px 16px 28px ${cfg.accent}22)`
													} }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														style: {
															position: "absolute",
															top: "1rem",
															right: "-1rem",
															fontFamily: "var(--font-mono)",
															fontSize: "0.55rem",
															letterSpacing: "0.14em",
															textTransform: "uppercase",
															whiteSpace: "nowrap",
															color: cfg.accent,
															background: "rgba(255,255,255,0.92)",
															backdropFilter: "blur(12px)",
															border: `1px solid ${cfg.accent}45`,
															borderRadius: 999,
															padding: "0.3rem 0.75rem",
															display: "flex",
															alignItems: "center",
															gap: "0.45rem",
															boxShadow: `0 4px 12px -3px ${cfg.accent}35`,
															zIndex: 4
														},
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "pulse-dot",
															style: {
																width: 5,
																height: 5,
																background: cfg.accent
															}
														}), cfg.chipLabel]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"aria-hidden": true,
														style: {
															position: "absolute",
															top: 10,
															left: 10,
															width: 14,
															height: 14,
															borderTop: `1px solid ${cfg.accent}66`,
															borderLeft: `1px solid ${cfg.accent}66`
														}
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"aria-hidden": true,
														style: {
															position: "absolute",
															bottom: 10,
															right: 10,
															width: 14,
															height: 14,
															borderBottom: `1px solid ${cfg.accent}66`,
															borderRight: `1px solid ${cfg.accent}66`
														}
													})
												]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-6 lg:grid-cols-[1.15fr_0.85fr]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "glass-card brackets flex flex-col gap-6 p-6",
											style: { position: "relative" },
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mono text-[10px] uppercase tracking-widest text-signal flex items-center gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "live-dot",
															"aria-hidden": true
														}),
														"WORKFLOW // ",
														String(s.workflow.length).padStart(2, "0"),
														" PHASES"
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
													className: "flex flex-col gap-5",
													children: s.workflow.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
														className: "flex gap-4 items-start",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "mono text-[10px] text-signal border border-signal/50 w-7 h-7 flex items-center justify-center shrink-0 font-bold",
															style: { background: cfg.accentColor },
															children: String(i + 1).padStart(2, "0")
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "mono text-sm font-semibold tracking-widest uppercase mb-1",
															children: step.phase
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-sm text-muted-foreground leading-relaxed",
															children: step.detail
														})] })]
													}, step.phase))
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "glass-card brackets flex flex-col gap-4 p-6",
												style: { position: "relative" },
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "mono text-[10px] uppercase tracking-widest text-signal",
														children: "TOOLCHAIN"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
														className: "flex flex-wrap gap-2",
														children: s.tools.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
															tabIndex: 0,
															"data-tip": toolRoles[t] ?? "Deployed in real engagements and lab environments.",
															className: "tip mono text-[11px] px-2.5 py-1.5 border border-hairline text-foreground/80 hover:border-signal/60 hover:text-signal transition-all cursor-default",
															style: {
																background: "rgba(255,255,255,0.55)",
																backdropFilter: "blur(6px)"
															},
															children: t
														}, t))
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-muted-foreground",
														children: "Hover any tool to see its role in this workflow."
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "glass-card brackets flex flex-col gap-3 flex-1 p-6",
												style: { position: "relative" },
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "mono text-[10px] uppercase tracking-widest text-signal",
														children: "THE OUTCOME"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm leading-relaxed text-foreground/90",
														children: s.outcome
													})
												]
											})]
										})]
									}),
									proof.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
													display: "inline-block",
													width: 6,
													height: 6,
													borderRadius: "50%",
													background: "currentColor",
													opacity: .5
												} }),
												"FIELD PROOF // ",
												String(proof.length).padStart(2, "0"),
												" ",
												proof.length === 1 ? "CASE STUDY" : "CASE STUDIES"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid gap-4 md:grid-cols-2",
											children: proof.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/work",
												className: "glass-card brackets hover-lift p-5 flex flex-col gap-3 group",
												style: { position: "relative" },
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: `mono text-[10px] uppercase tracking-widest border px-2 py-1 ${CATEGORY_COLORS[c.category] ?? "text-signal border-signal/40"}`,
															children: c.category
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "mono text-xs text-muted-foreground",
															children: c.index
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "font-display font-semibold leading-snug group-hover:text-signal transition-colors",
														children: c.title
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm text-muted-foreground leading-relaxed",
														children: c.outcome
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-auto pt-3 border-t border-hairline flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex gap-4",
															children: c.metrics.slice(0, 2).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "mono text-signal text-base font-bold leading-none mb-1",
																children: m.value
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "mono text-[8px] uppercase tracking-widest text-muted-foreground",
																children: m.label
															})] }, m.label))
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "mono text-[10px] uppercase tracking-widest text-signal group-hover:translate-x-0.5 transition-transform",
															children: "Open →"
														})]
													})
												]
											}, c.slug))
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-16 h-px",
								style: { background: `linear-gradient(to right, transparent, ${cfg.glowColor}, transparent)` }
							})
						]
					}, s.slug);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-24 grid gap-6 md:grid-cols-3",
				children: [
					{
						title: "Freelance project",
						desc: "Fixed-scope engagement with defined deliverables and hardening acceptance criteria."
					},
					{
						title: "Retainer",
						desc: "Ongoing monitoring, response, and iterative hardening on your infrastructure."
					},
					{
						title: "Consultation",
						desc: "Focused review sessions — architecture, audits, or a second set of eyes."
					}
				].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-card brackets p-6",
					style: { position: "relative" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mono text-[10px] uppercase tracking-widest text-signal mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "live-dot",
								"aria-hidden": true
							}), "ENGAGEMENT MODEL"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-display font-semibold mb-2",
							children: m.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: m.desc
						})
					]
				}, m.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 glass-cta brackets p-10 md:p-14 relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 bg-grid opacity-10",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -top-20 -right-20 h-[300px] w-[300px] blur-[90px]",
						style: { background: "radial-gradient(circle, rgba(2,132,199,0.18), transparent 70%)" },
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -bottom-20 -left-20 h-[200px] w-[200px] blur-[80px]",
						style: { background: "radial-gradient(circle, rgba(14,165,233,0.12), transparent 70%)" },
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative grid gap-10 lg:grid-cols-2 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mono text-[11px] uppercase tracking-widest text-signal mb-3 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "live-dot",
									"aria-hidden": true
								}), "NEXT STEP // ACCEPTING ENGAGEMENTS"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl md:text-3xl font-display font-bold",
								children: "Have a security gap you want mapped?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-muted-foreground leading-relaxed",
								children: "Open a channel and I'll respond with a scoped plan — deliverables, timeline, and acceptance criteria — not a sales pitch."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/contact",
									className: "mono text-[11px] uppercase tracking-widest bg-signal text-signal-foreground px-6 py-4 hover:shadow-[0_0_40px_-5px_var(--signal)] transition-shadow inline-flex items-center gap-2",
									children: "Open a channel →"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/contact",
									className: "mono text-[10px] uppercase tracking-widest inline-flex items-center gap-2 text-muted-foreground hover:text-signal transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "live-dot",
										"aria-hidden": true
									}), "Request a free Technical SEO Audit →"]
								})]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-card brackets p-6 md:p-8 relative overflow-hidden",
							style: { position: "relative" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/soc-checklist.png",
									alt: "",
									"aria-hidden": true,
									style: {
										position: "absolute",
										bottom: -10,
										right: -10,
										width: 130,
										height: 130,
										objectFit: "contain",
										opacity: .22,
										pointerEvents: "none",
										filter: "drop-shadow(0 4px 16px rgba(2,132,199,0.2))"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative z-10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mono text-[10px] uppercase tracking-widest text-signal mb-3 flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "live-dot",
												"aria-hidden": true
											}), "FREE RESOURCE // NO STRINGS"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-xl font-display font-semibold mb-2",
											children: "Secure Web Deployment Checklist"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground leading-relaxed mb-5",
											children: "The exact 27-point checklist I run before any client site goes live — TLS, headers, DNS, access control, and edge protection. Request it and I'll send it over, along with one free observation about your current setup."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/contact",
											className: "inline-flex mono text-[11px] uppercase tracking-widest border border-signal/60 text-signal px-5 py-3 hover:bg-signal/10 transition-all",
											children: "Request the checklist →"
										})
									]
								})
							]
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { ServicesPage as component };
