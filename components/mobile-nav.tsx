"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Music, User, LogIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"
import { AuthDialog } from "./auth-dialog"

export function MobileNav() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/artists", label: "Artists", icon: Music },
    { href: user ? "/artist/soundquest" : "#", label: user ? "Artist" : "Sign In", icon: user ? User : LogIn, onClick: user ? undefined : () => setIsAuthOpen(true) },
    { href: "/profile", label: "Profile", icon: User },
  ]

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-2xl border-t border-border supports-backdrop-filter:bg-background/60">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            if (item.onClick) {
              return (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
      <AuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </>
  )
}
