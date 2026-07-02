import { n as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-chrome-B7XV1pVJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ThemeContext = (0, import_react.createContext)({
	theme: "light",
	toggle: () => {}
});
function ThemeProvider({ children }) {
	const [theme, setTheme] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		const stored = localStorage.getItem("theme") ?? "light";
		setTheme(stored);
		document.documentElement.classList.remove("dark", "light");
		document.documentElement.classList.add(stored);
	}, []);
	const toggle = () => {
		setTheme((prev) => {
			const next = prev === "dark" ? "light" : "dark";
			localStorage.setItem("theme", next);
			document.documentElement.classList.remove("dark", "light");
			document.documentElement.classList.add(next);
			return next;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value: {
			theme,
			toggle
		},
		children
	});
}
function useTheme() {
	return (0, import_react.useContext)(ThemeContext);
}
var LAST_AUDIT = "2026.06.28";
function StatusPulse({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-widest text-muted-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pulse-dot",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-foreground",
					children: "SYSTEM: SECURE"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-hairline",
				children: "|"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pulse-dot amber",
					"aria-hidden": true
				}), "MONITORING: ACTIVE"]
			}),
			!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-hairline",
				children: "|"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["LAST AUDIT: ", LAST_AUDIT] })] })
		]
	});
}
function ThemeToggle() {
	const { theme, toggle } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: toggle,
		"aria-label": theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
		className: "group relative flex items-center gap-2 border border-hairline px-3 py-2 hover:border-signal/60 transition-all",
		title: theme === "dark" ? "Light mode" : "Dark mode",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-signal transition-colors",
			children: theme === "dark" ? "☀" : "☾"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-signal transition-colors hidden sm:inline",
			children: theme === "dark" ? "Light" : "Dark"
		})]
	});
}
var nav = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/services",
		label: "Services"
	},
	{
		to: "/work",
		label: "Work"
	},
	{
		to: "/blog",
		label: "Blog"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function ScrollProgress() {
	const [pct, setPct] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const onScroll = () => {
			const el = document.documentElement;
			const scrolled = el.scrollTop;
			const max = el.scrollHeight - el.clientHeight;
			setPct(max > 0 ? scrolled / max * 100 : 0);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "absolute bottom-0 left-0 h-[1.5px] transition-[width] duration-150 ease-linear",
		style: {
			width: `${pct}%`,
			background: "linear-gradient(90deg, var(--signal), #22d3ee)",
			boxShadow: "0 0 8px 1px rgba(2,132,199,0.5)"
		}
	});
}
function SiteNav() {
	const { theme } = useTheme();
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const href = theme === "dark" ? "/logo-light.png" : "/logo-dark.png";
		let link = document.querySelector("link[rel~='icon']");
		if (!link) {
			link = document.createElement("link");
			link.rel = "icon";
			document.head.appendChild(link);
		}
		link.type = "image/png";
		link.href = href;
	}, [theme]);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `sticky top-0 z-50 transition-all ${scrolled ? "backdrop-blur-xl bg-background/85 border-b border-hairline shadow-sm" : "bg-transparent"}`,
		style: { position: "sticky" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollProgress, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "group flex items-center gap-3 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: theme === "dark" ? "/logo-dark.png" : "/logo-light.png",
							alt: "techvrs shield logo",
							className: "shrink-0 transition-all group-hover:scale-110",
							style: {
								width: 48,
								height: 48,
								objectFit: "contain"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display font-bold text-sm tracking-tight",
								children: "techvrs"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono text-[9px] uppercase tracking-widest text-muted-foreground",
								children: "secure by design"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden md:flex items-center gap-1",
						children: nav.slice(1).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							activeOptions: { exact: item.to === "/" },
							className: "nav-pill-hover mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all relative",
							activeProps: {
								className: "!text-signal nav-pill-hover mono text-[11px] uppercase tracking-widest relative",
								style: { background: "rgba(2,132,199,0.08)" }
							},
							children: item.label
						}, item.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden lg:flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPulse, { compact: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 md:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "mono text-[11px] uppercase tracking-widest text-foreground border border-hairline px-3 py-2 hover:border-signal/60 transition-colors",
							onClick: () => setOpen((v) => !v),
							"aria-label": "Toggle menu",
							children: open ? "Close" : "Menu"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden md:flex lg:hidden items-center gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})
					})
				]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:hidden border-t border-hairline backdrop-blur-xl",
				style: { background: "rgba(240,246,255,0.96)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6 py-5 flex flex-col gap-1",
					children: [nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						onClick: () => setOpen(false),
						className: "mono text-[12px] uppercase tracking-widest py-3 border-b border-hairline/50 text-muted-foreground hover:text-signal transition-colors flex items-center justify-between",
						activeProps: { className: "!text-signal" },
						activeOptions: { exact: item.to === "/" },
						children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "opacity-40",
							children: "→"
						})]
					}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPulse, { compact: true })
					})]
				})
			})
		]
	});
}
function SiteFooter() {
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	const { theme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-hairline mt-32 relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none",
				style: {
					background: "radial-gradient(ellipse, rgba(2,132,199,0.06) 0%, transparent 70%)",
					filter: "blur(40px)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2 flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "group flex items-center gap-3 w-fit",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: theme === "dark" ? "/logo-dark.png" : "/logo-light.png",
									alt: "techvrs shield logo",
									width: 34,
									height: 34,
									className: "shrink-0 transition-all group-hover:scale-110 drop-shadow-sm",
									style: { objectFit: "contain" }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display font-bold text-base",
									children: "techvrs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground max-w-sm leading-relaxed",
								children: "SOC analyst and security-first engineer. Detection, hardened deployments, technical SEO, and secure AI automation — built to last under attack."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPulse, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "mono text-[10px] uppercase tracking-widest border border-signal/50 text-signal px-4 py-2.5 hover:bg-signal hover:text-signal-foreground transition-colors inline-flex items-center gap-2 w-fit mt-2",
								children: "Open a channel →"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4 pb-2 border-b border-hairline",
						children: "Sitemap"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2.5 text-sm",
						children: nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: n.to,
							className: "text-muted-foreground hover:text-signal transition-colors flex items-center gap-2 group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "opacity-0 group-hover:opacity-100 transition-opacity text-signal text-xs",
								children: "›"
							}), n.label]
						}) }, n.to))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4 pb-2 border-b border-hairline",
							children: "Channels"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-2.5 text-sm",
							children: [
								{
									label: "Email",
									href: "mailto:hello@techvrs.com"
								},
								{
									label: "LinkedIn",
									href: "https://linkedin.com"
								},
								{
									label: "GitHub",
									href: "https://github.com"
								},
								{
									label: "Medium",
									href: "https://medium.com/@mdtareksec"
								}
							].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: l.href,
								target: l.href.startsWith("http") ? "_blank" : void 0,
								rel: "noreferrer",
								className: "text-muted-foreground hover:text-signal transition-colors flex items-center gap-2 group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "opacity-0 group-hover:opacity-100 transition-opacity text-signal text-xs",
									children: "↗"
								}), l.label]
							}) }, l.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3",
								children: "Certified"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: [
									"Security+",
									"CySA+",
									"THM Top 1%",
									"AWS CCP"
								].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono text-[9px] uppercase tracking-widest px-2 py-1 border border-hairline text-muted-foreground",
									style: { background: "rgba(2,132,199,0.05)" },
									children: c
								}, c))
							})]
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-hairline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6 py-4 mono text-[10px] uppercase tracking-widest text-muted-foreground flex flex-wrap justify-between gap-2 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"© ",
						year,
						" techvrs.com —",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-signal",
							children: "Secure by Design."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "live-dot",
								"aria-hidden": true,
								style: {
									width: 6,
									height: 6
								}
							}), "System: Operational"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "v1.0.0" })]
					})]
				})
			})
		]
	});
}
function SectionLabel({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mono text-[11px] uppercase tracking-[0.25em] text-signal mb-4 flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-signal/60" }), children]
	});
}
function Panel({ children, className = "", as: Tag = "div" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tag, {
		className: `panel brackets hover-lift p-6 ${className}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
			children
		]
	});
}
//#endregion
export { StatusPulse as a, SiteNav as i, SectionLabel as n, ThemeProvider as o, SiteFooter as r, Panel as t };
