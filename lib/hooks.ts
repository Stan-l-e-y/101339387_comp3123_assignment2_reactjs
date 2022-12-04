import { CookieValueTypes } from 'cookies-next/lib/types';
import useSWR from 'swr';
import { getRequestDeps } from './functions';

export function useFetch(url: RequestInfo | URL) {
  const { token } = getRequestDeps();

  const fetcher = async (url: RequestInfo | URL, token: CookieValueTypes) =>
    await fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(
      (res) => res.json()
    );

  // const { data, error, mutate } = useSWR(token ? [url, token] : null, fetcher);
  const { data, error, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    mutate,
  };
}

export function useFetchWithCondition(url: RequestInfo | URL, condition: any) {
  const fetcher = async (url: RequestInfo | URL) =>
    await fetch(url).then((res) => res.json());
  const { data, error, mutate } = useSWR(condition ? url : null, fetcher);

  return {
    data,
    error,
    mutate,
  };
}
