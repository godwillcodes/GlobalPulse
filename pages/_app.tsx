// Import global CSS
import '../app/styles/global.css'; // Adjust the path if needed
import type { AppProps } from 'next/app';

// Define the App component
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
