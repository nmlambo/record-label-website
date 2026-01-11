"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, Home, Users, Disc3, Package, User, Heart, ShoppingCart, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { SearchDialog } from "./search-dialog"
import { ThemeToggle } from "./theme-toggle"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const { items: cartItems } = useCart()
  const { items: wishlistItems } = useWishlist()

  const mainNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/artists", label: "Artists", icon: Users },
    { href: "/music", label: "Music", icon: Disc3 },
    { href: "/sample-packs", label: "Sample Packs", icon: Package },
  ]

  const libraryItems = [
    { href: "/profile", label: "Profile", icon: User },
    { href: "/wishlist", label: "Wishlist", icon: Heart },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
  ]

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300)
  }

  if (!isOpen && !isClosing) return null

  return (
    <>
      <div className={`fixed inset-0 z-60 bg-black md:hidden transition-transform duration-300 ${
        isClosing ? 'animate-out slide-out-to-left' : 'animate-in slide-in-from-left'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
            <Link href="/" className="flex items-center" onClick={handleClose}>
              <span className="text-xl font-bold tracking-tight text-white">NUMBA</span>
              <span className="text-[10px] font-semibold text-white/80 bg-white/10 px-1.5 py-0.5 rounded-full border border-white/20 backdrop-blur-sm ml-3 select-none">
                BETA
              </span>
            </Link>
            <Button variant="ghost" size="icon" onClick={handleClose} className="text-white hover:bg-white/10 rounded-full border border-white/20">
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 min-h-0 overflow-y-auto pb-2">
            {/* Search Button */}
            <div className="px-3 pt-4 pb-2">
              <button
                onClick={() => {
                  setIsSearchOpen(true)
                  handleClose()
                }}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors w-full text-white/60 hover:bg-white/10 hover:text-white"
              >
                <Search className="h-5 w-5 shrink-0" />
                <span>Search</span>
              </button>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 px-3 py-2 space-y-1">
              <div className="space-y-1">
                {mainNavItems.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href)
                  const showIndicator = item.href === '/music' || item.href === '/sample-packs'
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleClose}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                        active
                          ? "bg-white/10 text-white"
                          : "text-white/60 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {showIndicator && (
                        <span className={`w-1.5 h-1.5 bg-green-500 rounded-full shrink-0 ${!active ? 'animate-pulse' : ''}`} />
                      )}
                    </Link>
                  )
                })}
              </div>

              {/* Library Section */}
              <div className="pt-6">
                <h3 className="px-3 mb-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
                  Your Library
                </h3>
                <div className="space-y-1">
                  {libraryItems.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)
                    const count = item.href === '/cart' ? cartItems.length : item.href === '/wishlist' ? wishlistItems.length : 0
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleClose}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                          active
                            ? "bg-white/10 text-white"
                            : "text-white/60 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        <span className="flex-1">{item.label}</span>
                        {count > 0 && (
                          <span className="ml-auto bg-white/20 text-white text-xs font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                            {count}
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </nav>

            {/* Footer Links */}
            <div className="px-6 py-3 mt-auto">
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-white/40">
                <Link href="/about" onClick={handleClose} className="hover:text-white/60 transition-colors">
                  About
                </Link>
                <Link href="/contact" onClick={handleClose} className="hover:text-white/60 transition-colors">
                  Contact us
                </Link>
                <Link href="/copyright" onClick={handleClose} className="hover:text-white/60 transition-colors">
                  Copyright
                </Link>
                <Link href="/terms" onClick={handleClose} className="hover:text-white/60 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/dmca" onClick={handleClose} className="hover:text-white/60 transition-colors">
                  DMCA Policy
                </Link>
                <Link href="/gdpr" onClick={handleClose} className="hover:text-white/60 transition-colors">
                  GDPR
                </Link>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="px-6 py-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Theme</span>
                <ThemeToggle />
              </div>
            </div>

            {/* Copyright */}
            <div className="px-6 py-4 border-t border-white/10">
              <p className="text-white/40">
                <span className="text-xs">©</span> <span className="text-[9px]">2026 NUMBA, Inc.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  )
}
