import { renderContent } from './utils'

const PineconeRouterMiddleware = {
    /**
     * @property {string} version the version of this middleware.
     */
    version: '2.0.1',
    /**
     * @property {string} name the name of the middleware.
     */
    name: 'views',
    /**
     * Called for each route during initialization,
     * after the route is processed & added.
     * @param {Element} el the route's <template> element
     * @param {string} path the route's path
     */
    onAfterRouteProcessed(el, path) {
        if (!el.hasAttribute('x-view')) return
        let view = el.getAttribute('x-view')
        if (path == 'notfound') {
            window.PineconeRouter.notfound.view = view
            return
        }
        // add handlers to the route
        let i = window.PineconeRouter.routes.findIndex((r) => r.path == path)
        window.PineconeRouter.routes[i].view = view
    },
    /**
     * Will be called before the handlers are executed and done.
     * during navigation (PineconeRouter.navigate()).
     * @param {object} route the matched route, undefined if not found.
     * @param {string} path the path visited by the client
     * @param {boolean} firstload first page load and not link navigation request
     * @returns {string|null} 'stop' to make the navigate function exit (make sure to send the loadend event); none to continute execution.
     */
    onBeforeHandlersExecuted(route, path, firstload) {
        window.dispatchEvent(window.PineconeRouter.loadStart)
    },

    /**
     * Will be called after the handlers are executed and done.
     * during navigation (PineconeRouter.navigate()).
     * @param {object} route the matched route, undefined if not found.
     * @param {string} path the path visited by the client
     * @param {boolean} firstload first page load and not link navigation request
     * @returns {string|null} 'stop' to make the navigate function exit (make sure to send the loadend event); none to continute execution.
     */
    onHandlersExecuted(route, path, firstload) {
        let view: string = !route
            ? window.PineconeRouter.notfound.view
            : route.view
                ? route.view
                : ''
        if (!view) {
            window.dispatchEvent(window.PineconeRouter.loadEnd)
            return
        }
        if (window.PineconeRouter.viewCache[view]) {
            renderContent(window.PineconeRouter.viewCache[view])
            window.dispatchEvent(window.PineconeRouter.loadEnd)
        }
        fetch(view)
            .then((response) => {
                return response.text()
            })
            .then((response) => {
                renderContent(response)
                window.PineconeRouter.viewCache[view] = response
                window.dispatchEvent(window.PineconeRouter.loadEnd)
                return false
            })
            .catch((error) => {
                document
                    .querySelector(
                        window.PineconeRouter.settings.viewSelector ?? '#app'
                    )!
                    .dispatchEvent(
                        new CustomEvent('fetch-error', { detail: error })
                    )
                console.error(`Pinecone Router: Fetch Error: ${error}`)
            })
    },
}

if (window.PineconeRouterMiddlewares == null)
    window.PineconeRouterMiddlewares = [PineconeRouterMiddleware]
else window.PineconeRouterMiddlewares.push(PineconeRouterMiddleware)
