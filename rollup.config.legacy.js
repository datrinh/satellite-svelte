import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import svelteConfig from './svelte.config';

// Widget logic based on https://gist.github.com/AlexxNB/ab13267ad2a82a29f5466ec24fe797d5

// Build each satellite separately
// Must match the names in the satellites folder. Might be auto parsed later maybe
const satellites = [
	'NewsletterOptIn',
	'BubbleButton'
] 

export default satellites.map(sat => ({
	input: `src/satellites/${sat}.svelte`,
	output: {
		format: 'iife',
		name: sat,
		file: `dist/${sat}.legacy.js`
	},
	plugins: [
		svelte({
			emitCss: false,
			...svelteConfig
		}),
		babel({
			extensions: ['.js', '.mjs', '.html', '.svelte'],
			runtimeHelpers: true,
			exclude: ['node_modules/@babel/**', 'node_modules/core-js/**'],
			presets: [
				[
					'@babel/preset-env',
					{
						targets: '> 0.25%, not dead',
						useBuiltIns: 'usage',
						corejs: 3
					},
				]
			],
			plugins: [
				'@babel/plugin-syntax-dynamic-import',
				[
					'@babel/plugin-transform-runtime',
					{
						useESModules: true
					}
				]
			]
		}),
		resolve({
			browser: true,
			dedupe: imp => imp === 'svelte' || imp.startsWith('svelte/')
		}),
		commonjs(),
		terser()
	]
}))