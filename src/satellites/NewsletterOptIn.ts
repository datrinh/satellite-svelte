import NewsletterOptIn from "./NewsletterOptIn.svelte";

// will come from config
const targetSelector = "#charles-newsletter";

const target = document.querySelectorAll(targetSelector);

var iframe = document.createElement("iframe");
iframe.onload = (ev) => {
  const app = new NewsletterOptIn({
    target: iframe.contentWindow.document.body,
  });
  iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
  iframe.style.border = "none";
  iframe.style.width = "100%";
};

target.forEach((el) => {
  el.parentNode.replaceChild(iframe, el);
});

// var script = document.currentScript;
// script.parentNode.insertBefore(iframe, script);

// const app = new NewsletterOptIn({
//   target: iframe,
// });

export default iframe;
