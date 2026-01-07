"use client"

import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useMusicPlayer } from "@/lib/music-player-context"

export function MusicPlayer() {
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

  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-2xl supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 py-3 max-w-[1390px]">
        <div className="flex items-center gap-4">
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
              <p className="text-xs text-muted-foreground truncate">
                {currentArtist || "Select a track to play"}
              </p>
            </div>
          </div>

          {/* Controls - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" onClick={skipToPrevious}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="h-5 w-5 fill-current ml-0.5" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" onClick={skipToNext}>
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

          {/* Controls - Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" onClick={skipToPrevious}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="h-5 w-5 fill-current ml-0.5" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" onClick={skipToNext}>
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
      </div>
    </div>
  )
}
