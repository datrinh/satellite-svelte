import NewsletterOptIn from "./NewsletterOptIn.svelte";

var iframe = document.createElement("iframe");
iframe.onload = (ev) => {
  const app = new NewsletterOptIn({
    target: iframe.contentWindow.document.body,
  });
  iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
  iframe.style.border = "none";
  iframe.style.width = "100%";
};

var script = document.currentScript;
script.parentNode.insertBefore(iframe, script);

// const app = new NewsletterOptIn({
//   target: iframe,
// });

// export default app;
