import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { ArtistCard } from "@/components/artist-card"

const artists = [
  {
    id: "luna-eclipse",
    name: "Luna Eclipse",
    genre: "Electronic / Ambient",
    image: "/luna-eclipse-artist-portrait-black-white.jpg",
    releaseCount: 12,
  },
  {
    id: "stellar-wave",
    name: "Stellar Wave",
    genre: "House / Techno",
    image: "/stellar-wave-artist-portrait-black-white.jpg",
    releaseCount: 8,
  },
  {
    id: "nova-sound",
    name: "Nova Sound",
    genre: "Downtempo / Chill",
    image: "/nova-sound-artist-portrait-black-white.jpg",
    releaseCount: 15,
  },
  {
    id: "metro-beats",
    name: "Metro Beats",
    genre: "Hip Hop / Beats",
    image: "/metro-beats-artist-portrait-black-white.jpg",
    releaseCount: 6,
  },
  {
    id: "echo-chamber",
    name: "Echo Chamber",
    genre: "Experimental / IDM",
    image: "/echo-chamber-artist-portrait-black-white.jpg",
    releaseCount: 10,
  },
  {
    id: "rhythm-collective",
    name: "Rhythm Collective",
    genre: "Drum & Bass",
    image: "/rhythm-collective-artist-portrait-black-white.jpg",
    releaseCount: 9,
  },
]

export default function ArtistsPage() {
  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-[1390px]">
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Artists</h1>
          <p className="text-lg text-muted-foreground">Meet the talented artists on our label</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} {...artist} />
          ))}
        </div>
      </main>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
