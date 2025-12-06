export const polarConfig = {
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: (process.env.POLAR_SERVER as "production" | "sandbox") || "sandbox",
  successUrl: process.env.NEXT_PUBLIC_URL + "/purchase/success",
  returnUrl: process.env.NEXT_PUBLIC_URL,
}

// Product IDs - Replace these with your actual Polar product IDs
export const polarProducts = {
  digitalDownload: process.env.POLAR_DIGITAL_DOWNLOAD_PRODUCT_ID,
  vinyl: process.env.POLAR_VINYL_PRODUCT_ID,
  subscription: process.env.POLAR_SUBSCRIPTION_PRODUCT_ID,
}
