"use client"

import Link from "next/link"
import { Menu, Search, User, LogOut, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { MobileMenu } from "./mobile-menu"
import { AuthDialog } from "./auth-dialog"
import { SearchDialog } from "./search-dialog"
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
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <>
      <header className={`md:hidden sticky top-0 z-50 border-b border-white/10 transition-all duration-200 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-xl supports-backdrop-filter:bg-black/60' 
          : 'bg-black'
      }`}>
        <div className="container mx-auto px-4 max-w-[1390px]">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center md:hidden">
                <Link href="/" className="text-xl font-bold tracking-tight cursor-pointer text-white">
                  NUMBA
                </Link>
                <span className="text-[10px] font-semibold text-white/80 bg-white/10 px-1.5 py-0.5 rounded-full border border-white/20 backdrop-blur-sm ml-3 select-none">
                  BETA
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden md:flex cursor-pointer text-white hover:bg-white/10"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hidden md:flex cursor-pointer text-white hover:bg-white/10">
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
                  className="hidden md:flex cursor-pointer text-white hover:bg-white/10"
                  onClick={() => setIsAuthOpen(true)}
                >
                  <User className="h-5 w-5" />
                </Button>
              )}
              <Button variant="ghost" size="icon" className="md:hidden cursor-pointer text-white hover:bg-white/10" onClick={() => setIsMenuOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <AuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  )
}
