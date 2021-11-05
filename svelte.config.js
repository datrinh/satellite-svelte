import preprocess from "svelte-preprocess";

const config = {
  preprocess: [
    preprocess({
      scss: {
        prependData: '@import "src/styles/_variables.scss";',
      },
    }),
  ],
};

export default config;
