# NUMBA Backend Architecture

## Overview
This document outlines the complete backend architecture for NUMBA, a music platform supporting two user journeys:
- **Clients**: Listen to music, browse catalog, purchase releases
- **Artists**: Upload music, manage releases, view analytics, track sales

## Technology Stack

### Core Services
- **Appwrite**: Backend-as-a-Service (Database, Storage, Auth, Functions)
- **Polar.sh**: Payment processing and digital product delivery
- **Next.js**: Frontend framework with API routes
- **Vercel**: Hosting and edge functions

---

## 1. Appwrite Database Schema

### Collections

#### 1.1 Users Collection (`users`)
Extended user profiles beyond Appwrite Auth.

```typescript
interface User {
  $id: string                    // Appwrite user ID
  email: string
  name: string
  role: 'client' | 'artist' | 'admin'
  avatar?: string                // Storage file ID
  bio?: string
  location?: string
  socialLinks?: {
    spotify?: string
    instagram?: string
    twitter?: string
    website?: string
  }
  artistProfile?: string         // Reference to Artists collection
  preferences: {
    emailNotifications: boolean
    newReleaseAlerts: boolean
  }
  createdAt: string
  updatedAt: string
}
```

**Indexes:**
- `email` (unique)
- `role`
- `createdAt`

**Permissions:**
- Read: User (self), Admin
- Write: User (self), Admin
- Delete: Admin only

---

#### 1.2 Artists Collection (`artists`)
Artist profiles and metadata.

```typescript
interface Artist {
  $id: string
  userId: string                 // Reference to Users collection
  name: string
  slug: string                   // URL-friendly name
  bio: string
  avatar: string                 // Storage file ID
  coverImage?: string            // Storage file ID
  verified: boolean
  genres: string[]
  socialLinks: {
    spotify?: string
    instagram?: string
    twitter?: string
    soundcloud?: string
    website?: string
  }
  stats: {
    totalReleases: number
    totalStreams: number
    totalSales: number
    followers: number
  }
  polarArtistId?: string         // Polar organization/artist ID
  createdAt: string
  updatedAt: string
}
```

**Indexes:**
- `userId` (unique)
- `slug` (unique)
- `verified`
- `createdAt`

**Permissions:**
- Read: Any (public)
- Write: Artist (self), Admin
- Delete: Admin only

---

#### 1.3 Releases Collection (`releases`)
Music releases (albums, EPs, singles).

```typescript
interface Release {
  $id: string
  artistId: string               // Reference to Artists collection
  title: string
  slug: string                   // URL-friendly title
  type: 'album' | 'ep' | 'single'
  status: 'draft' | 'scheduled' | 'published' | 'archived'
  releaseDate: string
  description: string
  artwork: string                // Storage file ID
  genres: string[]
  tags: string[]
  price?: number                 // USD, null for streaming-only
  polarProductId?: string        // Polar product ID for sales
  isNew: boolean                 // Show "NEW" badge
  isFeatured: boolean            // Show on homepage
  stats: {
    plays: number
    likes: number
    purchases: number
    revenue: number              // Total revenue in USD
  }
  metadata: {
    label?: string
    catalogNumber?: string
    upc?: string
    copyright?: string
  }
  createdAt: string
  updatedAt: string
  publishedAt?: string
}
```

**Indexes:**
- `artistId`
- `slug` (unique)
- `status`
- `releaseDate`
- `isNew`
- `isFeatured`

**Permissions:**
- Read: Any (if published), Artist (self, all statuses), Admin
- Write: Artist (self), Admin
- Delete: Artist (self, if draft), Admin

---

#### 1.4 Tracks Collection (`tracks`)
Individual tracks within releases.

```typescript
interface Track {
  $id: string
  releaseId: string              // Reference to Releases collection
  artistId: string               // Reference to Artists collection
  title: string
  trackNumber: number
  duration: number               // Seconds
  audioFile: string              // Storage file ID (high quality)
  audioFilePreview?: string      // Storage file ID (30s preview)
  waveform?: string              // Storage file ID (waveform JSON/image)
  lyrics?: string
  isrc?: string                  // International Standard Recording Code
  credits: {
    role: string                 // Producer, Mixer, Vocalist, etc.
    name: string
  }[]
  stats: {
    plays: number
    likes: number
    skips: number
  }
  createdAt: string
  updatedAt: string
}
```

