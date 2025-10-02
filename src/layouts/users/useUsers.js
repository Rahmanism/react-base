import { useQuery } from '@tanstack/react-query'
import { UserApi } from 'api'

const apiObj = new UserApi()

/**
 * Custom hook for fetching users data.
 */
export default function useUsers(onSuccess) {
  return useQuery({
    queryKey: [apiObj.apiUrl],
    queryFn: async () => apiObj.getAll({ first: 0, count: 0 }),
    staleTime: Infinity,
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
  })
}
