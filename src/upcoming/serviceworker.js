// ASSET_HASH gets set by the server when being served.
const assetHash = ASSET_HASH;

console.log('in serviceworker');

const cdnOrigins = [
  'https://cdn.usetopscore.com',
  'https://d36m266ykvepgv.cloudfront.net',
];

const staticCache = `static-${assetHash}`;
const iconCache = 'team-icons';
const validCaches = new Set([
  staticCache,
  iconCache,
]);

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(staticCache)
    .then((cache) => cache.addAll([
      '/shell',
      `/upcoming-${assetHash}.css`,
      `/upcoming-${assetHash}.js`,
    ]))
  );
});

function handleTeamIconRequest(event) {
  const networkFetch = fetch(event.request);

  event.waitUntil(
    networkFetch.then((response) => {
      const responseClone = response.clone();
      caches.open(iconCache)
        .then((cache) => cache.put(event.request, responseClone));
    })
  );

  return caches.match(event.request)
    .then((response) => response || networkFetch);
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (cdnOrigins.includes(url.origin)) {
    event.respondWith(handleTeamIconRequest(event));
    return;
  }

  if (url.origin === location.origin && url.pathname === '/') {
    event.respondWith(caches.match('/shell'));
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// self.addEventListener('activate', event => {
//   event.waitUntil(
//     caches.keys()
//       .then((cacheNames) => (
//         Promise.all(
//           cacheNames
//             .filter((cacheName) => !validCaches.has(cacheName))
//             .map((cacheName) => caches.delete(cacheName)))))
//   );
// });
