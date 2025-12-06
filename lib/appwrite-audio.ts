/**
 * Get streaming URL from Appwrite Storage
 * @param bucketId - Your Appwrite storage bucket ID
 * @param fileId - The file ID in Appwrite storage
 * @returns Streaming URL for the audio file
 */
export function getAppwriteAudioUrl(bucketId: string, fileId: string): string {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1"
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID

  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`
}

/**
 * Example usage:
 *
 * const audioUrl = getAppwriteAudioUrl('audio-files', 'track-123')
 *
 * This URL will stream the audio file directly from Appwrite's CDN
 * with automatic buffering and progressive download.
 */

/**
 * Best practices for Appwrite audio storage:
 *
 * 1. Create a dedicated bucket for audio files
 * 2. Set bucket permissions to allow public read access
 * 3. Enable compression in bucket settings
 * 4. Use MP3 format (320kbps) for best quality/size ratio
 * 5. Store metadata (title, artist, duration) in Appwrite Database
 * 6. Use file IDs to reference tracks in your database
 */

export interface AudioMetadata {
  fileId: string
  title: string
  artist: string
  album: string
  duration: number
  albumArtId: string
  bucketId: string
}
