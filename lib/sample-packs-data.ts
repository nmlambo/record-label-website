export interface SamplePack {
  id: string
  title: string
  artist: string
  artistId: string
  description: string
  image: string
  price: number
  samples: number
  size: string
  formats: string[]
  tags: string[]
  previewSamples: Array<{
    id: string
    name: string
    duration: string
    audioUrl: string
  }>
  features: string[]
  bpm?: string
  key?: string
  isNew?: boolean
}

export const samplePacks: SamplePack[] = [
  {
    id: "melodic-afro-house-essentials",
    title: "Melodic Afro House Essentials",
    artist: "SoundQuest",
    artistId: "soundquest",
    description: "Authentic African percussion, hypnotic rhythms, and soulful melodic elements that capture the essence of Afro House. Features organic drums, traditional instruments, and warm basslines perfect for creating deep, groovy tracks.",
    image: "/placeholder.svg",
    price: 34.99,
    samples: 180,
    size: "1.4 GB",
    formats: ["WAV", "AIFF"],
    tags: ["Afro House", "Melodic", "Percussion", "Organic"],
    bpm: "118-122 BPM",
    key: "Various",
    isNew: true,
    features: [
      "180 high-quality samples",
      "24-bit/48kHz WAV files",
      "African percussion and drums",
      "Melodic loops and one-shots",
      "Bass and synth elements",
      "MIDI files included",
      "Royalty-free for commercial use"
    ],
    previewSamples: [
      {
        id: "1",
        name: "Afro Percussion Loop 01",
        duration: "0:32",
        audioUrl: "/audio/sample-preview-1.mp3"
      },
      {
        id: "2",
        name: "Melodic Kalimba Phrase",
        duration: "0:16",
        audioUrl: "/audio/sample-preview-2.mp3"
      },
      {
        id: "3",
        name: "Deep Afro Bassline",
        duration: "0:24",
        audioUrl: "/audio/sample-preview-3.mp3"
      }
    ]
  },
  {
    id: "melodic-deep-house-collection",
    title: "Melodic Deep House Collection",
    artist: "Synth Mind",
    artistId: "synth-mind",
    description: "Lush pads, emotive chords, and deep basslines that define the melodic deep house sound. Perfect for creating atmospheric, emotional tracks with rich harmonic content and smooth grooves.",
    image: "/placeholder.svg",
    price: 29.99,
    samples: 160,
    size: "1.1 GB",
    formats: ["WAV"],
    tags: ["Deep House", "Melodic", "Chords", "Pads"],
    bpm: "120-124 BPM",
    key: "Various",
    features: [
      "160 melodic samples",
      "24-bit/44.1kHz WAV files",
      "Lush chord progressions",
      "Deep basslines and subs",
      "Atmospheric pads and textures",
      "Drum loops and one-shots",
      "MIDI files for all melodic content",
      "Royalty-free"
    ],
    previewSamples: [
      {
        id: "1",
        name: "Deep House Chord Progression",
        duration: "0:28",
        audioUrl: "/audio/sample-preview-4.mp3"
      },
      {
        id: "2",
        name: "Melodic Pad Layer",
        duration: "0:40",
        audioUrl: "/audio/sample-preview-5.mp3"
      },
      {
        id: "3",
        name: "Rolling Deep Bassline",
        duration: "0:20",
        audioUrl: "/audio/sample-preview-6.mp3"
      }
    ]
  },
  {
    id: "organic-house-toolkit",
    title: "Organic House Toolkit",
    artist: "Digital Echo",
    artistId: "digital-echo",
    description: "Natural, earthy sounds blended with electronic elements. Features live instruments, field recordings, and organic textures that bring warmth and authenticity to your organic house productions.",
    image: "/placeholder.svg",
    price: 32.99,
    samples: 140,
    size: "1.3 GB",
    formats: ["WAV", "AIFF"],
    tags: ["Organic House", "Natural", "Live Instruments", "Textures"],
    bpm: "118-122 BPM",
    key: "Various",
    isNew: true,
    features: [
      "140 organic samples",
      "24-bit/48kHz audio",
      "Live instrument recordings",
      "Field recordings and foley",
      "Organic percussion loops",
      "Textured pads and atmospheres",
      "Acoustic elements",
      "Royalty-free for commercial use"
    ],
    previewSamples: [
      {
        id: "1",
        name: "Organic Percussion Groove",
        duration: "0:24",
        audioUrl: "/audio/sample-preview-7.mp3"
      },
      {
        id: "2",
        name: "Live Guitar Melody",
        duration: "0:32",
        audioUrl: "/audio/sample-preview-8.mp3"
      },
      {
        id: "3",
        name: "Natural Texture Layer",
        duration: "0:36",
        audioUrl: "/audio/sample-preview-9.mp3"
      }
    ]
  },
  {
    id: "progressive-house-fundamentals",
    title: "Progressive House Fundamentals",
    artist: "SoundQuest",
    artistId: "soundquest",
    description: "Epic builds, driving basslines, and euphoric melodies that capture the progressive house energy. Features evolving synths, powerful drums, and dynamic elements for creating peak-time anthems.",
    image: "/placeholder.svg",
    price: 31.99,
    samples: 170,
    size: "1.2 GB",
    formats: ["WAV"],
    tags: ["Progressive House", "Melodic", "Builds", "Energy"],
    bpm: "124-128 BPM",
    key: "Various",
    features: [
      "170 progressive samples",
      "24-bit/44.1kHz WAV files",
      "Epic build elements",
      "Driving basslines",
      "Euphoric lead melodies",
      "Powerful drum loops",
      "FX and risers",
      "MIDI files included",
      "Royalty-free"
    ],
    previewSamples: [
      {
        id: "1",
        name: "Progressive Lead Melody",
        duration: "0:30",
        audioUrl: "/audio/sample-preview-10.mp3"
      },
      {
        id: "2",
        name: "Driving Bassline Loop",
        duration: "0:24",
        audioUrl: "/audio/sample-preview-11.mp3"
      },
      {
        id: "3",
        name: "Epic Build Riser",
        duration: "0:16",
        audioUrl: "/audio/sample-preview-12.mp3"
      }
    ]
  }
]

export function getSamplePackById(id: string): SamplePack | undefined {
  return samplePacks.find(pack => pack.id === id)
}

export function getAllSamplePacks(): SamplePack[] {
  return samplePacks
}

export function getSamplePacksByArtist(artistId: string): SamplePack[] {
  return samplePacks.filter(pack => pack.artistId === artistId)
}
