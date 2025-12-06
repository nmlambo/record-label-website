"use client"

// Local storage key for play counts
const PLAY_COUNT_KEY = 'numba_play_counts'
const MAX_FREE_PLAYS = 5

interface PlayCounts {
  [trackId: string]: number
}

export function getPlayCount(trackId: string): number {
  if (typeof window === 'undefined') return 0
  
  try {
    const stored = localStorage.getItem(PLAY_COUNT_KEY)
    const counts: PlayCounts = stored ? JSON.parse(stored) : {}
    return counts[trackId] || 0
  } catch (error) {
    console.error('Error reading play counts:', error)
    return 0
  }
}

export function incrementPlayCount(trackId: string): number {
  if (typeof window === 'undefined') return 0
  
  try {
    const stored = localStorage.getItem(PLAY_COUNT_KEY)
    const counts: PlayCounts = stored ? JSON.parse(stored) : {}
    
    counts[trackId] = (counts[trackId] || 0) + 1
    localStorage.setItem(PLAY_COUNT_KEY, JSON.stringify(counts))
    
    return counts[trackId]
  } catch (error) {
    console.error('Error incrementing play count:', error)
    return 0
  }
}

export function getRemainingPlays(trackId: string): number {
  const playCount = getPlayCount(trackId)
  return Math.max(0, MAX_FREE_PLAYS - playCount)
}

export function hasFreePlaysRemaining(trackId: string): boolean {
  return getRemainingPlays(trackId) > 0
}

export function resetPlayCount(trackId: string): void {
  if (typeof window === 'undefined') return
  
  try {
    const stored = localStorage.getItem(PLAY_COUNT_KEY)
    const counts: PlayCounts = stored ? JSON.parse(stored) : {}
    
    delete counts[trackId]
    localStorage.setItem(PLAY_COUNT_KEY, JSON.stringify(counts))
  } catch (error) {
    console.error('Error resetting play count:', error)
  }
}

export function markTrackAsPurchased(trackId: string): void {
  // When a track is purchased, reset its play count
  // In a real app, you'd also store this in a database
  resetPlayCount(trackId)
  
  // Store purchased tracks separately
  try {
    const purchasedKey = 'numba_purchased_tracks'
    const stored = localStorage.getItem(purchasedKey)
    const purchased: string[] = stored ? JSON.parse(stored) : []
    
    if (!purchased.includes(trackId)) {
      purchased.push(trackId)
      localStorage.setItem(purchasedKey, JSON.stringify(purchased))
    }
  } catch (error) {
    console.error('Error marking track as purchased:', error)
  }
}

export function isTrackPurchased(trackId: string): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    const purchasedKey = 'numba_purchased_tracks'
    const stored = localStorage.getItem(purchasedKey)
    const purchased: string[] = stored ? JSON.parse(stored) : []
    return purchased.includes(trackId)
  } catch (error) {
    console.error('Error checking if track is purchased:', error)
    return false
  }
}

export const MAX_FREE_PLAYS_LIMIT = MAX_FREE_PLAYS
