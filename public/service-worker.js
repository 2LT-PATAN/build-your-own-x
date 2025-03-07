// Service Worker for Space Seven Gym Application

const CACHE_NAME = 'space-seven-cache-v1';
const DYNAMIC_CACHE = 'space-seven-dynamic-cache-v1';

// Resources to cache immediately
const PRECACHE_URLS = [
  '/',
  '/gym',
  '/create-plan',
  '/manifest.json'
];

// Skip waiting for the previous service worker
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
  );
});

// Clean up old caches and claim clients
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, DYNAMIC_CACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => !currentCaches.includes(cacheName))
          .map(cacheName => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Apply caching strategies based on request type
self.addEventListener('fetch', event => {
  // Skip cross-origin requests and Firebase API calls
  if (
    !event.request.url.startsWith(self.location.origin) || 
    event.request.url.includes('firebase') || 
    event.request.url.includes('googleapis.com') ||
    event.request.url.includes('googletagmanager') ||
    event.request.url.includes('google-analytics')
  ) {
    return;
  }

  // Network-first strategy for HTML pages
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response for caching
          const responseToCache = response.clone();
          
          // Only cache successful responses
          if (response.ok) {
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          
          return response;
        })
        .catch(() => {
          // If network fails, try to return from cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // Cache-first strategy for static assets
  if (
    event.request.destination === 'style' ||
    event.request.destination === 'script' ||
    event.request.destination === 'image' ||
    event.request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        // Return cached response if available
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Otherwise fetch from network and cache
        return fetch(event.request).then(response => {
          // Return the original response if it's not valid for caching
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response for caching
          const responseToCache = response.clone();
          
          // Add to cache
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        });
      })
    );
    return;
  }

  // Network-first for API requests and other resources
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
}); 