**Indexes:**
- `releaseId`
- `artistId`
- `trackNumber`

**Permissions:**
- Read: Any (if release published), Artist (self), Admin
- Write: Artist (self), Admin
- Delete: Artist (self), Admin

---

#### 1.5 Sample Packs Collection (`samplePacks`)
Downloadable sample packs for producers.

```typescript
interface SamplePack {
  $id: string
  artistId: string               // Reference to Artists collection
  title: string
  slug: string
  description: string
  image: string                  // Storage file ID
  price: number                  // USD
  samples: number                // Number of samples included
  size: string                   // File size (e.g., "250 MB")
  format: string[]               // WAV, MP3, MIDI, etc.
  tags: string[]
  genres: string[]
  downloadFile: string           // Storage file ID (ZIP)
  previewFiles?: string[]        // Storage file IDs (audio previews)
  polarProductId: string         // Polar product ID
  isNew: boolean
  stats: {
    downloads: number
    purchases: number
    revenue: number
  }
  createdAt: string
  updatedAt: string
}
```

**Indexes:**
- `artistId`
- `slug` (unique)
- `isNew`

**Permissions:**
- Read: Any (public)
- Write: Artist (self), Admin
- Delete: Artist (self), Admin

---

#### 1.6 Playlists Collection (`playlists`)
User-created playlists.

```typescript
interface Playlist {
  $id: string
  userId: string                 // Reference to Users collection
  name: string
  description?: string
  coverImage?: string            // Storage file ID or auto-generated
  tracks: string[]               // Array of Track IDs
  isPublic: boolean
  stats: {
    followers: number
    plays: number
  }
  createdAt: string
  updatedAt: string
}
```

**Indexes:**
- `userId`
- `isPublic`
- `createdAt`

**Permissions:**
- Read: Any (if public), User (self), Admin
- Write: User (self), Admin
- Delete: User (self), Admin

---

#### 1.7 Purchases Collection (`purchases`)
Track user purchases from Polar.

```typescript
interface Purchase {
  $id: string
  userId: string                 // Reference to Users collection
  productType: 'release' | 'samplePack' | 'track'
  productId: string              // Release/SamplePack/Track ID
  artistId: string               // Reference to Artists collection
  polarOrderId: string           // Polar order ID
  polarCheckoutId: string        // Polar checkout ID
  amount: number                 // USD
  currency: string               // USD
  status: 'pending' | 'completed' | 'refunded'
  downloadUrl?: string           // Polar download URL
  downloadExpiry?: string
  metadata: {
    customerEmail: string
    customerName?: string
  }
  createdAt: string
  updatedAt: string
}
```

**Indexes:**
- `userId`
- `productId`
- `artistId`
- `polarOrderId` (unique)
- `status`
- `createdAt`

**Permissions:**
- Read: User (self), Admin
- Write: System (via webhook), Admin
- Delete: Admin only

---

#### 1.8 Analytics Collection (`analytics`)
Track plays, likes, and engagement.

```typescript
interface Analytics {
  $id: string
  type: 'play' | 'like' | 'skip' | 'share' | 'download'
  entityType: 'track' | 'release' | 'playlist'
  entityId: string               // Track/Release/Playlist ID
  artistId?: string              // Reference to Artists collection
  userId?: string                // Reference to Users collection (if logged in)
  metadata: {
    duration?: number            // Seconds played (for plays)
    source?: string              // Homepage, search, artist page, etc.
    device?: string              // Mobile, desktop
    location?: string            // Country/city (if available)
  }
  timestamp: string
}
```

**Indexes:**
- `type`
- `entityType`
- `entityId`
- `artistId`
- `userId`
- `timestamp`

**Permissions:**
- Read: Admin only
- Write: System only
- Delete: Admin only

---

#### 1.9 Follows Collection (`follows`)
User follows for artists.

```typescript
interface Follow {
  $id: string
  userId: string                 // Reference to Users collection
  artistId: string               // Reference to Artists collection
  createdAt: string
}
```

**Indexes:**
- `userId`
- `artistId`
- Compound: `userId + artistId` (unique)

**Permissions:**
- Read: User (self), Admin
- Write: User (self), Admin
- Delete: User (self), Admin

