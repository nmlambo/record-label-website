import { ReleaseCard } from "@/components/release-card"
import { releases } from "@/lib/releases-data"

export function ReleasesGrid() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {releases.map((release) => (
          <ReleaseCard key={release.id} {...release} />
        ))}
      </div>
    </section>
  )
}
