import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import { MusicPlayerProvider } from '@/lib/music-player-context'
import { CartProvider } from '@/lib/cart-context'
import { WishlistProvider } from '@/lib/wishlist-context'
import { Toaster } from '@/components/ui/toaster'
import { RegisterServiceWorker } from './register-sw'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Numba - Music Platform & Label',
  description: 'Upload music as an independent artist or get signed to our label. Get paid weekly with transparent splits—no waiting months.',
  generator: 'v0.app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Numba Records',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Numba Records',
    title: 'Numba - Music Platform & Label',
    description: 'Independent record label showcasing innovative electronic music',
  },
  twitter: {
    card: 'summary',
    title: 'Numba - Music Platform & Label',
    description: 'Independent record label showcasing innovative electronic music',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <MusicPlayerProvider>
                {children}
                <Toaster />
                <RegisterServiceWorker />
              </MusicPlayerProvider>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
