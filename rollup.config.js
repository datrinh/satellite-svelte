import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";
import alias from 'rollup-plugin-alias';
import typescript from '@rollup/plugin-typescript';
import svelteConfig from "./svelte.config";

// Widget logic based on https://gist.github.com/AlexxNB/ab13267ad2a82a29f5466ec24fe797d5

// Build each satellite separately
// Must match the names in the satellites folder. Might be auto parsed later maybe
const satellites = [
	"NewsletterOptIn", 
	// "BubbleButton"
];

const modernBuilds = satellites.map((sat) => ({
  input: `src/satellites/${sat}.ts`,
  output: {
    format: "iife",
    name: sat,
    file: `dist/${sat}.js`,
  },
  plugins: [
    svelte({
      emitCss: false,
      ...svelteConfig,
    }),
    resolve({
      browser: true,
      dedupe: (imp) => imp === "svelte" || imp.startsWith("svelte/"),
    }),
    commonjs(),
    typescript(),
    alias({
      entries: [
        { find: '@', replacement: './src' },
      ]
    }),
    // terser(),
  ],
}));

const legacyBuilds = satellites.map((sat) => ({
  input: `src/satellites/${sat}.ts`,
  output: {
    format: "iife",
    name: sat,
    file: `dist/${sat}.legacy.js`,
  },
  plugins: [
    svelte({
      emitCss: false,
      ...svelteConfig,
    }),
    babel({
      extensions: [".js", ".mjs", ".html", ".svelte"],
      runtimeHelpers: true,
      exclude: "node_modules/**",
      presets: [
        [
          "@babel/preset-env",
          {
            targets: "> 0.5%, ie >= 11",
            useBuiltIns: "usage",
            corejs: 3,
          },
        ],
      ],
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        [
          "@babel/plugin-transform-runtime",
          {
            useESModules: true,
          },
        ],
      ],
    }),
    resolve(),
    commonjs(),
    typescript(),
    alias({
      entries: [
        { find: '@', replacement: './src' },
      ]
    }),
    // terser(),
  ],
}));

export default [
  ...modernBuilds,
  ...legacyBuilds,
];
