import React from 'react';
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { ShoppingCartProvider } from '../components/Context/ShoopingCartContext';
import { defaultMetadata } from '../lib/metadata';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet={defaultMetadata.charSet} />
        <meta name="viewport" content="minimum-scale=1, width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#007BC7" />

        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        {/* Fonts and External Resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />

        {/* Preload Critical Resources */}
        <link rel="preload" href="/bg/bg-banner.webp" as="image" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" as="style" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              "name": defaultMetadata.title,
              "description": defaultMetadata.description,
              "image": defaultMetadata.openGraph.image,
              "url": defaultMetadata.openGraph.url,
              "telephone": "+542235383512",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av Champagnat 1167",
                "addressLocality": "Mar del Plata",
                "addressRegion": "Mar del Plata",
                "postalCode": "B7604",
                "addressCountry": "Argentina",
              },
              "sameAs": [
                "https://www.instagram.com/caviglia/",
              ],
            }),
          }}
        />
      </head>
      <body>
        <ShoppingCartProvider>
          {children}
          <Toaster />
        </ShoppingCartProvider>
      </body>
    </html>
  );
}
