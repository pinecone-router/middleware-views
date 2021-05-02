# Views Rendering Middleware for Pinecone Router

[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/pinecone-router/middleware-views?color=%2337C8AB&label=version&sort=semver)](https://github.com/pinecone-router/middleware-views/tree/0.0.2)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/pinecone-router-middleware-views?color=37C8AB)](https://bundlephobia.com/result?p=pinecone-router-middleware-views@0.0.2)
[![Downloads from Jsdelivr Github](https://img.shields.io/jsdelivr/gh/hm/pinecone-router/middleware-views?color=%2337C8AB&logo=github&logoColor=%2337C8AB)](https://www.jsdelivr.com/package/gh/pinecone-router/middleware-views)
[![Downloads from Jsdelivr NPM](https://img.shields.io/jsdelivr/npm/hm/pinecone-router-middleware-views?color=%2337C8AB&&logo=npm)](https://www.jsdelivr.com/package/npm/pinecone-router-middleware-views)
[![npm](https://img.shields.io/npm/dm/pinecone-router-middleware-views?color=37C8AB&label=npm&logo=npm&logoColor=37C8AB)](https://npmjs.com/package/pinecone-router-middleware-views)
[![Changelog](https://img.shields.io/badge/change-log-%2337C8AB)](/CHANGELOG.md)

A views rendering middleware for [Pinecone Router](https://github.com/pinecone-router/router).

## About

Views rendering middleware for Pinecone Router.
It allow you to set a view for each route that will be displayed on a specified element.

## Installation

### CDN

Include the following `<script>` tag in the `<head>` of your document, before Pinecone Router:

```html
<script src="https://cdn.jsdelivr.net/npm/pinecone-router-views@0.0.2/dist/index.umd.js"></script>
```

**ES6 Module:**

```javascript
import 'https://cdn.jsdelivr.net/npm/pinecone-router-middleware-views@0.0.2/dist/index.umd.js';
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

1. add `x-views` attribute to the Pinecone Router element.
    - optionally set its value to the selector for where to show the view's content,
    - **leaving it empty will default to `#content`**
2. add `x-view` to _each route_ with the value being the path to view.

That's it!

**example:**

```html
<div x-data x-router x-views="#content">
	<template x-route="/" x-view="/home.html"></template>
	<template x-route="/hello/:name" x-view="/hello.html"></template>
	<template x-route="notfound" x-view="/404.html"></template>
</div>

<div id="content">this will be replaced by the content of the views.</div>
```

> **Notes:** :

-   Routes can share views.
-   View are simply html files, can be text files too.
-   A view is **required** for each route.
-   You can set the selector by setting it as the value of `x-views` attribute.
    **leaving it empty will default to '#content'**
-   You can also handle routes while using views
-   -   **Note**: The routes will be handled _before_ the page is rendered.

### Authorization

If you'd like to make checks before actually displaying a view, using authentication/authorization etc, you can make your checks in the _handler_. Then within the handler, if you need to redirect the user to another page simply `return context.redirect('/another/page')` this way it'll prevent the views from rendering and go to the other page directly.

**Example:**

The route you'd like to authorize:
In this example the user will only be allowed to edit their own profile

```html
<div x-data="router()" x-router x-views>
	...
	<template
		x-route="/profile/:username/edit"
		x-handler="editprofile"
		x-view="/editprofile.html"
	></template>
	<template x-route="/unauthorized" x-view="/unauthorized.html"></template>
	...
</div>
```

The handler: (`auth` is a placeholder name, replace it with your own auth provider methods)

```js
editprofile(context) {
	if (context.props.username != auth.username) {
		return context.redirect('/unauthorized');
	}
}
```

> **Tip!** To access the current context (props etc) from within the views, use the [$router Magic Helper](https://github.com/pinecone-router/router/#magic-helper) from an Alpine component or `window.PineconeRouter.currentContext` from Javascript.

> **Important**: Make sure the view don't have an Alpine Router component in them! Keep the router component outside of the specified selector.
>
> Can't use `body` as the selector to avoid that issue.

## Supported versions

| Version | Pinecone Router Versions |
| ------- | ------------------------ |
| 0.0.2   | 0.1.0                    |

## Contributing:

Please refer to [CONTRIBUTING.md](/CONTRIBUTING.md)

## Versioning

This projects follow the [Semantic Versioning](https://semver.org/) guidelines.

## License

Copyright (c) {current-year} Rafik El Hadi Houari

Licensed under the MIT license, see [LICENSE.md](LICENSE.md) for details.
