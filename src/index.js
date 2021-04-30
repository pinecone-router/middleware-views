import { renderContent } from './utils.js';

const PineconeRouterMiddleware = {
	/**
	 * @property {string} version the version of Pinecone Router this middleware is made for.
	 */
	version: '0.1.0',

	/**
	 * @property {string} name the name of the middleware.
	 */
	name: 'x-views',

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
		enabled: false,
		basepath: '/',
		selector: '#content',
		/**
		 * @type {string}
		 * @summary the 404 view
		 */
		notfound: null,
	},

	/**
	 * This will be called at router initialization.
	 * used for detecting router settings.
	 * @param {object} component the router's alpine component.
	 */
	init(component) {
		if (this.version !== window.PineconeRouter.version) {
			throw new Error(
				`Pinecone Router ${this.name}: This middleware was built for Pinecone Router v${this.version}, found v${window.PineconeRouter.version}`
			);
		}

		if (
			window.PineconeRouterMiddlewares.find(
				(m) => m.name == 'x-render'
			) != null
		) {
			throw new Error(
				`Pinecone Router ${this.name}: Cannot use x-views along with x-render.`
			);
		}

		// views rendering, unlike page rendering
		// they wont be loaded automatically using path
		// instead the user decide the view using x-view for each route
		if (component.$el.hasAttribute('x-views')) {
			this.settings.enabled = true;
			// check if the selector was set, else default to 'body'
			let selector = component.$el.getAttribute('x-views');
			if (selector == 'body') {
				throw new Error(
					`Pinecone Router ${this.name}: Do not use body as the selector, it will cause the router component to be removed`
				);
			} else if (selector != '') {
				this.settings.selector = selector;
			}

			// this will disable notfound handling in favor of 404 view
			// this can be ovewritten if needed by making a notfound route with a handler
			window.PineconeRouter.notfound = null;
			window.PineconeRouter.settings.allowNoHandler = true;
		}
	},

	/**
	 * Called for each route during initalization,
	 * before the route is processed & added.
	 * @param {Element} el the route's <template> element
	 * @param {object} _component the router's alpine component
	 * @param {string} path the route's path
	 */
	onBeforeRouteProcessed(el, _component, path) {
		if (this.settings.enabled) {
			// TODO: try to set the view using `href` attribute
			// to see if Vite detects it and transform the url on build
			if (el.hasAttribute('x-view') == false) {
				throw new Error(
					`Pinecone Router ${this.name}: route must have an x-view attribute when using x-views.`
				);
			}
			let view = el.getAttribute('x-view');
			if (this.settings.basepath != '/') {
				view = this.settings.basepath + view;
			}

			if (path == 'notfound') {
				this.settings.notfound = view;
			} else {
				this.views[path] = view;
			}
		}
	},

	/**
	 * This will be called during PineconeRouter.interceptLinks() function
	 * after the link is checked as a valid navigation link.
	 * @param {Element} _el the anchor element
	 */
	onLinkIntercepted(_el) {},

	/**
	 * Will be called after the handlers are executed and done.
	 * during navigation inside PineconeRouter.navigate().
	 * @param {object} route the matched route, null if not found.
	 * @param {string} _path the path visited by the client
	 * @param {boolean} _firstload first page load and not link navigation request
	 * @param {boolean} notfound set to true if the route wasnt found
	 * @returns {boolean} false to make the navigate function exit (make sure to send the loadend event); none to continute execution.
	 */
	onHandlersExecuted(route, _path, _firstload, notfound) {
		if (this.settings.enabled) {
			let view = notfound
				? this.settings.notfound
				: this.views[route.path];

			if (view == null) return;
			fetch(view)
				.then((response) => {
					return response.text();
				})
				.then((response) => {
					renderContent(response, this.settings.selector);
					window.PineconeRouter.interceptLinks();
					window.dispatchEvent(window.PineconeRouter.loadend);
					return false;
				});
		}
	},
};

if (window.PineconeRouterMiddlewares == null)
	window.PineconeRouterMiddlewares = [PineconeRouterMiddleware];
else window.PineconeRouterMiddlewares.push(PineconeRouterMiddleware);
