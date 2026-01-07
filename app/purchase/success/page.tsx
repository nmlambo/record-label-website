import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PurchaseSuccessPage() {
  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-[1390px]">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 md:p-12 text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Purchase Complete!</h1>
              <p className="text-muted-foreground">
                Thank you for your purchase. You'll receive an email with your download link and receipt shortly.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button asChild>
                <Link href="/api/portal" className="cursor-pointer">View My Purchases</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/artists" className="cursor-pointer">Browse More Music</Link>
              </Button>
            </div>
          </Card>
        </div>
      </main>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
