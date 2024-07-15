import { useQuery } from '@tanstack/react-query'
import { getProfileId } from '@/actions/profile'

export const useProfile = (id: string) => {
  return useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfileId(id),
  })
}
