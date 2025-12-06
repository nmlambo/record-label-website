import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";
import { MusicPlayer } from "@/components/music-player";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Upload } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Header />
      <main className="container mx-auto px-8 py-12 max-w-[1390px]">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed">
            Have a question, demo submission, or collaboration idea? We'd love
            to hear from you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-8">
              <div>
                <p className="text-muted-foreground mb-8">
                  Whether you're an artist looking to submit a demo, a fan with
                  questions, or a potential partner, we're here to help. Choose
                  the best way to reach us below.
                </p>
              </div>

                  {/* Demo Submission Guidelines */}
              <div className="border border-border rounded-lg p-6 mt-8">
                <h3 className="text-xl font-semibold mb-4">Demo Submission</h3>
                <h4 className="font-semibold mb-3">
                  Think you've got some work that fits Numba vibes? Send us
                  your tracks
                </h4>
                <div className="text-sm text-muted-foreground space-y-3">
                  <p>
                    The best way to get your demo to our A&R department is by
                    submitting your demo via our submission form. All tracks are
                    reviewed at the Numba HQ. Please make sure you add your
                    contact information to your upload.
                  </p>
                  <p>
                    Simply add the streaming link to your track or project and
                    then fill in your contact details.
                  </p>
                </div>
              </div>

              {/* CTA Section */}
              <div className="max-w-4xl mx-auto mt-4">
                <div className="bg-black rounded-lg p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                        Ready to submit your demo?
                      </h2>
                      <p className="text-white/70">
                        Upload your tracks and join our roster of talented
                        artists.
                      </p>
                    </div>
                    <Link href="/upload" className="cursor-pointer">
                      <Button
                        size="lg"
                        className="bg-white text-black hover:bg-white/90 shrink-0"
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        Submit Demo
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

          

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      General inquiries
                    </p>
                    <a
                      href="mailto:info@recordlabel.com"
                      className="text-sm hover:underline"
                    >
                      info@recordlabel.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-2 mb-1">
                      Demo submissions
                    </p>
                    <a
                      href="mailto:demos@recordlabel.com"
                      className="text-sm hover:underline"
                    >
                      demos@recordlabel.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      Mon-Fri, 9am-6pm EST
                    </p>
                    <a
                      href="tel:+1234567890"
                      className="text-sm hover:underline"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Music Street
                      <br />
                      Brooklyn, NY 11211
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <SocialLinks />
            </div>
          </div>
        </div>
      </main>
      <MobileNav />
      <MusicPlayer />
    </div>
  );
}
