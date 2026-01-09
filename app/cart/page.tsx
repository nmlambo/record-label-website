"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Trash2, Play, CreditCard, Tag, Lock, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"

const initialCartItems = [
  {
    id: 1,
    title: "Neon Nights",
    artist: "Stellar Wave",
    type: "EP",
    price: 12.99,
    image: "/neon-nights-album-cover-dark-city.jpg",
  },
  {
    id: 2,
    title: "Midnight Bass Pack",
    artist: "BeatMaker Pro",
    type: "Sample Pack",
    price: 24.99,
    image: "/bass-sample-pack-electronic-music.jpg",
  },
  {
    id: 3,
    title: "Cosmic Journey",
    artist: "Aurora Sounds",
    type: "Album",
    price: 14.99,
    image: "/cosmic-space-album-cover.jpg",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0
  const total = subtotal - discount

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const applyPromo = () => {
    if (promoCode.toLowerCase() === "numba10") {
      setPromoApplied(true)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-6 pt-6 pb-24 md:px-12 md:pt-12 md:pb-16 max-w-[1390px]">
          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="size-10 sm:size-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <ShoppingCart className="size-5 sm:size-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Shopping Cart</h1>
              <p className="text-sm sm:text-base text-muted-foreground">{cartItems.length} items ready for checkout</p>
            </div>
          </div>

          {cartItems.length > 0 ? (
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-2">
                {/* Column Headers */}
                <div className="hidden sm:flex items-center gap-4 px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <span className="w-6">#</span>
                  <span className="w-14">Cover</span>
                  <span className="flex-1">Title</span>
                  <span className="w-24">Type</span>
                  <span className="w-20 text-right">Price</span>
                  <span className="w-10"></span>
                </div>

                <Separator className="hidden sm:block" />

                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="group flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    {/* Index */}
                    <span className="hidden sm:block w-6 text-center text-sm text-muted-foreground group-hover:hidden">
                      {index + 1}
                    </span>
                    <button className="hidden sm:hidden sm:group-hover:flex w-6 items-center justify-center">
                      <Play className="size-4 fill-current" />
                    </button>

                    {/* Album Art */}
                    <div className="relative shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={56}
                        height={56}
                        className="size-12 sm:size-14 rounded object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate text-sm sm:text-base">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{item.artist}</p>
                      <div className="flex items-center gap-2 mt-1 sm:hidden">
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {item.type}
                        </span>
                        <span className="text-sm font-medium">${item.price.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Type Badge */}
                    <span className="hidden sm:inline-flex w-24 px-3 py-1 text-xs font-medium text-muted-foreground bg-muted rounded-full text-center">
                      {item.type}
                    </span>

                    {/* Price */}
                    <span className="hidden sm:block w-20 text-right font-medium">
                      ${item.price.toFixed(2)}
                    </span>

                    {/* Remove */}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-8 sm:w-10 h-8 sm:h-10 text-muted-foreground hover:text-red-500 hover:bg-transparent"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl p-4 sm:p-6 lg:sticky lg:top-6 border">
                  <h2 className="text-base sm:text-lg font-bold mb-4 sm:mb-6">Order Summary</h2>

                  {/* Promo Code */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="pl-10 text-sm sm:text-base h-9 sm:h-10"
                          disabled={promoApplied}
                        />
                      </div>
                      <Button
                        variant="outline"
                        onClick={applyPromo}
                        disabled={promoApplied}
                        className="text-sm sm:text-base h-9 sm:h-10"
                      >
                        {promoApplied ? "Applied" : "Apply"}
                      </Button>
                    </div>
                    {promoApplied && <p className="text-xs text-emerald-500 mt-2">10% discount applied!</p>}
                  </div>

                  <Separator className="mb-4 sm:mb-6" />

                  {/* Price Breakdown */}
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-muted-foreground">Discount</span>
                        <span className="text-emerald-500">-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Processing fee</span>
                      <span>$0.00</span>
                    </div>
                  </div>

                  <Separator className="mb-4 sm:mb-6" />

                  <div className="flex justify-between font-bold text-lg sm:text-xl mb-4 sm:mb-6">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <Button className="w-full h-10 sm:h-12 font-semibold gap-2 mb-3 sm:mb-4 text-sm sm:text-base">
                    <CreditCard className="size-4 sm:size-5" />
                    Checkout
                    <ChevronRight className="size-4" />
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs text-muted-foreground">
                    <Lock className="size-3" />
                    <span>Secure checkout powered by Stripe</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12 sm:py-20">
              <div className="size-16 sm:size-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <ShoppingCart className="size-8 sm:size-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                Add some tracks or sample packs to get started!
              </p>
              <Button>Browse Music</Button>
            </div>
          )}
        </main>
      </div>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
