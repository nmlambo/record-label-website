# Appwrite Backend Setup Guide

## Overview

This record label website uses **Appwrite** as its backend-as-a-service platform to handle:
- Database management (releases, artists, tracks, users)
- User authentication and authorization
- File storage (audio files, album artwork, artist photos)
- Real-time updates for new releases
- Server-side functions for business logic

Appwrite integrates seamlessly with **Polar.sh** for payment processing and **Next.js** for the frontend.

---

## Architecture

\`\`\`
┌─────────────────┐
│   Next.js App   │
│   (Frontend)    │
└────────┬────────┘
         │
         ├──────────────┐
         │              │
┌────────▼────────┐ ┌──▼──────────┐
│    Appwrite     │ │  Polar.sh   │
│   (Backend)     │ │  (Payments) │
└─────────────────┘ └─────────────┘
\`\`\`

---

## Database Collections

### 1. **Releases Collection**
Stores all music releases (albums, EPs, singles).

**Collection ID:** `releases`

**Attributes:**
\`\`\`typescript
{
  title: string;           // Release title
  artist_id: string;       // Reference to artists collection
  artist_name: string;     // Denormalized for quick access
  type: string;           // "Album" | "EP" | "Single" | "Compilation"
  release_date: string;   // ISO date string
  cover_image_id: string; // Appwrite Storage file ID
  description: string;    // Release description
  label: string;          // Record label name
  catalog_number: string; // Catalog number (e.g., "LABEL001")
  polar_product_id: string; // Polar.sh product ID for purchases
  featured: boolean;      // Show in hero carousel
  created_at: string;     // ISO date string
  updated_at: string;     // ISO date string
}
\`\`\`

**Indexes:**
- `artist_id` (for querying releases by artist)
- `release_date` (for sorting by date)
- `featured` (for homepage carousel)

**Permissions:**
- Read: `any` (public access)
- Create/Update/Delete: `role:admin` (admin only)

---

### 2. **Artists Collection**
Stores artist information.

**Collection ID:** `artists`

**Attributes:**
\`\`\`typescript
{
  name: string;           // Artist name
  slug: string;           // URL-friendly slug
  bio: string;            // Artist biography
  photo_id: string;       // Appwrite Storage file ID
  country: string;        // Country of origin
  genres: string[];       // Array of genres
  social_links: {
    spotify?: string;
    apple_music?: string;
    soundcloud?: string;
    instagram?: string;
    twitter?: string;
  };
  featured: boolean;      // Show on homepage
  created_at: string;     // ISO date string
  updated_at: string;     // ISO date string
}
\`\`\`

**Indexes:**
- `slug` (unique, for URL routing)
- `featured` (for homepage display)

**Permissions:**
- Read: `any` (public access)
- Create/Update/Delete: `role:admin` (admin only)

---

### 3. **Tracks Collection**
Stores individual tracks within releases.

**Collection ID:** `tracks`

**Attributes:**
\`\`\`typescript
{
  release_id: string;     // Reference to releases collection
  title: string;          // Track title
  track_number: number;   // Position in release
  duration: number;       // Duration in seconds
  audio_file_id: string;  // Appwrite Storage file ID
  preview_url?: string;   // 30-second preview URL
  isrc?: string;          // International Standard Recording Code
  created_at: string;     // ISO date string
}
\`\`\`

**Indexes:**
- `release_id` (for querying tracks by release)
- `track_number` (for ordering)

**Permissions:**
- Read: `any` (public access for metadata)
- Create/Update/Delete: `role:admin` (admin only)

---

### 4. **Users Collection**
Extended user profile data (beyond Appwrite Auth).

**Collection ID:** `users`

**Attributes:**
\`\`\`typescript
{
  user_id: string;        // Appwrite Auth user ID
  email: string;          // User email
  display_name?: string;  // Display name
  polar_customer_id?: string; // Polar.sh customer ID
  purchased_releases: string[]; // Array of release IDs
  favorites: string[];    // Array of release IDs
  created_at: string;     // ISO date string
  updated_at: string;     // ISO date string
}
\`\`\`

**Indexes:**
- `user_id` (unique, for linking to Auth)
- `email` (unique)

**Permissions:**
- Read: `user:{user_id}` (users can read their own data)
- Create: `any` (on signup)
- Update: `user:{user_id}` (users can update their own data)
- Delete: `role:admin` (admin only)

---

### 5. **Orders Collection**
Synced with Polar.sh orders via webhooks.

**Collection ID:** `orders`

**Attributes:**
\`\`\`typescript
{
  user_id: string;        // Appwrite user ID
  polar_order_id: string; // Polar.sh order ID
  release_id: string;     // Purchased release
  product_type: string;   // "digital" | "vinyl" | "merchandise"
  amount: number;         // Price in cents
  status: string;         // "pending" | "completed" | "refunded"
  download_url?: string;  // For digital purchases
  created_at: string;     // ISO date string
}
\`\`\`

**Indexes:**
- `user_id` (for user purchase history)
- `polar_order_id` (unique)
- `status` (for filtering)

**Permissions:**
- Read: `user:{user_id}` (users can read their own orders)
- Create: `role:function` (created by webhook function)
- Update: `role:function` (updated by webhook function)
- Delete: `role:admin` (admin only)

---

## Storage Buckets

### 1. **Album Artwork Bucket**
**Bucket ID:** `album-artwork`

**Settings:**
- Max file size: 10MB
- Allowed file types: `image/jpeg`, `image/png`, `image/webp`
- Compression: Enabled
- Image transformations: Enabled (for thumbnails)

**Permissions:**
- Read: `any` (public access)
- Create/Update/Delete: `role:admin`

---

### 2. **Artist Photos Bucket**
**Bucket ID:** `artist-photos`

**Settings:**
- Max file size: 10MB
- Allowed file types: `image/jpeg`, `image/png`, `image/webp`
- Compression: Enabled
- Image transformations: Enabled

**Permissions:**
- Read: `any` (public access)
- Create/Update/Delete: `role:admin`

---

### 3. **Audio Files Bucket**
**Bucket ID:** `audio-files`

**Settings:**
- Max file size: 100MB
- Allowed file types: `audio/mpeg`, `audio/mp3`, `audio/wav`, `audio/flac`
- Compression: Disabled (preserve audio quality)
- CDN: Enabled (for fast streaming)

**Permissions:**
- Read: `user:*` (authenticated users only for full tracks)
- Create/Update/Delete: `role:admin`

**Note:** Preview clips (30-second samples) should be stored separately with public access.

---

### 4. **Preview Clips Bucket**
**Bucket ID:** `preview-clips`

**Settings:**
- Max file size: 5MB
- Allowed file types: `audio/mpeg`, `audio/mp3`
- CDN: Enabled

**Permissions:**
- Read: `any` (public access for previews)
- Create/Update/Delete: `role:admin`

---

## Authentication

### Setup
1. Enable **Email/Password** authentication in Appwrite Console
2. Configure email templates for verification and password reset
3. Set up OAuth providers (optional):
   - Spotify OAuth (for music fans)
   - Google OAuth
   - Apple OAuth

### User Roles
- **user**: Default role for registered users
- **admin**: Full access to create/update/delete content

### Session Management
- Session duration: 30 days
- Refresh tokens: Enabled
- Multi-device support: Enabled

---

## Functions

### 1. **Polar Webhook Handler**
**Function ID:** `polar-webhook-handler`

**Trigger:** HTTP endpoint (`/api/webhooks/polar`)

**Purpose:** Process Polar.sh webhook events

**Events Handled:**
- `order.created` - Create order record in Appwrite
- `order.completed` - Grant access to digital downloads
- `subscription.created` - Create subscription record
- `subscription.updated` - Update subscription status

**Environment Variables:**
- `POLAR_WEBHOOK_SECRET`
- `APPWRITE_API_KEY`

---

### 2. **Release Notification**
**Function ID:** `release-notification`

**Trigger:** Database event (new document in `releases` collection)

**Purpose:** Send notifications to users when new releases are published

**Actions:**
- Send email to subscribers
- Create in-app notifications
- Update real-time feed

---

### 3. **Audio File Processor**
**Function ID:** `audio-processor`

**Trigger:** Storage event (new file in `audio-files` bucket)

**Purpose:** Process uploaded audio files

**Actions:**
- Extract metadata (duration, bitrate, etc.)
- Generate 30-second preview clip
- Create waveform visualization
- Update track record with metadata

---

## Real-time Features

### Subscriptions
Enable real-time updates for:
- New releases feed
- Artist updates
- Order status changes

**Example Usage:**
\`\`\`typescript
import { client, databases } from '@/lib/appwrite';

// Subscribe to new releases
client.subscribe('databases.main.collections.releases.documents', response => {
  if (response.events.includes('databases.*.collections.*.documents.*.create')) {
    // New release published - update UI
    console.log('New release:', response.payload);
  }
});
\`\`\`

---

## Integration with Next.js

### Environment Variables
Create `.env.local`:

\`\`\`env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key

# Database IDs
NEXT_PUBLIC_APPWRITE_DATABASE_ID=main
NEXT_PUBLIC_RELEASES_COLLECTION_ID=releases
NEXT_PUBLIC_ARTISTS_COLLECTION_ID=artists
NEXT_PUBLIC_TRACKS_COLLECTION_ID=tracks
NEXT_PUBLIC_USERS_COLLECTION_ID=users
NEXT_PUBLIC_ORDERS_COLLECTION_ID=orders

# Storage Bucket IDs
NEXT_PUBLIC_ALBUM_ARTWORK_BUCKET_ID=album-artwork
NEXT_PUBLIC_ARTIST_PHOTOS_BUCKET_ID=artist-photos
NEXT_PUBLIC_AUDIO_FILES_BUCKET_ID=audio-files
NEXT_PUBLIC_PREVIEW_CLIPS_BUCKET_ID=preview-clips

# Polar.sh (for payment integration)
POLAR_ACCESS_TOKEN=your_polar_access_token
POLAR_WEBHOOK_SECRET=your_webhook_secret
\`\`\`

---

### Appwrite Client Setup

**File:** `lib/appwrite.ts`

\`\`\`typescript
import { Client, Databases, Storage, Account, Functions } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);
export const functions = new Functions(client);

export { client };
\`\`\`

---

### Example: Fetching Releases

\`\`\`typescript
import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';

export async function getFeaturedReleases() {
  const response = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_RELEASES_COLLECTION_ID!,
    [
      Query.equal('featured', true),
      Query.orderDesc('release_date'),
      Query.limit(10)
    ]
  );
  
  return response.documents;
}
\`\`\`

---

### Example: Audio Streaming

\`\`\`typescript
import { storage } from '@/lib/appwrite';

export function getAudioStreamUrl(fileId: string): string {
  return storage.getFileView(
    process.env.NEXT_PUBLIC_AUDIO_FILES_BUCKET_ID!,
    fileId
  ).href;
}

export function getPreviewUrl(fileId: string): string {
  return storage.getFileView(
    process.env.NEXT_PUBLIC_PREVIEW_CLIPS_BUCKET_ID!,
    fileId
  ).href;
}
\`\`\`

---

### Example: User Authentication

\`\`\`typescript
import { account } from '@/lib/appwrite';

export async function signUp(email: string, password: string, name: string) {
  const user = await account.create('unique()', email, password, name);
  
  // Create user profile in database
  await databases.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
    'unique()',
    {
      user_id: user.$id,
      email: user.email,
      display_name: name,
      purchased_releases: [],
      favorites: [],
      created_at: new Date().toISOString()
    }
  );
  
  return user;
}

export async function signIn(email: string, password: string) {
  return await account.createEmailPasswordSession(email, password);
}

export async function signOut() {
  return await account.deleteSession('current');
}

export async function getCurrentUser() {
  try {
    return await account.get();
  } catch {
    return null;
  }
}
\`\`\`

---

## Integration with Polar.sh

### Webhook Flow

1. User purchases a release via Polar.sh checkout
2. Polar.sh sends webhook to `/api/webhooks/polar`
3. Webhook handler verifies signature and processes event
4. Order record created in Appwrite `orders` collection
5. User's `purchased_releases` array updated
6. Download URL generated and stored
7. User receives email with download link

### Granting Access to Purchased Content

\`\`\`typescript
import { databases, storage } from '@/lib/appwrite';

export async function grantDownloadAccess(userId: string, releaseId: string) {
  // Get all tracks for the release
  const tracks = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TRACKS_COLLECTION_ID!,
    [Query.equal('release_id', releaseId)]
  );
  
  // Generate download URLs (valid for 24 hours)
  const downloadUrls = tracks.documents.map(track => ({
    title: track.title,
    url: storage.getFileDownload(
      process.env.NEXT_PUBLIC_AUDIO_FILES_BUCKET_ID!,
      track.audio_file_id
    ).href
  }));
  
  return downloadUrls;
}
\`\`\`

---

## Setup Instructions

### 1. Create Appwrite Project
1. Go to [Appwrite Cloud](https://cloud.appwrite.io) or self-host
2. Create a new project
3. Copy the Project ID

### 2. Create Database
1. Navigate to Databases
2. Create database named `main`
3. Create all collections listed above with their attributes and indexes

### 3. Create Storage Buckets
1. Navigate to Storage
2. Create all buckets listed above
3. Configure permissions and settings

### 4. Set Up Authentication
1. Navigate to Auth
2. Enable Email/Password authentication
3. Configure email templates
4. (Optional) Set up OAuth providers

### 5. Deploy Functions
1. Install Appwrite CLI: `npm install -g appwrite`
2. Initialize: `appwrite init`
3. Deploy functions: `appwrite deploy function`

### 6. Configure Environment Variables
1. Copy `.env.example` to `.env.local`
2. Fill in all Appwrite credentials
3. Add Polar.sh credentials

### 7. Test Integration
1. Create test releases and artists via Appwrite Console
2. Upload test audio files and images
3. Test authentication flow
4. Test Polar.sh webhook with test mode

---

## Security Best Practices

1. **API Keys**: Never expose `APPWRITE_API_KEY` in client-side code
2. **Permissions**: Use granular permissions for each collection
3. **File Access**: Restrict full audio files to authenticated users only
4. **Webhooks**: Always verify Polar.sh webhook signatures
5. **Rate Limiting**: Enable rate limiting in Appwrite Console
6. **CORS**: Configure allowed domains in Appwrite Console

---

## Monitoring & Analytics

### Appwrite Console
- Monitor API usage
- Track storage consumption
- View function execution logs
- Monitor authentication events

### Custom Analytics
Consider integrating:
- Vercel Analytics (for page views)
- Plausible or Umami (privacy-friendly analytics)
- Custom event tracking for music plays

---

## Backup & Recovery

1. **Database Backups**: Appwrite Cloud includes automatic backups
2. **Storage Backups**: Regularly backup audio files and images
3. **Export Data**: Use Appwrite CLI to export collections
4. **Disaster Recovery**: Document recovery procedures

---

## Future Enhancements

- **Search**: Implement full-text search with Appwrite Search
- **Recommendations**: Build recommendation engine based on user listening history
- **Playlists**: Allow users to create and share playlists
- **Social Features**: Comments, likes, and sharing
- **Analytics Dashboard**: Admin dashboard for sales and streaming analytics
- **Mobile Apps**: Use Appwrite SDKs for iOS/Android apps

---

## Support

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Discord](https://appwrite.io/discord)
- [Polar.sh Documentation](https://docs.polar.sh)

---

**Last Updated:** 2025
