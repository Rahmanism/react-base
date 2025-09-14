import { useQuery } from '@tanstack/react-query'
import { DeviceApi } from 'api'

const apiObj = new DeviceApi()

/**
 * Custom hook for fetching devices data.
 */
export default function useDevices(onSuccess) {
  return useQuery({
    queryKey: [apiObj.apiUrl],
    queryFn: async () => apiObj.getAll({ first: 0, count: 0 }),
    staleTime: Infinity,
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
  })
}
