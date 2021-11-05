import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess'

export default {
	input: './src/lib/NewsletterOptIn.svelte',
	output: {
		format: 'iife',
		name: 'NewsletterOptIn', // Name of the class we will call on the page
		file: 'dist/NewsletterOptIn.js' // the file which we will include on the page
	},
	plugins: [
		svelte({
			emitCss: false,  // Let's store CSS in JS (no-depends), but you can emit it in separate *.css file too
            preprocess: sveltePreprocess({
                // postcss: true
                // sourceMap: false,
                postcss: {
                    configFilePath: 'postcss.config.cjs'
                },
              }),
		}),
		resolve({
			browser: true,
			dedupe: imp => imp === 'svelte' || imp.startsWith('svelte/')
		}),
		commonjs(),
		terser()
	]
};