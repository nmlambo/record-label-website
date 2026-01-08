import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { ArtistCard } from "@/components/artist-card"
import { Breadcrumb } from "@/components/breadcrumb"
import { getAllArtists } from "@/lib/artists-data"
import { releases } from "@/lib/releases-data"

const allArtists = getAllArtists()

const artists = allArtists.map(artist => ({
  id: artist.id,
  name: artist.name,
  genre: artist.genre,
  image: artist.image,
  releaseCount: artist.id === "soundquest" ? releases.length : Math.floor(Math.random() * 10) + 3,
}))

export default function ArtistsPage() {
  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-4 pt-4 pb-8 md:pt-6 md:pb-12 max-w-[1390px]">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "Artists" }
          ]}
        />
        
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
      </div>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
