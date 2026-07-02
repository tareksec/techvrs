import { n as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as SectionLabel } from "./site-chrome-B7XV1pVJ.mjs";
import { t as caseStudies } from "./site-data-CuJE2VtR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/work-Cm8qeHiT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	"All",
	"SOC",
	"Web",
	"SEO",
	"AI Agents"
];
var CATEGORY_META = {
	SOC: {
		color: "#0284c7",
		bg: "rgba(2,132,199,0.10)",
		dot: "#0284c7"
	},
	Web: {
		color: "#d97706",
		bg: "rgba(217,119,6,0.10)",
		dot: "#d97706"
	},
	SEO: {
		color: "#16a34a",
		bg: "rgba(22,163,74,0.10)",
		dot: "#16a34a"
	},
	"AI Agents": {
		color: "#7c3aed",
		bg: "rgba(124,58,237,0.10)",
		dot: "#7c3aed"
	}
};
function WorkPage() {
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [open, setOpen] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => filter === "All" ? caseStudies : caseStudies.filter((c) => c.category === filter), [filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-20 md:py-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "FIELD WORK" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-display text-5xl md:text-6xl font-bold max-w-4xl",
				children: ["Proof, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "accent-shift",
					children: "not promises."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed",
				children: "A selection of projects across detection engineering, secure deployment, and applied AI — documented the way an incident report would be."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 flex flex-wrap gap-2",
				children: FILTERS.map((f) => {
					const meta = CATEGORY_META[f];
					const isActive = filter === f;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setFilter(f),
						className: "mono text-[11px] uppercase tracking-widest px-4 py-2 border transition-all",
						style: {
							borderColor: isActive ? meta?.color ?? "var(--signal)" : "var(--hairline)",
							color: isActive ? meta?.color ?? "var(--signal)" : "var(--muted-foreground)",
							background: isActive ? meta?.bg ?? "rgba(2,132,199,0.10)" : "transparent",
							boxShadow: isActive ? `0 0 16px -4px ${meta?.color ?? "rgba(2,132,199,0.4)"}55` : "none"
						},
						children: f
					}, f);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((c) => {
					const meta = CATEGORY_META[c.category];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setOpen(c),
						className: "text-left glass-card brackets hover-lift flex flex-col gap-4 p-6 group",
						style: { position: "relative" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mono text-[10px] uppercase tracking-widest px-2.5 py-1 border inline-flex items-center gap-1.5",
									style: {
										color: meta?.color,
										borderColor: `${meta?.color}55`,
										background: meta?.bg
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
										width: 5,
										height: 5,
										borderRadius: "50%",
										background: meta?.dot,
										display: "inline-block"
									} }), c.category]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mono text-xs text-muted-foreground",
									children: ["/ ", c.index]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-display font-semibold leading-snug transition-colors",
								style: { color: "var(--foreground)" },
								children: c.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-1",
								children: c.challenge
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-auto pt-4 border-t flex flex-wrap gap-4",
								style: { borderColor: "var(--hairline)" },
								children: c.metrics.slice(0, 2).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-xl font-bold leading-none mb-0.5",
									style: { color: meta?.color ?? "var(--signal)" },
									children: m.value
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mono text-[9px] uppercase tracking-widest text-muted-foreground",
									children: m.label
								})] }, m.label))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mono text-[10px] uppercase tracking-widest transition-colors flex items-center gap-1.5",
								style: { color: meta?.color ?? "var(--signal)" },
								children: ["View case study", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "group-hover:translate-x-1 transition-transform inline-block",
									children: "→"
								})]
							})
						]
					}, c.slug);
				})
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseModal, {
				study: open,
				onClose: () => setOpen(null)
			})
		]
	});
}
function CaseModal({ study, onClose }) {
	const meta = CATEGORY_META[study.category];
	(0, import_react.useEffect)(() => {
		const onKey = (e) => e.key === "Escape" && onClose();
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 md:p-10 overflow-auto",
		style: {
			background: "rgba(13,17,23,0.75)",
			backdropFilter: "blur(14px)"
		},
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-card brackets max-w-4xl w-full p-8 md:p-12 relative",
			style: {
				position: "relative",
				animation: "iso-rise 0.45s cubic-bezier(0.16,1,0.3,1) both"
			},
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "absolute top-4 right-4 mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-signal transition-colors flex items-center gap-1",
					children: "ESC ✕"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mono text-[10px] uppercase tracking-widest border px-2.5 py-1 inline-flex items-center gap-1.5",
						style: {
							color: meta?.color,
							borderColor: `${meta?.color}55`,
							background: meta?.bg
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
							width: 5,
							height: 5,
							borderRadius: "50%",
							background: meta?.dot,
							display: "inline-block"
						} }), study.category]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mono text-xs text-muted-foreground",
						children: ["CASE / ", study.index]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl md:text-3xl font-display font-bold",
					children: study.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 grid-cols-3",
					children: study.metrics.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 text-center",
						style: {
							background: meta?.bg ?? "rgba(2,132,199,0.08)",
							border: `1px solid ${meta?.color ?? "var(--signal)"}33`,
							backdropFilter: "blur(6px)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-3xl font-bold leading-none mb-1",
							style: { color: meta?.color ?? "var(--signal)" },
							children: m.value
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mono text-[9px] uppercase tracking-widest text-muted-foreground",
							children: m.label
						})]
					}, m.label))
				}),
				[
					{
						label: "CHALLENGE",
						body: study.challenge
					},
					{
						label: "APPROACH",
						body: study.approach
					},
					{
						label: "OUTCOME",
						body: study.outcome
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mono text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2",
						style: { color: meta?.color ?? "var(--signal)" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
							display: "inline-block",
							width: 18,
							height: 1,
							background: meta?.color ?? "var(--signal)"
						} }), s.label]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-foreground/85 leading-relaxed",
						children: s.body
					})]
				}, s.label)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mono text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2",
						style: { color: meta?.color ?? "var(--signal)" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
							display: "inline-block",
							width: 18,
							height: 1,
							background: meta?.color ?? "var(--signal)"
						} }), "TOOLS / STACK"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: study.stack.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono text-[11px] px-2.5 py-1.5 border text-foreground/80",
							style: {
								borderColor: `${meta?.color ?? "var(--signal)"}33`,
								background: meta?.bg ?? "rgba(2,132,199,0.06)",
								backdropFilter: "blur(4px)"
							},
							children: t
						}, t))
					})]
				})
			]
		})
	});
}
//#endregion
export { WorkPage as component };
