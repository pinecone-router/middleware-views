import { renderContent } from './utils.js';

const PineconeRouterMiddleware = {
	/**
	 * @property {string} version the version of Pinecone Router this middleware is made for.
	 */
	version: '0.0.3',

	/**
	 * @property {string} name the name of the middleware.
	 */
	name: 'views',

	/**
	 * @type {object}
	 * @summary it hold the views of each route.
	 * the route being the index and value is its view.
	 */
	views: {},

	/**
	 * @property {object} settings the middleware settings.
	 */
	settings: {
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
	 * @param {object} component the router's alpine component.
	 */
	init(_component, settings) {
		if (settings?.middlewares?.render) {
			throw new Error(
				`Pinecone Router ${this.name}: Cannot use views middleware along with render.`
			);
		}

		//load settings
		this.settings = {
			...this.settings,
			...(settings?.middlewares?.[this.name] ?? {}),
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
	 * @param {Element} el the route's <template> element
	 * @param {object} _component the router's alpine component
	 * @param {string} path the route's path
	 */
	onBeforeRouteProcessed(el, _component, path) {
		if (this.settings.enable) {
			// TODO: try to set the view using `href` attribute
			// to see if Vite detects it and transform the url on build
			if (el.hasAttribute('x-view') == false) {
				throw new Error(
					`Pinecone Router ${this.name}: route must have an x-view attribute when using x-views.`
				);
			}
			let view = el.getAttribute('x-view');
			if (this.settings.basePath != '/') {
				view = this.settings.basePath + view;
			}

			if (path == 'notfound') {
				this.settings.notfound = view;
			} else {
				this.views[path] = view;
			}
		}
	},

	/**
	 * Will be called after the handlers are executed and done.
	 * during navigation inside PineconeRouter.navigate().
	 * @param {object} route the matched route, undefined if not found.
	 * @param {string} _path the path visited by the client
	 * @param {boolean} _firstload first page load and not link navigation request
	 * @returns {boolean} false to make the navigate function exit (make sure to send the loadEnd event); none to continue execution.
	 */
	onHandlersExecuted(route, _path, _firstload) {
		if (this.settings.enable) {
			let view = !route
				? this.settings.notfound
				: this.views[route.path];

			if (view == null) return;
			fetch(view)
				.then((response) => {
					return response.text();
				})
				.then((response) => {
					renderContent(response, this.settings.selector);
					window.dispatchEvent(this.loadEnd);
					return false;
				})
				.catch((error) => {
					document
						.querySelector('[x-router][x-data]')
						.dispatchEvent(
							new CustomEvent('fetch-error', { detail: error })
						);
					console.error(
						`Pinecone Router ${this.name}: Fetch Error: ${error}`
					);
				});
		}
	},

	onBeforeHandlersExecuted(_route, _path, _firstLoad) {
		window.dispatchEvent(this.loadStart);
	},
};

if (window.PineconeRouterMiddlewares == null)
	window.PineconeRouterMiddlewares = [PineconeRouterMiddleware];
else window.PineconeRouterMiddlewares.push(PineconeRouterMiddleware);
