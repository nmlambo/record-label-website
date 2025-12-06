import { Checkout } from "@polar-sh/nextjs"
import { polarConfig } from "@/lib/polar-config"

export const GET = Checkout({
  accessToken: polarConfig.accessToken,
  successUrl: polarConfig.successUrl,
  returnUrl: polarConfig.returnUrl,
  server: polarConfig.server,
  theme: "dark",
})
