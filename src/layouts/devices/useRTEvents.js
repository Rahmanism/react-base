import { useQuery } from '@tanstack/react-query'
import { DeviceApi } from 'api'

const apiObj = new DeviceApi()
const getAllDevicesEventsInterval =
  (localStorage.getItem('GetAllDeviceLogsInterval') * 1000)

/**
 * Custom hook for fetching device's RT events log.
 *
 * @param {function} onSuccess - What should happend after fetching data succfully
 * @param {number | string} deviceId - The device ID
 * @returns {Array} Array containing RT events
 */
export default function useRTEvents({
  onSuccess,
  deviceId,
  interval = getAllDevicesEventsInterval,
}) {
  return useQuery({
    queryKey: [`${apiObj.apiUrl}/getEvents`],
    queryFn: async () => apiObj.getEvents({ id: deviceId }),
    refetchInterval: interval,
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
  })
}

/**
 * Custom hook for fetching device's RT events log, FOR ALL DEVICES.
 *
 * @param {function} onSuccess - What should happend after fetching data succfully
 * @returns {Array} Array containing RT events
 */
export function useRTEventsForAll({
  onSuccess,
  interval = getAllDevicesEventsInterval,
}) {
  return useQuery({
    queryKey: [`${apiObj.apiUrl}/GetAllDevicesEvents`],
    queryFn: async () => apiObj.getAllDevicesEvents(),
    refetchInterval: interval,
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
  })
}
