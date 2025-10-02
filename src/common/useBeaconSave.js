import { getBaseUrl } from 'api/urls'
import { useEffect, useRef } from 'react'

/**
 * Hook to send critical data using sendBeacon on page unload
 * Beacon requests continue even after the page is closed
 *
 * with help from https://claude.ai/chat/7efab597-f84f-4c62-a19c-3c855efaa8e1
 */
export const useBeaconSave = (
  getDataToSave,
  urlToCall = '',
  enabled = true
) => {
  const getDataRef = useRef(getDataToSave)

  // Calls the close camera stream by default
  if (urlToCall === '') urlToCall = getBaseUrl() + '/DoBeforeClose'

  useEffect(() => {
    getDataRef.current = getDataToSave
  }, [getDataToSave])

  useEffect(() => {
    if (!enabled) return

    const handleBeforeUnload = () => {
      if (getDataRef.current && navigator.sendBeacon) {
        const data = getDataRef.current()

        if (data) {
          // sendBeacon only accepts limited data types
          const payload = typeof data === 'string' ? data : JSON.stringify(data)

          const success = navigator.sendBeacon(urlToCall, payload)
          console.log('Beacon sent:', success)
        }
      }
    }

    // Also try on visibility change as backup
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleBeforeUnload()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [enabled])
}

// Example usage:
/*
function DataTracker() {
  const [analyticsData, setAnalyticsData] = useState({
    timeSpent: 0,
    interactions: 0,
    scrollDepth: 0
  });

  // Send analytics data when page unloads
  useBeaconSave(() => {
    if (analyticsData.timeSpent > 0) {
      return {
        userId: getCurrentUserId(),
        sessionData: analyticsData,
        timestamp: Date.now()
      };
    }
    return null; // Don't send if no data
  });

  return <div>Your app content</div>;
}
*/
