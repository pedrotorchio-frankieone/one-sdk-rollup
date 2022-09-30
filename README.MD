## OneSDK + React + TypeScript + Rollup example

### [About OneSDK](https://apidocs.frankiefinancial.com/docs/about-onesdk)

Rollup is not the recommended bundler for web applications, as its main use case is for building libraries. There are multiple different manual configurations required to setup Rollup while Vite and Webpack would work more seamlessly, specially during development, but also main features such as [code splitting](https://rollupjs.org/guide/en/#code-splitting) won’t work when bundling to iife format (used for compatibility with older browsers). Both these bundlers have native support for a development server, which is faster and more appropriate for development. If looking for a simple and low configuration bundler, we recommend [Vite](https://vitejs.dev/guide/), which supports TypeScript by default. [Example of Vite + TypeScript + React](https://stackblitz.com/edit/vitejs-vite-vppu5t?file=vite.config.ts&terminal=dev).

Before the version `v0.4` of `@frankieone/one-sdk`, released on **30th of September 2022**, you'd also be required to manually install the following dependencies:

```
npm install lodash.merge node-html-parser string-format
```

Install dependencies

```
npm install
```

Build final bundle

```
npm run build
```

Serve Web page

```
npm run serve
```
