import { parseUrl } from "query-string";
import { newsletterConfig } from "../dummy-config";

export const getConfig = async () => {
  return new Promise<typeof newsletterConfig>((resolve) => {
    setTimeout(() => {
      resolve(newsletterConfig);
    }, 500);
  });
};

export const init = () => {
  // check config if bubble should be shown
  let integrationConfig = window?.["_chIntCnf"];

  console.log("document.currentScript", document.currentScript);

  if (document.currentScript) {
    const src = (document.currentScript as HTMLScriptElement).src;
    if (!integrationConfig) {
      integrationConfig = {};
    }
    const query = parseUrl(src).query;
    console.log("query", query);
    if (query.proxy_vendor) {
      integrationConfig.vendor = query.proxy_vendor;
    }
    if (query.script_id) {
      integrationConfig.script_id = query.script_id;
    }
    if (query.universe_uri) {
      integrationConfig.universe_uri = query.universe_uri;
    }
  }
};

// if (
//   integrationConfig?.vendor &&
//   integrationConfig.universe_uri &&
//   integrationConfig.universe_uri.length > 0
// ) {
//   main(integrationConfig);
// } else {
//   console.warn(
//     "[Charles Satellite] - missing base integration config: ",
//     integrationConfig
//   );
// }

// function main(integrationConfig: CharlesIntegrationBaseConfiguration): void {
//   const provider = new Provider({
//     universe_uri: integrationConfig.universe_uri,
//     script_id: integrationConfig.script_id,
//   });
//   // get config off universe
//   provider
//     .getConfiguration()
//     .then((config) => {
//       // TODO use schema validate json
//       /** Load modules **/
//       // order opt in
//       if (config?.order_opt_in && config.order_opt_in.active === true) {
//         OrderOptInWidget.create(
//           provider,
//           config.order_opt_in,
//           integrationConfig.vendor
//         );
//       }
//     })
//     .catch((err: Error) => {
//       throw err;
//     });
// }
