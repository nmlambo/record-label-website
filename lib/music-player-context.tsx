"use client"

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react"
import { Track } from "./releases-data"
import { incrementPlayCount, hasFreePlaysRemaining, isTrackPurchased } from "./play-count-storage"

interface MusicPlayerContextType {
  currentTrack: Track | null
  currentReleaseId: string | null
  currentReleaseImage: string | null
  currentReleaseTitle: string | null
  currentArtist: string | null
  playlist: Track[]
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  playRelease: (releaseId: string, tracks: Track[], startIndex?: number, releaseImage?: string, releaseTitle?: string, artist?: string) => void
  playTrack: (track: Track) => void
  togglePlayPause: () => void
  skipToNext: () => void
  skipToPrevious: () => void
  seekTo: (time: number) => void
  setVolume: (volume: number) => void
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined)

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [currentReleaseId, setCurrentReleaseId] = useState<string | null>(null)
  const [currentReleaseImage, setCurrentReleaseImage] = useState<string | null>(null)
  const [currentReleaseTitle, setCurrentReleaseTitle] = useState<string | null>(null)
  const [currentArtist, setCurrentArtist] = useState<string | null>(null)
  const [playlist, setPlaylist] = useState<Track[]>([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(70)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio()
      
      const audio = audioRef.current
      
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime)
      })
      
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration)
      })
      
      audio.addEventListener('ended', () => {
        skipToNext()
      })

      return () => {
        audio.pause()
        audio.src = ''
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const playRelease = (releaseId: string, tracks: Track[], startIndex: number = 0, releaseImage?: string, releaseTitle?: string, artist?: string) => {
    const track = tracks[startIndex]
    const trackId = `${releaseId}-track-${track.number}`
    
    // Check if track can be played
    const isPurchased = isTrackPurchased(trackId)
    const hasPlays = hasFreePlaysRemaining(trackId)
    
    if (!isPurchased && !hasPlays) {
      // Track has no free plays left and is not purchased
      alert(`You've used all 5 free plays for "${track.title}". Purchase the track for $${track.price} to continue listening.`)
      return
    }
    
    setCurrentReleaseId(releaseId)
    setCurrentReleaseImage(releaseImage || null)
    setCurrentReleaseTitle(releaseTitle || null)
    setCurrentArtist(artist || null)
    setPlaylist(tracks)
    setCurrentTrackIndex(startIndex)
    setCurrentTrack(track)
    
    if (audioRef.current && track) {
      audioRef.current.src = track.audioUrl
      audioRef.current.play()
      setIsPlaying(true)
      
      // Increment play count only if not purchased
      if (!isPurchased) {
        incrementPlayCount(trackId)
      }
    }
  }

  const playTrack = (track: Track) => {
    setCurrentTrack(track)
    
    if (audioRef.current) {
      audioRef.current.src = track.audioUrl
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const togglePlayPause = () => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const skipToNext = () => {
    if (playlist.length === 0) return
    
    const nextIndex = (currentTrackIndex + 1) % playlist.length
    setCurrentTrackIndex(nextIndex)
    setCurrentTrack(playlist[nextIndex])
    
    if (audioRef.current) {
      audioRef.current.src = playlist[nextIndex].audioUrl
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const skipToPrevious = () => {
    if (playlist.length === 0) return
    
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length
    setCurrentTrackIndex(prevIndex)
    setCurrentTrack(playlist[prevIndex])
    
    if (audioRef.current) {
      audioRef.current.src = playlist[prevIndex].audioUrl
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume)
  }

  return (
    <MusicPlayerContext.Provider
      value={{
        currentTrack,
        currentReleaseId,
        currentReleaseImage,
        currentReleaseTitle,
        currentArtist,
        playlist,
        isPlaying,
        currentTime,
        duration,
        volume,
        playRelease,
        playTrack,
        togglePlayPause,
        skipToNext,
        skipToPrevious,
        seekTo,
        setVolume,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  )
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext)
  if (context === undefined) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider")
  }
  return context
}
