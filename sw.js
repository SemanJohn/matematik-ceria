/* Service worker — Matematik Ceria
 *
 * Strategi: NETWORK-FIRST dengan had masa, jatuh balik ke cache.
 *
 * Kesannya: setiap kali ada internet, peranti sentiasa dapat fail terbaharu
 * secara automatik — tiada perlu naikkan nombor versi secara manual.
 * Bila tiada internet (atau rangkaian perlahan), salinan cache digunakan,
 * jadi aplikasi tetap berfungsi 100% luar talian.
 */

const CACHE = "matematik-ceria";
const NET_TIMEOUT = 4000;

const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./art.js",
  "./config.js",
  "./engine.js",
  "./store.js",
  "./sync.js",
  "./visuals.js",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/** Cuba rangkaian dahulu; jika gagal atau terlalu lama, guna cache. */
async function networkFirst(req) {
  const cache = await caches.open(CACHE);

  // .catch di sini penting: tanpanya, kegagalan rangkaian yang berlaku
  // selepas had masa tamat akan menjadi ralat tergantung.
  const fromNet = fetch(req)
    .then((res) => {
      if (res && res.status === 200 && res.type === "basic") cache.put(req, res.clone());
      return res;
    })
    .catch(() => null);

  const timeout = new Promise((resolve) => setTimeout(() => resolve(null), NET_TIMEOUT));

  const res = await Promise.race([fromNet, timeout]);
  if (res) return res;

  const hit = await cache.match(req);
  if (hit) return hit;

  // Rangkaian lambat tetapi tiada salinan cache: tunggu rangkaian sepenuhnya.
  const akhir = await fromNet;
  return akhir || Response.error();
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // Google Sheets dll. — biar lalu terus

  if (req.mode === "navigate") {
    e.respondWith(
      networkFirst(req).catch(() =>
        caches.open(CACHE).then((c) => c.match("./index.html"))
      )
    );
    return;
  }

  e.respondWith(networkFirst(req));
});

self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});
