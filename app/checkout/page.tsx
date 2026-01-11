"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { CreditCard, Tag, Lock, ChevronRight, Info, ArrowLeft } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"

export default function CheckoutPage() {
  const router = useRouter()
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const currency = "ZAR"
  const exchangeRate = 18.5

  // Mock cart data - in production, this would come from context/state management
  const cartItems = [
    {
      id: 1,
      title: "Neon Nights",
      artist: "Stellar Wave",
      price: 1.99,
      quantity: 1,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Midnight Bass",
      artist: "BeatMaker Pro",
      price: 1.99,
      quantity: 1,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Cosmic Journey",
      artist: "Aurora Sounds",
      price: 1.99,
      quantity: 1,
      image: "/placeholder.svg",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0
  const total = subtotal - discount

  const applyPromo = () => {
    if (promoCode.toLowerCase() === "numba10") {
      setPromoApplied(true)
    }
  }

  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 pt-6 pb-24 md:px-12 md:pt-12 md:pb-16 max-w-[1200px]">
          {/* Back to Cart */}
          <Button
            variant="ghost"
            onClick={() => router.push("/cart")}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="size-4" />
            Back to Cart
          </Button>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side - Order Summary */}
            <div className="order-2 lg:order-1">
              <div className="bg-card rounded-xl p-6 border">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                {/* Cart Items Preview */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={60}
                          height={60}
                          className="size-14 rounded-lg object-cover border"
                        />
                        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground size-5 rounded-full flex items-center justify-center text-xs font-bold">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">{item.artist}</p>
                      </div>
                      <div className="text-sm font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="mb-6" />

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="pl-10"
                        disabled={promoApplied}
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={applyPromo}
                      disabled={promoApplied}
                    >
                      {promoApplied ? "Applied" : "Apply"}
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-emerald-500 mt-2">10% discount applied!</p>
                  )}
                </div>

                <Separator className="mb-6" />

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Subtotal ({cartItems.length} items)
                    </span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="text-emerald-500">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing fee</span>
                    <span>$0.00</span>
                  </div>
                </div>

                <Separator className="mb-6" />

                {/* Estimated Total with Info */}
                <div className="bg-muted/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Estimated Total (USD):</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="text-muted-foreground hover:text-foreground">
                              <Info className="size-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-xs">
                              Base prices are always in USD, but your payment is processed in the
                              currency you choose at checkout.
                            </p>
                            <p className="text-xs mt-2">
                              Subject to tax if applicable in your area.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="font-bold text-lg">${total.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Tax: Calculated at checkout (if applicable)
                  </div>
                </div>

                {/* Currency Conversion */}
                <div className="flex items-center justify-between mb-6 p-4 bg-primary/10 rounded-lg">
                  <span className="text-sm font-medium">You Pay ({currency}):</span>
                  <span className="text-2xl font-bold text-primary">
                    R{(total * exchangeRate).toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Button className="w-full h-12 font-semibold gap-2 mb-4">
                  <CreditCard className="size-5" />
                  Checkout
                  <ChevronRight className="size-4" />
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="size-3" />
                  <span>Secure checkout powered by Polar</span>
                </div>
              </div>
            </div>

            {/* Right Side - Payment Method (Placeholder) */}
            <div className="order-1 lg:order-2">
              <div className="bg-card rounded-xl p-6 border">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground text-center">
                      Payment integration coming soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
