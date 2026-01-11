"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { artists } from "@/lib/artists-data"
import { releases } from "@/lib/releases-data"
import { samplePacks } from "@/lib/sample-packs-data"
import { ArtistCard } from "@/components/artist-card"
import { ReleaseCard } from "@/components/release-card"
import Link from "next/link"
import { Card } from "@/components/ui/card"

type TabType = "all" | "artists" | "music" | "samples"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<TabType>("all")

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredReleases = releases.filter(
    (release) =>
      release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.artist.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredSamplePacks = samplePacks.filter(
    (pack) =>
      pack.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pack.artist.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const hasResults = filteredArtists.length > 0 || filteredReleases.length > 0 || filteredSamplePacks.length > 0

  const tabs = [
    { id: "all" as TabType, label: "All" },
    { id: "artists" as TabType, label: "Artists" },
    { id: "music" as TabType, label: "Music" },
    { id: "samples" as TabType, label: "Samples" },
  ]

  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-6 pt-6 pb-24 md:px-12 md:pt-12 md:pb-16 max-w-[1390px]">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Search</h1>
            
            {/* Search Input */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for artists, music, or samples..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
                autoFocus
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {!searchQuery ? (
            <div className="text-center py-12">
              <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">Start searching</h2>
              <p className="text-muted-foreground">
                Find your favorite artists, music, and sample packs
              </p>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">No results found</h2>
              <p className="text-muted-foreground">
                Try searching with different keywords
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Artists Section */}
              {(activeTab === "all" || activeTab === "artists") && filteredArtists.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Artists</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredArtists.slice(0, activeTab === "artists" ? undefined : 5).map((artist) => {
                      const releaseCount = releases.filter(r => r.artist === artist.name).length
                      return (
                        <ArtistCard
                          key={artist.id}
                          id={artist.id}
                          name={artist.name}
                          genre={artist.genre}
                          image={artist.image}
                          releaseCount={releaseCount}
                        />
                      )
                    })}
                  </div>
                  {activeTab === "all" && filteredArtists.length > 5 && (
                    <button
                      onClick={() => setActiveTab("artists")}
                      className="mt-4 text-sm text-muted-foreground hover:text-foreground"
                    >
                      See all {filteredArtists.length} artists
                    </button>
                  )}
                </div>
              )}

              {/* Music Section */}
              {(activeTab === "all" || activeTab === "music") && filteredReleases.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Music</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredReleases.slice(0, activeTab === "music" ? undefined : 5).map((release) => (
                      <ReleaseCard
                        key={release.id}
                        id={release.id}
                        title={release.title}
                        artist={release.artist}
                        type={release.type}
                        status={release.status}
                        image={release.image}
                        isNew={release.isNew}
                      />
                    ))}
                  </div>
                  {activeTab === "all" && filteredReleases.length > 5 && (
                    <button
                      onClick={() => setActiveTab("music")}
                      className="mt-4 text-sm text-muted-foreground hover:text-foreground"
                    >
                      See all {filteredReleases.length} releases
                    </button>
                  )}
                </div>
              )}

              {/* Sample Packs Section */}
              {(activeTab === "all" || activeTab === "samples") && filteredSamplePacks.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Sample Packs</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredSamplePacks.slice(0, activeTab === "samples" ? undefined : 5).map((pack) => (
                      <Link key={pack.id} href={`/sample-packs/${pack.id}`} className="cursor-pointer">
                        <Card className="flex flex-col gap-6 rounded-xl border shadow-sm group relative overflow-hidden border-border hover:border-foreground transition-all duration-300 py-0">
                          <div className="aspect-square relative overflow-hidden bg-muted">
                            <img
                              src={pack.image || "/placeholder.svg"}
                              alt={`${pack.title} by ${pack.artist}`}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            />
                            {pack.isNew && (
                              <div className="absolute top-2 right-2">
                                <span className="text-xs font-semibold bg-green-500 text-white px-2 py-1 rounded">
                                  NEW
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="p-3 md:p-4">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                {pack.samples} samples
                              </p>
                              <p className="text-xs text-muted-foreground">${pack.price}</p>
                            </div>
                            <h3 className="font-semibold text-sm md:text-base mb-1 line-clamp-1">{pack.title}</h3>
                            <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{pack.artist}</p>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                  {activeTab === "all" && filteredSamplePacks.length > 5 && (
                    <button
                      onClick={() => setActiveTab("samples")}
                      className="mt-4 text-sm text-muted-foreground hover:text-foreground"
                    >
                      See all {filteredSamplePacks.length} sample packs
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
