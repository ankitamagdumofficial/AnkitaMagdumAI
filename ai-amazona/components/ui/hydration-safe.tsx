'use client'

import { useEffect, useState } from 'react'

interface HydrationSafeProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * Component that prevents hydration mismatches caused by browser extensions
 * modifying the DOM (like Grammarly, AI tools, etc.)
 */
export function HydrationSafe({ children, fallback = null }: HydrationSafeProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Set a small delay to allow browser extensions to inject their content
    // before React hydration completes
    const timer = setTimeout(() => {
      setIsHydrated(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // During SSR and initial client render, show fallback
  if (!isHydrated) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

/**
 * Hook to check if component is hydrated and safe from browser extensions
 */
export function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return isHydrated
} 