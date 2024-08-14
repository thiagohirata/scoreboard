// Choose a cache name
const cacheName = process.env.SW_CACHE_NAME;

self.addEventListener("install", (event) => {});

self.addEventListener("fetch", (event: FetchEvent) => {
  if (event.request.method != "GET") return;
  if (event.request && event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      (async () => {
        try {
          // First, try to use the navigation preload response if it's supported.
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }
          const networkResponse = await fetch(event.request);
          if (networkResponse) {
            const cache = await caches.open(cacheName);
            event.waitUntil(cache.put(event.request, networkResponse.clone()));
          }
          return networkResponse;
        } catch (error) {
          const cache = await caches.open(cacheName);
          const cachedResponse = await cache.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          } else {
            throw error;
          }
        }
      })()
    );
  }
});

// Clears cache
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return;
          }
          return caches.delete(key);
        })
      );
    })
  );
});
