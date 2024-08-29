// Import global CSS
import '../app/styles/global.css'; // Adjust the path if needed
import type { AppProps } from 'next/app';
import { Inter } from '@next/font/google';
// Import the Header component
import Header from '../components/common/Header'; // Adjust the path if needed

const inter = Inter({ subsets: ['latin'] });
// Define the App component
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
