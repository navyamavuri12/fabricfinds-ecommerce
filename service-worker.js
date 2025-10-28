const CACHE_NAME = 'fabricfinds-cache-v1';
const urlsToCache = [
  // List all your main files here to allow offline viewing
  '/fabricfinds-ecommerce/', // Index page and root of the project
  '/fabricfinds-ecommerce/index.html',
  '/fabricfinds-ecommerce/shop.html',
  '/fabricfinds-ecommerce/cart.html',
  '/fabricfinds-ecommerce/product.html',
  '/fabricfinds-ecommerce/style.css',
  '/fabricfinds-ecommerce/script.js',
  '/fabricfinds-ecommerce/manifest.json',
  // You would list all image files here too for a full offline experience
];

// Install Event: Caches all files listed above
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Event: Serves content from cache if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate Event: Cleans up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});