import NewsletterOptIn from "./NewsletterOptIn.svelte";

var iframe = document.createElement("iframe");
var script = document.currentScript;
iframe.onload = (ev) => {
  const app = new NewsletterOptIn({
    target: iframe.contentWindow.document.body,
  });
};
script.parentNode.insertBefore(iframe, script);

// const app = new NewsletterOptIn({
//   target: iframe,
// });

// export default app;
