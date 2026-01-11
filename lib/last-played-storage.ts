/**
 * Last Played Track Storage
 * Persists the last played track to localStorage for returning users
 */

export interface LastPlayedTrack {
  trackId: string
  trackTitle: string
  trackNumber: number
  trackDuration: number
  trackPrice: number
  trackAudioUrl: string
  releaseId: string
  releaseTitle: string
  releaseImage: string
  artist: string
  timestamp: number
}

const LAST_PLAYED_KEY = 'numba_last_played_track'

export function saveLastPlayedTrack(data: LastPlayedTrack): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(LAST_PLAYED_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving last played track:', error)
  }
}

export function getLastPlayedTrack(): LastPlayedTrack | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(LAST_PLAYED_KEY)
    if (!stored) return null
    
    const data = JSON.parse(stored) as LastPlayedTrack
    
    // Check if data is older than 30 days
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
    if (data.timestamp < thirtyDaysAgo) {
      clearLastPlayedTrack()
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error loading last played track:', error)
    return null
  }
}

export function clearLastPlayedTrack(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(LAST_PLAYED_KEY)
  } catch (error) {
    console.error('Error clearing last played track:', error)
  }
}

export function hasPlayedBefore(): boolean {
  return getLastPlayedTrack() !== null
}
