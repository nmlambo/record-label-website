import Image from "next/image"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart, Play, Trash2 } from "lucide-react"

const wishlistItems = [
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
  {
    id: 4,
    title: "Lo-Fi Dreams",
    artist: "Chill Collective",
    type: "EP",
    price: 9.99,
    image: "/lofi-hiphop-album-cover-aesthetic.jpg",
  },
  {
    id: 5,
    title: "Drum Machine Essentials",
    artist: "Sound Library",
    type: "Sample Pack",
    price: 19.99,
    image: "/drum-machine-sample-pack.jpg",
  },
]

export default function FavouritesPage() {
  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-6 pt-6 pb-24 md:px-12 md:pt-12 md:pb-16 max-w-[1390px]">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Heart className="size-8 text-foreground" />
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Wishlist</h1>
                  <p className="text-muted-foreground">
                    {wishlistItems.length} items • ${totalValue.toFixed(2)} total
                  </p>
                </div>
              </div>
              <Button className="gap-2">
                <ShoppingCart className="size-4" />
                Add All to Cart
              </Button>
            </div>

            {/* Wishlist Items */}
            <div className="space-y-4">
              {wishlistItems.map((item) => (
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

                      {/* Price & Actions */}
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-foreground">${item.price.toFixed(2)}</span>
                        <Button size="sm" className="gap-2">
                          <ShoppingCart className="size-4" />
                          Add to Cart
                        </Button>
                        <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State (shown when list is empty) */}
            {wishlistItems.length === 0 && (
              <div className="text-center py-16">
                <Heart className="size-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h2>
                <p className="text-muted-foreground mb-6">Start adding tracks and sample packs you love!</p>
                <Button>Browse Music</Button>
              </div>
            )}
          </div>
        </main>
      </div>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
