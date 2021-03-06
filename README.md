# Views Middleware for Pinecone Router

[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/pinecone-router/middleware-views?color=%2337C8AB&label=version&sort=semver)](https://github.com/pinecone-router/middleware-views/tree/1.2.0)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/pinecone-router-middleware-views?color=37C8AB)](https://bundlephobia.com/result?p=pinecone-router-middleware-views@1.2.0)
[![Downloads from Jsdelivr NPM](https://img.shields.io/jsdelivr/npm/hm/pinecone-router-middleware-views?color=%2337C8AB&&logo=npm)](https://www.jsdelivr.com/package/npm/pinecone-router-middleware-views)
[![npm](https://img.shields.io/npm/dm/pinecone-router-middleware-views?color=37C8AB&label=npm&logo=npm&logoColor=37C8AB)](https://npmjs.com/package/pinecone-router-middleware-views)
[![Changelog](https://img.shields.io/badge/change-log-%2337C8AB)](/CHANGELOG.md)

A views middleware for [Pinecone Router](https://github.com/pinecone-router/router).

## About

Views middleware for Pinecone Router.
Allows you to set the path for a view and it'll be fetched and displayed in the specified element.

## Installation

### CDN

Include the following `<script>` tag in the `<head>` of your document, before Pinecone Router:

```html
<script src="https://cdn.jsdelivr.net/npm/pinecone-router-views@1.x.x/dist/index.umd.js"></script>
```

**ES6 Module:**

```javascript
import 'https://cdn.jsdelivr.net/npm/pinecone-router-middleware-views@1.x.x/dist/index.umd.js';
```

### NPM

```
npm install pinecone-router-middleware-views
```

```javascript
// load this middleware
import 'pinecone-router-middleware-views';
// then load pinecone router
import 'pinecone-router';
```

> **Important**: This must be added **before** loading Pinecone Router.

## Usage

### [Demo](https://pinecone-example-views.vercel.app)

1. Enable views middleware in the router [Settings](https://pinecone-router/router/#settings):

```js
function router() {
	return {
		settings: {
			middlewares: {
				views: {
					enable: true;
				}
			}
		}
	}
```

2. add `x-view` to the routes with the value being the path to view.

That's it!

**example:**

```html
<div x-data="router()" x-router>
	<template x-route="/" x-view="/home.html"></template>
	<template x-route="/hello/:name" x-view="/hello.html"></template>
	<template x-route="notfound" x-view="/404.html"></template>
</div>

<div id="app">this will be replaced by the content of the views.</div>
```

```js
function router() {
	return {
		settings: {
			middlewares: {
				views: {
					enable: true;
				}
			}
		}
	}
}
```

> **Notes:** :

-   Routes can share views.
-   View are simply html files, can be text files too.
-   You can set the selector in [settings](#settings).
    **leaving it empty will default to '#app'**
-   You can also handle routes while using views
-   -   **Note**: The handlers will be executed _before_ the view is loaded.

### Settings

```js
views: {
	enable: true,
	basePath: '/',
	selector: '#app',
}
```

### Authorization

If you'd like to make checks before actually displaying a view, using authentication/authorization etc, you can make your checks in the _handler_. Then within the handler, if you need to redirect the user to another page simply `return context.redirect('/another/page')` this way it'll prevent the views from rendering and go to the other page directly.

**Example:**

The route you'd like to authorize:
In this example the user will only be allowed to edit their own profile

```html
<div x-data="router()" x-router>
	...
	<template
		x-route="/profile/:username/edit"
		x-handler="editProfile"
		x-view="/editprofile.html"
	></template>
	<template x-route="/unauthorized" x-view="/unauthorized.html"></template>
	...
</div>
```

The handler

> `auth` is a placeholder name, replace it with your own auth provider methods

```js
editProfile(context) {
	if (context.params.username != auth.username) {
		return context.redirect('/unauthorized');
	}
}
```

> **Tip!** To access the current context (params etc) from within the views, use the [$router Magic Helper](https://github.com/pinecone-router/router/#magic-helper) from an Alpine component or `window.PineconeRouter.currentContext` from Javascript.

> **Important**: Make sure the view don't have an Alpine Router component in them! Keep the router component outside of the specified selector.
>
> Can't use `body` as the selector to avoid that issue.

### Events:

This middleware dispatch these events:

| name               | recipient | when is it dispatched       |
| ------------------ | --------- | --------------------------- |
| **pinecone-start** | window    | when the page start loading |
| **pinecone-end**   | window    | when the page loading ends  |
| **fetch-error**    | x-router  | when the fetch fail         |

The first two can be used to show a loading bar or indicator

**Loading bar Example:**

Using [nProgress](http://ricostacruz.com/nprogress) (Recommended):

```js
window.addEventListener('pinecone-start', () => nProgress.start());
window.addEventListener('pinecone-end', () => nProgress.done());
```

You can also implement your own by doing something like this:

```html
<div
	x-data="{show:true}"
	@pinecone-end.window="show=false"
	@pinecone-start.window="setTimeout(()=>show=true, 100)"
	x-show="show"
>
	style it as you wish.
</div>
```

## Supported versions

| Version | Pinecone Router Versions |
| ------- | ------------------------ |
| 1.x.x   | ^1.0.0                   |

## Contributing:

Please refer to [CONTRIBUTING.md](/CONTRIBUTING.md)

## Versioning

This projects follow the [Semantic Versioning](https://semver.org/) guidelines.

## License

Copyright (c) 2021 Rafik El Hadi Houari

Licensed under the MIT license, see [LICENSE.md](LICENSE.md) for details.
