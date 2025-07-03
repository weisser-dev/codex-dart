self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('darts-cache').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './src/styles.css',
        './src/index.js',
        './src/App.js',
        './src/themes.json'
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
