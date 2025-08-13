'use client'

import { useEffect, useRef } from 'react'

interface ExtensionSafeWrapperProps {
  children: React.ReactNode
  suppressHydration?: boolean
}

/**
 * Wrapper component that creates an isolated environment free from browser extension interference
 */
export function ExtensionSafeWrapper({ 
  children, 
  suppressHydration = true 
}: ExtensionSafeWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // Create a protective barrier around this component
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          const target = mutation.target as Element
          const attributeName = mutation.attributeName
          
          // Remove any extension attributes that get added to our protected content
          if (attributeName && [
            'bbai-tooltip-injected',
            'data-new-gr-c-s-check-loaded',
            'data-gr-ext-installed',
            'data-grammarly-shadow-root'
          ].includes(attributeName)) {
            target.removeAttribute(attributeName)
          }
        }
      })
    })

    // Observe changes to this wrapper and its children
    observer.observe(wrapper, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: [
        'bbai-tooltip-injected',
        'data-new-gr-c-s-check-loaded',
        'data-gr-ext-installed',
        'data-grammarly-shadow-root'
      ]
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div 
      ref={wrapperRef}
      suppressHydrationWarning={suppressHydration}
      style={{
        isolation: 'isolate', // Create new stacking context
        contain: 'layout style paint', // Contain layout changes
      }}
    >
      {children}
    </div>
  )
} 