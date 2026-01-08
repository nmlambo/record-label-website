import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-[1390px]">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="prose prose-invert max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using NUMBA, you accept and agree to be bound by the terms and provision 
                  of this agreement. If you do not agree to these terms, please do not use our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  NUMBA grants you a limited, non-exclusive, non-transferable license to access and use our 
                  platform for personal, non-commercial purposes. You agree not to reproduce, distribute, 
                  modify, or create derivative works from our content without authorization.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account credentials and for 
                  all activities that occur under your account. You must notify us immediately of any 
                  unauthorized use of your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Content and Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content on NUMBA, including music, artwork, and text, is protected by copyright and 
                  other intellectual property rights. You may not use this content except as permitted by 
                  these terms or with explicit written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Prohibited Activities</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree not to: (a) violate any laws or regulations; (b) infringe on intellectual property 
                  rights; (c) upload malicious code; (d) attempt to gain unauthorized access to our systems; 
                  (e) interfere with other users' enjoyment of the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Purchases and Payments</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All purchases are processed through our payment partner, Polar.sh. By making a purchase, 
                  you agree to their terms of service. All sales are final unless otherwise stated.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to suspend or terminate your access to NUMBA at any time, with or 
                  without cause, with or without notice, for any reason or no reason.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground leading-relaxed">
                  NUMBA is provided "as is" without warranties of any kind, either express or implied. We do 
                  not guarantee that the service will be uninterrupted, secure, or error-free.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  NUMBA Inc. shall not be liable for any indirect, incidental, special, consequential, or 
                  punitive damages resulting from your use of or inability to use the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. Continued use of NUMBA after changes 
                  constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these terms, contact us at legal@numba.com
                </p>
              </section>

              <p className="text-sm text-muted-foreground mt-8">
                Last updated: January 2026
              </p>
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
