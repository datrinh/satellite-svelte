import NewsletterOptIn from "./NewsletterOptIn.svelte";
import { getConfig } from "@/api/config";
import { parseUrl } from "query-string";
import type { SatelliteConfig } from "@/interfaces";

console.log("document.currentScript", document.currentScript);

let integrationConfig = window?.["_chIntCnf"];
if (document.currentScript) {
  const src = (document.currentScript as HTMLScriptElement).src;
  if (!integrationConfig) {
    integrationConfig = {};
  }
  const query = parseUrl(src).query;
  integrationConfig = {
    ...integrationConfig,
    vendor: query.vendor,
    scriptId: query.script_id,
    universeUri: query.universe_uri,
  };
}
console.log("integrationConfig", integrationConfig);

const init = async ({ scriptId, universeUri }) => {
  const config: SatelliteConfig = await (
    await fetch(
      `${universeUri}/api/v0/storefronts/scripts/${scriptId}/public/config`
    )
  ).json();

  const {
    newsletter_opt_in: { title, description, selector },
  } = config;

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

init(integrationConfig);

export default NewsletterOptIn;
