# Quick Reference Guide

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── checkout/route.ts       # Polar.sh checkout
│   │   ├── portal/route.ts         # Customer portal
│   │   └── webhooks/polar/route.ts # Webhook handler (✅ Appwrite integrated)
│   ├── artist/[id]/page.tsx        # Artist profile (needs Appwrite data)
│   ├── artists/page.tsx            # Artists listing (needs Appwrite data)
│   ├── music/page.tsx              # Music catalog (needs Appwrite data)
│   ├── release/[id]/page.tsx       # Release detail (needs Appwrite data)
│   ├── profile/page.tsx            # User profile (needs implementation)
│   └── page.tsx                    # Homepage (needs Appwrite data)
├── components/
│   ├── auth-dialog.tsx             # ✅ Sign in/up dialog
│   ├── header.tsx                  # ✅ Header with auth
│   ├── hero-carousel.tsx           # Needs Appwrite data
│   ├── releases-grid.tsx           # Needs Appwrite data
│   └── music-player.tsx            # Needs audio integration
├── lib/
│   ├── appwrite.ts                 # ✅ Appwrite client config
│   ├── auth.ts                     # ✅ Auth utilities
│   ├── auth-context.tsx            # ✅ Auth provider
│   ├── data.ts                     # ✅ Data fetching utilities
│   ├── example-data.ts             # ✅ Sample data
│   └── polar-config.ts             # Polar.sh config
└── Documentation
    ├── SETUP_GUIDE.md              # ✅ Complete setup instructions
    ├── APPWRITE_SETUP.md           # ✅ Appwrite details
    ├── POLAR_SETUP.md              # ✅ Polar.sh details
    ├── IMPLEMENTATION_STATUS.md    # ✅ What's done/todo
    └── QUICK_REFERENCE.md          # This file
```

## 🔑 Key Files

### Configuration
- **`.env.example`** - Template for environment variables
- **`lib/appwrite.ts`** - Appwrite client and constants
- **`lib/polar-config.ts`** - Polar.sh configuration

### Data & Auth
- **`lib/data.ts`** - All data fetching functions
- **`lib/auth.ts`** - Authentication functions
- **`lib/auth-context.tsx`** - React context for auth state

### Components
- **`components/auth-dialog.tsx`** - Sign in/up modal
- **`components/header.tsx`** - Header with auth integration

### API Routes
- **`app/api/checkout/route.ts`** - Polar.sh checkout
- **`app/api/webhooks/polar/route.ts`** - Webhook handler

## 🚀 Common Tasks

### Fetch Featured Releases
```typescript
import { getFeaturedReleases } from '@/lib/data'

const releases = await getFeaturedReleases(10)
```

### Fetch All Artists
```typescript
import { getAllArtists } from '@/lib/data'

const artists = await getAllArtists()
```

### Get Release with Tracks
```typescript
import { getReleaseById, getTracksByRelease } from '@/lib/data'

const release = await getReleaseById(releaseId)
const tracks = await getTracksByRelease(releaseId)
```

### Get Image URLs
```typescript
import { getAlbumArtworkUrl, getArtistPhotoUrl } from '@/lib/data'

const coverUrl = getAlbumArtworkUrl(release.cover_image_id)
const photoUrl = getArtistPhotoUrl(artist.photo_id)
```

### Get Audio Stream URL
```typescript
import { getAudioStreamUrl, getPreviewUrl } from '@/lib/data'

const streamUrl = getAudioStreamUrl(track.audio_file_id)
const previewUrl = getPreviewUrl(track.audio_file_id)
```

### Use Authentication
```typescript
'use client'
import { useAuth } from '@/lib/auth-context'

export function MyComponent() {
  const { user, loading, signOut } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please sign in</div>
  
  return <div>Welcome {user.name}</div>
}
```

### Sign Up User
```typescript
import { signUp } from '@/lib/auth'

await signUp('user@example.com', 'password123', 'John Doe')
```

### Check if User Purchased Release
```typescript
import { hasPurchasedRelease } from '@/lib/auth'

