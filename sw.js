const CACHE = 'maitra-shell-v23';
const CORE = [
  './',
  './index.html',
  './css/style.css',
  './css/style-base.css',
  './css/refinement.css',
  './css/internal-experience.css',
  './css/menu-experience.css',
  './css/mobile-composition.css',
  './css/client-polish.css',
  './css/mobile-optimization-final.css',
  './css/mobile-client-experience.css',
  './js/script.js',
  './manifest.webmanifest',
  './assets/icons/favicon.svg',
  './assets/logo/loogo.png',
  './assets/optimized/hero/maitra-hero-unified-poster.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // Large video files stay network-controlled so the service worker does not
  // silently turn a media-heavy landing page into a multi-megabyte offline cache.
  if (url.pathname.endsWith('.mp4')) {
    event.respondWith(fetch(event.request).catch(() => Response.error()));
    return;
  }

  // HTML stays fresh; static assets can use cache-first with runtime fill.
  if (event.request.mode === 'navigate' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copy)).catch(() => {});
          return response;
        })
        .catch(() => caches.match(event.request).then(cached => cached || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response.ok && response.type === 'basic') {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy)).catch(() => {});
      }
      return response;
    }))
  );
});
