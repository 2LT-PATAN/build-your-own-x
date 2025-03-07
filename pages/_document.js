import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.svg" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet" />
        
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      </Head>
      <body className="bg-gray-900 text-white">
        <Main />
        <NextScript />
        <noscript>
          <div style={{
            padding: '20px',
            margin: '40px auto',
            maxWidth: '600px',
            textAlign: 'center',
            backgroundColor: '#111827',
            color: 'white',
            border: '1px solid #4F46E5',
            borderRadius: '8px'
          }}>
            <h1>JavaScript Required</h1>
            <p>
              Space Seven Gym requires JavaScript to be enabled in your browser to provide you with the best experience.
              Please enable JavaScript and reload this page.
            </p>
          </div>
        </noscript>
      </body>
    </Html>
  )
} 