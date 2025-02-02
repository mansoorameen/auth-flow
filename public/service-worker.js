const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/",
  "/login",
  "/register",
  "/dashboard",
  "/icons/lock-192.png",
];

// Install Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Event (Serve Cached Assets When Offline)
self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);

  // If the requested resource is in cache, serve it; otherwise, fetch from network
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Return cached content if available
      }

      // If the resource is not cached, try fetching from the network
      return fetch(event.request);
    })
  );
});
