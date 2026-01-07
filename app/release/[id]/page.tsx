"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PlayCircle, PauseCircle, ExternalLink, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getReleaseById } from "@/lib/releases-data"
import { useMusicPlayer } from "@/lib/music-player-context"
import { getRemainingPlays, isTrackPurchased } from "@/lib/play-count-storage"

const streamingPlatforms = [
  { 
    name: "Spotify",
    logo: "/spotify.svg"
  },
  { 
    name: "Apple Music",
    logo: "/apple-music-svgrepo-com.svg"
  },
  { 
    name: "YouTube",
    logo: "/youtube.svg"
  },
  { 
    name: "SoundCloud",
    logo: "/soundcloud-svgrepo-com.svg"
  },
]

export default function ReleasePage() {
  const params = useParams()
  const releaseId = params.id as string
  const release = getReleaseById(releaseId)
  const { playRelease, currentTrack, currentReleaseId, isPlaying, currentTime: globalCurrentTime, playlist } = useMusicPlayer()
  const [, forceUpdate] = useState({})

  if (!release) {
    return (
      <div className="min-h-screen pb-32 md:pb-24">
        <Header />
        <main className="container mx-auto px-4 py-8 md:py-12 max-w-[1390px]">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">Release Not Found</h1>
            <p className="text-muted-foreground mb-8">The release you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/music">Browse Music</Link>
            </Button>
          </div>
        </main>
        <MobileNav />
        <MusicPlayer />
      </div>
    )
  }

  const tracks = release.tracks

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleTrackClick = (trackNumber: number) => {
    const trackIndex = tracks.findIndex(t => t.number === trackNumber)
    if (trackIndex !== -1) {
      playRelease(release.id, tracks, trackIndex, release.image, release.title, release.artist)
      // Force re-render to update play counts
      forceUpdate({})
    }
  }


  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Header />
      <main className="container mx-auto px-4 pt-4 pb-22 md:pt-6 md:pb-12 max-w-[1390px]">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "Artists", href: "/artists" },
            { label: release.artist, href: `/artist/${release.artistId}` },
            { label: release.title }
          ]}
        />
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Album Art */}
          <div className="space-y-6">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
              <img
                src={release.image}
                alt={release.title}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Release Info */}
          <div className="space-y-6 px-4">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">{release.status} • {release.type}</p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{release.title}</h1>
              <Link
                href={`/artist/${release.artistId}`}
                className="text-xl text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {release.artist}
              </Link>
            </div>

            {/* Streaming Links */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide">Streaming</h2>
              <div className="grid grid-cols-2 gap-2">
                {streamingPlatforms.map((platform) => {
                  const platformKey = platform.name.toLowerCase().replace(' ', '') as keyof typeof release.streamingLinks
                  const link = release.streamingLinks[platformKey]
                  if (!link) return null
                  return (
                  <Button key={platform.name} variant="outline" className="justify-start gap-3 bg-transparent h-12" asChild>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <Image 
                        src={platform.logo} 
                        alt={platform.name}
                        width={24}
                        height={24}
                        className="shrink-0"
                      />
                      {platform.name}
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  </Button>
                  )
                })}
              </div>
            </div>

            {/* Purchase Options */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide">Purchase</h2>
              <div className="space-y-2">
                <Button variant="default" className="w-full justify-between h-12" asChild>
                  <a href="/api/checkout?products=DIGITAL_PRODUCT_ID&customerEmail=">
                    <span>Digital Download</span>
                    <span>$9.99</span>
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-between bg-transparent h-12" asChild>
                  <a href="/api/checkout?products=VINYL_PRODUCT_ID&customerEmail=">
                    <span>Vinyl</span>
                    <span>$24.99</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Tracklist */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide">Tracklist</h2>
              <Card className="divide-y divide-border py-0 gap-0 overflow-hidden">
                {tracks.map((track) => {
                  const isCurrentTrack = currentReleaseId === release.id && currentTrack?.number === track.number
                  const trackIsPlaying = isCurrentTrack && isPlaying
                  const trackId = `${release.id}-track-${track.number}`
                  const isPurchased = isTrackPurchased(trackId)
                  const remainingPlays = getRemainingPlays(trackId)

                  return (
                    <div
                      key={track.number}
                      className="w-full relative overflow-hidden group"
                    >
                      <div className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors relative z-10">
                        <button
                          onClick={() => handleTrackClick(track.number)}
                          className="w-8 h-8 flex items-center justify-center shrink-0 cursor-pointer"
                        >
                          {trackIsPlaying ? (
                            <PauseCircle className="h-6 w-6 text-primary" />
                          ) : (
                            <>
                              <span className="text-sm text-muted-foreground group-hover:hidden">{track.number}</span>
                              <PlayCircle className="h-6 w-6 hidden group-hover:block text-primary" />
                            </>
                          )}
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{track.title}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-muted-foreground">{track.key}</p>
                            {isPurchased ? (
                              <span className="text-xs text-green-500 font-medium">✓ Owned</span>
                            ) : remainingPlays > 0 ? (
                              <span className="text-xs text-amber-500 font-medium">{remainingPlays} plays left</span>
                            ) : (
                              <span className="text-xs text-red-500 font-medium">No plays left</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-0.5 min-w-[70px]">
                          <span className="text-sm text-muted-foreground tabular-nums">
                            {formatTime(track.duration)}
                          </span>
                          
                          {!isPurchased && (
                            <button
                              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                              onClick={() => window.location.href = `/api/checkout?products=TRACK_${track.number}_ID&customerEmail=`}
                            >
                              <ShoppingCart className="h-3.5 w-3.5" />
                              <span className="tabular-nums font-bold underline">${track.price}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Card>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide">About</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {release.description}
              </p>
            </div>
          </div>
        </div>
      </main>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
