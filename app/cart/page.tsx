import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-[1390px]">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        <div className="max-w-4xl">
          <div className="border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button asChild>
              <a href="/music">Browse Music</a>
            </Button>
          </div>
        </div>
      </main>
      </div>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
