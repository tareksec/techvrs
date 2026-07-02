import { n as __toESM } from "../_runtime.mjs";
import { i as require_react, n as QueryClientProvider, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SiteNav, o as ThemeProvider, r as SiteFooter } from "./site-chrome-B7XV1pVJ.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-B7Xmca5T.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-D9Cl0_Bl.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center px-6 py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-lg text-center panel brackets p-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mono text-[11px] uppercase tracking-widest text-critical mb-4",
					children: "ERR_404 // ACCESS DENIED"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-6xl font-display font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted-foreground mono",
					children: "The resource you requested is not indexed on this perimeter."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "mono text-[11px] uppercase tracking-widest inline-flex items-center gap-2 border border-signal/60 text-signal px-5 py-3 hover:bg-signal hover:text-signal-foreground transition-colors",
						children: "← Return to base"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center panel brackets p-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-tr" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "b-bl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mono text-[11px] uppercase tracking-widest text-critical mb-4",
					children: "ERR // UNCAUGHT_EXCEPTION"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-display font-semibold text-foreground",
					children: "This page did not load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Retry the request or return to base."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "mono text-[11px] uppercase tracking-widest border border-signal/60 text-signal px-4 py-2 hover:bg-signal hover:text-signal-foreground transition-colors",
						children: "Retry"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "mono text-[11px] uppercase tracking-widest border border-hairline px-4 py-2 hover:border-foreground/40 transition-colors",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "techvrs — SOC Analyst & Security-First Engineer" },
			{
				name: "description",
				content: "Secure by Design. Threat detection, hardened deployments, technical SEO, and secure AI agent development by a SOC analyst."
			},
			{
				name: "author",
				content: "techvrs"
			},
			{
				name: "theme-color",
				content: "#0D1117"
			},
			{
				property: "og:title",
				content: "techvrs — SOC Analyst & Security-First Engineer"
			},
			{
				property: "og:description",
				content: "SOC analyst portfolio and freelance security studio. Detection, secure web deployment, technical SEO, and secure AI agents."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "techvrs — SOC Analyst & Security-First Engineer"
			},
			{
				name: "twitter:description",
				content: "SOC analyst portfolio and freelance security studio. Detection, secure web deployment, technical SEO, and secure AI agents."
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fira+Code:wght@400;500;600&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "light",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-screen flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
			]
		}) })
	});
}
var $$splitComponentImporter$5 = () => import("./work-Cm8qeHiT.mjs");
var Route$6 = createFileRoute("/work")({
	head: () => ({ meta: [
		{ title: "Work — techvrs | Field Reports & Case Studies" },
		{
			name: "description",
			content: "Detection engineering, secure deployments, technical SEO, and AI agent case studies — documented like incident reports."
		},
		{
			property: "og:title",
			content: "Work — techvrs"
		},
		{
			property: "og:description",
			content: "Field reports across SOC, secure web, SEO, and AI agent engagements."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var Route$5 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async ({ request }) => {
	const baseUrl = new URL(request.url).origin;
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/about",
				changefreq: "monthly",
				priority: "0.8"
			},
			{
				path: "/services",
				changefreq: "monthly",
				priority: "0.9"
			},
			{
				path: "/work",
				changefreq: "weekly",
				priority: "0.9"
			},
			{
				path: "/blog",
				changefreq: "weekly",
				priority: "0.7"
			},
			{
				path: "/contact",
				changefreq: "monthly",
				priority: "0.7"
			}
		].map((e) => [
			`  <url>`,
			`    <loc>${baseUrl}${e.path}</loc>`,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$4 = () => import("./services-BAdMYMQ-.mjs");
var Route$4 = createFileRoute("/services")({
	head: () => ({ meta: [
		{ title: "Services — techvrs | Security, Deployment, SEO, AI" },
		{
			name: "description",
			content: "Four disciplines, one security-first standard: SOC & cyber security, secure web deployment, technical SEO, and secure AI agent development."
		},
		{
			property: "og:title",
			content: "Services — techvrs"
		},
		{
			property: "og:description",
			content: "SOC monitoring, hardened deployments, technical SEO audits, and secure custom AI agent development."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./contact-DqAZetUi.mjs");
var Route$3 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact — techvrs | Open a Secure Channel" },
		{
			name: "description",
			content: "For hiring managers and prospective clients: reach out for SOC analyst roles, security engagements, or custom AI agent work."
		},
		{
			property: "og:title",
			content: "Contact — techvrs"
		},
		{
			property: "og:description",
			content: "Open a secure channel for roles, engagements, or automation projects."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./blog-DC0Uc8RV.mjs");
var Route$2 = createFileRoute("/blog")({
	head: () => ({ meta: [
		{ title: "Field Notes — techvrs Blog" },
		{
			name: "description",
			content: "Detection walkthroughs, hardening notes, and lessons from building secure systems. Published on Medium, mirrored here."
		},
		{
			property: "og:title",
			content: "Field Notes — techvrs Blog"
		},
		{
			property: "og:description",
			content: "Notes from the console — detection, hardening, and secure automation write-ups."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./about-D97laCnk.mjs");
var Route$1 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About — techvrs | SOC Analyst & Security-First Engineer" },
		{
			name: "description",
			content: "Operator profile: how a SOC analyst mindset shapes every deployment, audit, and AI agent I build."
		},
		{
			property: "og:title",
			content: "About — techvrs"
		},
		{
			property: "og:description",
			content: "Operator profile: SOC-first thinking applied to detection, hardened infrastructure, and secure automation."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./routes-C4zjd9AQ.mjs");
var Route = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var WorkRoute = Route$6.update({
	id: "/work",
	path: "/work",
	getParentRoute: () => Route$7
});
var SitemapDotxmlRoute = Route$5.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$7
});
var ServicesRoute = Route$4.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => Route$7
});
var ContactRoute = Route$3.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$7
});
var BlogRoute = Route$2.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => Route$7
});
var AboutRoute = Route$1.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$7
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	AboutRoute,
	BlogRoute,
	ContactRoute,
	ServicesRoute,
	SitemapDotxmlRoute,
	WorkRoute
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
