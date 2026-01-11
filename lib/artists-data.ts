export interface Artist {
  id: string
  name: string
  genre: string
  bio: string
  image: string
  socialLinks: Array<{
    name: string
    url: string
  }>
}

export const artists: Artist[] = [
  {
    id: "soundquest",
    name: "SoundQuest",
    genre: "Electronic / Experimental",
    bio: "SoundQuest is an innovative electronic music producer and composer, pushing the boundaries of sound design and musical storytelling. With a diverse catalog spanning ambient soundscapes to high-energy beats, SoundQuest creates immersive sonic experiences that resonate with listeners worldwide.",
    image: "/placeholder.svg",
    socialLinks: [
      { name: "Instagram", url: "#" },
      { name: "Facebook", url: "#" },
      { name: "Twitter", url: "#" },
      { name: "Spotify", url: "#" },
    ]
  },
  {
    id: "neural-waves",
    name: "Neural Waves",
    genre: "AI-Generated Ambient",
    bio: "Neural Waves is an AI-powered music project that explores the intersection of artificial intelligence and ambient soundscapes. Using advanced neural networks and machine learning algorithms, Neural Waves creates ethereal, evolving compositions that blur the line between human creativity and computational artistry.",
    image: "/placeholder.svg",
    socialLinks: [
      { name: "Spotify", url: "#" },
      { name: "YouTube", url: "#" },
    ]
  },
  {
    id: "synth-mind",
    name: "Synth Mind",
    genre: "AI Techno / House",
    bio: "Synth Mind represents the future of electronic dance music, where AI algorithms generate pulsating techno and house tracks that keep dancefloors moving. This cutting-edge project demonstrates how artificial intelligence can understand rhythm, energy, and the essence of club culture to create authentic electronic music.",
    image: "/placeholder.svg",
    socialLinks: [
      { name: "Spotify", url: "#" },
      { name: "Beatport", url: "#" },
      { name: "Instagram", url: "#" },
    ]
  },
  {
    id: "digital-echo",
    name: "Digital Echo",
    genre: "AI Experimental / Glitch",
    bio: "Digital Echo pushes the boundaries of experimental music through AI-generated glitch aesthetics and unconventional sound design. This project explores the chaotic beauty of digital artifacts, algorithmic errors, and computational creativity, resulting in unique sonic experiences that challenge traditional music conventions.",
    image: "/placeholder.svg",
    socialLinks: [
      { name: "Bandcamp", url: "#" },
      { name: "Twitter", url: "#" },
    ]
  },
]

export function getArtistById(id: string): Artist | undefined {
  return artists.find(artist => artist.id === id)
}

export function getAllArtists(): Artist[] {
  return artists
}
