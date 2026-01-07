"use client"

import Link from "next/link"
import { X, User, Settings, ShoppingCart, LogOut, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-background md:hidden">
      <div className="container mx-auto px-6 py-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="text-xl font-bold tracking-tight" onClick={onClose}>
            NUMBA
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            {/* Column 1 */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground">BROWSE</h3>
                <nav className="space-y-3">
                  <Link
                    href="/artists"
                    className="block text-base hover:text-muted-foreground transition-colors"
                    onClick={onClose}
                  >
                    Artists
                  </Link>
                  <Link
                    href="/artist/soundquest"
                    className="block text-base hover:text-muted-foreground transition-colors"
                    onClick={onClose}
                  >
                    Artist
                  </Link>
                  <Link
                    href="/sample-packs"
                    className="block text-base hover:text-muted-foreground transition-colors"
                    onClick={onClose}
                  >
                    Sample Packs
                  </Link>
                  <Link
                    href="/merch"
                    className="block text-base hover:text-muted-foreground transition-colors"
                    onClick={onClose}
                  >
                    Merch
                  </Link>
                  <Link
                    href="/events"
                    className="block text-base hover:text-muted-foreground transition-colors"
                    onClick={onClose}
                  >
                    Events
                  </Link>
                </nav>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground">ACCOUNT</h3>
                <nav className="space-y-3">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 text-base hover:text-muted-foreground transition-colors"
                    onClick={onClose}
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 text-base hover:text-muted-foreground transition-colors"
                    onClick={onClose}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 text-base hover:text-muted-foreground transition-colors"
                    onClick={onClose}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Cart
                  </Link>
                  <Link
                    href="/api/portal"
                    className="flex items-center gap-2 text-base hover:text-muted-foreground transition-colors"
                    onClick={onClose}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    My Purchases
                  </Link>
                  <button className="flex items-center gap-2 text-base hover:text-muted-foreground transition-colors">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </nav>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground">DISCOVER</h3>
                <nav className="space-y-3">
                  <Link
                    href="/playlists"
                    className="block text-base hover:text-muted-foreground transition-colors"
                    onClick={onClose}
                  >
                    Playlists
                  </Link>
                  <Link
                    href="/radio"
                    className="block text-base hover:text-muted-foreground transition-colors"
                    onClick={onClose}
                  >
                    Radio Shows
                  </Link>
                  <Link
                    href="/features"
                    className="block text-base hover:text-muted-foreground transition-colors"
                    onClick={onClose}
                  >
                    Features
                  </Link>
                </nav>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground">INFO</h3>
                <nav className="space-y-3">
                  <Link
                    href="/about"
                    className="block text-base hover:text-muted-foreground transition-colors"
                    onClick={onClose}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-base hover:text-muted-foreground transition-colors"
                    onClick={onClose}
                  >
                    Contact
                  </Link>
                  <Link
                    href="/jobs"
                    className="block text-base hover:text-muted-foreground transition-colors"
                    onClick={onClose}
                  >
                    Jobs
                  </Link>
                </nav>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground">SOCIAL</h3>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-muted-foreground transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-muted-foreground transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-muted-foreground transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-muted-foreground transition-colors"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
