import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Play } from "lucide-react"

interface ReleaseCardProps {
  id: string
  title: string
  artist: string
  type: string
  status: string
  image: string
  isNew?: boolean
}

export function ReleaseCard({ id, title, artist, type, status, image, isNew }: ReleaseCardProps) {
  return (
    <Link href={`/release/${id}`} className="cursor-pointer">
      <Card className="group relative overflow-hidden border-border hover:border-foreground transition-all duration-300 py-0">
      <div className="aspect-square relative overflow-hidden bg-muted">
        <img
          src={image || "/placeholder.svg"}
          alt={`${title} by ${artist}`}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <Play className="h-5 w-5 text-primary-foreground fill-primary-foreground ml-0.5" />
          </div>
        </div>
        {isNew && (
          <div className="absolute top-2 right-2">
            <span className="text-xs font-semibold bg-green-500 text-white px-2 py-1 rounded">
              NEW
            </span>
          </div>
        )}
      </div>
      <div className="p-3 md:p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{status}</p>
          <p className="text-xs text-muted-foreground">{type}</p>
        </div>
        <h3 className="font-semibold text-sm md:text-base mb-1 line-clamp-1">{title}</h3>
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{artist}</p>
      </div>
    </Card>
    </Link>
  )
}
