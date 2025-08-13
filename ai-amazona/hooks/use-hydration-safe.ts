'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to safely handle hydration and prevent mismatches caused by browser extensions
 * Use this in components that might be affected by DOM modifications from extensions
 */
export function useHydrationSafe() {
  const [isHydrated, setIsHydrated] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Small delay to allow browser extensions to settle
    const timer = setTimeout(() => {
      setIsHydrated(true)
    }, 150)

    return () => clearTimeout(timer)
  }, [])

  return {
    isHydrated,
    isMounted,
    /**
     * Use this to conditionally render content that should only appear after hydration
     */
    showContent: isHydrated,
    /**
     * Use this for components that need to show immediately but might have hydration issues
     */
    showSafe: isMounted
  }
}

/**
 * Hook specifically for dealing with localStorage and other browser APIs
 * that don't exist during SSR
 */
export function useClientOnly() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
} 