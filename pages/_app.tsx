import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showNav =
    router.pathname === '/login' || router.pathname === '/register'
      ? false
      : true;

  return (
    <>
      {showNav && <Navbar />}
      <Component {...pageProps} />
    </>
  );
}
