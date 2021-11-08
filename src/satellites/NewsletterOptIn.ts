import NewsletterOptIn from "./NewsletterOptIn.svelte";

var iframe = document.createElement("iframe");
var script = document.currentScript;
script.parentNode.insertBefore(iframe, script);

const app = new NewsletterOptIn({
  target: iframe,
});

export default app;
