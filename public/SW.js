const urlsToCache = [
  '/',
  '/js/app.js',
  '/css/style.css',
  '/en.html',
  '/fr.html'
];

const CACHE = "v1.0.1";

// pre-caching
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  )
});

// update cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // if found in cache return cache
        if (response) {
          return response;
        }

        // get response from network
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== "basic") {
              return response;
            }

            let responseToCache = response.clone(); // clone response stream

            caches.open(CACHE)
              .then((cache) => {
                return cache.put(event.request, responseToCache) // cache url that are not listed
              });

            return response;
          })
      })
  )
});
