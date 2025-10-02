import { useQuery } from '@tanstack/react-query'
import { ConfigurationApi } from 'api'

const configApiObj = new ConfigurationApi()

export default function useConfiguration(onSuccess) {
  return useQuery({
    queryKey: [configApiObj.apiUrl],
    queryFn: async () => configApiObj.getAll({}),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
  })
}
