"use client"

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react"
import { Track } from "./releases-data"
import { incrementPlayCount, hasFreePlaysRemaining, isTrackPurchased } from "./play-count-storage"
import { saveLastPlayedTrack, getLastPlayedTrack, type LastPlayedTrack } from "./last-played-storage"

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
  playSample: (sampleName: string, audioUrl: string, packTitle: string, packImage?: string, artist?: string) => void
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
      
      // Enable preloading for faster playback
      audio.preload = 'auto'
      
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime)
      })
      
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration)
      })
      
      audio.addEventListener('ended', () => {
        skipToNext()
      })

      // Load last played track for returning users
      const lastPlayed = getLastPlayedTrack()
      if (lastPlayed) {
        setCurrentReleaseId(lastPlayed.releaseId)
        setCurrentReleaseImage(lastPlayed.releaseImage)
        setCurrentReleaseTitle(lastPlayed.releaseTitle)
        setCurrentArtist(lastPlayed.artist)
        setCurrentTrack({
          number: lastPlayed.trackNumber,
          title: lastPlayed.trackTitle,
          duration: lastPlayed.trackDuration,
          price: lastPlayed.trackPrice,
          audioUrl: lastPlayed.trackAudioUrl,
          key: lastPlayed.trackId,
        })
        // Preload the last played track for instant playback
        audio.src = lastPlayed.trackAudioUrl
        audio.load()
      }

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
      const audio = audioRef.current
      
      // If the same track is already loaded, just play it
      if (audio.src === track.audioUrl && audio.readyState >= 2) {
        audio.play().catch(error => {
          if (error.name !== 'AbortError') {
            console.error('Error playing audio:', error)
          }
          setIsPlaying(false)
        })
        setIsPlaying(true)
      } else {
        // Load new track
        audio.src = track.audioUrl
        audio.load()
        
        // Play as soon as enough data is loaded
        const canPlayHandler = () => {
          audio.play().catch(error => {
            if (error.name !== 'AbortError') {
              console.error('Error playing audio:', error)
            }
            setIsPlaying(false)
          })
          audio.removeEventListener('canplay', canPlayHandler)
        }
        
        audio.addEventListener('canplay', canPlayHandler)
        setIsPlaying(true)
      }
      
      // Increment play count only if not purchased (non-blocking)
      if (!isPurchased) {
        setTimeout(() => incrementPlayCount(trackId), 0)
      }
      
      // Save as last played track (non-blocking to avoid delaying playback)
      setTimeout(() => {
        saveLastPlayedTrack({
          trackId: trackId,
          trackTitle: track.title,
          trackNumber: track.number,
          trackDuration: track.duration,
          trackPrice: track.price,
          trackAudioUrl: track.audioUrl,
          releaseId: releaseId,
          releaseTitle: releaseTitle || '',
          releaseImage: releaseImage || '',
          artist: artist || '',
          timestamp: Date.now(),
        })
      }, 0)
    }
  }

  const playTrack = (track: Track) => {
    setCurrentTrack(track)
    
    if (audioRef.current) {
      audioRef.current.src = track.audioUrl
      audioRef.current.play().catch(error => {
        // Ignore AbortError - happens when play is interrupted
        if (error.name !== 'AbortError') {
          console.error('Error playing audio:', error)
        }
        setIsPlaying(false)
      })
      setIsPlaying(true)
    }
  }

  const togglePlayPause = () => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(error => {
        // Ignore AbortError - happens when play is interrupted
        if (error.name !== 'AbortError') {
          console.error('Error playing audio:', error)
        }
        setIsPlaying(false)
      })
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
      audioRef.current.play().catch(error => {
        // Ignore AbortError - happens when play is interrupted
        if (error.name !== 'AbortError') {
          console.error('Error playing audio:', error)
        }
        setIsPlaying(false)
      })
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
      audioRef.current.play().catch(error => {
        // Ignore AbortError - happens when play is interrupted
        if (error.name !== 'AbortError') {
          console.error('Error playing audio:', error)
        }
        setIsPlaying(false)
      })
      setIsPlaying(true)
    }
  }

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const playSample = (sampleName: string, audioUrl: string, packTitle: string, packImage?: string, artist?: string) => {
    // Create a temporary track object for the sample
    const sampleTrack: Track = {
      number: 1,
      title: sampleName,
      duration: 0,
      price: 0,
      audioUrl: audioUrl,
      key: sampleName,
    }

    setCurrentTrack(sampleTrack)
    setCurrentReleaseId(null)
    setCurrentReleaseImage(packImage || null)
    setCurrentReleaseTitle(packTitle)
    setCurrentArtist(artist || null)
    setPlaylist([sampleTrack])
    setCurrentTrackIndex(0)

    if (audioRef.current) {
      audioRef.current.src = audioUrl
      audioRef.current.play().catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Error playing sample:', error)
        }
        setIsPlaying(false)
      })
      setIsPlaying(true)
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
        playSample,
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
