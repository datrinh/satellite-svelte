import NewsletterOptIn from "./NewsletterOptIn.svelte";

// will come from config
const targetSelector = '[data-charles="charles-newsletter"]';

const targets = document.querySelectorAll(targetSelector);

var iframe = document.createElement("iframe");
iframe.onload = (ev) => {
  const app = new NewsletterOptIn({
    target: iframe.contentWindow.document.body,
  });
  iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
  iframe.style.border = "none";
  iframe.style.width = "100%";
  iframe.contentWindow.document.body.style.overflow = "hidden"; // remove scrollbar on IE11
};

console.log("iframe", iframe);
console.log("targets", targets);

targets.forEach((el) => {
  el.parentNode.replaceChild(iframe, el);
});

export default iframe;
