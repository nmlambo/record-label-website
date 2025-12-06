# AI Agents Guide

This document provides guidance for AI agents working on this record label website codebase.

## Project Overview

This is a modern music platform and record label website built with Next.js 16, featuring:
- Music streaming and catalog browsing
- Artist profiles and release pages
- E-commerce via Polar.sh (digital downloads, physical products, subscriptions)
- Appwrite backend integration (in progress)
- Mobile-first responsive design with bottom navigation
- Black & white minimalist theme

## Tech Stack

- **Framework**: Next.js 16.0.7 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Payments**: Polar.sh
- **Backend**: Appwrite
- **Audio**: HTML5 Audio API
- **Deployment**: Vercel

## Key Architecture Decisions

### 1. App Router Structure
- Using Next.js App Router (not Pages Router)
- Server Components by default, Client Components marked with `'use client'`
- Dynamic routes: `/artist/[id]`, `/release/[id]`

### 2. State Management
- React Context for global state (auth, music player)
- Local state with `useState` for component-level state
- No external state management library (Redux, Zustand) currently

### 3. Data Layer
- Currently using placeholder data in `lib/data.ts` and `lib/releases-data.ts`
- Migrating to Appwrite for production data
- Audio files will be stored in Appwrite Storage

### 4. Styling Approach
- Tailwind CSS v4 with inline theme configuration
- CSS variables for theming in `app/globals.css`
- Component variants using `class-variance-authority`
- Mobile-first responsive design

## Important Files & Directories

### Core Application
- `app/layout.tsx` - Root layout with providers
- `app/page.tsx` - Homepage with hero carousel
- `app/globals.css` - Global styles and theme variables

### Components
- `components/header.tsx` - Desktop navigation
- `components/mobile-nav.tsx` - Bottom navigation for mobile
- `components/music-player.tsx` - Persistent audio player
- `components/hero-carousel.tsx` - Homepage carousel
- `components/ui/*` - shadcn/ui components

### Data & Configuration
- `lib/data.ts` - Artist and release data
- `lib/polar-config.ts` - Polar.sh payment configuration
- `lib/appwrite.ts` - Appwrite client setup
- `lib/auth-context.tsx` - Authentication context

### API Routes
- `app/api/checkout/route.ts` - Polar.sh checkout handler
- `app/api/portal/route.ts` - Customer portal access
- `app/api/webhooks/polar/route.ts` - Webhook handler for payments

## Coding Guidelines

### TypeScript
- Use strict TypeScript types
- Define interfaces for data models
- Avoid `any` types
- Use type inference where appropriate

### Components
- Prefer Server Components unless interactivity is needed
- Use Client Components (`'use client'`) for:
  - Event handlers
  - State management
  - Browser APIs
  - Context consumers
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks

### Styling
- Use Tailwind utility classes
- Follow mobile-first approach (base styles = mobile, `md:` = desktop)
- Use CSS variables for theme colors
- Maintain black & white aesthetic
- Ensure proper contrast ratios for accessibility

### File Naming
- Components: PascalCase (e.g., `MusicPlayer.tsx`)
- Utilities: kebab-case (e.g., `auth-context.tsx`)
- Routes: lowercase (e.g., `app/music/page.tsx`)

### Code Organization
- Group related functionality
- Keep files under 300 lines when possible
- Extract complex logic into utility functions
- Use barrel exports for cleaner imports

## Common Tasks

### Adding a New Page
1. Create `app/[route]/page.tsx`
2. Add navigation link in `components/header.tsx` and `components/mobile-nav.tsx`
3. Update route types if using TypeScript strict mode

### Adding a New Component
1. Create component in `components/` directory
2. Use shadcn/ui components from `components/ui/` as building blocks
3. Add `'use client'` directive if component needs interactivity
4. Export component for use in other files

### Working with Appwrite
- Client instance: `lib/appwrite.ts`
- Audio utilities: `lib/appwrite-audio.ts`
- Auth context: `lib/auth-context.tsx`
- Always handle errors gracefully
- Use try-catch for async operations

### Working with Polar.sh
- Configuration: `lib/polar-config.ts`
- Checkout flow: `app/api/checkout/route.ts`
- Webhook handling: `app/api/webhooks/polar/route.ts`
- Test mode vs production mode controlled by `POLAR_SERVER` env var

## Environment Variables

Required environment variables (see `.env.local`):

```bash
# Polar.sh
POLAR_ACCESS_TOKEN=polar_oat_xxxxx
POLAR_SERVER=sandbox|production
POLAR_DIGITAL_DOWNLOAD_PRODUCT_ID=prod_xxxxx
POLAR_VINYL_PRODUCT_ID=prod_xxxxx

# Appwrite
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=xxxxx
APPWRITE_API_KEY=xxxxx

# Site
NEXT_PUBLIC_URL=http://localhost:3000
```

## Testing

### Manual Testing
- Test on mobile viewport (375px width minimum)
- Test music player functionality
- Test checkout flow in Polar sandbox mode
- Verify responsive breakpoints

### Development Server
```bash
npm run dev
# Server runs on http://localhost:3000 (or 3001 if 3000 is busy)
```

## Security Considerations

- **CVE-2025-55182**: Keep Next.js at 16.0.7+ (React2Shell vulnerability patched)
- Never commit `.env.local` or API keys
- Validate all user inputs
- Use Appwrite security rules for data access
- Verify Polar.sh webhook signatures
- Sanitize file uploads

## Performance Optimization

- Use Next.js Image component for images
- Lazy load components with `next/dynamic`
- Optimize audio streaming with progressive loading
- Use Server Components for static content
- Implement proper caching strategies

## Accessibility

- Maintain WCAG AA compliance
- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation works
- Test with screen readers
- Maintain proper heading hierarchy

## Known Issues & Limitations

1. **Audio Streaming**: Currently using placeholder audio URLs, need Appwrite Storage integration
2. **Data Layer**: Using static data, migrating to Appwrite database
3. **Authentication**: Auth UI exists but needs full Appwrite integration
4. **Search**: Not yet implemented
5. **Admin Dashboard**: Planned but not built

## Deployment

### Vercel Deployment
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Build Command
```bash
npm run build
```

### Production Checklist
- [ ] Set `POLAR_SERVER=production`
- [ ] Update `NEXT_PUBLIC_URL` to production domain
- [ ] Configure Appwrite production project
- [ ] Set up Polar.sh webhooks
- [ ] Test payment flow end-to-end
- [ ] Verify analytics tracking

## Getting Help

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Polar.sh Docs](https://docs.polar.sh)
- [Appwrite Docs](https://appwrite.io/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)

### Project-Specific Docs
- `README.md` - General project overview
- `POLAR_SETUP.md` - Polar.sh integration guide
- `SETUP_GUIDE.md` - Development setup
- `QUICK_REFERENCE.md` - Quick command reference

## Contributing Guidelines for AI Agents

When making changes:
1. **Understand context**: Read relevant files before modifying
2. **Maintain consistency**: Follow existing patterns and conventions
3. **Test changes**: Verify code works before committing
4. **Update docs**: Keep documentation in sync with code changes
5. **Preserve functionality**: Don't break existing features
6. **Security first**: Never introduce vulnerabilities
7. **Mobile-first**: Always consider mobile experience
8. **Accessibility**: Maintain WCAG compliance
9. **Performance**: Don't degrade site performance
10. **Ask when uncertain**: Request clarification if requirements are unclear

## Version History

- **v1.0.0** (Dec 2025) - Initial release with Next.js 16.0.7, Polar.sh integration, basic music platform features
