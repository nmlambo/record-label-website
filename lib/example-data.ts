/**
 * Example data for testing the application
 * This can be used to populate your Appwrite database with sample content
 */

export const exampleArtists = [
  {
    name: "Luna Echo",
    slug: "luna-echo",
    bio: "Luna Echo is an electronic music producer known for atmospheric soundscapes and deep basslines. Based in Berlin, she has been pushing the boundaries of techno and ambient music since 2018.",
    country: "Germany",
    genres: ["Techno", "Ambient", "Electronic"],
    social_links: {
      spotify: "https://open.spotify.com/artist/example",
      apple_music: "https://music.apple.com/artist/example",
      instagram: "https://instagram.com/lunaecho",
      twitter: "https://twitter.com/lunaecho"
    },
    featured: true
  },
  {
    name: "The Midnight Collective",
    slug: "midnight-collective",
    bio: "A trio of producers creating soulful house music with jazz influences. Their live performances combine electronic production with live instrumentation.",
    country: "USA",
    genres: ["House", "Jazz", "Soul"],
    social_links: {
      spotify: "https://open.spotify.com/artist/example",
      instagram: "https://instagram.com/midnightcollective"
    },
    featured: true
  },
  {
    name: "Neon Waves",
    slug: "neon-waves",
    bio: "Synthwave artist bringing back the sounds of the 80s with a modern twist. Known for cinematic compositions and retro aesthetics.",
    country: "Canada",
    genres: ["Synthwave", "Electronic", "Retro"],
    social_links: {
      spotify: "https://open.spotify.com/artist/example",
      youtube: "https://youtube.com/neonwaves"
    },
    featured: false
  }
];

export const exampleReleases = [
  {
    title: "Nocturnal Frequencies",
    // artist_id: "will be set when creating",
    artist_name: "Luna Echo",
    type: "Album",
    release_date: "2024-10-15",
    description: "A journey through the night, exploring the depths of techno and ambient soundscapes. 10 tracks of pure atmospheric bliss.",
    label: "Your Label",
    catalog_number: "LABEL001",
    featured: true
  },
  {
    title: "Sunset Sessions",
    artist_name: "The Midnight Collective",
    type: "EP",
    release_date: "2024-11-01",
    description: "Four tracks of soulful house music perfect for late summer evenings. Featuring live saxophone and keys.",
    label: "Your Label",
    catalog_number: "LABEL002",
    featured: true
  },
  {
    title: "Neon Dreams",
    artist_name: "Neon Waves",
    type: "Single",
    release_date: "2024-12-01",
    description: "A synthwave anthem that transports you back to 1985. Complete with vintage drum machines and analog synths.",
    label: "Your Label",
    catalog_number: "LABEL003",
    featured: false
  }
];

export const exampleTracks = [
  // Nocturnal Frequencies tracks
  {
    title: "Midnight Drive",
    track_number: 1,
    duration: 342, // 5:42
    // release_id: "will be set when creating"
  },
  {
    title: "Urban Echoes",
    track_number: 2,
    duration: 298, // 4:58
  },
  {
    title: "Deep Space",
    track_number: 3,
    duration: 415, // 6:55
  },
  // Sunset Sessions tracks
  {
    title: "Golden Hour",
    track_number: 1,
    duration: 256, // 4:16
  },
  {
    title: "Velvet Groove",
    track_number: 2,
    duration: 312, // 5:12
  },
  // Neon Dreams track
  {
    title: "Neon Dreams",
    track_number: 1,
    duration: 234, // 3:54
  }
];

/**
 * Helper function to format duration in seconds to MM:SS
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Instructions for adding this data to Appwrite:
 * 
 * 1. Go to your Appwrite Console
 * 2. Navigate to Databases → main
 * 3. For each collection, click "Add Document"
 * 4. Copy the JSON data from the examples above
 * 5. Add the required fields:
 *    - created_at: new Date().toISOString()
 *    - updated_at: new Date().toISOString()
 * 6. For releases, link to the artist using artist_id
 * 7. For tracks, link to the release using release_id
 * 8. Upload images to storage buckets and use the file IDs:
 *    - cover_image_id for releases
 *    - photo_id for artists
 *    - audio_file_id for tracks
 */

/**
 * Placeholder image URLs for testing (before uploading to Appwrite)
 */
export const placeholderImages = {
  albumCover: "https://placehold.co/600x600/000000/FFFFFF/png?text=Album+Cover",
  artistPhoto: "https://placehold.co/400x400/000000/FFFFFF/png?text=Artist+Photo",
};

/**
 * Example of how to structure social links JSON
 */
export const socialLinksExample = {
  spotify: "https://open.spotify.com/artist/...",
  apple_music: "https://music.apple.com/artist/...",
  youtube: "https://youtube.com/...",
  instagram: "https://instagram.com/...",
  twitter: "https://twitter.com/...",
  facebook: "https://facebook.com/...",
  website: "https://..."
};
