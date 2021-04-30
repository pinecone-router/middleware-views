const PineconeRouterMiddleware = {
	/**
	 * @property {string} version the version of this middleware.
	 */
	version: '0.0.0',
	/**
	 * @property {string} name the name of the middleware.
	 */
	name: 'x-middleware',
	/**
	 * @property {object} settings the middleware settings.
	 */
	settings: {},

	/**
	 * This will be called at router initialization.
	 * used for detecting router settings.
	 * @param {object} component the router's alpine component.
	 */
	init(component) {},

	/**
	 * Called for each route during initalization,
	 * before the route is processed & added.
	 * @param {Element} el the route's <template> element
	 * @param {object} component the router's alpine component
	 * @param {string} path the route's path
	 */
	onBeforeRouteProcessed(el, component, path) {},

	/**
	 * This will be called inside PineconeRouter.interceptLinks() function
	 * after the link is checked as a valid navigation link.
	 * @param {Element} el the anchor element
	 */
	onLinkIntercepted(el) {},

	/**
	 * Will be called before the handlers are executed.
	 * during navigation (PineconeRouter.navigate()).
	 * @param {object} route the matched route, null if not found.
	 * @param {string} path the path visited by the client
	 * @param {boolean} firstload first page load and not link navigation request
	 * @param {boolean} notfound set to true if the route wasnt found
	 * @returns {boolean} false to make the navigate function exit (make sure to send the loadend event); none to continute execution.
	 */
	onBeforeHandlersExecuted(route, path, firstload, notfound) {},

	/**
	 * Will be called after the handlers are executed and done.
	 * during navigation (PineconeRouter.navigate()).
	 * @param {object} route the matched route, null if not found.
	 * @param {string} path the path visited by the client
	 * @param {boolean} firstload first page load and not link navigation request
	 * @param {boolean} notfound set to true if the route wasnt found
	 * @returns {boolean} false to make the navigate function exit (make sure to send the loadend event); none to continute execution.
	 */
	onHandlersExecuted(route, path, firstload, notfound) {},
};

if (window.PineconeRouterMiddlewares == null)
	window.PineconeRouterMiddlewares = [PineconeRouterMiddleware];
else window.PineconeRouterMiddlewares.push(PineconeRouterMiddleware);
