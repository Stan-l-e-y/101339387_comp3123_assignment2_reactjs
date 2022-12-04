import { getCookie } from 'cookies-next';

export function getRequestDeps() {
  const token = getCookie('jwt');
  const fetcher = async (
    url: RequestInfo | URL,
    options?: RequestInit | undefined
  ) => await fetch(url, options).then((res) => res);

  return {
    fetcher,
    token,
  };
}
