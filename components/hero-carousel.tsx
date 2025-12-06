"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useMusicPlayer } from "@/lib/music-player-context"
import { getReleaseById } from "@/lib/releases-data"

const slides = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    type: "Album",
    image: "/album-cover-midnight-dreams-black-white.jpg",
    background: "/abstract-black-and-white-music-waves.jpg",
    link: "/release/midnight-dreams",
  },
  {
    id: 2,
    title: "Neon Nights",
    artist: "Stellar Wave",
    type: "EP",
    image: "/neon-nights-album-cover-black-white.jpg",
    background: "/abstract-black-and-white-music-waves.jpg",
    link: "/release/neon-nights",
  },
  {
    id: 3,
    title: "Urban Pulse",
    artist: "Metro Beats",
    type: "Album",
    image: "/urban-pulse-album-cover-black-white.jpg",
    background: "/abstract-black-and-white-music-waves.jpg",
    link: "/release/urban-pulse",
  },
  {
    id: 4,
    title: "Frequency",
    artist: "Nova Sound",
    type: "Album",
    image: "/frequency-album-cover-black-white.jpg",
    background: "/abstract-black-and-white-music-waves.jpg",
    link: "/release/frequency",
  },
]

export function HeroCarousel() {
  const { playRelease } = useMusicPlayer()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const handleListenNow = (releaseId: string) => {
    const release = getReleaseById(releaseId)
    if (release) {
      playRelease(release.id, release.tracks, 0, release.image, release.title, release.artist)
    }
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
  }

  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden group">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex items-center justify-center">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                  {/* Album Artwork */}
                  <Link href={slide.link} className="group/card cursor-pointer">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 transition-transform duration-300 group-hover/card:scale-105">
                      <img
                        src={slide.image || "/placeholder.svg"}
                        alt={slide.title}
                        className="w-full h-full object-cover shadow-2xl"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-colors duration-300" />
                    </div>
                  </Link>

                  {/* Release Info */}
                  <div className="text-center md:text-left">
                    <p className="text-sm font-medium text-black mb-2 tracking-wider uppercase">
                      {slide.type}
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-3 text-black whitespace-nowrap">{slide.title}</h2>
                    <p className="text-xl md:text-2xl text-black mb-6">{slide.artist}</p>
                    <Button 
                      size="lg" 
                      className="bg-white text-black hover:bg-white/90"
                      onClick={() => handleListenNow(slide.link.replace('/release/', ''))}
                    >
                      Listen Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Pagination Dots */}
      <div className="absolute bottom-0 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentSlide ? "bg-black w-8" : "bg-black/50 hover:bg-black/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
