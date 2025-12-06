import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pb-32 md:pb-8 max-w-[1390px]">
        <h1 className="text-4xl font-bold mb-8">Profile</h1>
        <div className="max-w-2xl space-y-6">
          <div className="border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <p className="text-base">user@example.com</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Member Since</label>
                <p className="text-base">January 2025</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
