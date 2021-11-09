import { newsletterConfig } from "../dummy-config";

export const getConfig = async () => {
  return new Promise<typeof newsletterConfig>((resolve) => {
    setTimeout(() => {
      resolve(newsletterConfig);
    }, 500);
  });
};
