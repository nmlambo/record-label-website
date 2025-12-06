import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import { MusicPlayerProvider } from '@/lib/music-player-context'
import { Toaster } from '@/components/ui/toaster'
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <MusicPlayerProvider>
            {children}
            <Toaster />
          </MusicPlayerProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
