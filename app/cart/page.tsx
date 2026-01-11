"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"

export default function CartPage() {
  const router = useRouter()
  const { items: cartItems, removeItem, total } = useCart()

  const handleCheckout = async () => {
    if (cartItems.length === 0) return
    
    // Redirect to checkout with total amount
    router.push(`/api/checkout?amount=${total.toFixed(2)}&customerEmail=`)
  }

  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-6 pt-6 pb-24 md:px-12 md:pt-12 md:pb-16 max-w-[1390px]">
          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* <div className="size-10 sm:size-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <ShoppingCart className="size-5 sm:size-7 text-white" />
            </div> */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Cart</h1>
              <p className="text-sm sm:text-base text-muted-foreground">{cartItems.length} items ready for checkout</p>
            </div>
          </div>

          {cartItems.length > 0 ? (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    {/* Album Art */}
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="size-20 rounded-lg object-cover border shrink-0"
                    />

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.artist}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.isTrack ? `Track ${item.trackNumber}` : item.type}
                      </p>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        <Trash2 className="size-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Cart Summary & Checkout */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-muted/20 rounded-lg border mt-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in cart</span>
                    <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                  </div>
                  <Button 
                    size="lg"
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                    className="w-full sm:w-auto"
                  >
                    Proceed to Checkout
                  </Button>
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
              <Button asChild>
                <Link href="/music">Browse Music</Link>
              </Button>
            </div>
          )}
        </main>
      </div>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
