const urlsToCache = [
  '/',
  '/js/app.js',
  '/css/style.css',
  '/en.html',
  '/fr.html'
];

const CACHE = "v1.0.3";

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

self.addEventListener('fetch', event => {
    caches.match(event.request).then((response) => {
      // get cached response
      if (response) {
        return response;
      }

      // if no cache get response from network
      return fetch(event.request)
      .then((httpResponse) => {
        // can't reach
        if (!httpResponse || httpResponse.status !== 200 || httpResponse.type !== "basic") {
          return httpResponse;
        }

        let responseToCache = httpResponse.clone(); // clone response stream

        caches.open(CACHE).then((cache) => {
          return cache.put(event.request, responseToCache) // cache url that are not listed
        });

        return httpResponse;
      })
    })
});
