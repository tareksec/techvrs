globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/3.png": {
		"type": "image/png",
		"etag": "\"1d853-CE+KWjTYcKo2/wM2IGSW6L33t9U\"",
		"mtime": "2026-07-02T16:44:14.659Z",
		"size": 120915,
		"path": "../public/3.png"
	},
	"/2.png": {
		"type": "image/png",
		"etag": "\"22920-P0mASBMWQYgIT4pkyL3tSnNcOgQ\"",
		"mtime": "2026-07-02T16:44:14.658Z",
		"size": 141600,
		"path": "../public/2.png"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"3aee-6jt1rl6V/CGWMRd01a3kFa+byek\"",
		"mtime": "2026-07-02T16:44:14.659Z",
		"size": 15086,
		"path": "../public/favicon.ico"
	},
	"/1.png": {
		"type": "image/png",
		"etag": "\"27d8c-2ZlRemAP86xpxOaKLo3KQchqP8Q\"",
		"mtime": "2026-07-02T16:44:14.658Z",
		"size": 163212,
		"path": "../public/1.png"
	},
	"/4.png": {
		"type": "image/png",
		"etag": "\"2926d-QY5PXfpDX2S5yi9AL0I0EvBmN0M\"",
		"mtime": "2026-07-02T16:44:14.659Z",
		"size": 168557,
		"path": "../public/4.png"
	},
	"/hero-bg.png": {
		"type": "image/png",
		"etag": "\"2f723-IyXaiRGoBHHXn/0zZZS0eajOUD4\"",
		"mtime": "2026-07-02T16:44:14.659Z",
		"size": 194339,
		"path": "../public/hero-bg.png"
	},
	"/hero-cutout.png": {
		"type": "image/png",
		"etag": "\"2f723-IyXaiRGoBHHXn/0zZZS0eajOUD4\"",
		"mtime": "2026-07-02T16:44:14.659Z",
		"size": 194339,
		"path": "../public/hero-cutout.png"
	},
	"/logo-light.png": {
		"type": "image/png",
		"etag": "\"d0c3-7+5cVYPeGlvdA91qSXW/zoRLkSs\"",
		"mtime": "2026-07-02T16:44:14.659Z",
		"size": 53443,
		"path": "../public/logo-light.png"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"1e7a2-NtnW8t5gZ22DEKsnhGAosI79sj4\"",
		"mtime": "2026-07-02T16:44:14.659Z",
		"size": 124834,
		"path": "../public/favicon.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4\"",
		"mtime": "2026-07-02T16:44:14.659Z",
		"size": 23,
		"path": "../public/robots.txt"
	},
	"/logo-dark.png": {
		"type": "image/png",
		"etag": "\"a718-P7PCCkUVqHKZKorvNxZ1ABtJ3m0\"",
		"mtime": "2026-07-02T16:44:14.659Z",
		"size": 42776,
		"path": "../public/logo-dark.png"
	},
	"/assets/blog-DP8rHGdR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4178-UQs4YRt0BmYH/tk8wcWTUcKFsZA\"",
		"mtime": "2026-07-02T16:44:13.828Z",
		"size": 16760,
		"path": "../public/assets/blog-DP8rHGdR.js"
	},
	"/assets/contact-dhPX6kWS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2144-H96lLvqmukDhFy8nD8DpSM6A57w\"",
		"mtime": "2026-07-02T16:44:13.828Z",
		"size": 8516,
		"path": "../public/assets/contact-dhPX6kWS.js"
	},
	"/assets/index-DEzookI3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57b4c-yJOunujhzyGMSSYbKoYjmumMLSk\"",
		"mtime": "2026-07-02T16:44:13.821Z",
		"size": 359244,
		"path": "../public/assets/index-DEzookI3.js"
	},
	"/assets/icons-DTyASbwG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"255f-+d3Yahs6YKbS5vJ8DLkuiJqi6E4\"",
		"mtime": "2026-07-02T16:44:13.828Z",
		"size": 9567,
		"path": "../public/assets/icons-DTyASbwG.js"
	},
	"/assets/services-J4PaN8DK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"39cb-U+7ia2ikOJejZ/MAeQ+1/gN5yOY\"",
		"mtime": "2026-07-02T16:44:13.828Z",
		"size": 14795,
		"path": "../public/assets/services-J4PaN8DK.js"
	},
	"/assets/site-data-DsCv98k-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e38-w38v5Oct0vhSDR4iScz6PI5K33c\"",
		"mtime": "2026-07-02T16:44:13.828Z",
		"size": 15928,
		"path": "../public/assets/site-data-DsCv98k-.js"
	},
	"/assets/styles-D9Cl0_Bl.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1a8a4-W2BK3CdWlroz1rFynjJTkxCz0Vw\"",
		"mtime": "2026-07-02T16:44:13.828Z",
		"size": 108708,
		"path": "../public/assets/styles-D9Cl0_Bl.css"
	},
	"/assets/work-g5Gjumsg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a2f-8URQFYHf8btu6DQc2sVadrddSK4\"",
		"mtime": "2026-07-02T16:44:13.828Z",
		"size": 6703,
		"path": "../public/assets/work-g5Gjumsg.js"
	},
	"/assets/about-Dnw7v_eH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20e2-+IO5Dpg2UkV2ToA0Y16E3kywBXY\"",
		"mtime": "2026-07-02T16:44:13.828Z",
		"size": 8418,
		"path": "../public/assets/about-Dnw7v_eH.js"
	},
	"/assets/routes-5jyF4suO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a077-pJSGuUXDHzwZP/aplyLvp+CTBOg\"",
		"mtime": "2026-07-02T16:44:13.828Z",
		"size": 41079,
		"path": "../public/assets/routes-5jyF4suO.js"
	},
	"/assets/service-illustrations-R1_vZIK5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"585-3KxNCjV4nqX/rU7djZI5vrknsvE\"",
		"mtime": "2026-07-02T16:44:13.828Z",
		"size": 1413,
		"path": "../public/assets/service-illustrations-R1_vZIK5.js"
	},
	"/logo.png": {
		"type": "image/png",
		"etag": "\"496c0-BED+h7B36BAglhrxIAg0fl+MH1o\"",
		"mtime": "2026-07-02T16:44:14.659Z",
		"size": 300736,
		"path": "../public/logo.png"
	},
	"/soc-checklist.png": {
		"type": "image/png",
		"etag": "\"2baef-2UUAEHURvjYioFF3zOvYvp8K0uI\"",
		"mtime": "2026-07-02T16:44:14.660Z",
		"size": 178927,
		"path": "../public/soc-checklist.png"
	},
	"/hero-main.png": {
		"type": "image/png",
		"etag": "\"1c1fe4-3IUz9tZ3f6ELO199+5Pl7dXD39c\"",
		"mtime": "2026-07-02T16:44:14.659Z",
		"size": 1843172,
		"path": "../public/hero-main.png"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_JShPQo = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_JShPQo
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