---

## 2. Appwrite Storage Structure

### Buckets

#### 2.1 `avatars` Bucket
User and artist profile pictures.

**Configuration:**
- Max file size: 5 MB
- Allowed extensions: jpg, jpeg, png, webp
- Compression: Enabled
- Permissions: Read (Any), Write (User/Artist self), Delete (User/Artist self)

**File naming:**
- `user-{userId}.{ext}`
- `artist-{artistId}.{ext}`

---

#### 2.2 `artwork` Bucket
Release and sample pack cover art.

**Configuration:**
- Max file size: 10 MB
- Allowed extensions: jpg, jpeg, png, webp
- Compression: Enabled
- Image transformations: Multiple sizes (thumbnail, medium, large)
- Permissions: Read (Any), Write (Artist), Delete (Artist)

**File naming:**
- `release-{releaseId}.{ext}`
- `samplepack-{samplePackId}.{ext}`

---

#### 2.3 `audio` Bucket
Audio files for streaming.

**Configuration:**
- Max file size: 50 MB per track
- Allowed extensions: mp3, wav, flac
- Encryption: Enabled
- Permissions: Read (Any for previews, Purchased users for full), Write (Artist), Delete (Artist)

**File naming:**
- `track-{trackId}-full.{ext}`
- `track-{trackId}-preview.mp3` (30-second preview)

---

#### 2.4 `downloads` Bucket
Downloadable products (full releases, sample packs).

**Configuration:**
- Max file size: 500 MB
- Allowed extensions: zip
- Encryption: Enabled
- Permissions: Read (Purchased users only), Write (Artist/System), Delete (Artist/Admin)

**File naming:**
- `release-{releaseId}.zip`
- `samplepack-{samplePackId}.zip`

---

#### 2.5 `waveforms` Bucket
Waveform visualizations for tracks.

**Configuration:**
- Max file size: 1 MB
- Allowed extensions: json, png, svg
- Permissions: Read (Any), Write (System), Delete (System)

**File naming:**
- `track-{trackId}.json`

---

## 3. Authentication & Authorization

### User Roles

#### 3.1 Client Role
**Permissions:**
- Browse and stream music
- Purchase releases and sample packs
- Create playlists
- Like and follow artists
- Manage own profile

#### 3.2 Artist Role
**Inherits Client permissions, plus:**
- Upload releases and tracks
- Upload sample packs
- Manage own releases (edit, delete drafts)
- View analytics for own content
- Manage artist profile
- Access artist dashboard

#### 3.3 Admin Role
**Full access:**
- Manage all users, artists, releases
- Approve artist verifications
- Access all analytics
- Manage platform settings
- Handle refunds and disputes

### Implementation

```typescript
// lib/auth-roles.ts
export enum UserRole {
  CLIENT = 'client',
  ARTIST = 'artist',
  ADMIN = 'admin'
}

export const hasPermission = (
  userRole: UserRole,
  action: string,
  resource: string
): boolean => {
  const permissions = {
    [UserRole.CLIENT]: [
      'read:releases',
      'read:artists',
      'create:playlist',
      'update:profile:self',
      'create:purchase'
    ],
    [UserRole.ARTIST]: [
      'read:releases',
      'read:artists',
      'create:playlist',
      'update:profile:self',
      'create:purchase',
      'create:release',
      'update:release:self',
      'delete:release:self',
      'create:track',
      'update:track:self',
      'read:analytics:self'
    ],
    [UserRole.ADMIN]: ['*']
  }

  const userPermissions = permissions[userRole]
  return userPermissions.includes('*') || 
         userPermissions.includes(`${action}:${resource}`)
}
```

---

## 4. Artist Dashboard Features

### 4.1 Upload Flow

**Step 1: Release Creation**
1. Artist creates new release (draft status)
2. Fills in metadata (title, type, release date, description)
3. Uploads artwork (validates dimensions, file size)

**Step 2: Track Upload**
1. Upload audio files (validates format, bitrate)
2. System generates waveforms automatically
3. System creates 30-second previews
4. Artist adds track metadata (title, credits, lyrics)

**Step 3: Pricing & Distribution**
1. Artist sets price (or streaming-only)
2. System creates Polar product
3. Artist reviews and publishes

