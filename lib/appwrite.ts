import { Client, Databases, Storage, Account, Functions } from 'appwrite';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

// Initialize services
export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);
export const functions = new Functions(client);

export { client };

// Database and collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'main';
export const COLLECTIONS = {
  RELEASES: process.env.NEXT_PUBLIC_RELEASES_COLLECTION_ID || 'releases',
  ARTISTS: process.env.NEXT_PUBLIC_ARTISTS_COLLECTION_ID || 'artists',
  TRACKS: process.env.NEXT_PUBLIC_TRACKS_COLLECTION_ID || 'tracks',
  USERS: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID || 'users',
  ORDERS: process.env.NEXT_PUBLIC_ORDERS_COLLECTION_ID || 'orders',
};

// Storage bucket IDs
export const BUCKETS = {
  ALBUM_ARTWORK: process.env.NEXT_PUBLIC_ALBUM_ARTWORK_BUCKET_ID || 'album-artwork',
  ARTIST_PHOTOS: process.env.NEXT_PUBLIC_ARTIST_PHOTOS_BUCKET_ID || 'artist-photos',
  AUDIO_FILES: process.env.NEXT_PUBLIC_AUDIO_FILES_BUCKET_ID || 'audio-files',
  PREVIEW_CLIPS: process.env.NEXT_PUBLIC_PREVIEW_CLIPS_BUCKET_ID || 'preview-clips',
};
