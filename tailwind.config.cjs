module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: !process.env.ROLLUP_WATCH,
    content: [
      "./src/**/*.svelte",
      "./src/**/*.ts",
      "./src/**/*.html",
    ],
    options: {
      defaultExtractor: content => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
      ],
    },
  },
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
