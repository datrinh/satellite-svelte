import NewsletterOptIn from "./NewsletterOptIn.svelte";
import { getConfig } from "@/api/config";

const init = async () => {
  const config = await getConfig();
  const { selector, title, description } = config;
  const targets = document.querySelectorAll(selector);

  var iframe = document.createElement("iframe");
  iframe.onload = (ev) => {
    const app = new NewsletterOptIn({
      target: iframe.contentWindow.document.body,
      props: {
        title,
        description,
      },
    });
    iframe.style.height =
      iframe.contentWindow.document.body.scrollHeight + "px";
    iframe.style.border = "none";
    iframe.style.width = "100%";
    iframe.contentWindow.document.body.style.overflow = "hidden"; // remove scrollbar on IE11
  };

  // TODO: Currently not functional to replace multiple targets
  targets.forEach((el) => {
    el.parentNode.replaceChild(iframe, el);
  });
};

init();

export default NewsletterOptIn;
