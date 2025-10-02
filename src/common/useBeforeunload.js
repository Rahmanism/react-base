import { useEffect, useRef } from 'react'

/**
 * Custom hook to handle window beforeunload event
 * @param {Function} handler - Function to execute before window unload
 * @param {boolean} enabled - Whether the hook is enabled (default: true)
 *
 * with help from https://claude.ai/chat/7efab597-f84f-4c62-a19c-3c855efaa8e1
 */
export const useBeforeunload = (handler, enabled = true) => {
  const handlerRef = useRef(handler)

  // Keep handler reference up to date
  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    if (!enabled) return

    const handleBeforeUnload = (event) => {
      // Execute the custom handler
      if (handlerRef.current) {
        const result = handlerRef.current(event)

        // If handler returns a string or truthy value, show confirmation dialog
        if (result) {
          event.preventDefault()
          // Modern browsers ignore the custom message, but setting returnValue is required
          event.returnValue = typeof result === 'string' ? result : ''
          return result
        }
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [enabled])
}
