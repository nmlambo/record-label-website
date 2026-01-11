"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { ReleaseCard } from "@/components/release-card"
import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { VerifiedBadge } from "@/components/verified-badge"
import { ExternalLink, Upload } from "lucide-react"
import { releases } from "@/lib/releases-data"
import { getArtistById } from "@/lib/artists-data"
import { useAuth } from "@/lib/auth-context"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function ArtistPage() {
  const { user } = useAuth()
  const params = useParams()
  const artistId = params.id as string
  
  const artistInfo = getArtistById(artistId)
  
  if (!artistInfo) {
    return (
      <div className="min-h-screen pb-32 md:pb-24">
        <Sidebar />
        <div className="md:ml-64">
          <Header />
          <main className="container mx-auto px-6 pt-6 pb-24 md:px-12 md:pt-12 md:pb-16 max-w-[1390px]">
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold mb-4">Artist Not Found</h1>
            <p className="text-muted-foreground mb-6">The artist you're looking for doesn't exist.</p>
            <Link href="/artists">
              <Button>Back to Artists</Button>
            </Link>
          </div>
        </main>
        </div>
        <MobileNav />
        <MusicPlayer />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-6 pt-6 pb-24 md:px-12 md:pt-12 md:pb-16 max-w-[1390px]">
        <div className="relative z-10">
          <Breadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Artists", href: "/artists" },
              { label: artistInfo.name }
            ]}
          />
        </div>
        
        {/* Artist Hero with Brush Stroke Effect */}
        <div className="relative mb-4 md:mb-6">
          {/* Hero Image with Brush Stroke Mask */}
          <div className="relative flex justify-center -my-12 md:-my-16">
            <div 
              className="relative w-full max-w-xl md:max-w-2xl aspect-[4/3] md:aspect-video"
              style={{
                maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 500'%3E%3Cpath d='M80,180 L85,175 L90,180 L95,170 L100,175 L105,165 L110,170 L120,160 L130,155 L145,150 Q180,130 220,120 T280,100 T350,90 T420,85 T500,80 T580,85 T650,95 T720,110 T780,130 L800,140 L810,145 L820,150 L830,160 L840,165 L850,175 L855,180 L860,190 L865,200 L870,210 L875,225 L880,240 L885,260 L890,280 L892,300 L890,320 L885,340 L880,355 L875,365 L870,375 L865,385 L860,395 L855,400 L850,405 L840,410 L830,415 L820,420 L810,425 L800,428 L785,432 Q750,440 710,448 T650,460 T580,468 T500,472 T420,470 T350,465 T280,455 T220,442 L180,430 L160,423 L145,418 L130,412 L120,408 L110,402 L100,395 L90,388 L85,380 L80,370 L75,358 L70,345 L65,330 L60,310 L58,290 L60,270 L65,250 L70,230 L75,210 L80,195 Z' fill='black'/%3E%3C/svg%3E")`,
                WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 500'%3E%3Cpath d='M80,180 L85,175 L90,180 L95,170 L100,175 L105,165 L110,170 L120,160 L130,155 L145,150 Q180,130 220,120 T280,100 T350,90 T420,85 T500,80 T580,85 T650,95 T720,110 T780,130 L800,140 L810,145 L820,150 L830,160 L840,165 L850,175 L855,180 L860,190 L865,200 L870,210 L875,225 L880,240 L885,260 L890,280 L892,300 L890,320 L885,340 L880,355 L875,365 L870,375 L865,385 L860,395 L855,400 L850,405 L840,410 L830,415 L820,420 L810,425 L800,428 L785,432 Q750,440 710,448 T650,460 T580,468 T500,472 T420,470 T350,465 T280,455 T220,442 L180,430 L160,423 L145,418 L130,412 L120,408 L110,402 L100,395 L90,388 L85,380 L80,370 L75,358 L70,345 L65,330 L60,310 L58,290 L60,270 L65,250 L70,230 L75,210 L80,195 Z' fill='black'/%3E%3C/svg%3E")`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                filter: 'drop-shadow(0 15px 40px rgba(0, 0, 0, 0.25)) drop-shadow(0 8px 15px rgba(0, 0, 0, 0.2))',
              }}
            >
              <img
                src={artistInfo.image}
                alt={artistInfo.name}
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>

          {/* Artist Info Below Image */}
          <div className="max-w-7xl mx-auto mb-6 md:mb-12 mt-8 md:mt-16 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3 flex items-center gap-2 justify-center md:justify-start">
              {artistInfo.name}
              <VerifiedBadge className="w-8 h-8 md:w-10 md:h-10 shrink-0" />
            </h1>
            <p className="text-lg text-muted-foreground mb-6">{artistInfo.genre}</p>
            
            {/* <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto md:mx-0 mb-6">
              {artistInfo.bio}
            </p> */}

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {artistInfo.socialLinks.map((link) => {
                const getIconPath = (name: string) => {
                  switch(name.toLowerCase()) {
                    case 'instagram':
                      return '/instagram-icon.svg'
                    case 'facebook':
                      return '/facebook-icon.svg'
                    case 'twitter':
                      return '/x-icon.svg'
                    case 'spotify':
                      return '/spotify-icon.svg'
                    case 'youtube':
                      return '/youtube-icon.svg'
                    case 'soundcloud':
                      return '/soundcloud-icon.svg'
                    default:
                      return null
                  }
                }
                
                const iconPath = getIconPath(link.name)
                
                return (
                  <a 
                    key={link.name}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="sr-only">{link.name}</span>
                    {iconPath ? (
                      <Image 
                        src={iconPath} 
                        alt={link.name}
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                    ) : (
                      <ExternalLink className="h-5 w-5" />
                    )}
                  </a>
                )
              })}
            </div>

            {/* Upload button for authenticated user - only for SoundQuest */}
            {user && artistId === "soundquest" && (
              <div className="pt-6 mt-6 border-t border-border">
                <Link href="/upload">
                  <Button className="w-full md:w-auto bg-black text-white hover:bg-black/90">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Music
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Artist Releases */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Releases</h2>
            {user && artistId === "soundquest" && (
              <Link href="/upload" className="hidden md:block">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {releases
              .filter(release => release.artistId === artistId)
              .map((release) => (
                <ReleaseCard key={release.id} {...release} />
              ))}
          </div>
          {releases.filter(release => release.artistId === artistId).length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No releases yet for this artist.</p>
            </div>
          )}
        </div>
      </main>
      </div>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
