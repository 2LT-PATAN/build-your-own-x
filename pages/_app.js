import Head from 'next/head';
import { useEffect, useState } from 'react';
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [cspContent, setCspContent] = useState('');

  // Generate CSP based on environment - only for production
  useEffect(() => {
    // No CSP in development mode
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    
    // Only set CSP in production
    const csp = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://www.googletagmanager.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net;
      font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net;
      img-src 'self' data: https:;
      connect-src 'self' https://firestore.googleapis.com https://firebase.googleapis.com https://firebaseinstallations.googleapis.com https://www.google-analytics.com;
    `.replace(/\s+/g, ' ').trim();
    
    setCspContent(csp);
  }, []);

  // Register service worker and apply cache busting
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        // Register service worker for production
        if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
          navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
              console.log('SW registered: ', registration.scope);
            })
            .catch(error => {
              console.error('SW registration failed: ', error);
            });
        }

        // Add cache busting to external resources
        const addCacheBust = (selector, attribute) => {
          const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
          document.querySelectorAll(selector).forEach(el => {
            const url = el.getAttribute(attribute);
            if (url && !url.includes('v=')) {
              const separator = url.includes('?') ? '&' : '?';
              el.setAttribute(attribute, `${url}${separator}v=${today}`);
            }
          });
        };
        
        // Apply to external resources
        addCacheBust('link[href*="fonts.googleapis.com"]', 'href');
        addCacheBust('link[href*="cdn"]', 'href');
        addCacheBust('script[src*="cdn"]', 'src');
      });
    }
  }, []);

  return (
    <AuthProvider>
      <Head>
        <title>Space Seven Gym - Premium Fitness Center</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Space Seven Gym - Premium fitness center with AI-powered workout plans and nutrition guidance" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Only include CSP in production */}
        {process.env.NODE_ENV === 'production' && cspContent && (
          <meta httpEquiv="Content-Security-Policy" content={cspContent} />
        )}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp; 