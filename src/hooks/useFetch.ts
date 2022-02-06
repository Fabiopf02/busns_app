import useSWR from 'swr';
import api from '../services/api';

export function useQuery<T>(url: string, headers = {}) {
  const { data, error, isValidating, mutate } = useSWR<T>(
    url,
    async _url => {
      const response = await api.get(_url, {
        headers,
      });
      return response.data;
    },
    {
      revalidateOnReconnect: true,
      errorRetryInterval: 1500,
      revalidateOnFocus: true,
      refreshInterval: 5000,
    },
  );

  return { data, error, mutate, isValidating };
}
