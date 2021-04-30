# Pinecone Router Middleware Template

[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/{repository}?color=%2337C8AB&label=version&sort=semver)](https://github.com/{repository}/tree/0.0.0)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/pinecone-router-middleware-{middleware-name}?color=37C8AB)](https://bundlephobia.com/result?p=pinecone-router-middleware-{middleware-name}@0.0.0)
[![Downloads from Jsdelivr Github](https://img.shields.io/jsdelivr/gh/hm/{repository}?color=%2337C8AB&logo=github&logoColor=%2337C8AB)](https://www.jsdelivr.com/package/gh/{repository})
[![Downloads from Jsdelivr NPM](https://img.shields.io/jsdelivr/npm/hm/pinecone-router-middleware-{middleware-name}?color=%2337C8AB&&logo=npm)](https://www.jsdelivr.com/package/npm/pinecone-router-middleware-{middleware-name})
[![npm](https://img.shields.io/npm/dm/pinecone-router-middleware-{middleware-name}?color=37C8AB&label=npm&logo=npm&logoColor=37C8AB)](https://npmjs.com/package/pinecone-router-middleware-{middleware-name})
[![Changelog](https://img.shields.io/badge/change-log-%2337C8AB)](/CHANGELOG.md)

A middleware for [Pinecone Router](https://github.com/pinecone-router/router).

Be sure to do a site wide search/replace for the following:

```
{author-name} - Example: Rafik El Hadi Houari
{middleware-name} - Example: markdown
{current-year} - Example: 2021
{package-description} - Example: The summary
{repository} - Example: The full repository path, like pinecone-router/middleware-template
```

## About

What does this middleware do.

## Installation

### CDN

Include the following `<script>` tag in the `<head>` of your document, before Pinecone Router:

```html
<script src="https://cdn.jsdelivr.net/npm/pinecone-router-{middleware-name}@0.0.0/dist/index.umd.js"></script>
<!---->
```

**ES6 Module:**

```javascript
import 'https://cdn.jsdelivr.net/npm/pinecone-router-middleware-{middleware-name}@0.0.0/dist/index.umd.js';
```

### NPM

```
npm install pinecone-router-middleware-{middleware-name}
```

```javascript
// load this middleware
import 'pinecone-router-middleware-{middleware-name}';
// then load alpinejs router
import 'pinecone-router';
```

> **Important**: This must be added **before** loading Pinecone Router.

## Usage

Usage information.

## Supported versions

| Version | Pinecone Router Versions |
| ------- | ------------------------ |
| 0.1.0   | 0.1.0                    |

## Contributing:

Please refer to [CONTRIBUTING.md](/CONTRIBUTING.md)

## Versioning

This projects follow the [Semantic Versioning](https://semver.org/) guidelines.

## License

Copyright (c) {current-year} {author-name}

Licensed under the MIT license, see [LICENSE.md](LICENSE.md) for details.
