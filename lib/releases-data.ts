export interface Track {
  number: number
  title: string
  duration: number
  audioUrl: string
  key: string
  price: number
}

export interface Release {
  id: string
  title: string
  artist: string
  artistId: string
  type: string
  status: string
  image: string
  releaseDate: string
  label: string
  description: string
  price: number
  tracks: Track[]
  streamingLinks: {
    spotify?: string
    appleMusic?: string
    youtube?: string
  }
  isNew?: boolean
}

export const releases: Release[] = [
  {
    id: "midnight-dreams",
    title: "Midnight Dreams",
    artist: "SoundQuest",
    artistId: "soundquest",
    type: "Album",
    status: "Out now",
    image: "/album-cover-midnight-dreams-black-white.jpg",
    releaseDate: "2024-01-15",
    label: "Numba",
    description: "SoundQuest returns with their most ambitious project yet. 'Midnight Dreams' explores the intersection of electronic soundscapes and organic instrumentation, creating a sonic journey through the depths of night. Recorded over six months in a remote studio, this album represents a bold new direction for the artist.",
    price: 9.99,
    tracks: [
      { number: 1, title: "Midnight Dreams", duration: 225, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", key: "A Minor", price: 1.99 },
      { number: 2, title: "Starlight", duration: 252, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", key: "C Major", price: 1.99 },
      { number: 3, title: "Moonrise", duration: 238, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", key: "D Minor", price: 1.99 },
      { number: 4, title: "Twilight Zone", duration: 323, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", key: "F Major", price: 1.99 },
      { number: 5, title: "Dawn Break", duration: 245, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", key: "G Major", price: 1.99 },
    ],
    streamingLinks: {
      spotify: "https://open.spotify.com/album/example",
      appleMusic: "https://music.apple.com/album/example",
      youtube: "https://youtube.com/playlist/example",
    }
  },
  {
    id: "neon-nights",
    title: "Neon Nights",
    artist: "SoundQuest",
    artistId: "soundquest",
    type: "EP",
    status: "Out now",
    image: "/neon-nights-album-cover-black-white.jpg",
    releaseDate: "2024-02-20",
    label: "Numba",
    description: "SoundQuest delivers a high-energy EP that captures the essence of late-night city life. With pulsating beats and atmospheric synths, 'Neon Nights' is a love letter to urban nightlife and the stories that unfold under artificial lights.",
    price: 5.99,
    isNew: true,
    tracks: [
      { number: 1, title: "City Lights", duration: 198, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", key: "E Minor", price: 1.99 },
      { number: 2, title: "Electric Dreams", duration: 215, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", key: "G Major", price: 1.99 },
      { number: 3, title: "Neon Glow", duration: 203, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", key: "A Minor", price: 1.99 },
    ],
    streamingLinks: {
      spotify: "https://open.spotify.com/album/example",
      appleMusic: "https://music.apple.com/album/example",
      youtube: "https://youtube.com/playlist/example",
    }
  },
  {
    id: "echoes",
    title: "Echoes",
    artist: "SoundQuest",
    artistId: "soundquest",
    type: "Single",
    status: "Out now",
    image: "/echoes-single-cover-black-white.jpg",
    releaseDate: "2024-03-10",
    label: "Numba",
    description: "A haunting single that showcases SoundQuest's ability to blend ethereal vocals with deep, resonant production. 'Echoes' is a meditation on memory and the traces we leave behind.",
    price: 1.99,
    tracks: [
      { number: 1, title: "Echoes", duration: 267, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", key: "C Minor", price: 1.99 },
    ],
    streamingLinks: {
      spotify: "https://open.spotify.com/track/example",
      youtube: "https://youtube.com/watch/example",
    }
  },
  {
    id: "urban-pulse",
    title: "Urban Pulse",
    artist: "SoundQuest",
    artistId: "soundquest",
    type: "Album",
    status: "Out now",
    image: "/urban-pulse-album-cover-black-white.jpg",
    releaseDate: "2024-04-05",
    label: "Numba",
    description: "SoundQuest captures the rhythm of city life in this dynamic album. From rush hour chaos to quiet midnight moments, 'Urban Pulse' is a sonic documentary of metropolitan existence.",
    price: 6.99,
    tracks: [
      { number: 1, title: "Rush Hour", duration: 189, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", key: "D Major", price: 1.99 },
      { number: 2, title: "Subway Symphony", duration: 234, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", key: "F Minor", price: 1.99 },
      { number: 3, title: "Street Corner", duration: 212, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", key: "G Major", price: 1.99 },
      { number: 4, title: "Night Shift", duration: 256, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", key: "A Minor", price: 1.99 },
    ],
    streamingLinks: {
      spotify: "https://open.spotify.com/album/example",
      appleMusic: "https://music.apple.com/album/example",
      youtube: "https://youtube.com/playlist/example",
    }
  },
  {
    id: "wavelength",
    title: "Wavelength",
    artist: "SoundQuest",
    artistId: "soundquest",
    type: "EP",
    status: "Out now",
    image: "/wavelength-ep-cover-black-white.jpg",
    releaseDate: "2024-05-12",
    label: "Numba",
    description: "SoundQuest explores the physics of sound and emotion in this experimental EP. Each track operates on a different 'wavelength,' creating a cohesive yet diverse listening experience.",
    price: 7.99,
    tracks: [
      { number: 1, title: "Frequency", duration: 201, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", key: "B Minor", price: 1.99 },
      { number: 2, title: "Resonance", duration: 223, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", key: "D Major", price: 1.99 },
      { number: 3, title: "Amplitude", duration: 198, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", key: "E Minor", price: 1.99 },
    ],
    streamingLinks: {
      spotify: "https://open.spotify.com/album/example",
      youtube: "https://youtube.com/playlist/example",
    }
  },
  {
    id: "afterglow",
    title: "Afterglow",
    artist: "SoundQuest",
    artistId: "soundquest",
    type: "Single",
    status: "Out now",
    image: "/afterglow-single-cover-black-white.jpg",
    releaseDate: "2024-06-18",
    label: "Numba",
    description: "A warm, uplifting single that captures the feeling of contentment after a perfect night. SoundQuest's signature sound shines through in this melodic masterpiece.",
    price: 1.99,
    tracks: [
      { number: 1, title: "Afterglow", duration: 243, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", key: "F Major", price: 1.99 },
    ],
    streamingLinks: {
      spotify: "https://open.spotify.com/track/example",
      appleMusic: "https://music.apple.com/album/example",
      youtube: "https://youtube.com/watch/example",
    }
  },
  {
    id: "frequency",
    title: "Frequency",
    artist: "SoundQuest",
    artistId: "soundquest",
    type: "Album",
    status: "Pre-order",
    image: "/frequency-album-cover-black-white.jpg",
    releaseDate: "2024-08-01",
    label: "Numba",
    description: "SoundQuest's highly anticipated album. 'Frequency' promises to push boundaries and redefine what electronic music can be. Pre-order now for exclusive early access.",
    price: 9.99,
    tracks: [
      { number: 1, title: "Opening", duration: 178, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", key: "C Major", price: 1.99 },
      { number: 2, title: "Vibration", duration: 234, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", key: "A Minor", price: 1.99 },
      { number: 3, title: "Oscillation", duration: 267, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", key: "E Minor", price: 1.99 },
      { number: 4, title: "Harmonic", duration: 289, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", key: "G Major", price: 1.99 },
      { number: 5, title: "Closing", duration: 312, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", key: "D Minor", price: 1.99 },
    ],
    streamingLinks: {
      spotify: "https://open.spotify.com/album/example",
      youtube: "https://youtube.com/playlist/example",
    }
  },
  {
    id: "synthesis",
    title: "Synthesis",
    artist: "SoundQuest",
    artistId: "soundquest",
    type: "EP",
    status: "Out now",
    image: "/synthesis-ep-cover-black-white.jpg",
    releaseDate: "2024-07-22",
    label: "Numba",
    description: "SoundQuest brings together analog and digital in this genre-defying EP. 'Synthesis' is a perfect blend of old-school production techniques and cutting-edge sound design.",
    price: 8.99,
    isNew: true,
    tracks: [
      { number: 1, title: "Analog", duration: 195, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", key: "F Minor", price: 1.99 },
      { number: 2, title: "Digital", duration: 208, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", key: "B♭ Major", price: 1.99 },
      { number: 3, title: "Hybrid", duration: 223, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", key: "C Minor", price: 1.99 },
    ],
    streamingLinks: {
      spotify: "https://open.spotify.com/album/example",
      youtube: "https://youtube.com/playlist/example",
    }
  },
]

export function getReleaseById(id: string): Release | undefined {
  return releases.find(release => release.id === id)
}

export function getReleasesByArtist(artistId: string): Release[] {
  return releases.filter(release => release.artistId === artistId)
}
