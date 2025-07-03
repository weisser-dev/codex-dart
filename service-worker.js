self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('darts-cache').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './styles.css',
        './app.js'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
