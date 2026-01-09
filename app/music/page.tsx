import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Breadcrumb } from "@/components/breadcrumb"
import { releases } from "@/lib/releases-data"
import Link from "next/link"
import { Play } from "lucide-react"

export default function MusicPage() {
  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-6 pt-6 pb-24 md:px-12 md:pt-12 md:pb-16 max-w-[1390px]">
          <Breadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Music" }
            ]}
          />
          
          <div className="mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Music</h1>
            <p className="text-lg text-muted-foreground">Browse all releases from our label</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {releases.map((release) => (
              <Link
                key={release.id}
                href={`/release/${release.id}`}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square mb-3 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={release.image}
                    alt={release.title}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white rounded-full p-3">
                        <Play className="h-6 w-6 text-black fill-black" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="text-xs font-semibold bg-black/80 text-white px-2 py-1 rounded">
                      {release.type}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base mb-1 truncate group-hover:text-primary transition-colors">
                    {release.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">
                    {release.artist}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {release.status}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
