import { n as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as SectionLabel } from "./site-chrome-B7XV1pVJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DqAZetUi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AUDIENCE_META = {
	"Hiring Manager": {
		color: "#0284c7",
		bg: "rgba(2,132,199,0.10)"
	},
	"Prospective Client": {
		color: "#7c3aed",
		bg: "rgba(124,58,237,0.10)"
	},
	"Other": {
		color: "#16a34a",
		bg: "rgba(22,163,74,0.10)"
	}
};
function ContactPage() {
	const [sent, setSent] = (0, import_react.useState)(false);
	const [audience, setAudience] = (0, import_react.useState)("Hiring Manager");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-20 md:py-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "OPEN CHANNEL" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-display text-5xl md:text-6xl font-bold max-w-3xl",
				children: [
					"Let's start",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "accent-shift",
						children: "a conversation."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 max-w-xl text-lg text-muted-foreground leading-relaxed",
				children: "Whether you need a SOC analyst, a hardened deployment, or a custom AI agent — I'll respond with a scoped plan, not a sales pitch."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14 grid gap-10 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 flex flex-col gap-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
									}), "FOR HIRING MANAGERS"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground leading-relaxed mb-5",
									children: "I'm actively seeking entry-level SOC Analyst opportunities where I can apply hands-on detection and response skills in a live environment. My resume, certifications, and lab write-ups are one click away."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "/resume.pdf",
										className: "mono text-[11px] uppercase tracking-widest bg-signal text-signal-foreground px-4 py-3 hover:shadow-[0_0_30px_-5px_var(--signal)] transition-shadow inline-flex items-center gap-2",
										children: "Download resume ↓"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://linkedin.com",
										target: "_blank",
										rel: "noreferrer",
										className: "mono text-[11px] uppercase tracking-widest border border-signal/60 text-signal px-4 py-3 hover:bg-signal/10 transition-colors",
										children: "LinkedIn ↗"
									})]
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
									className: "mono text-[10px] uppercase tracking-widest text-signal mb-3 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "live-dot",
										"aria-hidden": true
									}), "FOR PROSPECTIVE CLIENTS"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground leading-relaxed",
									children: "Have a security gap, a deployment that needs hardening, an SEO audit, or a workflow you'd like automated with a custom AI agent? Tell me what you're working with — I'll respond with next steps, not a sales pitch."
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
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-card brackets p-5 flex items-start gap-3",
							style: { position: "relative" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "live-dot mt-1 shrink-0",
									"aria-hidden": true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mono text-[10px] uppercase tracking-widest text-muted-foreground leading-relaxed",
									children: [
										"Free resource — request the",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-signal",
											children: "Secure Web Deployment Checklist"
										}),
										" ",
										"in your message and I'll include it with my reply."
									]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-cta brackets p-8 md:p-10 relative overflow-hidden",
						style: { position: "relative" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 bg-grid opacity-[0.07]",
								"aria-hidden": true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"aria-hidden": true,
								className: "absolute -top-20 -right-20 w-56 h-56 blur-[80px] pointer-events-none",
								style: { background: "radial-gradient(circle, rgba(2,132,199,0.18), transparent 70%)" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative z-10",
								children: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center py-16 flex flex-col items-center gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-16 h-16 rounded-full flex items-center justify-center text-2xl",
											style: {
												background: "rgba(2,132,199,0.12)",
												border: "1px solid rgba(2,132,199,0.35)",
												color: "var(--signal)"
											},
											children: "✓"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mono text-[11px] uppercase tracking-widest text-signal",
											children: "MESSAGE RECEIVED"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-foreground/85 max-w-xs text-center leading-relaxed",
											children: "Transmission logged. I'll respond within 24–48 hours."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setSent(false),
											className: "mt-2 mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-signal transition-colors",
											children: "Send another →"
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: (e) => {
										e.preventDefault();
										setSent(true);
									},
									className: "flex flex-col gap-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mono text-[10px] uppercase tracking-widest text-signal flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "pulse-dot",
												"aria-hidden": true
											}), "NEW TRANSMISSION // COMPOSE"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-6 md:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Name",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													required: true,
													className: "w-full px-4 py-3 outline-none transition-all text-foreground placeholder:text-muted-foreground/60",
													style: {
														background: "rgba(255,255,255,0.5)",
														backdropFilter: "blur(8px)",
														border: "1px solid var(--hairline)",
														borderRadius: 0
													},
													onFocus: (e) => e.currentTarget.style.borderColor = "rgba(2,132,199,0.6)",
													onBlur: (e) => e.currentTarget.style.borderColor = "var(--hairline)",
													placeholder: "Your name"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Email",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													required: true,
													type: "email",
													className: "w-full px-4 py-3 outline-none transition-all text-foreground placeholder:text-muted-foreground/60",
													style: {
														background: "rgba(255,255,255,0.5)",
														backdropFilter: "blur(8px)",
														border: "1px solid var(--hairline)",
														borderRadius: 0
													},
													onFocus: (e) => e.currentTarget.style.borderColor = "rgba(2,132,199,0.6)",
													onBlur: (e) => e.currentTarget.style.borderColor = "var(--hairline)",
													placeholder: "you@company.com"
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "I am a…",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-3 gap-2",
												children: [
													"Hiring Manager",
													"Prospective Client",
													"Other"
												].map((a) => {
													const m = AUDIENCE_META[a];
													const active = audience === a;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setAudience(a),
														className: "mono text-[10px] uppercase tracking-widest px-3 py-3 border transition-all",
														style: {
															borderColor: active ? m.color : "var(--hairline)",
															color: active ? m.color : "var(--muted-foreground)",
															background: active ? m.bg : "rgba(255,255,255,0.35)",
															backdropFilter: "blur(6px)",
															boxShadow: active ? `0 0 14px -4px ${m.color}55` : "none"
														},
														children: a
													}, a);
												})
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Message",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												required: true,
												rows: 6,
												className: "w-full px-4 py-3 outline-none transition-all resize-none text-foreground placeholder:text-muted-foreground/60",
												style: {
													background: "rgba(255,255,255,0.5)",
													backdropFilter: "blur(8px)",
													border: "1px solid var(--hairline)",
													borderRadius: 0
												},
												onFocus: (e) => e.currentTarget.style.borderColor = "rgba(2,132,199,0.6)",
												onBlur: (e) => e.currentTarget.style.borderColor = "var(--hairline)",
												placeholder: "Tell me what you're working with..."
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											className: "mono text-[11px] uppercase tracking-widest bg-signal text-signal-foreground px-8 py-4 hover:shadow-[0_0_40px_-5px_var(--signal)] transition-all self-start",
											children: "Send transmission →"
										})
									]
								})
							})
						]
					})
				})]
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mono text-[10px] uppercase tracking-widest text-muted-foreground",
			children: label
		}), children]
	});
}
//#endregion
export { ContactPage as component };
