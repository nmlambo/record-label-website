# Numba - Music Platform & Label

A modern, tech-powered music platform and record label built with Next.js. Upload music as an independent artist or get signed to the label. Get paid weekly with transparent splits—no waiting months.

## Features


### 🎵 Music Platform
- **Homepage Carousel** - Featured releases with auto-rotating slides
- **Music Catalog** - Browse all releases with filtering
- **Artist Profiles** - Dedicated pages for each artist
- **Release Pages** - Detailed album/single pages with tracklists
- **Streaming Links** - Direct links to Spotify, Apple Music, YouTube, SoundCloud

### 📱 Mobile-First Design
- **App-Like Experience** - Bottom navigation on mobile devices
- **Music Player Bar** - Persistent player with playback controls
- **Responsive Grid** - Adapts from 2 columns (mobile) to 4 columns (desktop)
- **Touch-Optimized** - Smooth interactions and gestures

### 💳 E-Commerce (Polar.sh)
- **Digital Downloads** - Sell MP3/WAV albums
- **Physical Products** - Vinyl, CDs, merchandise
- **Subscriptions** - Exclusive content for members
- **Customer Portal** - Users can manage purchases and subscriptions
- **Global Payments** - Accepts cards worldwide with automatic tax compliance

### 🎨 Design
- **Black & White Theme** - Clean, minimalist aesthetic
- **Smooth Animations** - Carousel transitions and hover effects
- **Modern Typography** - Optimized for readability
- **Accessible** - WCAG compliant with proper contrast ratios

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Payments**: Polar.sh
- **Backend**: Appwrite (planned)
- **Audio Streaming**: HTML5 Audio API with progressive loading
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Polar.sh account (for payments)
- Appwrite account (for backend, optional)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd record-label-website
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Configure your `.env.local` file with your Polar.sh credentials (see [POLAR_SETUP.md](./POLAR_SETUP.md))

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   ├── checkout/          # Polar.sh checkout handler
│   │   ├── portal/            # Customer portal handler
│   │   └── webhooks/polar/    # Webhook handler
│   ├── artist/[id]/           # Artist profile pages
│   ├── artists/               # Artists listing
│   ├── music/                 # Music catalog
│   ├── release/[id]/          # Release detail pages
│   ├── purchase/success/      # Purchase confirmation
│   └── page.tsx               # Homepage
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── artist-card.tsx        # Artist card component
│   ├── header.tsx             # Site header
│   ├── hero-carousel.tsx      # Homepage carousel
│   ├── mobile-nav.tsx         # Bottom navigation
│   ├── music-player.tsx       # Audio player
│   ├── release-card.tsx       # Release card component
│   └── releases-grid.tsx      # Grid layout for releases
├── lib/
│   ├── polar-config.ts        # Polar.sh configuration
│   └── appwrite-audio.ts      # Audio streaming utilities
└── public/                    # Static assets (images, audio)
\`\`\`

## Configuration

### Polar.sh Setup

See [POLAR_SETUP.md](./POLAR_SETUP.md) for detailed instructions on:
- Creating products
- Getting your access token
- Testing payments
- Going live

### Appwrite Setup (Coming Soon)

The backend will use Appwrite for:
- Database (releases, artists, tracks)
- Authentication (user accounts)
- Storage (album artwork, audio files)
- Real-time updates

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables

Make sure to set these in your Vercel project:

\`\`\`
POLAR_ACCESS_TOKEN=polar_oat_xxxxx
POLAR_SERVER=production
POLAR_DIGITAL_DOWNLOAD_PRODUCT_ID=prod_xxxxx
POLAR_VINYL_PRODUCT_ID=prod_xxxxx
NEXT_PUBLIC_URL=https://yourdomain.com
\`\`\`

## Customization

### Adding New Releases

Currently using placeholder data. Once Appwrite is integrated, releases will be managed through the database.

### Styling

The site uses a black and white theme defined in `app/globals.css`. Customize colors by modifying the CSS variables:

\`\`\`css
@theme inline {
  --color-background: 0 0% 0%;
  --color-foreground: 0 0% 100%;
  /* ... more variables */
}
\`\`\`

### Music Player

The music player supports:
- Play/pause controls
- Progress bar with seeking
- Volume control
- Next/previous track
- Shuffle and repeat modes

Audio files should be stored in Appwrite Storage and streamed via CDN for optimal performance.

## Roadmap

- [ ] Appwrite backend integration
- [ ] User authentication
- [ ] Admin dashboard for managing releases
- [ ] Search functionality
- [ ] Playlist creation
- [ ] Social sharing
- [ ] Newsletter signup
- [ ] Blog/news section
- [ ] Event listings
- [ ] Artist submissions portal

## Support

For issues or questions:
- Open an issue on GitHub
- Contact: your@email.com

## License

MIT License - feel free to use this for your own record label!
\`\`\`
