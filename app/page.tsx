import { Header } from "@/components/header"
import { HeroCarousel } from "@/components/hero-carousel"
import { ReleasesGrid } from "@/components/releases-grid"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"

export default function HomePage() {
  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Header />
      <HeroCarousel />
      <main className="container mx-auto px-4 2xl:px-0 max-w-[1390px]">
        <ReleasesGrid />
      </main>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
