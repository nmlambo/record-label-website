import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"

export default function DMCAPage() {
  return (
    <div className="min-h-screen bg-background pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-[1390px]">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">DMCA Policy</h1>
            
            <div className="prose prose-invert max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Digital Millennium Copyright Act</h2>
                <p className="text-muted-foreground leading-relaxed">
                  NUMBA Inc. respects the intellectual property rights of others and expects our users to do 
                  the same. We respond to notices of alleged copyright infringement that comply with the 
                  Digital Millennium Copyright Act (DMCA).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Filing a DMCA Notice</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you believe that your copyrighted work has been copied in a way that constitutes 
                  copyright infringement and is accessible on NUMBA, please notify our copyright agent with 
                  the following information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>A physical or electronic signature of the copyright owner or authorized representative</li>
                  <li>Identification of the copyrighted work claimed to have been infringed</li>
                  <li>Identification of the material that is claimed to be infringing, with information sufficient to locate it</li>
                  <li>Your contact information (address, telephone number, and email address)</li>
                  <li>A statement that you have a good faith belief that the disputed use is not authorized</li>
                  <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the copyright owner</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Counter-Notification</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you believe that your content was removed or disabled by mistake or misidentification, 
                  you may file a counter-notification with our copyright agent. Your counter-notification must include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Your physical or electronic signature</li>
                  <li>Identification of the material that has been removed or disabled</li>
                  <li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification</li>
                  <li>Your name, address, telephone number, and email address</li>
                  <li>A statement that you consent to the jurisdiction of the Federal District Court for the judicial district in which your address is located</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Repeat Infringer Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In accordance with the DMCA and other applicable laws, NUMBA has adopted a policy of 
                  terminating, in appropriate circumstances, users who are deemed to be repeat infringers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Copyright Agent Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  DMCA notices and counter-notifications should be sent to our designated copyright agent:
                </p>
                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground">
                    <strong>NUMBA Inc.</strong><br />
                    DMCA Copyright Agent<br />
                    Email: dmca@numba.com<br />
                    Subject Line: DMCA Notice or DMCA Counter-Notice
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Important Notice</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Please be aware that under Section 512(f) of the DMCA, any person who knowingly materially 
                  misrepresents that material or activity is infringing may be subject to liability. We 
                  recommend consulting with legal counsel before filing a DMCA notice or counter-notification.
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
