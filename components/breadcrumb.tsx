import Link from "next/link"
import { ChevronRight, MoreHorizontal } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const shouldCollapse = items.length > 3
  
  const renderBreadcrumbItems = () => {
    if (!shouldCollapse) {
      return items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-2 shrink-0" />}
          {item.href ? (
            <Link 
              href={item.href} 
              className="hover:text-foreground transition-colors truncate"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium truncate">{item.label}</span>
          )}
        </div>
      ))
    }

    // For mobile: Show last 3 items with ellipsis if there are more
    // For desktop: Show all items
    const mobileItems = items.slice(-3)
    const hasHiddenItems = items.length > 3

    return (
      <>
        {/* Desktop: Show all items */}
        <div className="hidden md:contents">
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-2 shrink-0" />}
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="hover:text-foreground transition-colors truncate"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium truncate">{item.label}</span>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: Show ellipsis if there are hidden items */}
        <div className="md:hidden contents">
          {hasHiddenItems && (
            <div className="flex items-center shrink-0">
              <MoreHorizontal className="h-4 w-4" />
            </div>
          )}
          
          {/* Show last 3 items */}
          {mobileItems.map((item, index) => (
            <div key={items.indexOf(item)} className="flex items-center min-w-0">
              {(index > 0 || hasHiddenItems) && <ChevronRight className="h-4 w-4 mx-2 shrink-0" />}
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="hover:text-foreground transition-colors truncate"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium truncate">{item.label}</span>
              )}
            </div>
          ))}
        </div>
      </>
    )
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6 overflow-hidden">
      {renderBreadcrumbItems()}
    </nav>
  )
}
