import { CustomerPortal } from "@polar-sh/nextjs"
import { polarConfig } from "@/lib/polar-config"

export const GET = CustomerPortal({
  accessToken: polarConfig.accessToken,
  returnUrl: polarConfig.returnUrl,
  server: polarConfig.server,
  theme: "dark",
})
