import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { ReleaseCard } from "@/components/release-card"
import { releases } from "@/lib/releases-data"

export default function MusicPage() {
  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-[1390px]">
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Music</h1>
          <p className="text-lg text-muted-foreground">Explore our complete catalog of releases</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {releases.map((release) => (
            <ReleaseCard key={release.id} {...release} />
          ))}
        </div>
      </main>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
