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
    extend: {
      colors: {
        green: {
          whatsapp: '#00c40a'
        },
        gray: {
          light: '#f3f3f3'
        }
      }
    },
  },
  variants: {},
  plugins: [],
}
