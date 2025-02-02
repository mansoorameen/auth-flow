import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Link to the Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Meta tags for mobile */}
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="A simple user authentication application"
        />

        {/* Icons */}
        <link rel="icon" href="/icons/favicon.svg" sizes="192x192" />
        <link rel="icon" href="/icons/favicon.svg" sizes="512x512" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
