import useSWR from 'swr';

export function useFetch(url: RequestInfo | URL) {
  // const fetcher = async (url, token) =>
  // await fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(
  //   (res) => res.json()
  // );
  const fetcher = async (url: RequestInfo | URL) =>
    await fetch(url).then((res) => res.json());
  const { data, error, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    mutate,
  };
}
