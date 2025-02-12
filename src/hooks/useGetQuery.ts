import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useGetQuery = <T>(
  queryKey: string,
  relation?: 'players' | 'teams' | 'games'
): UseQueryResult<T> => {
  return useQuery<T>({
    queryKey: queryKey.includes('/') ? queryKey.split('/') : [queryKey],
    queryFn: async () => {
      const data = await fetch(
        `http://localhost:3000/${queryKey}${relation ? `?_embed=${relation}` : ''}`
      );
      return data.json();
    },
  });
};
