/* Bread of the Presence – service worker.
   Bump VERSION whenever any file changes so installed copies update. */
const VERSION = "botp-v2.2";
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "fonts/eb-garamond-greek-400-normal.woff2",
  "fonts/eb-garamond-greek-ext-400-normal.woff2",
  "fonts/eb-garamond-latin-400-italic.woff2",
  "fonts/eb-garamond-latin-400-normal.woff2",
  "fonts/eb-garamond-latin-500-italic.woff2",
  "fonts/eb-garamond-latin-500-normal.woff2",
  "fonts/eb-garamond-latin-600-normal.woff2",
  "fonts/eb-garamond-latin-ext-400-italic.woff2",
  "fonts/eb-garamond-latin-ext-400-normal.woff2",
  "fonts/eb-garamond-latin-ext-500-normal.woff2",
  "fonts/frank-ruhl-libre-hebrew-400-normal.woff2"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;

  // Pages: open instantly from the cache, then refresh the cached copy in the background.
  // Never waiting on the network means the app opens even on wifi with no internet
  // or a very weak signal, where a network request can hang for a long time.
  if (req.mode === "navigate") {
    const refresh = fetch(req)
      .then(res => {
        if (res.ok && !res.redirected) {
          const copy = res.clone();
          return caches.open(VERSION).then(c => c.put("index.html", copy)).then(() => res);
        }
        return res;
      });
    e.waitUntil(refresh.catch(() => {}));
    e.respondWith(
      caches.match("index.html", { ignoreSearch: true })
        .then(hit => hit || refresh)
        .catch(() => caches.match("index.html", { ignoreSearch: true }))
    );
    return;
  }

  // Everything else: cache first.
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req)));
});
