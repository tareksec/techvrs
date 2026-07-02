import { r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { n as SectionLabel } from "./site-chrome-B7XV1pVJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-DC0Uc8RV.js
var import_jsx_runtime = require_jsx_runtime();
var MEDIUM_FEED = "https://medium.com/feed/@mdtareksec";
async function fetchFeed() {
	const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_FEED)}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error("Feed fetch failed");
	const data = await res.json();
	if (data.status !== "ok") throw new Error("Feed returned non-ok status");
	return data.items;
}
function stripHtml(html) {
	if (!html) return "";
	return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}
function readTime(html) {
	const text = stripHtml(html);
	const words = text ? text.split(" ").length : 0;
	return `${Math.max(1, Math.round(words / 220))} min`;
}
function fmtDate(dateStr) {
	return new Date(dateStr).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "2-digit"
	});
}
function BlogPage() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["medium-feed"],
		queryFn: fetchFeed,
		staleTime: 1e3 * 60 * 30
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-20 md:py-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "FIELD NOTES" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-display text-5xl md:text-6xl font-bold max-w-3xl",
				children: ["Notes ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "accent-shift",
					children: "from the console."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed",
				children: "Write-ups on detection techniques, hardening walkthroughs, and lessons from building secure systems — published on Medium and mirrored here as they go live."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mono text-[10px] uppercase tracking-widest text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "live-dot",
						"aria-hidden": true
					}), "Live Medium feed — @mdtareksec"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://medium.com/@mdtareksec",
					target: "_blank",
					rel: "noreferrer",
					className: "mono text-[10px] uppercase tracking-widest text-signal border border-signal/40 px-3 py-1.5 hover:bg-signal/10 transition-colors",
					children: "Follow on Medium ↗"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12",
				children: [
					isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {}),
					isError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-card brackets p-8",
						style: { position: "relative" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mono text-[11px] uppercase tracking-widest text-critical mb-2",
								children: "FEED_ERROR // CONNECTION_LOST"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted-foreground",
								children: [
									"Could not reach the transmission relay. Read the archive directly on",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://medium.com/@mdtareksec",
										target: "_blank",
										rel: "noreferrer",
										className: "text-signal hover:underline",
										children: "Medium"
									}),
									"."
								]
							})
						]
					}),
					data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						data[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: data[0].link,
							target: "_blank",
							rel: "noreferrer",
							className: "glass-card brackets group flex flex-col md:flex-row gap-0 mb-8 overflow-hidden hover-lift",
							style: { position: "relative" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 p-8 md:p-10 flex flex-col gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "mono text-[10px] uppercase tracking-widest border border-signal/40 text-signal px-2 py-0.5 flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "live-dot",
													"aria-hidden": true
												}), "LATEST"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "mono text-[10px] uppercase tracking-widest text-muted-foreground",
												children: [
													fmtDate(data[0].pubDate),
													" · ",
													readTime(data[0].description)
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-display text-2xl md:text-3xl font-bold leading-snug group-hover:text-signal transition-colors",
											children: data[0].title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-muted-foreground leading-relaxed line-clamp-3 text-[0.95rem]",
											children: [stripHtml(data[0].description).slice(0, 240), "…"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-auto flex items-center gap-4",
											children: [data[0].categories?.[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mono text-[10px] uppercase tracking-widest text-signal border border-signal/40 px-2 py-1",
												children: data[0].categories[0]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "mono text-[10px] uppercase tracking-widest text-signal flex items-center gap-1.5 group-hover:gap-2.5 transition-all",
												children: ["Read on Medium", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "group-hover:translate-x-1 transition-transform inline-block",
													children: "↗"
												})]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hidden md:flex w-64 flex-col items-center justify-center p-10 gap-6 shrink-0",
									style: {
										background: "linear-gradient(160deg, rgba(2,132,199,0.08), rgba(14,165,233,0.04))",
										borderLeft: "1px solid rgba(2,132,199,0.15)"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mono text-[9px] uppercase tracking-widest text-signal opacity-60 text-center",
											children: "LATEST TRANSMISSION"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-20 h-20 rounded-full flex items-center justify-center",
											style: {
												background: "rgba(2,132,199,0.10)",
												border: "1px solid rgba(2,132,199,0.25)"
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mono text-signal text-2xl",
												children: "✦"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mono text-[9px] uppercase tracking-widest text-muted-foreground text-center",
											children: [readTime(data[0].description), " read"]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
							children: data.slice(1, 10).map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: item.link,
								target: "_blank",
								rel: "noreferrer",
								className: "glass-card brackets hover-lift flex flex-col gap-4 p-6 group",
								style: {
									position: "relative",
									animationDelay: `${i * .05}s`
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mono text-[10px] uppercase tracking-widest text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtDate(item.pubDate) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: readTime(item.description) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-[1.05rem] font-semibold leading-snug group-hover:text-signal transition-colors flex-1",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted-foreground line-clamp-3 leading-relaxed",
										children: [stripHtml(item.description).slice(0, 160), "…"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-auto pt-4 border-t border-hairline flex items-center justify-between",
										children: [item.categories?.[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mono text-[10px] uppercase tracking-widest text-signal border border-signal/35 px-2 py-0.5",
											children: item.categories[0]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mono text-[10px] uppercase tracking-widest text-signal flex items-center gap-1 group-hover:gap-2 transition-all",
											children: "Read ↗"
										})]
									})
								]
							}, item.link))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-16 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://medium.com/@mdtareksec",
								target: "_blank",
								rel: "noreferrer",
								className: "mono text-[11px] uppercase tracking-widest border border-signal/60 text-signal px-8 py-4 hover:bg-signal hover:text-signal-foreground transition-colors inline-flex items-center gap-2",
								children: "View full archive on Medium ↗"
							})
						})
					] })
				]
			})
		]
	});
}
function LoadingSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mono text-[11px] uppercase tracking-widest text-signal mb-6 flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pulse-dot",
				"aria-hidden": true
			}), "FETCHING LATEST TRANSMISSIONS..."]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-card brackets p-10 mb-8 h-48 animate-pulse",
			style: { position: "relative" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-24 bg-hairline mb-4 rounded" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-7 w-2/3 bg-hairline mb-3 rounded" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-full bg-hairline mb-2 rounded" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-5/6 bg-hairline rounded" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
			children: [
				0,
				1,
				2,
				3,
				4,
				5
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card brackets p-6 h-56 animate-pulse",
				style: { position: "relative" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/3 bg-hairline mb-4 rounded" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-3/4 bg-hairline mb-3 rounded" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-full bg-hairline mb-2 rounded" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-5/6 bg-hairline rounded" })
				]
			}, i))
		})
	] });
}
//#endregion
export { BlogPage as component };
