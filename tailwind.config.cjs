module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    "./src/**/*.svelte",
    "./src/**/*.ts",
    "./src/**/*.html",
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
