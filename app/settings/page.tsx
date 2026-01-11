import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 pb-32 md:pb-8 max-w-[1390px]">
        <h1 className="text-4xl font-bold mb-8">Settings</h1>
        <div className="max-w-2xl space-y-6">
          <div className="border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates about new releases</p>
                </div>
                <input type="checkbox" className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-play</p>
                  <p className="text-sm text-muted-foreground">Automatically play next track</p>
                </div>
                <input type="checkbox" className="h-5 w-5" defaultChecked />
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
