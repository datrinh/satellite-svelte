import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import svelteConfig from './svelte.config';

const satellites = [
	'NewsletterOptIn',
	'BubbleButton'
] 

export default satellites.map(sat => ({
	input: `src/satellites/${sat}.svelte`,
	output: {
		format: 'iife',
		name: sat,
		file: `dist/${sat}.js`
	},
	plugins: [
		svelte({
			emitCss: false,
			...svelteConfig
		}),
		resolve({
			browser: true,
			dedupe: imp => imp === 'svelte' || imp.startsWith('svelte/')
		}),
		commonjs(),
		terser()
	]
}))