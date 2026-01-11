"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface WishlistItem {
  id: string
  title: string
  artist: string
  type: string
  price: number
  image: string
  releaseId?: string
}

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('numba_wishlist')
      if (stored) {
        try {
          setItems(JSON.parse(stored))
        } catch (error) {
          console.error('Error loading wishlist:', error)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('numba_wishlist', JSON.stringify(items))
    }
  }, [items])

  const addItem = (item: WishlistItem) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === item.id)
      if (exists) return prev
      return [...prev, item]
    })
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const isInWishlist = (id: string) => {
    return items.some(item => item.id === id)
  }

  const clearWishlist = () => {
    setItems([])
  }

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