**Step 4: Publishing**
1. Status changes to "published"
2. Release appears on platform
3. Followers receive notifications

### 4.2 Analytics Dashboard

**Metrics to Track:**
- **Streams**: Total plays, unique listeners, play duration
- **Engagement**: Likes, playlist adds, shares
- **Sales**: Revenue, units sold, conversion rate
- **Audience**: Top countries, age groups, listening times
- **Track Performance**: Most played tracks, skip rates

**Visualizations:**
- Line charts for streams over time
- Bar charts for top tracks
- Pie charts for revenue by release
- Geographic heat maps for audience location

### 4.3 Revenue Tracking

**Integration with Polar:**
- Sync sales data via webhooks
- Display total revenue, pending payouts
- Revenue breakdown by release/sample pack
- Export sales reports (CSV)

---

## 5. Polar Integration

### 5.1 Product Setup

**For Each Release:**
```typescript
// Create Polar product when release is published
const createPolarProduct = async (release: Release) => {
  const product = await polar.products.create({
    name: release.title,
    description: release.description,
    price: release.price * 100, // Convert to cents
    type: 'digital',
    media: [release.artwork],
    metadata: {
      releaseId: release.$id,
      artistId: release.artistId,
      type: 'release'
    }
  })

  // Update release with Polar product ID
  await databases.updateDocument(
    'releases',
    release.$id,
    { polarProductId: product.id }
  )
}
```

### 5.2 Checkout Flow

**Client-side:**
```typescript
// app/api/checkout/route.ts
export async function POST(req: Request) {
  const { productId, productType } = await req.json()
  
  // Get product details from Appwrite
  const product = await getProduct(productId, productType)
  
  // Create Polar checkout
  const checkout = await polar.checkouts.create({
    productId: product.polarProductId,
    successUrl: `${process.env.NEXT_PUBLIC_URL}/purchase/success?id={CHECKOUT_ID}`,
    metadata: {
      userId: session.userId,
      productId,
      productType
    }
  })
  
  return Response.json({ checkoutUrl: checkout.url })
}
```

### 5.3 Webhook Handler

**Handle purchase completion:**
```typescript
// app/api/webhooks/polar/route.ts
export async function POST(req: Request) {
  const event = await polar.webhooks.verify(req)
  
  if (event.type === 'checkout.completed') {
    const { metadata, amount, customer } = event.data
    
    // Create purchase record
    await databases.createDocument('purchases', {
      userId: metadata.userId,
      productType: metadata.productType,
      productId: metadata.productId,
      polarOrderId: event.data.orderId,
      amount: amount / 100,
      status: 'completed',
      downloadUrl: event.data.downloadUrl,
      metadata: {
        customerEmail: customer.email,
        customerName: customer.name
      }
    })
    
    // Update release stats
    await updateReleaseStats(metadata.productId, {
      purchases: increment(1),
      revenue: increment(amount / 100)
    })
    
    // Send confirmation email
    await sendPurchaseConfirmation(customer.email, metadata.productId)
  }
  
  return Response.json({ received: true })
}
```

---

## 6. Appwrite Functions

### 6.1 Waveform Generator
**Trigger:** On track upload
**Purpose:** Generate waveform visualization

```javascript
// functions/generate-waveform/src/main.js
import { Client, Storage } from 'node-appwrite'
import ffmpeg from 'fluent-ffmpeg'

export default async ({ req, res, log, error }) => {
  const { trackId, audioFileId } = JSON.parse(req.body)
  
  // Download audio file
  const audioBuffer = await storage.getFileDownload(audioFileId)
  
  // Generate waveform data
  const waveformData = await generateWaveform(audioBuffer)
  
  // Upload waveform JSON
  const waveformFile = await storage.createFile(
    'waveforms',
    `track-${trackId}.json`,
    Buffer.from(JSON.stringify(waveformData))
  )
  
  // Update track with waveform file ID
  await databases.updateDocument('tracks', trackId, {
    waveform: waveformFile.$id
  })
  
  return res.json({ success: true })
}
```

### 6.2 Preview Generator
**Trigger:** On track upload
**Purpose:** Create 30-second preview

