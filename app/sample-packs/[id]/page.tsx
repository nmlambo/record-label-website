"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PlayCircle, PauseCircle, Download, ShoppingCart, Check } from "lucide-react"
import Link from "next/link"
import { getSamplePackById } from "@/lib/sample-packs-data"

export default function SamplePackPage() {
  const params = useParams()
  const packId = params.id as string
  const pack = getSamplePackById(packId)
  const [currentPreview, setCurrentPreview] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  if (!pack) {
    return (
      <div className="min-h-screen pb-32 md:pb-24">
        <Sidebar />
        <div className="md:ml-64">
          <Header />
          <main className="container mx-auto px-6 pt-6 pb-24 md:px-12 md:pt-12 md:pb-16 max-w-[1390px]">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">Sample Pack Not Found</h1>
            <p className="text-muted-foreground mb-8">The sample pack you're looking for doesn't exist.</p>
            <Link href="/sample-packs">
              <Button>Browse Sample Packs</Button>
            </Link>
          </div>
        </main>
        </div>
        <MobileNav />
        <MusicPlayer />
      </div>
    )
  }

  const handlePreviewPlay = (sampleId: string) => {
    if (currentPreview === sampleId && isPlaying) {
      setIsPlaying(false)
    } else {
      setCurrentPreview(sampleId)
      setIsPlaying(true)
    }
  }

  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-6 pt-6 pb-24 md:px-12 md:pt-12 md:pb-16 max-w-[1390px]">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "Sample Packs", href: "/sample-packs" },
            { label: pack.title }
          ]}
        />
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Pack Art */}
          <div className="space-y-6">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
              <img
                src={pack.image}
                alt={pack.title}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Pack Info */}
          <div className="space-y-6 px-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {pack.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-muted rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{pack.title}</h1>
              <Link
                href={`/artist/${pack.artistId}`}
                className="text-xl text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {pack.artist}
              </Link>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {pack.description}
            </p>

            {/* Pack Details */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Samples</p>
                <p className="font-semibold">{pack.samples}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Size</p>
                <p className="font-semibold">{pack.size}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Formats</p>
                <p className="font-semibold">{pack.formats.join(", ")}</p>
              </div>
              {pack.bpm && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">BPM</p>
                  <p className="font-semibold">{pack.bpm}</p>
                </div>
              )}
            </div>

            {/* Price & Purchase */}
            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">${pack.price}</span>
                <span className="text-muted-foreground">USD</span>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-black text-white hover:bg-black/90" size="lg">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-3">What's Included</h3>
              <ul className="space-y-2">
                {pack.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-green-600 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Preview Samples */}
        <div className="max-w-6xl mx-auto mt-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Preview Samples</h2>
          <div className="space-y-2">
            {pack.previewSamples.map((sample) => (
              <Card key={sample.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handlePreviewPlay(sample.id)}
                      className="shrink-0"
                    >
                      {currentPreview === sample.id && isPlaying ? (
                        <PauseCircle className="h-8 w-8" />
                      ) : (
                        <PlayCircle className="h-8 w-8" />
                      )}
                    </Button>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{sample.name}</h4>
                      <p className="text-sm text-muted-foreground">{sample.duration}</p>
                    </div>
                  </div>
                  <Download className="h-5 w-5 text-muted-foreground cursor-not-allowed opacity-50" />
                </div>
              </Card>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Purchase to unlock all {pack.samples} samples
          </p>
        </div>
      </main>
      </div>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
