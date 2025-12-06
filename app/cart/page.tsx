import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pb-32 md:pb-8 max-w-[1390px]">
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
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
