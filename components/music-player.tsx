"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Play, Pause, SkipBack, SkipForward, Volume2, Home, Users, Drum, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useMusicPlayer } from "@/lib/music-player-context"
import { DevicePicker } from "@/components/device-picker"
import { VerifiedBadge } from "@/components/verified-badge"
import { cn } from "@/lib/utils"

export function MusicPlayer() {
  const [isDevicePickerOpen, setIsDevicePickerOpen] = useState(false)
  const pathname = usePathname()
  
  const {
    currentTrack,
    currentReleaseImage,
    currentReleaseTitle,
    currentArtist,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlayPause,
    skipToNext,
    skipToPrevious,
    seekTo,
    setVolume: setPlayerVolume,
  } = useMusicPlayer()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/artists", label: "Artists", icon: Users },
    { href: "/sample-packs", label: "Samples", icon: Drum },
    { href: "/search", label: "Search", icon: Search },
    { href: "/profile", label: "Profile", icon: User },
  ]

  const handleSeek = (value: number[]) => {
    if (duration) {
      const newTime = (value[0] / 100) * duration
      seekTo(newTime)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setPlayerVolume(value[0])
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = duration ? (currentTime / duration) * 100 : 0
  const hasTrack = currentTrack !== null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-gradient-to-t from-background via-background to-background/0 dark:bg-background/95 backdrop-blur-2xl supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 py-3 max-w-[1390px]">
        <div className={`flex items-center gap-4 ${!hasTrack ? 'opacity-50' : ''}`}>
          {/* Track Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-muted rounded shrink-0">
              {currentReleaseImage ? (
                <img
                  src={currentReleaseImage}
                  alt={currentReleaseTitle || "Album artwork"}
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Play className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">
                {currentTrack ? currentTrack.title : "No track playing"}
              </p>
              <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
                {currentArtist || "Select a track to play"}
                {currentArtist && <VerifiedBadge className="w-3 h-3 shrink-0" />}
              </p>
            </div>
          </div>

          {/* Controls - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 cursor-pointer" 
              onClick={skipToPrevious}
              disabled={!hasTrack}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={togglePlayPause}
              disabled={!hasTrack}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="h-5 w-5 fill-current ml-0.5" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 cursor-pointer" 
              onClick={skipToNext}
              disabled={!hasTrack}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar - Desktop */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
            <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[progress]}
              onValueChange={handleSeek}
              max={100}
              step={0.1}
              className="flex-1 cursor-pointer"
            />
            <span className="text-xs text-muted-foreground tabular-nums w-10">
              {formatTime(duration)}
            </span>
          </div>

          {/* Volume - Desktop */}
          <div className="hidden md:flex items-center gap-2 w-32">
            <Volume2 className="h-4 w-4 text-muted-foreground shrink-0" />
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="flex-1 cursor-pointer"
            />
          </div>

          {/* Connect to Device Button - Desktop */}
          <div className="hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsDevicePickerOpen(true)}
              aria-label="Connect to a device"
            >
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15h-6.5A1.75 1.75 0 0 1 6 13.25zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25zm-6 0a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25H4V11H1.75A1.75 1.75 0 0 1 0 9.25v-6.5C0 1.784.784 1 1.75 1H4v1.5zM4 15H2v-1.5h2z"/>
                <path d="M13 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-1-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
              </svg>
            </Button>
          </div>

          {/* Controls - Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 cursor-pointer" 
              onClick={skipToPrevious}
              disabled={!hasTrack}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={togglePlayPause}
              disabled={!hasTrack}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="h-5 w-5 fill-current ml-0.5" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 cursor-pointer" 
              onClick={skipToNext}
              disabled={!hasTrack}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress Bar - Mobile */}
        <div className="flex md:hidden items-center gap-2 mt-2">
          <span className="text-xs text-muted-foreground tabular-nums">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[progress]}
            onValueChange={handleSeek}
            max={100}
            step={0.1}
            className="flex-1 cursor-pointer"
          />
          <span className="text-xs text-muted-foreground tabular-nums">
            {formatTime(duration)}
          </span>
        </div>

        {/* Mobile Navigation - Integrated */}
        <div className="md:hidden grid grid-cols-5 h-16 mt-3 -mx-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            const showIndicator = item.href === '/sample-packs'

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer relative",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
                {showIndicator && (
                  <span className={`absolute top-3 right-[calc(50%-12px)] w-1.5 h-1.5 bg-green-500 rounded-full ${!isActive ? 'animate-pulse' : ''}`} />
                )}
              </Link>
            )
          })}
        </div>
      </div>
      
      {/* Device Picker */}
      <DevicePicker 
        isOpen={isDevicePickerOpen} 
        onClose={() => setIsDevicePickerOpen(false)} 
      />
    </div>
  )
}
