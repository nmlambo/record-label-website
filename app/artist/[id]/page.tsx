import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { ReleaseCard } from "@/components/release-card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const socialLinks = [
  { name: "Instagram", url: "#" },
  { name: "Twitter", url: "#" },
  { name: "SoundCloud", url: "#" },
  { name: "Spotify", url: "#" },
]

const artistReleases = [
  {
    id: "midnight-dreams",
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    type: "Album",
    status: "Out now",
    image: "/album-cover-midnight-dreams-black-white.jpg",
  },
  {
    id: "wavelength",
    title: "Wavelength",
    artist: "Luna Eclipse",
    type: "EP",
    status: "Out now",
    image: "/wavelength-ep-cover-black-white.jpg",
  },
  {
    id: "stargazer",
    title: "Stargazer",
    artist: "Luna Eclipse",
    type: "Single",
    status: "Out now",
    image: "/stargazer-single-cover-black-white.jpg",
  },
  {
    id: "cosmic-drift",
    title: "Cosmic Drift",
    artist: "Luna Eclipse",
    type: "Album",
    status: "Out now",
    image: "/cosmic-drift-album-cover-black-white.jpg",
  },
]

export default function ArtistPage() {
  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-[1390px]">
        {/* Artist Header */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-muted mx-auto md:mx-0 w-full max-w-[300px]">
              <img
                src="/luna-eclipse-artist-portrait-black-white.jpg"
                alt="Luna Eclipse"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">Luna Eclipse</h1>
                <p className="text-lg text-muted-foreground mb-4">Electronic / Ambient</p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Luna Eclipse is an electronic music producer and composer known for creating immersive soundscapes that
                blend ambient textures with driving rhythms. With over a decade of experience, Luna has released on
                numerous labels and performed at festivals worldwide, earning recognition for her unique approach to
                electronic music production.
              </p>

              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  <Button key={link.name} variant="outline" size="sm" className="bg-transparent" asChild>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.name}
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Artist Releases */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Releases</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {artistReleases.map((release) => (
              <ReleaseCard key={release.id} {...release} />
            ))}
          </div>
        </div>
      </main>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
