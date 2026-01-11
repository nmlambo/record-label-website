import { NextRequest, NextResponse } from "next/server"
import { polar } from "@/lib/polar-client"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const amountParam = searchParams.get("amount")
    const customerEmail = searchParams.get("customerEmail") || undefined

    if (!amountParam) {
      return NextResponse.json(
        { error: "Amount is required" },
        { status: 400 }
      )
    }

    // Parse amount (in dollars) and convert to cents
    const amountInDollars = parseFloat(amountParam)
    if (isNaN(amountInDollars) || amountInDollars <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      )
    }

    const amountInCents = Math.round(amountInDollars * 100)

    // Get dynamic product ID
    const dynamicProductId = process.env.NEXT_PUBLIC_POLAR_DYNAMIC_PRODUCT_ID

    if (!dynamicProductId) {
      return NextResponse.json(
        { error: "Dynamic product not configured" },
        { status: 500 }
      )
    }

    // Create checkout session with custom amount
    const checkout = await polar.checkouts.create({
      products: [dynamicProductId],
      amount: amountInCents,
      customerEmail: customerEmail,
      successUrl: `${process.env.NEXT_PUBLIC_URL}/purchase/success?checkoutId={CHECKOUT_ID}`,
      returnUrl: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
      metadata: {
        theme: "light",
        source: "numba_website",
      },
    })

    // Redirect to Polar checkout page
    if (checkout.url) {
      return NextResponse.redirect(checkout.url)
    }

    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  } catch (error: any) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create checkout" },
      { status: 500 }
    )
  }
}
