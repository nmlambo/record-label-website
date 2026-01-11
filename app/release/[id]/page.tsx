"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PlayCircle, PauseCircle, ExternalLink, ShoppingCart, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getReleaseById } from "@/lib/releases-data"
import { useMusicPlayer } from "@/lib/music-player-context"
import { getRemainingPlays, isTrackPurchased } from "@/lib/play-count-storage"
import { getSamplePackById } from "@/lib/sample-packs-data"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { getPolarProductId } from "@/lib/polar-products"

const streamingPlatforms = [
  { 
    name: "Spotify",
    logo: "/spotify.svg",
    color: "#1DB954"
  },
  { 
    name: "Apple Music",
    logo: "/apple-music.svg",
    color: "#FA2D48"
  },
  { 
    name: "YouTube",
    logo: "/youtube.svg",
    color: "#FF0000"
  },
]

export default function ReleasePage() {
  const params = useParams()
  const router = useRouter()
  const releaseId = params.id as string
  const release = getReleaseById(releaseId)
  const { playRelease, currentTrack, currentReleaseId, isPlaying, currentTime: globalCurrentTime, playlist } = useMusicPlayer()
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()
  const [, forceUpdate] = useState({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = () => {
    if (!release) return

    const productId = getPolarProductId(release.type, release.price, false)

    addItem({
      id: release.id,
      productId: productId,
      title: release.title,
      artist: release.artist,
      type: release.type,
      price: release.price,
      image: release.image,
      releaseId: release.id,
      isTrack: false,
    })

    toast({
      title: "Added to cart",
      description: `${release.title} has been added to your cart.`,
      action: <ToastAction altText="View cart" onClick={() => router.push('/cart')}>View</ToastAction>,
    })
  }

  const handleAddTrackToCart = (track: any) => {
    if (!release) return

    const trackId = `${release.id}-track-${track.number}`
    const productId = getPolarProductId("Track", track.price, true)

    addItem({
      id: trackId,
      productId: productId,
      title: track.title,
      artist: release.artist,
      type: "Track",
      price: track.price,
      image: release.image,
      releaseId: release.id,
      trackNumber: track.number,
      isTrack: true,
    })

    toast({
      title: "Added to cart",
      description: `${track.title} has been added to your cart.`,
      action: <ToastAction altText="View cart" onClick={() => router.push('/cart')}>View</ToastAction>,
    })
  }

  const handleToggleWishlist = () => {
    if (!release) return

    const inWishlist = isInWishlist(release.id)

    if (inWishlist) {
      removeFromWishlist(release.id)
      toast({
        title: "Removed from wishlist",
        description: `${release.title} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist({
        id: release.id,
        title: release.title,
        artist: release.artist,
        type: release.type,
        price: release.price,
        image: release.image,
        releaseId: release.id,
      })
      toast({
        title: "Added to wishlist",
        description: `${release.title} has been added to your wishlist.`,
        action: <ToastAction altText="View wishlist" onClick={() => router.push('/wishlist')}>View</ToastAction>,
      })
    }
  }

  if (!release) {
    return (
      <div className="min-h-screen pb-32 md:pb-24">
        <Sidebar />
        <div className="md:ml-64">
          <Header />
          <main className="container mx-auto px-6 pt-6 pb-24 md:px-12 md:pt-12 md:pb-16 max-w-[1390px]">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">Release Not Found</h1>
            <p className="text-muted-foreground mb-8">The release you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/music">Browse Music</Link>
            </Button>
          </div>
        </main>
        </div>
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
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-6 pt-6 pb-24 md:px-12 md:pt-12 md:pb-16 max-w-[1390px]">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "Artists", href: "/artists" },
            { label: release.artist, href: `/artist/${release.artistId}` },
            { label: release.title }
          ]}
        />
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-6 max-w-6xl mx-auto">
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
                  
                  // Inline colored SVG icons
                  const getIcon = () => {
                    if (platform.name === "Spotify") {
                      return (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="12" fill="#1DB954"/>
                          <path d="M17.5 10.5c-3.2-1.9-8.5-2.1-11.6-1.2-.5.2-1 0-1.2-.5-.2-.5 0-1 .5-1.2 3.6-1 9.4-.8 13.1 1.3.4.3.6.8.3 1.2-.3.4-.8.6-1.1.4zm-.1 2.8c-.3.3-.8.4-1.1.1-2.7-1.6-6.8-2.1-10-1.1-.4.1-.9-.1-1-.5-.1-.4.1-.9.5-1 3.7-1.1 8.2-.6 11.3 1.3.4.2.5.7.3 1.2zm-1.2 2.7c-.2.3-.6.4-.9.2-2.3-1.4-5.2-1.7-8.6-.9-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 3.7-.9 6.9-.5 9.6 1.1.3.2.4.6.3.8z" fill="white"/>
                        </svg>
                      )
                    } else if (platform.name === "YouTube") {
                      return (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23.5 6.5c-.3-1.1-1.1-1.9-2.2-2.2C19.4 4 12 4 12 4s-7.4 0-9.3.3C1.6 4.6.8 5.4.5 6.5.2 8.4.2 12.2.2 12.2s0 3.8.3 5.7c.3 1.1 1.1 1.9 2.2 2.2 1.9.3 9.3.3 9.3.3s7.4 0 9.3-.3c1.1-.3 1.9-1.1 2.2-2.2.3-1.9.3-5.7.3-5.7s0-3.8-.3-5.7z" fill="#FF0000"/>
                          <path d="M9.5 15.5l6.2-3.3-6.2-3.3v6.6z" fill="white"/>
                        </svg>
                      )
                    } else if (platform.name === "Apple Music") {
                      return (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="12" fill="#FA2D48"/>
                          <path d="M18 6.5v8.8c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.5 0 1 .1 1.4.4V8.7l-6 1.7v7.4c0 1.5-1.2 2.7-2.7 2.7S5.3 19.3 5.3 17.8s1.2-2.7 2.7-2.7c.5 0 1 .1 1.4.4V6.5l8.6-2.5v2.5z" fill="white"/>
                        </svg>
                      )
                    }
                  }
                  
                  return (
                  <Button key={platform.name} variant="outline" className="justify-start gap-3 bg-transparent h-12" asChild>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <span className="shrink-0">
                        {getIcon()}
                      </span>
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
              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  className="flex-1 justify-between h-12"
                  onClick={handleAddToCart}
                >
                  <span className="flex items-center gap-2">
                    <ShoppingCart className="size-4" />
                    Add to Cart
                  </span>
                  <span>${release.price.toFixed(2)}</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 shrink-0"
                  onClick={handleToggleWishlist}
                >
                  <Heart className={`size-5 ${isInWishlist(release.id) ? 'fill-current text-rose-500' : ''}`} />
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
                            {mounted && (
                              <>
                                {isPurchased ? (
                                  <span className="text-xs text-green-500 font-medium">✓ Owned</span>
                                ) : remainingPlays > 0 ? (
                                  <span className="text-xs text-amber-500 font-medium">{remainingPlays} plays left</span>
                                ) : (
                                  <span className="text-xs text-red-500 font-medium">No plays left</span>
                                )}
                              </>
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
                              onClick={() => handleAddTrackToCart(track)}
                            >
                              <ShoppingCart className="h-3.5 w-3.5" />
                              <span className="tabular-nums font-bold underline">${track.price.toFixed(2)}</span>
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
      </div>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