const purchased = await hasPurchasedRelease(userId, releaseId)
```

## 🔧 Environment Variables

### Required for Development
```env
# Appwrite (minimum to get started)
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=main

# Collections
NEXT_PUBLIC_RELEASES_COLLECTION_ID=releases
NEXT_PUBLIC_ARTISTS_COLLECTION_ID=artists
NEXT_PUBLIC_TRACKS_COLLECTION_ID=tracks

# Buckets
NEXT_PUBLIC_ALBUM_ARTWORK_BUCKET_ID=album-artwork
NEXT_PUBLIC_ARTIST_PHOTOS_BUCKET_ID=artist-photos

# App URL
NEXT_PUBLIC_URL=http://localhost:3000
```

### Required for Payments
```env
POLAR_ACCESS_TOKEN=polar_oat_xxxxx
POLAR_SERVER=sandbox
POLAR_DIGITAL_DOWNLOAD_PRODUCT_ID=prod_xxxxx
```

## 📊 Database Schema Quick Reference

### Releases
```typescript
{
  title: string
  artist_id: string
  artist_name: string
  type: 'Album' | 'EP' | 'Single' | 'Compilation'
  release_date: string
  cover_image_id: string
  description: string
  polar_product_id?: string
  featured: boolean
}
```

### Artists
```typescript
{
  name: string
  slug: string
  bio: string
  photo_id: string
  country: string
  genres: string[]
  social_links: object
  featured: boolean
}
```

### Tracks
```typescript
{
  release_id: string
  title: string
  track_number: number
  duration: number  // seconds
  audio_file_id: string
  preview_url?: string
}
```

## 🎨 Common Patterns

### Server Component with Data
```typescript
// app/music/page.tsx
import { getAllReleases } from '@/lib/data'

export default async function MusicPage() {
  const releases = await getAllReleases()
  
  return (
    <div>
      {releases.map(release => (
        <div key={release.$id}>{release.title}</div>
      ))}
    </div>
  )
}
```

### Client Component with Auth
```typescript
'use client'
import { useAuth } from '@/lib/auth-context'

export function ProfileButton() {
  const { user } = useAuth()
  
  return user ? (
    <span>{user.name}</span>
  ) : (
    <button>Sign In</button>
  )
}
```

### Protected Route
```typescript
'use client'
import { useAuth } from '@/lib/auth-context'
import { redirect } from 'next/navigation'

export default function ProtectedPage() {
  const { user, loading } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) redirect('/') // or show auth dialog
  
  return <div>Protected content</div>
}
```

## 🐛 Debugging

### Check Appwrite Connection
```typescript
import { databases, DATABASE_ID } from '@/lib/appwrite'

// In a server component or API route
const test = await databases.listDocuments(DATABASE_ID, 'releases')
console.log('Connected! Found', test.total, 'releases')
```

### Check Auth State
```typescript
import { getCurrentUser } from '@/lib/auth'

const user = await getCurrentUser()
console.log('Current user:', user)
```

### Check Environment Variables
```typescript
console.log({
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
})
```

## 📝 Next Steps

1. **Set up Appwrite** - Follow `SETUP_GUIDE.md`
2. **Add sample data** - Use `lib/example-data.ts`
3. **Update homepage** - Fetch real data in `app/page.tsx`
4. **Update catalog** - Fetch real data in `app/music/page.tsx`
5. **Test auth** - Sign up and sign in
6. **Test purchases** - Use Polar sandbox mode

## 🔗 Useful Links

- [Appwrite Console](https://cloud.appwrite.io)
- [Polar Dashboard](https://polar.sh)
- [Appwrite Docs](https://appwrite.io/docs)
- [Polar Docs](https://docs.polar.sh)
- [Next.js Docs](https://nextjs.org/docs)

## 💡 Tips

- Use server components for data fetching (better performance)
- Use client components only when needed (interactivity, hooks)
- Always handle loading and error states
- Test with sample data before adding real content
- Use Polar sandbox mode for testing payments
- Check browser console for errors
- Verify Appwrite permissions if data doesn't load
