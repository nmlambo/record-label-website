"use client"

import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const initialTheme = savedTheme || "light"
    setTheme(initialTheme)
    
    // Apply theme to document
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    
    // Mark as initialized to enable animations
    setTimeout(() => setIsInitialized(true), 50)
  }, [])

  const toggleTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme)
    
    // Save to localStorage
    localStorage.setItem("theme", newTheme)
    
    // Apply to document
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  if (!theme) return null

  return (
    <div className="relative inline-flex items-center rounded-full bg-black border border-gray-600 p-0.5">
      {/* Sliding background indicator */}
      <div 
        className={`
          absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-white shadow-sm
          ${isInitialized ? "transition-transform duration-200 ease-in-out" : ""}
          ${theme === "dark" ? "translate-x-[calc(100%+4px)]" : "translate-x-0"}
        `}
      />
      
      {/* Buttons */}
      <button
        onClick={() => toggleTheme("light")}
        className={`
          relative z-10 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200
          ${theme === "light" 
            ? "text-black" 
            : "text-white/60 hover:text-white"
          }
        `}
        aria-label="Light mode"
      >
        Light
      </button>
      <button
        onClick={() => toggleTheme("dark")}
        className={`
          relative z-10 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200
          ${theme === "dark" 
            ? "text-black" 
            : "text-white/60 hover:text-white"
          }
        `}
        aria-label="Dark mode"
      >
        Dark
      </button>
    </div>
  )
}
