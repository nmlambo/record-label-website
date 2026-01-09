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
                const getSocialIcon = (name: string) => {
                  switch(name.toLowerCase()) {
                    case 'facebook':
                      return <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    case 'twitter':
                      return <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    case 'instagram':
                      return <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    case 'youtube':
                      return <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    case 'soundcloud':
                      return <svg className="h-5 w-5" fill="currentColor" viewBox="-271 345.8 256 111.2"><path d="M-238.4,398.1c-0.8,0-1.4,0.6-1.5,1.5l-2.3,28l2.3,27.1c0.1,0.8,0.7,1.5,1.5,1.5c0.8,0,1.4-0.6,1.5-1.5l2.6-27.1l-2.6-28C-237,398.7-237.7,398.1-238.4,398.1z"/><path d="M-228.2,399.9c-0.9,0-1.7,0.7-1.7,1.7l-2.1,26l2.1,27.3c0.1,1,0.8,1.7,1.7,1.7c0.9,0,1.6-0.7,1.7-1.7l2.4-27.3l-2.4-26C-226.6,400.6-227.3,399.9-228.2,399.9z"/><path d="M-258.6,403.5c-0.5,0-1,0.4-1.1,1l-2.5,23l2.5,22.5c0.1,0.6,0.5,1,1.1,1c0.5,0,1-0.4,1.1-1l2.9-22.5l-2.9-23C-257.7,404-258.1,403.5-258.6,403.5z"/><path d="M-268.1,412.3c-0.5,0-1,0.4-1,1l-1.9,14.3l1.9,14c0.1,0.6,0.5,1,1,1s0.9-0.4,1-1l2.2-14l-2.2-14.2C-267.2,412.8-267.6,412.3-268.1,412.3z"/><path d="M-207.5,373.5c-1.2,0-2.1,0.9-2.2,2.1l-1.9,52l1.9,27.2c0.1,1.2,1,2.1,2.2,2.1s2.1-0.9,2.2-2.1l2.1-27.2l-2.1-52C-205.4,374.4-206.4,373.5-207.5,373.5z"/><path d="M-248.6,399c-0.7,0-1.2,0.5-1.3,1.3l-2.4,27.3l2.4,26.3c0.1,0.7,0.6,1.3,1.3,1.3c0.7,0,1.2-0.5,1.3-1.2l2.7-26.3l-2.7-27.3C-247.4,399.6-247.9,399-248.6,399z"/><path d="M-217.9,383.4c-1,0-1.9,0.8-1.9,1.9l-2,42.3l2,27.3c0.1,1.1,0.9,1.9,1.9,1.9s1.9-0.8,1.9-1.9l2.3-27.3l-2.3-42.3C-216,384.2-216.9,383.4-217.9,383.4z"/><path d="M-154.4,359.3c-1.8,0-3.2,1.4-3.2,3.2l-1.2,65l1.2,26.1c0,1.8,1.5,3.2,3.2,3.2c1.8,0,3.2-1.5,3.2-3.2l1.4-26.1l-1.4-65C-151.1,360.8-152.6,359.3-154.4,359.3z"/><path d="M-197.1,368.9c-1.3,0-2.3,1-2.4,2.4l-1.8,56.3l1.8,26.9c0,1.3,1.1,2.3,2.4,2.3s2.3-1,2.4-2.4l2-26.9l-2-56.3C-194.7,370-195.8,368.9-197.1,368.9z"/><path d="M-46.5,394c-4.3,0-8.4,0.9-12.2,2.4C-61.2,368-85,345.8-114,345.8c-7.1,0-14,1.4-20.1,3.8c-2.4,0.9-3,1.9-3,3.7v99.9c0,1.9,1.5,3.5,3.4,3.7c0.1,0,86.7,0,87.3,0c17.4,0,31.5-14.1,31.5-31.5C-15,408.1-29.1,394-46.5,394z"/><path d="M-143.6,353.2c-1.9,0-3.4,1.6-3.5,3.5l-1.4,70.9l1.4,25.7c0,1.9,1.6,3.4,3.5,3.4c1.9,0,3.4-1.6,3.5-3.5l1.5-25.8l-1.5-70.9C-140.2,354.8-141.7,353.2-143.6,353.2z"/><path d="M-186.5,366.8c-1.4,0-2.5,1.1-2.6,2.6l-1.6,58.2l1.6,26.7c0,1.4,1.2,2.6,2.6,2.6s2.5-1.1,2.6-2.6l1.8-26.7l-1.8-58.2C-184,367.9-185.1,366.8-186.5,366.8z"/><path d="M-175.9,368.1c-1.5,0-2.8,1.2-2.8,2.8l-1.5,56.7l1.5,26.5c0,1.6,1.3,2.8,2.8,2.8s2.8-1.2,2.8-2.8l1.7-26.5l-1.7-56.7C-173.1,369.3-174.3,368.1-175.9,368.1z"/><path d="M-165.2,369.9c-1.7,0-3,1.3-3,3l-1.4,54.7l1.4,26.3c0,1.7,1.4,3,3,3c1.7,0,3-1.3,3-3l1.5-26.3l-1.5-54.7C-162.2,371.3-163.5,369.9-165.2,369.9z"/></svg>
                    case 'spotify':
                      return <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                    default:
                      return <ExternalLink className="h-5 w-5" />
                  }
                }
                
                return (
                  <a 
                    key={link.name}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-white/5 transition-colors"
                  >
                    <span className="sr-only">{link.name}</span>
                    {getSocialIcon(link.name)}
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
