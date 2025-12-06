"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { markTrackAsPurchased, isTrackPurchased, getPlayCount, getRemainingPlays } from "@/lib/play-count-storage"

export default function TestPurchasePage() {
  const [trackId, setTrackId] = useState("")
  const [status, setStatus] = useState("")

  const handleMarkPurchased = () => {
    if (!trackId) {
      setStatus("Please enter a track ID")
      return
    }
    
    markTrackAsPurchased(trackId)
    setStatus(`✓ Track "${trackId}" marked as purchased!`)
  }

  const handleCheckStatus = () => {
    if (!trackId) {
      setStatus("Please enter a track ID")
      return
    }
    
    const isPurchased = isTrackPurchased(trackId)
    const playCount = getPlayCount(trackId)
    const remaining = getRemainingPlays(trackId)
    
    setStatus(`
      Track ID: ${trackId}
      Purchased: ${isPurchased ? "Yes ✓" : "No"}
      Play Count: ${playCount}
      Remaining Plays: ${remaining}
    `)
  }

  const handleClearStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('numba_play_counts')
      localStorage.removeItem('numba_purchased_tracks')
      setStatus("✓ All play counts and purchases cleared!")
    }
  }

  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-[800px]">
        <h1 className="text-4xl font-bold mb-8">Test Purchase System</h1>
        
        <Card className="p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Track ID Format</h2>
            <p className="text-sm text-muted-foreground mb-2">
              Format: <code className="bg-muted px-2 py-1 rounded">releaseId-track-trackNumber</code>
            </p>
            <p className="text-sm text-muted-foreground">
              Example: <code className="bg-muted px-2 py-1 rounded">midnight-dreams-track-1</code>
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Track ID</label>
              <Input
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                placeholder="e.g., midnight-dreams-track-1"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleMarkPurchased} className="flex-1">
                Mark as Purchased
              </Button>
              <Button onClick={handleCheckStatus} variant="outline" className="flex-1">
                Check Status
              </Button>
            </div>

            <Button onClick={handleClearStorage} variant="destructive" className="w-full">
              Clear All Data (Reset)
            </Button>
          </div>

          {status && (
            <div className="p-4 bg-muted rounded-lg">
              <pre className="text-sm whitespace-pre-wrap">{status}</pre>
            </div>
          )}
        </Card>

        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-2">How to Test:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Go to a release page (e.g., /release/midnight-dreams)</li>
            <li>Play a track 5 times to use up free plays</li>
            <li>Try to play again - you'll see "No plays left"</li>
            <li>Come back here and mark it as purchased</li>
            <li>Return to the release page - track shows "✓ Owned"</li>
            <li>Now you can play it unlimited times!</li>
          </ol>
        </div>
      </main>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
