"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Drum, Search, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/artists", label: "Artists", icon: Users },
    { href: "/sample-packs", label: "Samples", icon: Drum },
    { href: "/search", label: "Search", icon: Search },
    { href: "/profile", label: "Profile", icon: User },
  ]

  return (
    <>
      {/* Mobile nav is now integrated into the MusicPlayer component */}
      {/* This component is kept for potential future use or desktop-only scenarios */}
      <nav className="hidden">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            const showIndicator = item.href === '/sample-packs'

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer relative",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
                {showIndicator && (
                  <span className="absolute top-3 right-[calc(50%-12px)] w-1.5 h-1.5 bg-green-500 rounded-full" />
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
