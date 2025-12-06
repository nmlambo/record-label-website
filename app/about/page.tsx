import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Music, Users, Headphones, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-[1390px]">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            About Us
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A record label built at the 
            intersection of sound and software.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Founded by Ndumiso B. Mlambo, known in the industry as <span className="font-semibold text-foreground">SoundQuest</span>, 
              our label represents a unique fusion of two worlds. As a well-known producer co-signed by the 
              renowned <span className="font-semibold text-foreground">Black Coffee</span>, SoundQuest has worked alongside industry 
              heavyweights including <span className="font-semibold text-foreground">Shimza</span>, <span className="font-semibold text-foreground">Euphonik</span>, <span className="font-semibold text-foreground">Da Capo</span>, and more.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              After taking a hiatus to pursue Software Engineering, SoundQuest returned with a vision that 
              combines both journeys. The skills learned in tech, paired with years of music production 
              experience, have culminated in a label and platform that reimagines what a modern record 
              label can be.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              This is more than just a record label — it's a tech-powered music platform where artists 
              get the best of both worlds: industry expertise from someone who's been in the trenches, 
              and innovative tools built by someone who understands technology. Every release is carefully 
              curated, and every artist gets access to the technology that amplifies their reach.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              The platform's mission is simple: <span className="font-semibold text-foreground">get artists paid fast</span>. 
              We offer two paths for musicians: <span className="font-semibold text-foreground">Independent Artists</span> can upload and sell directly, 
              keeping 75% of sales with weekly payouts, while <span className="font-semibold text-foreground">Label Artists</span> receive full A&R support, 
              marketing, and priority placement with an 80/20 split. All releases are exclusive to our platform for one 
              month before going to major streaming services — giving die-hard fans early access while ensuring artists 
              get paid quickly.
            </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
               Unlike Spotify's 3-6 month delays or traditional labels' quarterly statements, we process payments 
               weekly. Transparent splits, no hidden fees, no waiting months for your money.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">What We Stand For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                <Music className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-muted-foreground">
                Every release is meticulously crafted and produced to the highest standards.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Artist-Focused</h3>
              <p className="text-muted-foreground">
                We prioritize creative freedom and fair partnerships with our artists.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                <Headphones className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                We embrace experimentation and support artists who push boundaries.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">
                Building a supportive network of artists, fans, and industry professionals.
              </p>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">The Founder</h2>
          <div className="max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-40 h-40 rounded-full bg-white/10 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-2">Ndumiso Mlambo</h3>
              <p className="text-lg text-muted-foreground mb-2">SoundQuest</p>
              <p className="text-sm font-medium text-foreground mb-4">Founder, Producer & Software Engineer</p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Industry producer co-signed by Black Coffee, with collaborations alongside Shimza, Euphonik, 
                and Da Capo. Now combining music production expertise with software engineering to build 
                the future of independent music labels.
              </p>
            </div>
          </div>
        </div>
      </main>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
