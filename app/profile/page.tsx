"use client"

import { useState, Suspense } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  ChevronRight,
  User,
  CreditCard,
  Edit,
  Plus,
  Pencil,
  History,
  Wallet,
  Gift,
  Lock,
  Bell,
  Eye,
  Smartphone,
  LogOut,
  Headphones,
} from "lucide-react"

const profiles = [
  { id: 1, name: "John Doe", avatar: "/profile-avatar-music-producer.jpg", initials: "JD" },
  { id: 2, name: "Studio", avatar: null, initials: "ST" },
  { id: 3, name: "Collab", avatar: null, initials: "CO" },
]

const settingsSections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Manage your subscription" },
      { icon: Pencil, label: "Edit personal info" },
      { icon: History, label: "Listening history" },
    ],
  },
  {
    title: "Payment",
    items: [
      { icon: History, label: "Order history" },
      { icon: Wallet, label: "Saved payment methods" },
      { icon: Gift, label: "Redeem code" },
    ],
  },
  {
    title: "Security and privacy",
    items: [
      { icon: Lock, label: "Change password" },
      { icon: Bell, label: "Notification settings" },
      { icon: Eye, label: "Account privacy" },
      { icon: Smartphone, label: "2-Step verification" },
      { icon: LogOut, label: "Sign out everywhere" },
    ],
  },
  {
    title: "Help",
    items: [{ icon: Headphones, label: "NUMBA support" }],
  },
]

function ProfileContent() {
  const [selectedProfile, setSelectedProfile] = useState(profiles[0])
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-6 pt-6 pb-24 md:px-12 md:pt-12 md:pb-16 max-w-[1390px]">
          {/* Profile Selector Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Who's listening?</h1>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  className="group relative flex flex-col items-center gap-2 sm:gap-3"
                >
                  <button
                    onClick={() => setSelectedProfile(profile)}
                    className={`relative rounded-full transition-all ${
                      selectedProfile.id === profile.id
                        ? "ring-2 ring-primary ring-offset-2 sm:ring-offset-4 ring-offset-background"
                        : "hover:ring-2 hover:ring-muted-foreground hover:ring-offset-2 sm:hover:ring-offset-4 hover:ring-offset-background"
                    }`}
                  >
                    <Avatar className="size-16 sm:size-24">
                      {profile.avatar ? (
                        <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                      ) : null}
                      <AvatarFallback className="bg-gradient-to-br from-muted to-muted-foreground/20 text-base sm:text-xl">
                        {profile.initials}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                  {selectedProfile.id === profile.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsEditing(true)
                      }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-12 sm:translate-y-16 size-6 sm:size-8 rounded-full bg-card border flex items-center justify-center hover:bg-muted transition-colors z-10"
                    >
                      <Edit className="size-3 sm:size-4 text-muted-foreground" />
                    </button>
                  )}
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      selectedProfile.id === profile.id ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {profile.name}
                  </span>
                </div>
              ))}

              {/* Add New Profile */}
              <button className="flex flex-col items-center gap-2 sm:gap-3 group">
                <div className="size-16 sm:size-24 rounded-full bg-muted border-2 border-dashed border-muted-foreground/30 flex items-center justify-center hover:border-muted-foreground/50 hover:bg-muted/50 transition-all">
                  <Plus className="size-6 sm:size-8 text-muted-foreground group-hover:text-foreground" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground">
                  New Profile
                </span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6 sm:mb-8">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 size-4 sm:size-5 text-muted-foreground" />
            <Input
              placeholder="Search account or help articles"
              className="w-full pl-10 sm:pl-12 py-5 sm:py-6 text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
            <div className="flex-1 bg-card rounded-xl p-4 sm:p-6 border">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full mb-3">
                Your plan
              </span>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">NUMBA Free</h2>
              <Button variant="outline">Explore plans</Button>
            </div>
            <div className="w-full sm:w-48 bg-gradient-to-br from-muted via-muted-foreground/20 to-muted-foreground/30 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:opacity-90 transition-opacity">
              <CreditCard className="size-6 sm:size-8 mb-2" />
              <span className="font-medium text-sm sm:text-base">Join Premium</span>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="space-y-4 sm:space-y-6">
            {settingsSections.map((section) => (
              <div key={section.title} className="bg-card rounded-xl border overflow-hidden">
                <h3 className="text-base sm:text-lg font-semibold px-4 sm:px-6 py-3 sm:py-4">
                  {section.title}
                </h3>
                <div className="divide-y">
                  {section.items.map((item, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <item.icon className="size-4 sm:size-5 text-muted-foreground" />
                        <span className="text-sm sm:text-base text-muted-foreground group-hover:text-foreground transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight className="size-4 sm:size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}

export default function ProfilePage() {
  return (
    <Suspense fallback={null}>
      <ProfileContent />
    </Suspense>
  )
}
