"use client"

import { Suspense, useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Play, Trash2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useWishlist } from "@/lib/wishlist-context"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { getPolarProductId } from "@/lib/polar-products"
import { useRouter } from "next/navigation"

function WishlistContent() {
  const router = useRouter()
  const { items: wishlistItems, removeItem } = useWishlist()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0)

  const filteredItems = wishlistItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.artist.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddToCart = (item: typeof wishlistItems[0]) => {
    const productId = getPolarProductId(item.type, item.price, false)
    addItem({
      id: item.id,
      productId: productId,
      title: item.title,
      artist: item.artist,
      type: item.type,
      price: item.price,
      image: item.image,
      releaseId: item.releaseId,
      isTrack: false,
    })
    toast({
      title: "Added to cart",
      description: `${item.title} has been added to your cart.`,
      action: <ToastAction altText="View cart" onClick={() => router.push('/cart')}>View</ToastAction>,
    })
  }

  const handleAddAllToCart = () => {
    wishlistItems.forEach(item => handleAddToCart(item))
    toast({
      title: "Added to cart",
      description: `${wishlistItems.length} items added to your cart.`,
      action: <ToastAction altText="View cart" onClick={() => router.push('/cart')}>View</ToastAction>,
    })
  }

  const handleRemoveFromWishlist = (id: string, title: string) => {
    removeItem(id)
    toast({
      title: "Removed from wishlist",
      description: `${title} has been removed from your wishlist.`,
    })
  }

  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-6 pt-6 pb-24 md:px-12 md:pt-12 md:pb-16 max-w-[1390px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              {/* <div className="size-10 sm:size-14 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center">
                <Heart className="size-5 sm:size-7 text-white fill-white" />
              </div> */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Wishlist</h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {wishlistItems.length} saved items • ${totalValue.toFixed(2)} total
                </p>
              </div>
            </div>
            <Button 
              className="gap-2 w-full sm:w-auto"
              onClick={handleAddAllToCart}
              disabled={wishlistItems.length === 0}
            >
              <ShoppingCart className="size-4" />
              Add All to Cart
            </Button>
          </div>

          <div className="relative mb-6 sm:mb-8">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 size-4 sm:size-5 text-muted-foreground" />
            <Input
              placeholder="Search your wishlist..."
              className="w-full pl-10 sm:pl-12 h-10 sm:h-12 text-sm sm:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="group flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg bg-card hover:bg-muted/50 transition-colors border"
              >
                <span className="hidden sm:block w-6 text-center text-sm text-muted-foreground group-hover:hidden">
                  {index + 1}
                </span>
                <button className="hidden sm:hidden sm:group-hover:flex w-6 items-center justify-center">
                  <Play className="size-4 fill-current" />
                </button>

                <div className="relative shrink-0">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={56}
                      height={56}
                      className="size-12 sm:size-14 rounded object-cover"
                    />
                  ) : (
                    <div className="size-12 sm:size-14 rounded bg-muted flex items-center justify-center">
                      <Play className="size-5 text-muted-foreground" />
                    </div>
                  )}
                </div>

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

                <span className="hidden sm:inline-flex px-3 py-1 text-xs font-medium text-muted-foreground bg-muted rounded-full">
                  {item.type}
                </span>

                <span className="hidden sm:block w-20 text-right font-medium">${item.price.toFixed(2)}</span>

                <div className="flex items-center gap-1 sm:gap-2">
                  <Button 
                    size="sm" 
                    className="h-8 px-2 sm:px-3"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="size-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-red-500 hover:bg-transparent h-8 w-8"
                    onClick={() => handleRemoveFromWishlist(item.id, item.title)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {wishlistItems.length === 0 && (
            <div className="text-center py-12 sm:py-20">
              <div className="size-16 sm:size-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Heart className="size-8 sm:size-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                Start adding tracks and sample packs you love!
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

export default function WishlistPage() {
  return (
    <Suspense fallback={null}>
      <WishlistContent />
    </Suspense>
  )
}