```javascript
// functions/generate-preview/src/main.js
export default async ({ req, res, log, error }) => {
  const { trackId, audioFileId } = JSON.parse(req.body)
  
  // Download full audio
  const audioBuffer = await storage.getFileDownload(audioFileId)
  
  // Extract 30 seconds (from 30s to 60s mark)
  const preview = await extractPreview(audioBuffer, 30, 60)
  
  // Upload preview
  const previewFile = await storage.createFile(
    'audio',
    `track-${trackId}-preview.mp3`,
    preview
  )
  
  // Update track
  await databases.updateDocument('tracks', trackId, {
    audioFilePreview: previewFile.$id
  })
  
  return res.json({ success: true })
}
```

### 6.3 Analytics Aggregator
**Trigger:** Scheduled (daily at midnight)
**Purpose:** Aggregate daily analytics

```javascript
// functions/aggregate-analytics/src/main.js
export default async ({ req, res, log, error }) => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  
  // Get all plays from yesterday
  const plays = await databases.listDocuments('analytics', [
    Query.equal('type', 'play'),
    Query.greaterThan('timestamp', yesterday.toISOString())
  ])
  
  // Aggregate by track
  const trackStats = {}
  plays.documents.forEach(play => {
    if (!trackStats[play.entityId]) {
      trackStats[play.entityId] = { plays: 0, duration: 0 }
    }
    trackStats[play.entityId].plays++
    trackStats[play.entityId].duration += play.metadata.duration || 0
  })
  
  // Update track stats
  for (const [trackId, stats] of Object.entries(trackStats)) {
    await databases.updateDocument('tracks', trackId, {
      'stats.plays': increment(stats.plays)
    })
  }
  
  return res.json({ processed: plays.total })
}
```

### 6.4 New Release Notifier
**Trigger:** On release publish
**Purpose:** Notify followers

```javascript
// functions/notify-followers/src/main.js
export default async ({ req, res, log, error }) => {
  const { releaseId, artistId } = JSON.parse(req.body)
  
  // Get all followers
  const followers = await databases.listDocuments('follows', [
    Query.equal('artistId', artistId)
  ])
  
  // Get release and artist details
  const release = await databases.getDocument('releases', releaseId)
  const artist = await databases.getDocument('artists', artistId)
  
  // Send notifications
  for (const follow of followers.documents) {
    const user = await databases.getDocument('users', follow.userId)
    
    if (user.preferences.newReleaseAlerts) {
      await sendEmail({
        to: user.email,
        subject: `New release from ${artist.name}`,
        template: 'new-release',
        data: { release, artist }
      })
    }
  }
  
  return res.json({ notified: followers.total })
}
```

---

## 7. Migration Plan

### Phase 1: Database Setup (Week 1)
1. Create Appwrite project
2. Set up all collections with schemas
3. Configure indexes and permissions
4. Create storage buckets
5. Test CRUD operations

### Phase 2: Authentication (Week 2)
1. Implement Appwrite Auth
2. Create user registration flow
3. Add role-based access control
4. Build artist application flow
5. Test permissions

### Phase 3: File Upload (Week 3)
1. Build release upload UI
2. Implement track upload with progress
3. Set up Appwrite Functions for processing
4. Test waveform and preview generation
5. Optimize storage and delivery

### Phase 4: Polar Integration (Week 4)
1. Set up Polar products
2. Implement checkout flow
3. Build webhook handler
4. Test purchase flow end-to-end
5. Add download delivery

### Phase 5: Artist Dashboard (Week 5-6)
1. Build analytics dashboard
2. Implement revenue tracking
3. Create release management UI
4. Add bulk upload features
5. Test artist workflows

### Phase 6: Migration from Static Data (Week 7)
1. Export current static data
2. Import into Appwrite collections
3. Update frontend to use Appwrite SDK
4. Test all features
5. Deploy to production

---

## 8. Code Examples

### 8.1 Appwrite Client Setup

```typescript
// lib/appwrite.ts
import { Client, Databases, Storage, Account, Functions } from 'appwrite'

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

export const databases = new Databases(client)
export const storage = new Storage(client)
export const account = new Account(client)
export const functions = new Functions(client)

export { client }
```

### 8.2 Release Upload Hook

