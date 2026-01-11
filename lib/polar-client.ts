import { Polar } from "@polar-sh/sdk";

if (!process.env.POLAR_ACCESS_TOKEN) {
  throw new Error("POLAR_ACCESS_TOKEN is not set in environment variables");
}

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: process.env.POLAR_SERVER === "production" ? "production" : "sandbox",
});

export const POLAR_CONFIG = {
  organizationId: process.env.POLAR_ORGANIZATION_ID || "",
  server: process.env.POLAR_SERVER || "sandbox",
  products: {
    digitalDownload: process.env.POLAR_DIGITAL_DOWNLOAD_PRODUCT_ID || "",
    vinyl: process.env.POLAR_VINYL_PRODUCT_ID || "",
    subscription: process.env.POLAR_SUBSCRIPTION_PRODUCT_ID || "",
  },
};
