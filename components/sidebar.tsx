"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Disc3, Package, User, Heart, ShoppingCart, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { SearchDialog } from "./search-dialog"

export function Sidebar() {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const mainNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/artists", label: "Artists", icon: Users },
    { href: "/music", label: "Music", icon: Disc3 },
    { href: "/sample-packs", label: "Sample Packs", icon: Package },
  ]

  const libraryItems = [
    { href: "/profile", label: "Profile", icon: User },
    { href: "/favourites", label: "Wishlist", icon: Heart },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
  ]

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  return (
    <>
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64 md:border-r md:border-white/10 md:bg-black md:pb-18">
        {/* Logo */}
        <div className="flex items-center h-16 px-6 border-b border-white/10">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-white">NUMBA</span>
            <span className="text-[10px] font-semibold text-white/80 bg-white/10 px-1.5 py-0.5 rounded-full border border-white/20 backdrop-blur-sm ml-3 select-none">
              BETA
            </span>
          </Link>
        </div>

        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
          {/* Search Button */}
          <div className="px-3 pt-4 pb-2">
            <button
              onClick={() => setIsSearchOpen(true)}
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
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                      active
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
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
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                        active
                          ? "bg-white/10 text-white"
                          : "text-white/60 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>

          {/* Footer Links */}
          <div className="px-6 py-3 mt-auto">
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-white/40">
              <Link href="/about" className="hover:text-white/60 transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-white/60 transition-colors">
                Contact us
              </Link>
              <Link href="/copyright" className="hover:text-white/60 transition-colors">
                Copyright
              </Link>
              <Link href="/terms" className="hover:text-white/60 transition-colors">
                Terms of Service
              </Link>
              <Link href="/dmca" className="hover:text-white/60 transition-colors">
                DMCA Policy
              </Link>
              <Link href="/gdpr" className="hover:text-white/60 transition-colors">
                GDPR
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="px-6 py-4 border-t border-white/10">
            <p className="text-white/40">
              <span className="text-xs">©</span> <span className="text-[9px]">2026 NUMBA, Inc.</span>
            </p>
          </div>
        </div>
      </aside>
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  )
}
