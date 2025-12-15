const CACHE_NAME = "rozimi-quiz-v1";
const urlsToCache = [
  "/quiz-hg/",
  "/quiz-hg/index.html",
  "/quiz-hg/style.css",
  "/quiz-hg/script.js",
  "/quiz-hg/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
