import { databases, storage, DATABASE_ID, COLLECTIONS, BUCKETS } from './appwrite';
import { Query } from 'appwrite';

// Type definitions
export interface Release {
  $id: string;
  title: string;
  artist_id: string;
  artist_name: string;
  type: 'Album' | 'EP' | 'Single' | 'Compilation';
  release_date: string;
  cover_image_id: string;
  description: string;
  label: string;
  catalog_number: string;
  polar_product_id?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Artist {
  $id: string;
  name: string;
  slug: string;
  bio: string;
  photo_id: string;
  country: string;
  genres: string[];
  social_links: {
    spotify?: string;
    apple_music?: string;
    soundcloud?: string;
    instagram?: string;
    twitter?: string;
  };
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Track {
  $id: string;
  release_id: string;
  title: string;
  track_number: number;
  duration: number;
  audio_file_id: string;
  preview_url?: string;
  isrc?: string;
  created_at: string;
}

export interface User {
  $id: string;
  user_id: string;
  email: string;
  display_name?: string;
  polar_customer_id?: string;
  purchased_releases: string[];
  favorites: string[];
  created_at: string;
  updated_at: string;
}

// Release functions
export async function getFeaturedReleases(limit = 10): Promise<Release[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.RELEASES,
      [
        Query.equal('featured', true),
        Query.orderDesc('release_date'),
        Query.limit(limit)
      ]
    );
    return response.documents as unknown as Release[];
  } catch (error) {
    console.error('Error fetching featured releases:', error);
    return [];
  }
}

export async function getAllReleases(limit = 50): Promise<Release[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.RELEASES,
      [
        Query.orderDesc('release_date'),
        Query.limit(limit)
      ]
    );
    return response.documents as unknown as Release[];
  } catch (error) {
    console.error('Error fetching releases:', error);
    return [];
  }
}

export async function getReleaseById(id: string): Promise<Release | null> {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      COLLECTIONS.RELEASES,
      id
    );
    return response as unknown as Release;
  } catch (error) {
    console.error('Error fetching release:', error);
    return null;
  }
}

export async function getReleasesByArtist(artistId: string): Promise<Release[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.RELEASES,
      [
        Query.equal('artist_id', artistId),
        Query.orderDesc('release_date')
      ]
    );
    return response.documents as unknown as Release[];
  } catch (error) {
    console.error('Error fetching artist releases:', error);
    return [];
  }
}

// Artist functions
export async function getFeaturedArtists(limit = 10): Promise<Artist[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.ARTISTS,
      [
        Query.equal('featured', true),
        Query.limit(limit)
      ]
    );
    return response.documents as unknown as Artist[];
  } catch (error) {
    console.error('Error fetching featured artists:', error);
    return [];
  }
}

export async function getAllArtists(): Promise<Artist[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.ARTISTS,
      [Query.orderAsc('name')]
    );
    return response.documents as unknown as Artist[];
  } catch (error) {
    console.error('Error fetching artists:', error);
    return [];
  }
}

export async function getArtistById(id: string): Promise<Artist | null> {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      COLLECTIONS.ARTISTS,
      id
    );
    return response as unknown as Artist;
  } catch (error) {
    console.error('Error fetching artist:', error);
    return null;
  }
}

export async function getArtistBySlug(slug: string): Promise<Artist | null> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.ARTISTS,
      [Query.equal('slug', slug), Query.limit(1)]
    );
    return response.documents.length > 0 ? (response.documents[0] as unknown as Artist) : null;
  } catch (error) {
    console.error('Error fetching artist by slug:', error);
    return null;
  }
}

// Track functions
export async function getTracksByRelease(releaseId: string): Promise<Track[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.TRACKS,
      [
        Query.equal('release_id', releaseId),
        Query.orderAsc('track_number')
      ]
    );
    return response.documents as unknown as Track[];
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return [];
  }
}

export async function getTrackById(id: string): Promise<Track | null> {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      COLLECTIONS.TRACKS,
      id
    );
    return response as unknown as Track;
  } catch (error) {
    console.error('Error fetching track:', error);
    return null;
  }
}

// Storage functions
export function getImageUrl(bucketId: string, fileId: string): string {
  if (!fileId) return '/placeholder.svg';
  return storage.getFileView(bucketId, fileId).toString();
}

export function getAlbumArtworkUrl(fileId: string): string {
  return getImageUrl(BUCKETS.ALBUM_ARTWORK, fileId);
}

export function getArtistPhotoUrl(fileId: string): string {
  return getImageUrl(BUCKETS.ARTIST_PHOTOS, fileId);
}

export function getAudioStreamUrl(fileId: string): string {
  if (!fileId) return '';
  return storage.getFileView(BUCKETS.AUDIO_FILES, fileId).toString();
}

export function getPreviewUrl(fileId: string): string {
  if (!fileId) return '';
  return storage.getFileView(BUCKETS.PREVIEW_CLIPS, fileId).toString();
}

export function getDownloadUrl(fileId: string): string {
  if (!fileId) return '';
  return storage.getFileDownload(BUCKETS.AUDIO_FILES, fileId).toString();
}

// Search function
export async function searchReleases(query: string): Promise<Release[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.RELEASES,
      [
        Query.search('title', query),
        Query.orderDesc('release_date'),
        Query.limit(20)
      ]
    );
    return response.documents as unknown as Release[];
  } catch (error) {
    console.error('Error searching releases:', error);
    return [];
  }
}

export async function searchArtists(query: string): Promise<Artist[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.ARTISTS,
      [
        Query.search('name', query),
        Query.limit(20)
      ]
    );
    return response.documents as unknown as Artist[];
  } catch (error) {
    console.error('Error searching artists:', error);
    return [];
  }
}
