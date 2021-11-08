import NewsletterOptIn from "./NewsletterOptIn.svelte";

var div = document.createElement("div");
var script = document.currentScript;
script.parentNode.insertBefore(div, script);

const app = new NewsletterOptIn({
  target: div,
});

export default app;
