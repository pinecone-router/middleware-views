import type { Middleware } from 'pinecone-router';
import { renderContent } from './utils.js';

const PineconeRouterMiddleware: Middleware = {
	/**
	 * @property {string} version the version of Pinecone Router this middleware is made for.
	 */
	version: '1.0.0',

	/**
	 * @property {string} name the name of the middleware.
	 */
	name: 'views',

	/**
	 * @summary it hold the views of each route.
	 * the route being the index and value is its view.
	 */
	views: <{ [key: string]: string }>{},

	/**
	 * @property {{[key: string]: string}} settings the middleware settings.
	 */
	settings: <{ [key: string]: any }>{
		enable: false,
		basePath: '/',
		selector: '#app',
		/**
		 * @type {string}
		 * @summary the 404 view
		 */
		notfound: null,
	},

	/**
	 * @event pinecone-start
	 * @summary be dispatched to the window after before page start loading.
	 */
	loadStart: new Event('pinecone-start'),

	/**
	 * @event pinecone-end
	 * @summary will be dispatched to the window after the views are fetched
	 */
	loadEnd: new Event('pinecone-end'),

	/**
	 * This will be called at router initialization.
	 * used for detecting router settings.
	 */
	init(_component, settings) {
		if (settings.middlewares?.render) {
			throw new Error(
				`Pinecone Router ${this.name}: Cannot use views middleware along with render.`
			);
		}

		//load settings
		this.settings = {
			...this.settings,
			...(settings.middlewares[<any>this.name] ?? {}),
		};

		if (this.settings?.selector == 'body') {
			throw new Error(
				`Pinecone Router ${this.name}: Do not use body as the selector, it will cause the router component to be removed`
			);
		}

		window.PineconeRouter.settings.allowNoHandler = true;
	},

	/**
	 * Called for each route during initialization,
	 * before the route is processed & added.
	 */
	onBeforeRouteProcessed(el, _component, path) {
		if (this.settings!.enable) {
			// TODO: try to set the view using `href` attribute
			// to see if Vite detects it and transform the url on build
			if (el.hasAttribute('x-view') == false) {
				throw new Error(
					`Pinecone Router ${this.name}: route must have an x-view attribute when using x-views.`
				);
			}
			let view = el.getAttribute('x-view');
			if (this.settings!.basePath != '/') {
				view = this.settings!.basePath + view;
			}

			if (path == 'notfound') {
				this.settings!.notfound = view;
			} else {
				this.views[path] = view;
			}
		}
	},

	/**
	 * Will be called after the handlers are executed and done.
	 * during navigation inside PineconeRouter.navigate().
	 *
	 */
	onHandlersExecuted(route) {
		if (this.settings!.enable) {
			let view = !route ? this.settings!.notfound : this.views[route.path];
			if (view == null) return;
			fetch(view)
				.then((response) => {
					return response.text();
				})
				.then((response) => {
					renderContent(response, this.settings!.selector);
					window.dispatchEvent(this.loadEnd);
					return false;
				})
				.catch((error) => {
					document
						.querySelector('[x-router][x-data]')!
						.dispatchEvent(
							new CustomEvent('fetch-error', { detail: error })
						);
					console.error(
						`Pinecone Router ${this.name}: Fetch Error: ${error}`
					);
				});
		}
	},

	onBeforeHandlersExecuted(_route) {
		window.dispatchEvent(this.loadStart);
	},
};

if (window.PineconeRouterMiddlewares == null)
	window.PineconeRouterMiddlewares = [PineconeRouterMiddleware];
else window.PineconeRouterMiddlewares.push(PineconeRouterMiddleware);
