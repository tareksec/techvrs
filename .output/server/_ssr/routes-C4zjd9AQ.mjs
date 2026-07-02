import { n as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as StatusPulse, n as SectionLabel, t as Panel } from "./site-chrome-B7XV1pVJ.mjs";
import { a as testimonials, i as skills, n as certs, o as toolRoles, r as services, t as caseStudies } from "./site-data-CuJE2VtR.mjs";
import { a as IconSearch, c as IconSignal, i as IconRadar, l as IconTrophy, n as IconCloud, o as IconSecureGlobe, r as IconEye, s as IconShieldLock, t as IconAISecure } from "./icons-DoyZ-jHK.mjs";
import { i as IllustrationWebDeploy, n as IllustrationSEO, r as IllustrationSOC, t as IllustrationAI } from "./service-illustrations-BAk_b43-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C4zjd9AQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COLORS = [
	"rgba(45, 212, 255, 0.90)",
	"rgba(56, 189, 248, 0.80)",
	"rgba(125, 211, 252, 0.70)",
	"rgba(186, 230, 253, 0.60)",
	"rgba(203, 213, 225, 0.50)",
	"rgba(148, 163, 184, 0.45)",
	"rgba(0, 217, 255, 0.95)"
];
function makeParticle(width, height) {
	const r = Math.random() * 2.5 + .5;
	return {
		x: Math.random() * width,
		y: Math.random() * height,
		vx: (Math.random() - .5) * 1.2,
		vy: (Math.random() - .5) * 1.2,
		r,
		baseR: r,
		color: COLORS[Math.floor(Math.random() * COLORS.length)],
		ox: 0,
		oy: 0
	};
}
function ParticleBackground({ className = "" }) {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let width = 0;
		let height = 0;
		let dpr = Math.min(window.devicePixelRatio || 1, 2);
		let particles = [];
		let raf = 0;
		const mouse = {
			x: -9999,
			y: -9999,
			active: false
		};
		const REPULSION_RADIUS = 180;
		const REPULSION_STRENGTH = 18;
		const FRICTION = .88;
		const DRIFT_NOISE = .08;
		const CONNECTION_DIST = 100;
		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			width = rect.width;
			height = rect.height;
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			const target = Math.min(500, Math.floor(width * height / 3200));
			particles = new Array(target).fill(0).map(() => makeParticle(width, height));
		};
		const onMove = (e) => {
			const rect = canvas.getBoundingClientRect();
			mouse.x = e.clientX - rect.left;
			mouse.y = e.clientY - rect.top;
			mouse.active = true;
		};
		const onLeave = () => {
			mouse.active = false;
			mouse.x = -9999;
			mouse.y = -9999;
		};
		const step = () => {
			ctx.clearRect(0, 0, width, height);
			for (let i = 0; i < particles.length; i++) {
				const p = particles[i];
				if (mouse.active) {
					const dx = p.x - mouse.x;
					const dy = p.y - mouse.y;
					const dist2 = dx * dx + dy * dy;
					const R = REPULSION_RADIUS;
					if (dist2 < R * R && dist2 > .01) {
						const dist = Math.sqrt(dist2);
						const force = (R - dist) / R * REPULSION_STRENGTH;
						p.vx += dx / dist * force;
						p.vy += dy / dist * force;
					}
				}
				p.vx *= FRICTION;
				p.vy *= FRICTION;
				p.vx += (Math.random() - .5) * DRIFT_NOISE;
				p.vy += (Math.random() - .5) * DRIFT_NOISE;
				const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
				const maxSpeed = 14;
				if (speed > maxSpeed) {
					p.vx = p.vx / speed * maxSpeed;
					p.vy = p.vy / speed * maxSpeed;
				}
				p.x += p.vx;
				p.y += p.vy;
				if (p.x < -10) p.x = width + 10;
				if (p.x > width + 10) p.x = -10;
				if (p.y < -10) p.y = height + 10;
				if (p.y > height + 10) p.y = -10;
				for (let j = i + 1; j < particles.length; j++) {
					const q = particles[j];
					const ddx = p.x - q.x;
					const ddy = p.y - q.y;
					const d2 = ddx * ddx + ddy * ddy;
					if (d2 < CONNECTION_DIST * CONNECTION_DIST) {
						const alpha = (1 - Math.sqrt(d2) / CONNECTION_DIST) * .18;
						ctx.strokeStyle = `rgba(45, 212, 255, ${alpha})`;
						ctx.lineWidth = .6;
						ctx.beginPath();
						ctx.moveTo(p.x, p.y);
						ctx.lineTo(q.x, q.y);
						ctx.stroke();
					}
				}
				ctx.fillStyle = p.color;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fill();
			}
			raf = requestAnimationFrame(step);
		};
		resize();
		step();
		window.addEventListener("resize", resize);
		window.addEventListener("mousemove", onMove);
		window.addEventListener("mouseleave", onLeave);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("mouseleave", onLeave);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		"aria-hidden": true,
		className: `pointer-events-none ${className}`
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsBar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutSnapshot, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServicesOverview, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedWork, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Certifications, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillsMatrix, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogPreview, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureHighlights, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden min-h-[92vh] flex items-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleBackground, { className: "absolute inset-0 h-full w-full z-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-grid opacity-30 z-[1]",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-scanlines opacity-40 z-[1]",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -top-40 -right-40 h-[700px] w-[700px] bg-signal/15 blur-[140px] z-[1]",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -bottom-40 -left-40 h-[500px] w-[500px] bg-signal/08 blur-[120px] z-[1]",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-1/2 left-1/3 h-[300px] w-[300px] bg-primary/08 blur-[100px] z-[1]",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-28 md:pt-24 md:pb-32 w-full grid lg:grid-cols-[1fr_auto] gap-16 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mono text-[11px] uppercase tracking-[0.35em] text-signal mb-6 reveal flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pulse-dot" }), "SOC ANALYST // SECURITY-FIRST ENGINEER"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "reveal font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] max-w-3xl",
						children: [
							"Secure by Design.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-signal",
								children: "Built to Withstand"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"What Others Miss."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "reveal mt-7 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed",
						children: "Practical threat detection, hardened infrastructure, and intelligent automation — engineered with the same discipline used to defend production environments. I don't just build systems; I build systems that hold under pressure."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "reveal mt-9 flex flex-wrap gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/work",
							className: "group mono text-[11px] uppercase tracking-widest inline-flex items-center gap-3 bg-signal text-signal-foreground px-6 py-4 font-semibold hover:shadow-[0_0_40px_-2px_rgba(0,217,255,0.6)] transition-shadow",
							children: ["View my SOC portfolio", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "transition-transform group-hover:translate-x-1",
								children: "→"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "group mono text-[11px] uppercase tracking-widest inline-flex items-center gap-3 border border-signal/60 text-signal px-6 py-4 hover:bg-signal/10 hover:shadow-[0_0_28px_-4px_rgba(0,217,255,0.45)] transition-all",
							children: ["Hire me for a project", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "transition-transform group-hover:translate-x-1",
								children: "→"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/services",
						className: "reveal mt-5 inline-flex items-center gap-2 mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-signal transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "live-dot",
							"aria-hidden": true
						}), "Free resource — Secure Web Deployment Checklist →"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "reveal mt-10 border-t border-hairline pt-5 flex flex-wrap items-center gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPulse, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hidden sm:block w-px h-4 bg-hairline" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-4",
								children: certs.slice(0, 2).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono text-[10px] uppercase tracking-widest text-muted-foreground border border-hairline px-2 py-1",
									children: c
								}, c))
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden lg:block reveal shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-[460px] h-[460px] float-y",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-[-50px] bg-signal/18 blur-[110px] rounded-full",
								"aria-hidden": true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-[-25px] bg-primary/10 blur-[70px] rounded-full",
								"aria-hidden": true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/hero-bg.png",
								alt: "3D security engineer on cloud with shield",
								className: "relative z-10 w-full h-full object-contain drop-shadow-[0_8px_70px_rgba(0,160,255,0.45)]",
								loading: "eager"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-8 -left-6 z-20 mono text-[9px] uppercase tracking-widest text-signal bg-background/85 backdrop-blur-sm border border-signal/35 px-3 py-2 shadow-xl",
								children: "◉ NODE.01 — ONLINE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute bottom-12 -right-6 z-20 mono text-[9px] uppercase tracking-widest text-signal/90 bg-background/85 backdrop-blur-sm border border-signal/35 px-3 py-2 shadow-xl",
								children: "INTEGRITY: 100%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-1/2 -right-10 z-20 mono text-[8px] uppercase tracking-widest text-amber bg-background/85 backdrop-blur-sm border border-amber/35 px-2 py-1.5",
								children: "MONITORING: ACTIVE"
							})
						]
					})
				})]
			})
		]
	});
}
function StatsBar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-y border-hairline bg-panel/60 backdrop-blur-sm relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 aurora-bg opacity-60",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mx-auto max-w-7xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8",
			children: [
				{
					value: "60+",
					label: "Detection Rules Authored"
				},
				{
					value: "42",
					label: "MITRE Techniques Mapped"
				},
				{
					value: "92%",
					label: "Vulns Closed on Re-Scan"
				},
				{
					value: "22m",
					label: "Mean Time to Contain"
				}
			].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center group",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-4xl md:text-5xl font-bold text-signal leading-none mb-2 count-glow",
					style: { animationDelay: `${i * .6}s` },
					children: s.value
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mono text-[10px] uppercase tracking-widest text-muted-foreground",
					children: s.label
				})]
			}, s.label))
		})]
	});
}
function TrustBar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "bg-background/40 overflow-hidden py-6 border-b border-hairline",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mono text-[10px] uppercase tracking-widest text-muted-foreground text-center mb-5",
			children: "TRUSTED TOOLING & FRAMEWORKS"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-10 px-8 flex-wrap justify-center",
			children: [
				"Splunk",
				"MITRE ATT&CK",
				"AWS",
				"Cloudflare",
				"Wazuh",
				"NIST CSF",
				"OWASP",
				"Python",
				"Terraform",
				"Linux"
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mono text-xs uppercase tracking-widest text-foreground/60 hover:text-signal transition-colors cursor-default whitespace-nowrap",
				children: i
			}, i))
		})]
	});
}
var ABOUT_HIGHLIGHTS = [
	{
		Icon: IconRadar,
		label: "Threat Detection",
		desc: "SIEM, IDS/IPS, log correlation & triage in production-grade lab environments."
	},
	{
		Icon: IconShieldLock,
		label: "Hardened Infrastructure",
		desc: "Zero-trust architectures, TLS 1.3 enforcement, DDoS mitigation at the edge."
	},
	{
		Icon: IconAISecure,
		label: "Secure AI Automation",
		desc: "Custom agents built privacy-first — scoped access, field-level redaction, audit logs."
	}
];
function AboutSnapshot() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "cf-section mx-auto max-w-7xl px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-2 gap-16 items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "ABOUT" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-4xl md:text-5xl font-display font-bold leading-tight mb-6",
					children: [
						"Security isn't a feature.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-signal",
							children: "It's the architecture."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-lg leading-relaxed mb-4",
					children: "I'm a SOC analyst and security-first engineer who builds detection environments, hardens production infrastructure, and designs AI agents that don't leak. Every system I ship is evaluated through an attacker's lens before it reaches a client."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground leading-relaxed mb-8",
					children: "My work spans threat monitoring, secure deployments, technical SEO audits, and custom automation — unified by one standard: if it can be exploited, it hasn't shipped yet."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/about",
					className: "group mono text-[11px] uppercase tracking-widest inline-flex items-center gap-3 border border-signal/60 text-signal px-5 py-3 hover:bg-signal/10 transition-all",
					children: "Full background →"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5",
				children: ABOUT_HIGHLIGHTS.map(({ Icon, label, desc }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel brackets p-5 flex gap-5 items-start hover-lift",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "shrink-0 text-signal mt-0.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 36 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display font-semibold text-base mb-1",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground leading-relaxed",
							children: desc
						})] })
					]
				}, label))
			})]
		})
	});
}
function GearCluster() {
	const cyan = "#0891b2";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "140",
		height: "140",
		viewBox: "0 0 140 140",
		fill: "none",
		"aria-hidden": true,
		style: { filter: `drop-shadow(0 8px 22px ${cyan}55) drop-shadow(0 0 10px ${cyan}66)` },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			style: {
				transformOrigin: "52px 60px",
				animation: "float-y 7s ease-in-out infinite"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				style: {
					transformOrigin: "52px 60px",
					animation: "gear-spin 14s linear infinite"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M52 30l4.5 1 3-3.5 4 2.4-1 4.4 3.2 3.2 4.4-1 2.4 4-3.5 3 1 4.5-1 4.5 3.5 3-2.4 4-4.4-1-3.2 3.2 1 4.4-4 2.4-3-3.5-4.5 1-4.5-1-3 3.5-4-2.4 1-4.4-3.2-3.2-4.4 1-2.4-4 3.5-3-1-4.5 1-4.5-3.5-3 2.4-4 4.4 1 3.2-3.2-1-4.4 4-2.4 3 3.5z",
						fill: "none",
						stroke: cyan,
						strokeWidth: "2.5",
						strokeLinejoin: "round"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "52",
						cy: "60",
						r: "12",
						fill: "none",
						stroke: cyan,
						strokeWidth: "2.5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "52",
						cy: "60",
						r: "4",
						fill: cyan
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			style: {
				transformOrigin: "100px 96px",
				animation: "float-y 5.5s ease-in-out infinite"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				style: {
					transformOrigin: "100px 96px",
					animation: "gear-spin-rev 9s linear infinite"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M100 78l3 .8 2-2.4 2.8 1.7-.7 3 2.2 2.2 3-.7 1.7 2.8-2.4 2 .8 3-.8 3 2.4 2-1.7 2.8-3-.7-2.2 2.2.7 3-2.8 1.7-2-2.4-3 .8-3-.8-2 2.4-2.8-1.7.7-3-2.2-2.2-3 .7-1.7-2.8 2.4-2-.8-3 .8-3-2.4-2 1.7-2.8 3 .7 2.2-2.2-.7-3 2.8-1.7 2 2.4z",
						fill: "none",
						stroke: cyan,
						strokeWidth: "2.2",
						strokeLinejoin: "round"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "100",
						cy: "96",
						r: "8",
						fill: "none",
						stroke: cyan,
						strokeWidth: "2.2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "100",
						cy: "96",
						r: "3",
						fill: cyan
					})
				]
			})
		})]
	});
}
function CyberShield() {
	const red = "#ef4444";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "96",
		height: "112",
		viewBox: "0 0 96 112",
		fill: "none",
		"aria-hidden": true,
		style: {
			filter: `drop-shadow(0 10px 24px ${red}55) drop-shadow(0 0 12px ${red}77)`,
			animation: "float-y 6s ease-in-out infinite"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "shieldFill",
				x1: "0",
				y1: "0",
				x2: "0",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "rgba(239,68,68,0.28)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "rgba(239,68,68,0.06)"
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M48 6l34 13v24c0 26-15 44-34 57C29 87 14 69 14 43V19L48 6z",
				fill: "url(#shieldFill)",
				stroke: red,
				strokeWidth: "3",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "36",
				y: "50",
				width: "24",
				height: "20",
				rx: "3",
				fill: "none",
				stroke: red,
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M40 50v-6a8 8 0 0 1 16 0v6",
				fill: "none",
				stroke: red,
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "48",
				cy: "58",
				r: "3",
				fill: red
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "46.5",
				y: "58",
				width: "3",
				height: "7",
				fill: red
			})
		]
	});
}
var SVC_THEMES = [
	{
		cardBg: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)",
		accent: "#0891b2",
		ink: "#0f172a",
		body: "#475569",
		bullet: "#334155",
		gridColor: "rgba(0,168,204,0.08)",
		Illustration: IllustrationSOC,
		SmallIcon: IconEye,
		floatEl: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GearCluster, {}),
		floatPos: {
			top: "6%",
			right: "-2%"
		},
		chipLabel: "MONITORING: ACTIVE"
	},
	{
		cardBg: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)",
		accent: "#0284c7",
		ink: "#022347",
		body: "#475569",
		bullet: "#334155",
		gridColor: "rgba(2,132,199,0.08)",
		Illustration: IllustrationWebDeploy,
		SmallIcon: IconSecureGlobe,
		floatEl: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CyberShield, {}),
		floatPos: {
			bottom: "4%",
			right: "2%"
		},
		chipLabel: "INTEGRITY: 100%"
	},
	{
		cardBg: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)",
		accent: "#0891b2",
		ink: "#0f172a",
		body: "#475569",
		bullet: "#334155",
		gridColor: "rgba(0,168,204,0.08)",
		Illustration: IllustrationSEO,
		SmallIcon: IconSignal
	},
	{
		cardBg: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)",
		accent: "#0284c7",
		ink: "#022347",
		body: "#475569",
		bullet: "#334155",
		gridColor: "rgba(2,132,199,0.08)",
		Illustration: IllustrationAI,
		SmallIcon: IconAISecure
	}
];
function ServicesOverview() {
	const [visible, setVisible] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const cardRefs = (0, import_react.useRef)([]);
	(0, import_react.useEffect)(() => {
		const observers = [];
		cardRefs.current.forEach((el, i) => {
			if (!el) return;
			const obs = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) setVisible((prev) => /* @__PURE__ */ new Set([...prev, i]));
			}, { threshold: .18 });
			obs.observe(el);
			observers.push(obs);
		});
		return () => observers.forEach((o) => o.disconnect());
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-t",
		style: {
			background: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)",
			borderColor: "rgba(0,168,204,0.12)",
			position: "relative",
			overflow: "hidden"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "aurora-bg-light",
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					backgroundImage: "linear-gradient(to right, rgba(2,132,199,0.06) 1px, transparent 1px),linear-gradient(to bottom, rgba(2,132,199,0.06) 1px, transparent 1px)",
					backgroundSize: "48px 48px",
					maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, #000 0%, transparent 80%)",
					WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, #000 0%, transparent 80%)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					backgroundImage: "radial-gradient(circle at 18% 25%, rgba(0,168,204,0.16) 0, transparent 2px),radial-gradient(circle at 72% 38%, rgba(0,168,204,0.14) 0, transparent 2px),radial-gradient(circle at 42% 78%, rgba(0,168,204,0.12) 0, transparent 2px),linear-gradient(115deg, transparent 49.6%, rgba(0,168,204,0.05) 49.6%, rgba(0,168,204,0.05) 50.4%, transparent 50.4%)",
					backgroundSize: "320px 320px, 280px 280px, 360px 360px, 200px 200px",
					opacity: .7
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				style: {
					position: "absolute",
					top: 0,
					left: "25%",
					width: 600,
					height: 500,
					background: "radial-gradient(circle, rgba(0,168,204,0.08) 0%, transparent 70%)",
					filter: "blur(60px)",
					pointerEvents: "none"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 pb-16 relative",
				style: { paddingTop: "var(--cf-section-gap-lg)" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-3 mb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-8 h-px bg-signal opacity-70" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono text-[11px] uppercase tracking-[0.3em] text-signal",
								children: "CAPABILITIES"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-8 h-px bg-signal opacity-70" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-4xl md:text-5xl lg:text-6xl font-display font-bold",
						style: { color: "#0f172a" },
						children: [
							"Four Disciplines.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: "#0891b2" },
								children: "One Security-First Standard."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg leading-relaxed max-w-2xl",
						style: { color: "#475569" },
						children: "Every engagement is held to the same principle: nothing ships until it's been evaluated the way an attacker would evaluate it. Scroll through to see how."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { position: "relative" },
				children: services.map((svc, i) => {
					const ct = SVC_THEMES[i];
					const { Illustration, SmallIcon } = ct;
					const isVis = visible.has(i);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { height: i === services.length - 1 ? "auto" : "78vh" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: (el) => {
								cardRefs.current[i] = el;
							},
							style: {
								position: "sticky",
								top: "12vh",
								zIndex: 10 + i,
								padding: "0 clamp(1rem, 3vw, 1.5rem)",
								maxWidth: "88rem",
								margin: "0 auto"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "cap-card shimmer-on-hover",
								style: {
									background: ct.cardBg,
									borderRadius: 24,
									boxShadow: `
                    0 1px 2px rgba(2,32,71,0.04),
                    0 8px 24px rgba(2,132,199,0.08),
                    0 32px 64px -24px rgba(2,132,199,0.15),
                    0 0 0 1px rgba(0,168,204,0.10)
                  `,
									overflow: "hidden",
									minHeight: 480,
									position: "relative",
									transition: "box-shadow 0.4s ease, transform 0.4s ease"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"aria-hidden": true,
										style: {
											position: "absolute",
											inset: 0,
											backgroundImage: `linear-gradient(to right,${ct.gridColor} 1px,transparent 1px),linear-gradient(to bottom,${ct.gridColor} 1px,transparent 1px)`,
											backgroundSize: "44px 44px",
											borderRadius: 24,
											pointerEvents: "none"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"aria-hidden": true,
										style: {
											position: "absolute",
											top: 0,
											left: 0,
											width: "50%",
											height: "40%",
											background: `radial-gradient(ellipse 80% 60% at 0% 0%,${ct.accent}12,transparent)`,
											pointerEvents: "none",
											borderRadius: "24px 0 0 0"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"aria-hidden": true,
										style: {
											position: "absolute",
											inset: 0,
											background: `radial-gradient(ellipse 55% 70% at 72% 50%,${ct.accent}14,transparent)`,
											pointerEvents: "none",
											borderRadius: 24
										}
									}),
									isVis && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"aria-hidden": true,
										style: {
											position: "absolute",
											inset: 0,
											overflow: "hidden",
											pointerEvents: "none",
											zIndex: 30,
											borderRadius: 24
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
											position: "absolute",
											top: 0,
											bottom: 0,
											width: 280,
											background: `linear-gradient(to right,transparent,${ct.accent}22,transparent)`,
											animation: "scan-h 0.9s cubic-bezier(0.4,0,0.6,1) both"
										} })
									}, `scan-${i}`),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "cap-card-ill cap-ill-wrap",
										style: {
											position: "relative",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											padding: "clamp(1rem,3vw,2rem)",
											borderRight: "1px solid rgba(0,168,204,0.10)",
											overflow: "hidden",
											minHeight: 320
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"aria-hidden": true,
												style: {
													position: "absolute",
													top: "50%",
													left: "50%",
													transform: "translate(-50%,-50%)",
													width: "70%",
													height: "66%",
													background: `radial-gradient(ellipse at center, ${ct.accent}14 0%, transparent 70%)`,
													filter: "blur(36px)",
													pointerEvents: "none"
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													position: "relative",
													zIndex: 1,
													width: "100%",
													maxWidth: 380,
													animation: isVis ? "iso-rise 0.9s cubic-bezier(0.16,1,0.3,1) both" : "none",
													opacity: isVis ? void 0 : 0
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													style: {
														position: "relative",
														borderRadius: 16,
														border: "1px solid rgba(0, 168, 204, 0.3)",
														background: "linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(240,249,255,0.35) 100%)",
														backdropFilter: "blur(10px)",
														WebkitBackdropFilter: "blur(10px)",
														boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6), 0 12px 30px -10px ${ct.accent}30`,
														padding: "1.75rem 1.25rem 1.25rem",
														overflow: "visible"
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
															color: ct.accent,
															background: "rgba(255,255,255,0.92)",
															border: `1px solid ${ct.accent}55`,
															borderRadius: 999,
															padding: "0.28rem 0.8rem",
															boxShadow: `0 2px 10px -2px ${ct.accent}55, 0 0 0 3px rgba(255,255,255,0.6)`,
															zIndex: 4
														},
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
															width: 6,
															height: 6,
															borderRadius: "50%",
															background: ct.accent,
															boxShadow: `0 0 6px ${ct.accent}, 0 0 12px ${ct.accent}`,
															display: "inline-block"
														} }), "SYS // ACTIVE"]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Illustration, {
														className: "w-full h-auto relative",
														style: {
															display: "block",
															maxHeight: 260,
															position: "relative",
															zIndex: 1,
															filter: "drop-shadow(0px 20px 30px rgba(0, 168, 204, 0.15))"
														}
													})]
												}), ct.floatEl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													"aria-hidden": true,
													style: {
														position: "absolute",
														zIndex: 3,
														pointerEvents: "none",
														...ct.floatPos
													},
													children: ct.floatEl
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"aria-hidden": true,
												style: {
													position: "absolute",
													bottom: "1rem",
													left: "1.25rem",
													fontFamily: "var(--font-display)",
													fontSize: "clamp(3.5rem,9vw,7rem)",
													fontWeight: 800,
													color: "rgba(2,35,71,0.06)",
													lineHeight: 1,
													pointerEvents: "none",
													userSelect: "none",
													zIndex: 0,
													animation: isVis ? "num-pop 1s cubic-bezier(0.16,1,0.3,1) both" : "none",
													opacity: isVis ? void 0 : 0
												},
												children: svc.index
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													position: "absolute",
													top: "1.25rem",
													right: "1.25rem",
													zIndex: 4,
													fontFamily: "var(--font-mono)",
													fontSize: "0.55rem",
													letterSpacing: "0.14em",
													textTransform: "uppercase",
													whiteSpace: "nowrap",
													color: ct.accent,
													background: "rgba(255,255,255,0.9)",
													backdropFilter: "blur(12px)",
													border: `1px solid ${ct.accent}45`,
													borderRadius: 999,
													padding: "0.3rem 0.75rem",
													display: "flex",
													alignItems: "center",
													gap: "0.5rem",
													boxShadow: `0 4px 12px -3px ${ct.accent}35`
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "pulse-dot",
													style: {
														width: 5,
														height: 5,
														background: ct.accent
													}
												}), ct.chipLabel ?? "SYS // ACTIVE"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"aria-hidden": true,
												style: {
													position: "absolute",
													top: 12,
													left: 12,
													width: 16,
													height: 16,
													borderTop: `1px solid ${ct.accent}55`,
													borderLeft: `1px solid ${ct.accent}55`
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"aria-hidden": true,
												style: {
													position: "absolute",
													bottom: 12,
													right: 12,
													width: 16,
													height: 16,
													borderBottom: `1px solid ${ct.accent}55`,
													borderRight: `1px solid ${ct.accent}55`
												}
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											gap: "1.2rem",
											padding: "clamp(2rem,4vw,3.5rem)",
											animation: isVis ? "svc-enter-next 0.65s 0.06s cubic-bezier(0.16,1,0.3,1) both" : "none",
											opacity: isVis ? void 0 : 0
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "inline-flex",
													alignItems: "center",
													gap: "0.5rem",
													border: `1px solid ${ct.accent}66`,
													color: ct.accent,
													background: "rgba(255,255,255,0.7)",
													padding: "0.35rem 0.9rem",
													borderRadius: 999,
													fontSize: "0.6rem",
													fontFamily: "var(--font-mono)",
													letterSpacing: "0.18em",
													textTransform: "uppercase",
													width: "fit-content",
													boxShadow: `0 2px 8px -3px ${ct.accent}30`,
													animation: isVis ? "tagline-in 0.55s 0.12s cubic-bezier(0.16,1,0.3,1) both" : "none"
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
														width: 6,
														height: 6,
														borderRadius: "50%",
														background: ct.accent,
														boxShadow: `0 0 8px ${ct.accent}`,
														display: "inline-block"
													} }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmallIcon, { size: 13 }),
													svc.tagline
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												style: {
													fontFamily: "var(--font-display)",
													fontSize: "clamp(1.6rem,3.2vw,2.6rem)",
													fontWeight: 800,
													lineHeight: 1.1,
													color: ct.ink,
													letterSpacing: "-0.02em",
													margin: 0,
													animation: isVis ? "clip-reveal-x 0.6s 0.18s cubic-bezier(0.16,1,0.3,1) both" : "none"
												},
												children: svc.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												style: {
													color: ct.body,
													lineHeight: 1.75,
													fontSize: "0.92rem",
													maxWidth: "40ch",
													margin: 0,
													animation: isVis ? "svc-enter 0.55s 0.24s cubic-bezier(0.16,1,0.3,1) both" : "none"
												},
												children: svc.description
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												style: {
													display: "flex",
													flexDirection: "column",
													gap: "0.65rem",
													listStyle: "none",
													margin: 0,
													padding: 0
												},
												children: svc.bullets.map((b, bi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													style: {
														display: "flex",
														alignItems: "flex-start",
														gap: "0.75rem",
														fontSize: "0.85rem",
														animation: isVis ? `bullet-in 0.45s ${.3 + bi * .1}s cubic-bezier(0.16,1,0.3,1) both` : "none",
														opacity: isVis ? void 0 : 0
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"aria-hidden": true,
														style: {
															color: ct.accent,
															fontWeight: 700,
															lineHeight: 1.4,
															flexShrink: 0,
															fontFamily: "var(--font-mono)"
														},
														children: "—"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														style: { color: ct.bullet },
														children: b
													})]
												}, b))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													alignItems: "center",
													gap: "1.25rem",
													paddingTop: "1rem",
													marginTop: "0.25rem",
													borderTop: "1px solid rgba(2,35,71,0.10)",
													animation: isVis ? `svc-enter 0.5s 0.52s cubic-bezier(0.16,1,0.3,1) both` : "none"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													to: "/services",
													style: {
														display: "inline-flex",
														alignItems: "center",
														gap: "0.5rem",
														color: ct.accent,
														fontFamily: "var(--font-mono)",
														fontSize: "0.65rem",
														letterSpacing: "0.18em",
														textTransform: "uppercase",
														textDecoration: "none",
														fontWeight: 600,
														border: `1px solid ${ct.accent}55`,
														padding: "0.55rem 1rem"
													},
													children: ["Full service details", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													style: {
														fontFamily: "var(--font-mono)",
														fontSize: "0.58rem",
														color: "rgba(2,35,71,0.35)",
														letterSpacing: "0.1em"
													},
													children: [svc.index, " / 04"]
												})]
											})
										]
									})
								]
							})
						})
					}, svc.slug);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { height: "5rem" },
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "cf-section mx-auto max-w-7xl px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessBar, {})
			})
		]
	});
}
function ProcessBar() {
	const steps = [
		{
			label: "ASSESS",
			caption: "Map the full risk surface."
		},
		{
			label: "ARCHITECT",
			caption: "Design with security as structure."
		},
		{
			label: "IMPLEMENT",
			caption: "Build, harden, document, ship."
		},
		{
			label: "MONITOR",
			caption: "Verify it holds under real load."
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel brackets p-6 md:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mono text-[10px] uppercase tracking-widest text-muted-foreground mb-8",
				children: "ENGAGEMENT PROCESS // 04 PHASES"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-8 md:grid-cols-4 relative",
				children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mono text-[10px] text-signal border border-signal/50 w-7 h-7 flex items-center justify-center shrink-0 font-bold",
								children: String(i + 1).padStart(2, "0")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mono text-sm font-semibold text-foreground tracking-widest",
								children: s.label
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground pl-10 leading-relaxed",
							children: s.caption
						}),
						i < steps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden md:block absolute top-3.5 left-full w-full h-px bg-signal/20 -translate-x-8" })
					]
				}, s.label))
			})
		]
	});
}
var CATEGORY_COLORS = {
	SOC: "text-signal border-signal/40",
	Web: "text-amber border-amber/40",
	SEO: "text-green-400 border-green-400/40",
	"AI Agents": "text-violet-400 border-violet-400/40"
};
function FeaturedWork() {
	const featured = caseStudies.slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "cf-section mx-auto max-w-7xl px-6 border-t border-hairline",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-6 mb-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "FIELD WORK" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-4xl md:text-5xl font-display font-bold",
					children: "Proof, not promises."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground max-w-xl",
					children: "Real engagements with documented outcomes — built in the lab or shipped for clients."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/work",
				className: "mono text-[11px] uppercase tracking-widest text-signal hover:underline underline-offset-4 whitespace-nowrap",
				children: [
					"All ",
					caseStudies.length,
					" case studies →"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-3",
			children: featured.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "flex flex-col gap-4",
				children: [
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
						className: "text-lg font-display font-semibold leading-snug",
						children: c.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground line-clamp-3 leading-relaxed",
						children: c.outcome
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5 mt-1",
						children: c.stack.slice(0, 3).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono text-[9px] px-2 py-0.5 border border-hairline text-foreground/60",
							children: t
						}, t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-auto pt-4 border-t border-hairline grid grid-cols-3 gap-3",
						children: c.metrics.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mono text-signal text-lg font-bold leading-none mb-1",
							children: m.value
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mono text-[8px] uppercase tracking-widest text-muted-foreground leading-tight",
							children: m.label
						})] }, m.label))
					})
				]
			}, c.slug))
		})]
	});
}
var CERT_DETAILS = {
	"CompTIA Security+": {
		Icon: IconShieldLock,
		issuer: "CompTIA",
		borderColor: "border-signal/50",
		iconColor: "text-signal"
	},
	"CompTIA CySA+": {
		Icon: IconSearch,
		issuer: "CompTIA",
		borderColor: "border-amber/50",
		iconColor: "text-amber"
	},
	"TryHackMe — Top 1%": {
		Icon: IconTrophy,
		issuer: "TryHackMe",
		borderColor: "border-green-400/50",
		iconColor: "text-green-400"
	},
	"AWS Cloud Practitioner": {
		Icon: IconCloud,
		issuer: "Amazon Web Services",
		borderColor: "border-orange-400/50",
		iconColor: "text-orange-400"
	}
};
function Certifications() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-hairline bg-panel/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "cf-section-md mx-auto max-w-7xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "CREDENTIALS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-3xl md:text-4xl font-display font-bold",
					children: ["Verified. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-signal",
						children: "Tested. Earned."
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
				children: certs.map((cert) => {
					const detail = CERT_DETAILS[cert] ?? {
						Icon: IconShieldLock,
						issuer: "Certified",
						borderColor: "border-signal/40",
						iconColor: "text-signal"
					};
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `panel brackets p-6 flex flex-col items-center text-center gap-4 hover-lift border-2 ${detail.borderColor}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: detail.iconColor,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(detail.Icon, { size: 44 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `mono text-[10px] uppercase tracking-widest ${detail.iconColor}`,
								children: detail.issuer
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display font-semibold text-sm leading-tight",
								children: cert
							})
						]
					}, cert);
				})
			})]
		})
	});
}
function SkillsMatrix() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "cf-section mx-auto max-w-7xl px-6 border-t border-hairline",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-3xl mb-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "STACK MATRIX" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-4xl md:text-5xl font-display font-bold",
					children: ["Working set: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-signal",
						children: "tools of the trade."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground",
					children: "Every tool here has been deployed in a real engagement or lab environment — hover any tool to see exactly where it fits in my workflow."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
			children: Object.entries(skills).map(([group, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel brackets p-5 flex flex-col gap-4",
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
							tabIndex: 0,
							"data-tip": toolRoles[s] ?? "Deployed in real engagements and lab environments.",
							className: "tip mono text-[11px] px-2 py-1 border border-hairline text-foreground/80 hover:border-signal/60 hover:text-signal transition-colors cursor-default",
							children: s
						}, s))
					})
				]
			}, group))
		})]
	});
}
var BLOG_POSTS = [
	{
		tag: "Threat Detection",
		title: "Building a Home SOC Lab That Actually Detects Things",
		summary: "How I set up a fully operational detection environment using open-source SIEM tooling, generated realistic attack traffic, and documented every alert like a real analyst.",
		date: "2026-06-15",
		readTime: "8 min"
	},
	{
		tag: "Secure Deployment",
		title: "TLS 1.3, HSTS Preloading, and Why Most Configs Are Still Wrong",
		summary: "A walkthrough of the TLS configuration mistakes I see in production—and the hardened Nginx setup I use for every client engagement.",
		date: "2026-05-28",
		readTime: "6 min"
	},
	{
		tag: "AI Security",
		title: "The OWASP LLM Top 10: What It Means for Developers Building Agents",
		summary: "Prompt injection, data leakage, over-permissive access—here's how I design AI agents that don't become attack vectors.",
		date: "2026-05-10",
		readTime: "10 min"
	}
];
function BlogPreview() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-hairline bg-panel/10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "cf-section mx-auto max-w-7xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-6 mb-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "FIELD NOTES" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-4xl md:text-5xl font-display font-bold",
						children: "Notes from the console."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground max-w-xl",
						children: "Security write-ups, deployment breakdowns, and detection engineering deep-dives."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/blog",
					className: "mono text-[11px] uppercase tracking-widest text-signal hover:underline underline-offset-4 whitespace-nowrap",
					children: "All transmissions →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-3",
				children: BLOG_POSTS.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "flex flex-col gap-4 group cursor-pointer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono text-[10px] uppercase tracking-widest text-signal border border-signal/40 px-2 py-1",
								children: post.tag
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono text-[10px] text-muted-foreground",
								children: post.readTime
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-display font-semibold leading-snug group-hover:text-signal transition-colors",
							children: post.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1",
							children: post.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto pt-4 border-t border-hairline flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono text-[10px] text-muted-foreground",
								children: post.date
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/blog",
								className: "mono text-[10px] uppercase tracking-widest text-signal hover:underline underline-offset-2",
								children: "Read →"
							})]
						})
					]
				}, post.title))
			})]
		})
	});
}
function CtaBand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-7xl px-6",
		style: {
			paddingTop: "var(--cf-section-gap-lg)",
			paddingBottom: "var(--cf-section-gap-lg)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel brackets p-10 md:p-16 lg:p-20 relative overflow-hidden scan-sweep",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-grid opacity-15",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -top-20 -right-20 h-[300px] w-[300px] bg-signal/10 blur-[80px]",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mono text-[11px] uppercase tracking-widest text-signal mb-4",
								children: "OPEN CHANNEL // ACCEPTING ENGAGEMENTS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight",
								children: [
									"Start a conversation.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-signal",
										children: "I'll respond with next steps,"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"not a sales pitch."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-muted-foreground leading-relaxed",
								children: "Whether you need a threat assessment, a hardened deployment, or a custom AI workflow — let's scope it properly before committing to anything."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4 shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "cf-pill mono text-[11px] uppercase tracking-widest inline-flex items-center justify-center gap-3 bg-signal text-signal-foreground px-8 py-5 font-semibold hover:shadow-[0_0_50px_-5px_var(--signal)] transition-all whitespace-nowrap",
								children: "Send a transmission →"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/services",
								className: "cf-pill mono text-[11px] uppercase tracking-widest inline-flex items-center justify-center gap-3 border border-hairline text-muted-foreground px-8 py-4 hover:border-signal/60 hover:text-signal transition-all whitespace-nowrap",
								children: "View all services →"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/contact",
								className: "mono text-[10px] uppercase tracking-widest inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-signal transition-colors whitespace-nowrap",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "live-dot",
									"aria-hidden": true
								}), "Free technical SEO audit — request one →"]
							})
						]
					})]
				})
			]
		})
	});
}
var FEATURE_CARDS = [
	{
		theme: "fc-purple",
		badge: "AI-Powered",
		title: "Custom AI Agents That Don't Leak",
		body: "Scoped access, field-level redaction, and full audit trails — every agent ships with security as its first constraint, not an afterthought.",
		stat: "Zero-leak",
		statLabel: "ARCHITECTURE"
	},
	{
		theme: "fc-amber",
		badge: "Detection",
		title: "60+ Custom Detection Rules in Production",
		body: "SIEM rules mapped to MITRE ATT&CK, tuned to eliminate false positives and catch real threats in noisy production environments.",
		stat: "92%",
		statLabel: "CLOSED ON RE-SCAN"
	},
	{
		theme: "fc-cyan",
		badge: "Infrastructure",
		title: "Hardened From Edge to Origin",
		body: "TLS 1.3, HSTS preloading, DDoS mitigation, and zero-trust architecture — every layer evaluated the way an attacker would.",
		stat: "A+",
		statLabel: "SECURITY GRADE"
	}
];
function FeatureHighlights() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-6 border-t border-hairline",
		style: {
			paddingTop: "var(--cf-section-gap-lg)",
			paddingBottom: "var(--cf-section-gap-md)"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl mb-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "WHY WORK WITH ME" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-4xl md:text-5xl font-display font-bold",
					children: ["Results that ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-signal",
						children: "compound."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground text-lg leading-relaxed",
					children: "Not just deliverables — lasting improvements to your security posture, performance, and automation."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-3",
			children: FEATURE_CARDS.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `feature-card ${card.theme}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "fc-badge inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest px-3 py-1 mb-5",
						style: {
							background: "rgba(255,255,255,0.2)",
							color: "inherit"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
							width: 6,
							height: 6,
							borderRadius: "50%",
							background: "currentColor",
							display: "inline-block"
						} }), card.badge]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl md:text-2xl font-bold leading-snug mb-3",
						children: card.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							opacity: .85,
							lineHeight: 1.7,
							fontSize: "0.92rem"
						},
						className: "mb-6",
						children: card.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							borderTop: "1px solid rgba(255,255,255,0.2)",
							paddingTop: "1rem",
							marginTop: "auto"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-3xl font-bold leading-none mb-1",
							children: card.stat
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mono text-[9px] uppercase tracking-widest",
							style: { opacity: .7 },
							children: card.statLabel
						})]
					})
				]
			}, card.title))
		})]
	});
}
function Testimonials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-hairline bg-panel/10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "cf-section mx-auto max-w-7xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl mb-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "VERIFIED SIGNAL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-4xl md:text-5xl font-display font-bold",
					children: ["What clients report ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-signal",
						children: "after the re-scan."
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: testimonials.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "flex flex-col gap-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mono text-[10px] uppercase tracking-widest text-signal border border-signal/40 px-2 py-1 inline-flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "live-dot",
									"aria-hidden": true
								}), "VERIFIED ENGAGEMENT"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mono text-signal text-xl font-bold leading-none",
									children: t.metric
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mono text-[8px] uppercase tracking-widest text-muted-foreground mt-1",
									children: t.metricLabel
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-base leading-relaxed text-foreground/90",
							children: [
								"“",
								t.quote,
								"”"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto pt-4 border-t border-hairline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display font-semibold text-sm",
								children: t.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1",
								children: t.role
							})]
						})
					]
				}, t.name))
			})]
		})
	});
}
//#endregion
export { Home as component };
