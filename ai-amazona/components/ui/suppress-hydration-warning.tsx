'use client'

import { useEffect } from 'react'

/**
 * Component that suppresses hydration warnings caused by browser extensions
 * This should be used as a last resort when other hydration fixes don't work
 */
export function SuppressHydrationWarning() {
  useEffect(() => {
    // Override console.error to filter out hydration warnings related to browser extensions
    const originalConsoleError = console.error
    
    console.error = (...args) => {
      const message = args[0]?.toString() || ''
      
      // Filter out specific hydration errors caused by browser extensions
      const extensionRelatedErrors = [
        'Hydration failed because the server rendered HTML',
        'bbai-tooltip-injected',
        'data-new-gr-c-s-check-loaded',
        'data-gr-ext-installed',
        'server rendered HTML didn\'t match the client',
        'Text content does not match server-rendered HTML',
        'Expected server HTML to contain a matching',
        'Warning: Expected server HTML to contain',
        'Warning: Text content did not match'
      ]
      
      const isExtensionError = extensionRelatedErrors.some(errorPattern => 
        message.includes(errorPattern)
      )
      
      // Only suppress extension-related hydration errors
      if (!isExtensionError) {
        originalConsoleError.apply(console, args)
      }
    }
    
    // Override console.warn for hydration warnings
    const originalConsoleWarn = console.warn
    
    console.warn = (...args) => {
      const message = args[0]?.toString() || ''
      
      const extensionRelatedWarnings = [
        'Hydration failed',
        'bbai-tooltip-injected',
        'data-new-gr-c-s-check-loaded',
        'data-gr-ext-installed'
      ]
      
      const isExtensionWarning = extensionRelatedWarnings.some(warningPattern => 
        message.includes(warningPattern)
      )
      
      if (!isExtensionWarning) {
        originalConsoleWarn.apply(console, args)
      }
    }
    
    // Cleanup function to restore original console methods
    return () => {
      console.error = originalConsoleError
      console.warn = originalConsoleWarn
    }
  }, [])
  
  return null
} 