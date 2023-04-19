/* global importScripts workbox */

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);

const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;
const { precacheAndRoute } = workbox.precaching;
const { registerRoute } = workbox.routing;

const models = [
  'gingerhead.json',
  'gingerheadband.json',
  'gingerheadphones.json',
  'gingerlefteye.json',
  'gingerrighteye.json',
  'gingerteethbot.json',
  'gingerteethtop.json',
  'gingertongue.json',
];

// TODO: Setup proper pre-caching.

// Cache Google Fonts with a stale-while-revalidate strategy.
registerRoute(
  ({ url }) =>
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts',
    plugins: [new ExpirationPlugin({ maxEntries: 20 })],
  })
);

registerRoute(
  ({ request }) =>
    request.destination === 'script' || request.destination == 'document',
  new StaleWhileRevalidate({
    cacheName: 'script-cache',
  })
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
      }),
    ],
  })
);

registerRoute(
  ({ request }) => {
    for (const modelName of models) {
      if (request.url.includes(modelName)) {
        return true;
      }
    }
    return false;
  },
  new CacheFirst({
    cacheName: 'model-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
      }),
    ],
  })
);
