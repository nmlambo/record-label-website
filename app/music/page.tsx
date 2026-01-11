import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card } from "@/components/ui/card"
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
                className="cursor-pointer"
              >
                <Card className="group relative overflow-hidden border-border hover:border-foreground transition-all duration-300 py-0">
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    <img
                      src={release.image}
                      alt={release.title}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-primary rounded-full p-3">
                          <Play className="h-6 w-6 text-primary-foreground fill-primary-foreground" />
                        </div>
                      </div>
                    </div>
                    {release.isNew && (
                      <div className="absolute top-2 right-2">
                        <span className="text-xs font-semibold bg-green-500 text-white px-2 py-1 rounded">
                          NEW
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 md:p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{release.status}</p>
                      <p className="text-xs text-muted-foreground">{release.type}</p>
                    </div>
                    <h3 className="font-semibold text-sm md:text-base mb-1 line-clamp-1">{release.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{release.artist}</p>
                  </div>
                </Card>
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
