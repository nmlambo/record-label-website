import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Clock } from "lucide-react"

export default function HistoryPage() {
  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-[1390px]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="h-8 w-8" />
              <h1 className="text-4xl font-bold">Recently Played</h1>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-12 text-center">
              <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">No listening history</h2>
              <p className="text-muted-foreground">
                Your recently played tracks will appear here.
              </p>
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
