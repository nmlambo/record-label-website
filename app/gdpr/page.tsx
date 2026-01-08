import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-background pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-[1390px]">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">GDPR & Privacy</h1>
            
            <div className="prose prose-invert max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">General Data Protection Regulation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  NUMBA Inc. is committed to protecting your privacy and ensuring compliance with the General 
                  Data Protection Regulation (GDPR) and other applicable data protection laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Your Rights Under GDPR</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As a data subject, you have the following rights:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong>Right to Access:</strong> You can request access to your personal data</li>
                  <li><strong>Right to Rectification:</strong> You can request correction of inaccurate data</li>
                  <li><strong>Right to Erasure:</strong> You can request deletion of your personal data ("right to be forgotten")</li>
                  <li><strong>Right to Restrict Processing:</strong> You can request limitation on how we use your data</li>
                  <li><strong>Right to Data Portability:</strong> You can request a copy of your data in a structured format</li>
                  <li><strong>Right to Object:</strong> You can object to certain types of processing</li>
                  <li><strong>Right to Withdraw Consent:</strong> You can withdraw consent at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Data We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect and process the following types of personal data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Account information (name, email address, password)</li>
                  <li>Payment information (processed securely through Polar.sh)</li>
                  <li>Usage data (listening history, preferences, interactions)</li>
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Data</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use your personal data for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Providing and improving our music streaming service</li>
                  <li>Processing purchases and managing your account</li>
                  <li>Personalizing your experience and recommendations</li>
                  <li>Communicating with you about updates and promotions</li>
                  <li>Analyzing usage patterns to improve our platform</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Legal Basis for Processing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We process your personal data based on: (a) your consent; (b) performance of a contract; 
                  (c) compliance with legal obligations; or (d) our legitimate interests in providing and 
                  improving our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal data only for as long as necessary to fulfill the purposes for which 
                  it was collected, comply with legal obligations, resolve disputes, and enforce our agreements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal data 
                  against unauthorized access, alteration, disclosure, or destruction. However, no method of 
                  transmission over the internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your data may be transferred to and processed in countries outside the European Economic Area. 
                  We ensure appropriate safeguards are in place to protect your data in accordance with GDPR.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar technologies to enhance your experience. You can manage your cookie 
                  preferences through your browser settings. Note that disabling cookies may affect functionality.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Exercising Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To exercise any of your GDPR rights or for privacy-related inquiries, please contact our 
                  Data Protection Officer:
                </p>
                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground">
                    <strong>Data Protection Officer</strong><br />
                    NUMBA Inc.<br />
                    Email: privacy@numba.com<br />
                    Subject Line: GDPR Request
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Complaints</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you believe we have not handled your personal data properly, you have the right to lodge 
                  a complaint with your local data protection authority.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this GDPR policy from time to time. We will notify you of any material changes 
                  by posting the new policy on this page and updating the "Last updated" date.
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
