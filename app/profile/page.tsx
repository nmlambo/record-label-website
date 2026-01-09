import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Edit, Mail, Music, Heart, ShoppingCart, Calendar, MapPin } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-6 pt-6 pb-24 md:px-12 md:pt-12 md:pb-16 max-w-[1390px]">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
              <Avatar className="size-32">
                <AvatarImage src="/profile-avatar-music-producer.jpg" alt="User avatar" />
                <AvatarFallback className="text-3xl">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-3">
                  <h1 className="text-3xl font-bold text-foreground">John Doe</h1>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Edit className="size-4" />
                    Edit Profile
                  </Button>
                </div>
                <p className="text-muted-foreground mb-2">@johndoe</p>
                <p className="text-muted-foreground text-sm max-w-md">
                  Music producer & DJ. Passionate about electronic music and sound design. Always looking for fresh beats
                  and unique samples.
                </p>
              </div>
            </div>

            <Separator className="mb-8" />

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <Card className="py-4">
                <CardContent className="p-0 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Music className="size-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">127</span>
                    <span className="text-sm text-muted-foreground">Tracks</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="py-4">
                <CardContent className="p-0 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Heart className="size-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">48</span>
                    <span className="text-sm text-muted-foreground">Wishlist</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="py-4">
                <CardContent className="p-0 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <ShoppingCart className="size-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">23</span>
                    <span className="text-sm text-muted-foreground">Purchases</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="py-4">
                <CardContent className="p-0 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Music className="size-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">12</span>
                    <span className="text-sm text-muted-foreground">Sample Packs</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground">john.doe@example.com</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <MapPin className="size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground">Los Angeles, CA</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Calendar className="size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Member since</p>
                    <p className="text-foreground">March 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Purchased", item: "Midnight Dreams EP", time: "2 hours ago" },
                    { action: "Added to wishlist", item: "Neon Nights Sample Pack", time: "1 day ago" },
                    { action: "Listened to", item: "Stellar Wave - Eclipse", time: "2 days ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">
                          <span className="text-muted-foreground">{activity.action}</span>{" "}
                          <span className="font-medium text-foreground">{activity.item}</span>
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
