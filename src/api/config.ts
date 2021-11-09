import { newsletterConfig } from "../dummy-config";

export const getConfig = async () => {
  return new Promise<typeof newsletterConfig>((resolve) => {
    resolve(newsletterConfig);
  });
};
