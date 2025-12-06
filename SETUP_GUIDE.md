# Complete Setup Guide

This guide will walk you through setting up your record label website with Appwrite backend and Polar.sh payments.

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- Appwrite account (cloud.appwrite.io or self-hosted)
- Polar.sh account for payments

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Appwrite

### 2.1 Create Appwrite Project

1. Go to [Appwrite Cloud](https://cloud.appwrite.io) or your self-hosted instance
2. Create a new project
3. Copy your Project ID
4. Note your API endpoint (usually `https://cloud.appwrite.io/v1`)

### 2.2 Create Database and Collections

1. Navigate to **Databases** → Create database named `main`
2. Create the following collections with their attributes:

#### Releases Collection
- Collection ID: `releases`
- Attributes:
  - `title` (string, required)
  - `artist_id` (string, required)
  - `artist_name` (string, required)
  - `type` (string, required) - enum: Album, EP, Single, Compilation
  - `release_date` (string, required)
  - `cover_image_id` (string, required)
  - `description` (string)
  - `label` (string)
  - `catalog_number` (string)
  - `polar_product_id` (string)
  - `featured` (boolean, default: false)
  - `created_at` (string, required)
  - `updated_at` (string, required)
- Indexes:
  - `artist_id` (key)
  - `release_date` (key)
  - `featured` (key)
- Permissions:
  - Read: `any`
  - Create/Update/Delete: `role:admin`

#### Artists Collection
- Collection ID: `artists`
- Attributes:
  - `name` (string, required)
  - `slug` (string, required, unique)
  - `bio` (string)
  - `photo_id` (string)
  - `country` (string)
  - `genres` (string[], array)
  - `social_links` (string, JSON)
  - `featured` (boolean, default: false)
  - `created_at` (string, required)
  - `updated_at` (string, required)
- Indexes:
  - `slug` (unique key)
  - `featured` (key)
- Permissions:
  - Read: `any`
  - Create/Update/Delete: `role:admin`

#### Tracks Collection
- Collection ID: `tracks`
- Attributes:
  - `release_id` (string, required)
  - `title` (string, required)
  - `track_number` (integer, required)
  - `duration` (integer, required) - in seconds
  - `audio_file_id` (string, required)
  - `preview_url` (string)
  - `isrc` (string)
  - `created_at` (string, required)
- Indexes:
  - `release_id` (key)
  - `track_number` (key)
- Permissions:
  - Read: `any`
  - Create/Update/Delete: `role:admin`

#### Users Collection
- Collection ID: `users`
- Attributes:
  - `user_id` (string, required, unique)
  - `email` (string, required, unique)
  - `display_name` (string)
  - `polar_customer_id` (string)
  - `purchased_releases` (string[], array)
  - `favorites` (string[], array)
  - `created_at` (string, required)
  - `updated_at` (string, required)
- Indexes:
  - `user_id` (unique key)
  - `email` (unique key)
- Permissions:
  - Read: `user:{user_id}`
  - Create: `any`
  - Update: `user:{user_id}`
  - Delete: `role:admin`

#### Orders Collection
- Collection ID: `orders`
- Attributes:
  - `user_id` (string, required)
  - `polar_order_id` (string, required, unique)
  - `release_id` (string, required)
  - `product_type` (string, required)
  - `amount` (integer, required)
  - `status` (string, required)
  - `download_url` (string)
  - `created_at` (string, required)
- Indexes:
  - `user_id` (key)
  - `polar_order_id` (unique key)
  - `status` (key)
- Permissions:
  - Read: `user:{user_id}`
  - Create: `role:function`
  - Update: `role:function`
  - Delete: `role:admin`

### 2.3 Create Storage Buckets

1. Navigate to **Storage** → Create the following buckets:

#### album-artwork
- Max file size: 10MB
- Allowed file types: `image/jpeg`, `image/png`, `image/webp`
- Compression: Enabled
- Permissions: Read `any`, Create/Update/Delete `role:admin`

#### artist-photos
- Max file size: 10MB
- Allowed file types: `image/jpeg`, `image/png`, `image/webp`
- Compression: Enabled
- Permissions: Read `any`, Create/Update/Delete `role:admin`

#### audio-files
- Max file size: 100MB
- Allowed file types: `audio/mpeg`, `audio/mp3`, `audio/wav`
- Compression: Disabled
- Permissions: Read `user:*`, Create/Update/Delete `role:admin`

#### preview-clips
- Max file size: 5MB
- Allowed file types: `audio/mpeg`, `audio/mp3`
- Permissions: Read `any`, Create/Update/Delete `role:admin`

### 2.4 Set Up Authentication

1. Navigate to **Auth** → **Settings**
2. Enable **Email/Password** authentication
3. Configure email templates for verification and password reset
4. (Optional) Set up OAuth providers (Spotify, Google, etc.)

### 2.5 Get API Key

1. Navigate to **Settings** → **API Keys**
2. Create a new API key with appropriate scopes
3. Copy the API key (keep it secret!)

## Step 3: Set Up Polar.sh

Follow the instructions in [POLAR_SETUP.md](./POLAR_SETUP.md):

1. Create Polar account
2. Create products (digital downloads, vinyl, etc.)
3. Get your access token
4. Note your product IDs

## Step 4: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Fill in all the values in `.env.local`:

```env
# Polar.sh Configuration
POLAR_ACCESS_TOKEN=polar_oat_your_actual_token
POLAR_SERVER=sandbox  # or 'production'
POLAR_DIGITAL_DOWNLOAD_PRODUCT_ID=prod_xxxxx
POLAR_VINYL_PRODUCT_ID=prod_xxxxx
POLAR_SUBSCRIPTION_PRODUCT_ID=prod_xxxxx
POLAR_WEBHOOK_SECRET=your_webhook_secret

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

# Application URL
NEXT_PUBLIC_URL=http://localhost:3000
```

## Step 5: Add Sample Data

You can add sample data through the Appwrite Console:

### Sample Artist
```json
{
  "name": "Sample Artist",
  "slug": "sample-artist",
  "bio": "An amazing artist from our label",
  "photo_id": "",
  "country": "USA",
  "genres": ["Electronic", "House"],
  "social_links": "{\"spotify\":\"https://spotify.com\",\"instagram\":\"https://instagram.com\"}",
  "featured": true,
  "created_at": "2025-01-01T00:00:00.000Z",
  "updated_at": "2025-01-01T00:00:00.000Z"
}
```

### Sample Release
```json
{
  "title": "Sample Album",
  "artist_id": "artist_document_id",
  "artist_name": "Sample Artist",
  "type": "Album",
  "release_date": "2025-01-01",
  "cover_image_id": "",
  "description": "An amazing album",
  "label": "Your Label",
  "catalog_number": "LABEL001",
  "polar_product_id": "prod_xxxxx",
  "featured": true,
  "created_at": "2025-01-01T00:00:00.000Z",
  "updated_at": "2025-01-01T00:00:00.000Z"
}
```

## Step 6: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 7: Test the Integration

1. **Test Authentication:**
   - Click the user icon in the header
   - Create a new account
   - Sign in/out

2. **Test Data Display:**
   - Navigate to /music to see releases
   - Navigate to /artists to see artists
   - Click on a release to see details

3. **Test Purchases (Sandbox Mode):**
   - Click "Buy Digital Download" on a release
   - Complete checkout with test card: `4242 4242 4242 4242`
   - Verify webhook receives the order

## Step 8: Deploy to Production

### 8.1 Update Polar.sh
- Switch to production mode
- Update product IDs
- Set up webhook URL: `https://yourdomain.com/api/webhooks/polar`

### 8.2 Deploy to Vercel
```bash
# Push to GitHub
git add .
git commit -m "Initial setup"
git push

# Deploy on Vercel
# 1. Import your GitHub repo
# 2. Add all environment variables
# 3. Deploy
```

### 8.3 Update Environment Variables
Update `.env.local` for production:
```env
POLAR_SERVER=production
NEXT_PUBLIC_URL=https://yourdomain.com
```

## Troubleshooting

### Authentication Issues
- Verify Appwrite project ID is correct
- Check that email/password auth is enabled
- Ensure CORS settings allow your domain

### Data Not Loading
- Verify all collection IDs match your Appwrite setup
- Check collection permissions (Read should be `any`)
- Look for errors in browser console

### Webhook Not Working
- Verify webhook URL is accessible publicly
- Check webhook secret matches
- Look at Polar.sh webhook logs

### Images/Audio Not Loading
- Verify bucket IDs are correct
- Check bucket permissions
- Ensure files are uploaded to correct buckets

## Next Steps

1. Upload your actual music and artwork
2. Configure email templates in Appwrite
3. Set up custom domain
4. Add more features (search, playlists, etc.)
5. Customize styling and branding

## Support

- [Appwrite Documentation](https://appwrite.io/docs)
- [Polar.sh Documentation](https://docs.polar.sh)
- [Next.js Documentation](https://nextjs.org/docs)
