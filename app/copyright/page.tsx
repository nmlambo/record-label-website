import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"

export default function CopyrightPage() {
  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-[1390px]">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Copyright Policy</h1>
            
            <div className="prose prose-invert max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Copyright Notice</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content on NUMBA, including but not limited to music, artwork, text, graphics, logos, 
                  and software, is the property of NUMBA Inc. or its content suppliers and is protected by 
                  international copyright laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Permitted Use</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You may stream and download content for personal, non-commercial use only. Any other use, 
                  including reproduction, modification, distribution, or republication, without prior written 
                  permission from NUMBA Inc. is strictly prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Artist Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Artists retain all rights to their original works. NUMBA operates under license agreements 
                  with artists and labels to distribute their content. Unauthorized use of artist content is 
                  a violation of their copyright.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Reporting Copyright Infringement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you believe your copyright has been infringed, please refer to our DMCA Policy or 
                  contact us at copyright@numba.com with detailed information about the alleged infringement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For copyright inquiries, please contact:<br />
                  Email: copyright@numba.com<br />
                  NUMBA Inc.<br />
                  Copyright Department
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
