# Views Middleware for Pinecone Router

[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/pinecone-router/middleware-views?color=%2337C8AB&label=version&sort=semver)](https://github.com/pinecone-router/middleware-views/tree/3.0.2)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/pinecone-router-middleware-views?color=37C8AB)](https://bundlephobia.com/result?p=pinecone-router-middleware-views@3.0.2)
[![Downloads from Jsdelivr NPM](https://img.shields.io/jsdelivr/npm/hm/pinecone-router-middleware-views?color=%2337C8AB&&logo=npm)](https://www.jsdelivr.com/package/npm/pinecone-router-middleware-views)
[![npm](https://img.shields.io/npm/dm/pinecone-router-middleware-views?color=37C8AB&label=npm&logo=npm&logoColor=37C8AB)](https://npmjs.com/package/pinecone-router-middleware-views)
[![Changelog](https://img.shields.io/badge/change-log-%2337C8AB)](/CHANGELOG.md)

A views middleware for [Pinecone Router](https://github.com/pinecone-router/router).

## About

Allows you to set the path for an HTML file (or multiple) and it'll be fetched and displayed inside the specified elements (`#app` by default).

## Installation

### CDN

Include the following `<script>` tag in the `<head>` of your document, **before Pinecone Router**:

```html
<script src="https://cdn.jsdelivr.net/npm/pinecone-router-middleware-views@3.x.x/dist/views.min.js"></script>
```

or:

```javascript
import 'https://cdn.jsdelivr.net/npm/pinecone-router-middleware-views@3.x.x/dist/views.min.js'
```

### NPM

```
npm install pinecone-router-middleware-views
```

```javascript
// load this middleware
import 'pinecone-router-middleware-views'
// load pinecone router
import PineconeRouter from 'pinecone-router'
// then load alpine.js
import Alpine from 'alpinejs'
// add the router as a plugin
Alpine.plugin(PineconeRouter)
// start alpine
Alpine.start()
```

> **Important**: This must be added **before** loading Pinecone Router.

## Usage

[**Demo**](https://pinecone-example-views.vercel.app)

Add `x-view` to the routes with the value being the path to file.

That's it!

**example:**

```html
<div x-data>
	<template x-route="/" x-view="/home.html"></template>
	<template x-route="/hello/:name" x-view="/hello.html"></template>
	<template x-route="notfound" x-view="/404.html"></template>
</div>

<div id="app" x-data>
	<!--this will be replaced by the content of the views.-->
</div>
```

**hello.html**:

```html
<div>hello, <span x-text="$router.params.name"></span></div>
```

**Notes:**

-   You can use both views and handlers in the same route, handlers always run first.
-   Set the [`viewSelector` option in settings](https://github.com/pinecone-router/router#settings) to change where views will be shown by default. ([can be overwritten on a per-route basis](###multiple-views-per-route))
-   `window.PineconeRouter.settings.viewsSelector = '#app'`
-   View are simply html files, can be text files too.
-   When you [_redirect_](https://github.com/pinecone-router/router#redirecting) from a handler the view wont be displayed.

### View composition

You can have **multiple views per route**, and set the target for them individually:

`index.html`

```html
<template
	x-route="/login"
	x-view="['/authWrapper.html', {path:'/login.html', selector: '#content'}]"
></template>
```

`authWrapper.html`:

```html
<div>
	<h1>Authenticate</h1>
	<div id="content"></div>
</div>
```

`login.html`:

```html
<div>
	<h2>Login</h2>
	...
</div>
```

In the example above:

-   `/authWrapper.html` will be shown in the default target which is `#app` or [whatever is default in the settings](https://github.com/pinecone-router/router#settings) using the `viewSelector` property.
-   `/login.html` will be shown inside the element with the selector `#content` which is inside `/authWrapper.html`

> You can have more than 2 views just make sure to keep in mind that they're fetched and shown *in order*.

> View Compositon feature was suggested [@klausklapper](https://github.com/klausklapper)

## Events:

This middleware dispatch these events:

| name               | recipient                               | when is it dispatched       |
| ------------------ | --------------------------------------- | --------------------------- |
| **pinecone-start** | window                                  | when the page start loading |
| **pinecone-end**   | window                                  | when the page loading ends  |
| **fetch-error**    | #app or whatever is default in settings | when the fetch fail         |

The first two events can be used to show a loading bar or indicator

### Loading bar Example:

Using [nProgress](http://ricostacruz.com/nprogress):

```html
<script src="https://unpkg.com/nprogress@0.2.0/nprogress.js"></script>
<link rel="stylesheet" href="https://unpkg.com/nprogress@0.2.0/nprogress.css" />
```

```js
window.addEventListener('pinecone-start', () => nProgress.start())
window.addEventListener('pinecone-end', () => nProgress.done())
```

## Supported versions

| Version | Pinecone Router Versions |
| ------- | ------------------------ |
| 3.x.x   | ^3.x.x                   |
| 2.x.x   | 2.x.x                    |
| 1.x.x   | ^1.0.0                   |

## Contributing:

Please refer to [CONTRIBUTING.md](/CONTRIBUTING.md)

## Versioning

This projects follow the [Semantic Versioning](https://semver.org/) guidelines.

## License

Copyright (c) 2022 Rafik El Hadi Houari

Licensed under the MIT license, see [LICENSE.md](LICENSE.md) for details.
