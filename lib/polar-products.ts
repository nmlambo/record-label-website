/**
 * Polar Product ID Mapping
 * Maps release types and prices to their corresponding Polar product IDs
 */

export function getPolarProductId(type: string, price: number, isTrack: boolean = false): string {
  // Individual tracks always use track product ID
  if (isTrack) {
    return process.env.NEXT_PUBLIC_POLAR_TRACK_PRODUCT_ID || '7e57ff5c-3173-4c46-886c-e9a20e72a9f6'
  }

  // Sample packs
  if (type === "Sample Pack") {
    return process.env.NEXT_PUBLIC_POLAR_SAMPLE_PACK_PRODUCT_ID || '75750808-02e5-44b6-b0c5-51f57b5426a4'
  }

  // Music releases - map by type and price
  switch (type) {
    case "Single":
      return process.env.NEXT_PUBLIC_POLAR_SINGLE_PRODUCT_ID || 'd18f9942-efd2-451c-bc84-076abed2c76e'
    
    case "EP":
      return process.env.NEXT_PUBLIC_POLAR_EP_PRODUCT_ID || 'e2f64aa3-acf0-4b84-b04e-2794da2b8ed9'
    
    case "Album":
      return process.env.NEXT_PUBLIC_POLAR_ALBUM_PRODUCT_ID || 'ca0c469b-2f66-4bc1-95e0-70550feb4e22'
    
    default:
      // Fallback: determine by price
      if (price <= 1.99) {
        return process.env.NEXT_PUBLIC_POLAR_SINGLE_PRODUCT_ID || 'd18f9942-efd2-451c-bc84-076abed2c76e'
      } else if (price <= 5.99) {
        return process.env.NEXT_PUBLIC_POLAR_EP_PRODUCT_ID || 'e2f64aa3-acf0-4b84-b04e-2794da2b8ed9'
      } else {
        return process.env.NEXT_PUBLIC_POLAR_ALBUM_PRODUCT_ID || 'ca0c469b-2f66-4bc1-95e0-70550feb4e22'
      }
  }
}
