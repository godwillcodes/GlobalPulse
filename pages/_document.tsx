import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="GlobalPulse delivers up-to-date news and in-depth analysis from around the world, keeping you informed on the latest global events." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="GlobalPulse Team" />
        <meta name="keywords" content="world news, global news, international news, current events, GlobalPulse" />
        <meta property="og:title" content="GlobalPulse - Your Source for World News" />
        <meta property="og:description" content="Stay informed with GlobalPulse, your trusted source for breaking news and in-depth analysis of global events. From politics to culture, we cover it all." />
        <meta property="og:image" content="/images/globalpulse-og-image.jpg" />
        <meta property="og:url" content="https://www.globalpulse.com" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@GlobalPulse" />
        <meta property="twitter:title" content="GlobalPulse - Your Source for World News" />
        <meta property="twitter:description" content="Stay informed with GlobalPulse, your trusted source for breaking news and in-depth analysis of global events. From politics to culture, we cover it all." />
        <meta property="twitter:image" content="/images/globalpulse-twitter-image.jpg" />
        <link rel="icon" href="/favicon.ico" />
        {/* Add additional global meta tags or links here */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
