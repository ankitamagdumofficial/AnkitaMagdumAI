/**
 * Safely gets the first image URL from either a string or array format
 */
export function getFirstImageUrl(images: string | string[] | null | undefined): string {
  // Return a placeholder if no images provided
  if (!images) {
    return '/images/placeholder.svg'
  }
  
  // Handle array format
  if (Array.isArray(images)) {
    const firstImage = images[0]?.trim()
    return firstImage || '/images/placeholder.svg'
  }
  
  // Handle comma-separated string format
  if (typeof images === 'string') {
    const firstImage = images.split(',')[0]?.trim()
    return firstImage || '/images/placeholder.svg'
  }
  
  return '/images/placeholder.svg'
}

/**
 * Safely converts images to array format
 */
export function getImageArray(images: string | string[] | null | undefined): string[] {
  if (!images) {
    return ['/images/placeholder.svg']
  }
  
  if (Array.isArray(images)) {
    return images.filter(img => img?.trim()).length > 0 
      ? images.filter(img => img?.trim()) 
      : ['/images/placeholder.svg']
  }
  
  if (typeof images === 'string') {
    const imageArray = images.split(',').map(img => img.trim()).filter(Boolean)
    return imageArray.length > 0 ? imageArray : ['/images/placeholder.svg']
  }
  
  return ['/images/placeholder.svg']
}

/**
 * Validates if a URL is a valid image path
 */
export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') return false
  
  const cleanUrl = url.trim()
  if (!cleanUrl) return false
  
  // Check for common image extensions and valid paths
  return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(cleanUrl) || 
         cleanUrl.startsWith('/images/') ||
         cleanUrl.startsWith('http://') ||
         cleanUrl.startsWith('https://')
} 