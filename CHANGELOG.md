# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.2] - 2023-04-06

### Fixed

-   Await fetch operation inside the loop to prevent errors.

## [3.0.1] - 2023-04-06

### Changed

-   Make it so fetch-error will be dispatched to #app or whatever `viewSelector` is set to in settings.

## [3.0.0] - 2023-04-06

### Added

-   Added support for multiple views per route using an array (View Composition).

### Removed

-   Removed caching views in memory, let the browser handle that.

## [2.0.0] - 2022-12-04

-   Added support for PineconeRouter v2 and Alpine.js v3

## [1.2.0] - 2021-06-06

### Added

-   Focus elements with the `autofocus` attributes on view load.
-   SSG support by not fetching content in the first load (conditional & non-breaking).

## [1.1.0] - 2021-06-03

### Added

-   Allow routes with no views

## [1.0.0] - 2021-05-31

### Changed

-   Switch to Typescript

## [0.0.3] - 2021-05-08

### Changed

-   support for Pinecone Router v0.3.0

### Removed

-   removed `x-views` in favor of Pinecone Settings.

## [0.0.2] - 2021-05-02

### Removed

-   removed onLinkIntercepted() & interceptLinks().

## [0.0.1] - 2021-05-1

### Fixed

-   removed broken version check.

## [0.0.0] - 2021-05-01

### Added

-   first version as a separate middleware

[unreleased]: https://github.com/pinecone-router/middleware-views/compare/0.0.0...HEAD
[0.0.0]: https://github.com/pinecone-router/middleware-views/compare/0.0.0...0.0.0
[0.0.1]: https://github.com/pinecone-router/middleware-views/compare/0.0.0...0.0.1
[0.0.3]: https://github.com/pinecone-router/middleware-views/compare/0.0.1...0.0.3
[0.0.3]: https://github.com/pinecone-router/middleware-views/compare/0.0.3...1.0.0
