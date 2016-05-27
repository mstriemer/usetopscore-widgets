const assetHash = '220d53b38b61540823e4';
const cdnOrigins = [
  'https://cdn.usetopscore.com',
  'https://d36m266ykvepgv.cloudfront.net',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open('static-v1')
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
      caches.open('team-icons')
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