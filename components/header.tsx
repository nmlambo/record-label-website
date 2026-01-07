"use client"

import Link from "next/link"
import { Menu, Search, User, LogOut, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { MobileMenu } from "./mobile-menu"
import { AuthDialog } from "./auth-dialog"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-2xl supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 max-w-[1390px]">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold tracking-tight cursor-pointer">
                NUMBA
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/artists" className="text-sm font-medium hover:text-muted-foreground transition-colors cursor-pointer">
                  Artists
                </Link>
                <Link href="/sample-packs" className="text-sm font-medium hover:text-muted-foreground transition-colors cursor-pointer">
                  Sample Packs
                </Link>
                <Link href="/about" className="text-sm font-medium hover:text-muted-foreground transition-colors cursor-pointer">
                  About
                </Link>
                <Link href="/contact" className="text-sm font-medium hover:text-muted-foreground transition-colors cursor-pointer">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hidden md:flex cursor-pointer">
                <Search className="h-5 w-5" />
              </Button>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hidden md:flex cursor-pointer">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {user.name || user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/api/portal" className="cursor-pointer">Purchases</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex cursor-pointer"
                  onClick={() => setIsAuthOpen(true)}
                >
                  <User className="h-5 w-5" />
                </Button>
              )}
              <Button variant="ghost" size="icon" className="md:hidden cursor-pointer" onClick={() => setIsMenuOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <AuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </>
  )
}
