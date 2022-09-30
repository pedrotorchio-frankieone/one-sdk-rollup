import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
// Ensure @rollup/plugin-node-resolve version 13 is used, 
// Version 14 doesn't respect browser: true directive if
// also using typescript plugins
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import html from "rollup-plugin-generate-html-template";
import nodePolyfills from 'rollup-plugin-polyfill-node';
import replace from "rollup-plugin-replace";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: "./dist/bundle.js",
      format: "iife",
      sourcemap: true,
      inlineDynamicImports: true,
    },
  ],
  plugins: [
    resolve({ browser: true, preferBuiltins: false }),
    commonjs(),
    nodePolyfills(),
    typescript({ tsconfig: "./tsconfig.json" }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    json(),
    html({ template: "src/index.html", target: "index.html" }),
  ],
};
