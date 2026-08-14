/* GestaMed update controller
 * Purpose: prevent installed/PWA copies from remaining stuck on stale browser caches.
 * This worker intentionally does not maintain an application cache.
 */
const GESTAMED_BUILD = '2026.08.14.187';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    try {
      return await fetch(new Request(request, { cache: 'no-store' }));
    } catch (error) {
      return fetch(request);
    }
  })());
});
