import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import html from "rollup-plugin-generate-html-template";
import external from "rollup-plugin-peer-deps-external";
import nodePolyfills from 'rollup-plugin-polyfill-node';
import postcss from "rollup-plugin-postcss";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";


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
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    external(),
    nodePolyfills(),
    resolve({ browser: true }),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    json(),
    postcss(),
    terser(),
    html({ template: "src/index.html", target: "index.html" }),
  ],
};