```typescript
// hooks/use-release-upload.ts
import { useState } from 'react'
import { databases, storage } from '@/lib/appwrite'
import { ID } from 'appwrite'

export const useReleaseUpload = () => {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const uploadRelease = async (data: ReleaseFormData) => {
    setUploading(true)
    
    try {
      // 1. Upload artwork
      const artworkFile = await storage.createFile(
        'artwork',
        ID.unique(),
        data.artwork,
        undefined,
        (progress) => setProgress(progress.progress)
      )
      
      // 2. Create release document
      const release = await databases.createDocument(
        'releases',
        ID.unique(),
        {
          artistId: data.artistId,
          title: data.title,
          type: data.type,
          status: 'draft',
          artwork: artworkFile.$id,
          description: data.description,
          releaseDate: data.releaseDate,
          genres: data.genres,
          price: data.price
        }
      )
      
      // 3. Upload tracks
      for (const track of data.tracks) {
        const audioFile = await storage.createFile(
          'audio',
          ID.unique(),
          track.file,
          undefined,
          (progress) => setProgress(progress.progress)
        )
        
        await databases.createDocument(
          'tracks',
          ID.unique(),
          {
            releaseId: release.$id,
            artistId: data.artistId,
            title: track.title,
            trackNumber: track.number,
            audioFile: audioFile.$id,
            duration: track.duration
          }
        )
      }
      
      setUploading(false)
      return release
    } catch (error) {
      setUploading(false)
      throw error
    }
  }

  return { uploadRelease, uploading, progress }
}
```

### 8.3 Analytics Tracking

```typescript
// lib/analytics.ts
import { databases } from './appwrite'
import { ID } from 'appwrite'

export const trackPlay = async (
  trackId: string,
  userId?: string,
  metadata?: Record<string, any>
) => {
  await databases.createDocument(
    'analytics',
    ID.unique(),
    {
      type: 'play',
      entityType: 'track',
      entityId: trackId,
      userId,
      metadata,
      timestamp: new Date().toISOString()
    }
  )
}

export const trackLike = async (
  entityType: 'track' | 'release',
  entityId: string,
  userId: string
) => {
  await databases.createDocument(
    'analytics',
    ID.unique(),
    {
      type: 'like',
      entityType,
      entityId,
      userId,
      timestamp: new Date().toISOString()
    }
  )
}
```

---

## 9. Security Considerations

### 9.1 File Upload Security
- Validate file types and sizes on client and server
- Scan uploaded files for malware
- Use signed URLs for private downloads
- Implement rate limiting on uploads

### 9.2 Payment Security
- Never store credit card data
- Verify Polar webhook signatures
- Use HTTPS for all API calls
- Implement fraud detection

### 9.3 Data Privacy
- GDPR compliance for EU users
- Allow users to export/delete their data
- Encrypt sensitive data at rest
- Implement proper access controls

### 9.4 API Security
- Rate limit all API endpoints
- Implement CORS properly
- Validate all inputs
- Use Appwrite's built-in security features

---

## 10. Cost Estimation

### Appwrite Pro Plan
- **Database**: ~$0.40 per GB/month
- **Storage**: ~$0.15 per GB/month
- **Bandwidth**: ~$0.10 per GB
- **Functions**: ~$0.40 per million executions

**Estimated Monthly Cost (1000 active users):**
- Database: 5 GB × $0.40 = $2
- Storage: 100 GB × $0.15 = $15
- Bandwidth: 500 GB × $0.10 = $50
- Functions: 100k executions × $0.40/1M = $0.04
- **Total: ~$67/month**

### Polar Fees
- 5% + $0.50 per transaction
- No monthly fees

### Vercel Hosting
- Free tier sufficient for start
- Pro plan: $20/month if needed

**Total Estimated Cost: $67-87/month**

---

## Next Steps

1. **Set up Appwrite project** and create collections
2. **Build artist onboarding flow** for testing
3. **Implement file upload** with progress tracking
4. **Integrate Polar** for test purchases
5. **Build analytics dashboard** MVP
6. **Migrate static data** to Appwrite
7. **Launch beta** with select artists

---

## Resources

- [Appwrite Documentation](https://appwrite.io/docs)
- [Polar API Reference](https://docs.polar.sh)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Appwrite React SDK](https://appwrite.io/docs/sdks#client)

---

**Questions or need clarification on any section? Let me know!**
