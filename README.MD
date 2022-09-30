## OneSDK + React + TypeScript + Rollup example

### Install all dependencies

```
npm install
```
Before the version `v0.4` of `@frankieone/one-sdk`, released on **30th of September 2022**, you were also required to manually install the following dependencies:

```
npm install lodash.merge node-html-parser string-format
```

### Build final bundle

```
npm run build
```

### Serve web page

```
npm run serve
```

### [About OneSDK](https://apidocs.frankiefinancial.com/docs/about-onesdk)

### About the Rollup setup

Rollup is not the recommended bundler for web applications, as its main use case is for building libraries. There are multiple different manual configurations required to setup Rollup while Vite and Webpack would work more seamlessly, specially during development, but also main features such as [code splitting](https://rollupjs.org/guide/en/#code-splitting) won’t work when bundling to iife format (used for compatibility with older browsers). Both these bundlers have native support for a development server, which is faster and more appropriate for development. If looking for a simple and low configuration bundler, we recommend [Vite](https://vitejs.dev/guide/), which supports TypeScript by default. [Example of Vite + TypeScript + React](https://stackblitz.com/edit/vitejs-vite-vppu5t?file=vite.config.ts&terminal=dev).

Since Rollup is not used internally and it has its own particularities, we won’t be able to predict further warnings and errors when using it as the bundler for an Application using OneSDK. The known required configuration for using OneSDK in an Web Application built with a basic React setup is as follows (the final configuration file can be found at the end of this section):

> :warning: Some of the dependencies used with Rollup in this repository are outdated and shouldn’t be used in real applications anymore. Use this repository as a reference only.

#### **Node builtins**
OneSDK internal dependencies on Node builtins were removed in `v0.3.2-alpha`, so the previous warning for *“Missing dependencies (buffer)”* is not going to be emitted anymore.

#### **Node shims**
Other transitive dependencies also rely on node builtin libraries. Rollup requires explicit shimming of Node builtins if they aren’t provided as a an explicit dependency, so for that reason, please install and configure [rollup-plugin-polyfill-node](https://www.npmjs.com/package/rollup-plugin-polyfill-node) according to their specs.

#### **Node resolution**
The plugin [@rollup/plugin-node-resolve](https://www.npmjs.com/package/@rollup/plugin-node-resolve) has a **bug on version 14** that won’t allow TypeScript projects to resolve browser specific dependencies. This causes a few of our internal dependencies to break (such as the `uuid` module). When installing it, make sure to **install version 13**, until this problem is resolved.

```
npm install -D @rollup/plugin-node-resolve@13
```

#### **Global process.env.NODE_ENV**
[React relies in the existence of a global process.env.NODE_ENV variable]([https://frankieone.atlassian.net/wiki/spaces/FRANKIEON](https://github.com/rollup/rollup/issues/487)), so we’re required to inject it via [rollup-plugin-replace](https://www.npmjs.com/package/rollup-plugin-replace).

#### **Other warnings**

##### [Use of eval is strongly discouraged.](https://rollupjs.org/guide/en/#avoiding-eval)

OCR Labs SDK (aka `liveness`) makes use of the "eval" function internally. This warning is not a risk, simply a reminder of better practices. For the moment it needs to be ignored.

#### [`this` has been rewritten to undefined](https://rollupjs.org/guide/en/#error-this-is-undefined)

We can safely ignore this warning, as it refers to a known non-issue. We will soon be implementing performance improvements that will also cause the code that originates this warning to go away.

#### Circular dependencies

[These aren’t expected to be a problem](https://railsware.com/blog/how-to-analyze-circular-dependencies-in-es6/) as they are mainly caused by bulk barrel exports and have passed Webpack module resolution without any errors to produce a final UMD bundle. That said, we will also work on improving the internal dependencies on the OneSDK and will be improving it, which might result in removing this warning.

### Rollup configuration (rollup.config.js) for different outputs

#### [iife](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) without code splitting (generates a single file “bundle.js”)
Change the `output` option to the following:

```
  output: [
    {
      file: "./dist/bundle.js",
      format: "iife",
      sourcemap: true,
      inlineDynamicImports: true,
    },
  ],
```

#### [es modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) with code splitting
Change the `output` option to the following:

```
  output: [
    {
      dir: "./dist",
      format: "es",
      sourcemap: true,
      inlineDynamicImports: false,
    },
  ],
```

### Typescript configuration (tsconfig.json)

If possible use a configuration as similar as possible to the `tsconfig.json` file in this repository.