import Link from "next/link"
import { Card } from "@/components/ui/card"
import { VerifiedBadge } from "@/components/verified-badge"

interface ArtistCardProps {
  id: string
  name: string
  genre: string
  image: string
  releaseCount: number
}

export function ArtistCard({ id, name, genre, image, releaseCount }: ArtistCardProps) {
  return (
    <Link href={`/artist/${id}`} className="cursor-pointer">
      <Card className="group overflow-hidden border-0 bg-transparent hover:bg-muted/50 transition-all duration-300 py-0 gap-3">
        <div className="aspect-square relative overflow-hidden bg-muted">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-3 md:p-4">
          <h3 className="font-semibold text-sm md:text-base mb-1 line-clamp-1 flex items-center gap-1">
            {name}
            <VerifiedBadge className="w-4 h-4 shrink-0" />
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{genre}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {releaseCount} {releaseCount === 1 ? "release" : "releases"}
          </p>
        </div>
      </Card>
    </Link>
  )
}
