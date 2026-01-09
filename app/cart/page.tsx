"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Trash2, Play, CreditCard, Tag } from "lucide-react"
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

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const discount = 0
  const total = subtotal - discount

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-6 pt-6 pb-24 md:px-12 md:pt-12 md:pb-16 max-w-[1390px]">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <ShoppingCart className="size-8 text-foreground" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
              <p className="text-muted-foreground">{cartItems.length} items in your cart</p>
            </div>
          </div>

          {cartItems.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4 p-4">
                        {/* Album Art */}
                        <div className="relative group shrink-0">
                          <div className="w-20 h-20 bg-muted rounded-md" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <Button size="icon" variant="ghost" className="text-white hover:text-white hover:bg-white/20">
                              <Play className="size-6 fill-current" />
                            </Button>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">{item.type}</p>
                          <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.artist}</p>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-foreground text-lg">${item.price.toFixed(2)}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Promo Code */}
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Button variant="outline">Apply</Button>
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                        <span className="text-foreground">${subtotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Discount</span>
                          <span className="text-green-600">-${discount.toFixed(2)}</span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold text-lg">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground">${total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col gap-3">
                    <Button className="w-full gap-2" size="lg">
                      <CreditCard className="size-4" />
                      Checkout
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">Secure checkout powered by Stripe</p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <ShoppingCart className="size-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Add some tracks or sample packs to get started!</p>
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
