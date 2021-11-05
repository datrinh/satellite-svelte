import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
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