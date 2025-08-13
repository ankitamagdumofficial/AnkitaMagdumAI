'use client'

import { useEffect, useState } from 'react'
import { useCart } from '@/store/use-cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Add a small delay to prevent hydration mismatches with browser extensions
    const hydrateCart = () => {
      try {
        const savedCart = localStorage.getItem('shopping-cart')
        if (savedCart) {
          const { state } = JSON.parse(savedCart)
          if (state && state.items) {
            useCart.setState({ items: state.items })
          }
        }
      } catch (error) {
        console.error('Error hydrating cart:', error)
        // Clear corrupted data
        localStorage.removeItem('shopping-cart')
      }
      setIsHydrated(true)
    }

    // Small delay to allow browser extensions to settle
    const timer = setTimeout(hydrateCart, 100)
    return () => clearTimeout(timer)
  }, [])

  // Show a minimal loading state instead of null to prevent layout shift
  if (!isHydrated) {
    return (
      <div style={{ opacity: 0, pointerEvents: 'none' }}>
        {children}
      </div>
    )
  }

  return <>{children}</>
}
