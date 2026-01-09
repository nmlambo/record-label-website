import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card } from "@/components/ui/card"
import { Download } from "lucide-react"
import Link from "next/link"
import { getAllSamplePacks } from "@/lib/sample-packs-data"

const samplePacks = getAllSamplePacks()

export default function SamplePacksPage() {
  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-6 pt-6 pb-24 md:px-12 md:pt-12 md:pb-16 max-w-[1390px]">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "Sample Packs" }
          ]}
        />
        
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-6xl font-bold tracking-tight mb-4">Sample Packs</h1>
          <p className="text-xs md:text-lg text-muted-foreground">
            Professional sound libraries and sample packs crafted by our artists
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {samplePacks.map((pack) => (
            <Link key={pack.id} href={`/sample-packs/${pack.id}`} className="cursor-pointer">
              <Card className="flex flex-col gap-6 rounded-xl border shadow-sm group relative overflow-hidden border-border hover:border-foreground transition-all duration-300 py-0">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <img
                    src={pack.image || "/placeholder.svg"}
                    alt={`${pack.title} by ${pack.artist}`}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <Download className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{pack.samples} samples</p>
                    <p className="text-xs text-muted-foreground">${pack.price}</p>
                  </div>
                  <h3 className="font-semibold text-sm md:text-base mb-1 line-clamp-1">{pack.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{pack.artist}</p>
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
