const CACHE_VERSION = "v2";
const CACHE_NAME = `belal-portfolio-cache-${CACHE_VERSION}`;
const OFFLINE_URL = "/portfolio/offline.html"; // Optional: create this file

const filesToCache = [
  "./",
  "index.html",
  "offline.html",
  "site.webmanifest",
  "android-chrome-192x192.png",
  "android-chrome-512x512.png",
  "apple-touch-icon.png",
  "favicon.png",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "Belal CV.pdf",

  // css
  "css/styles.css",
  "css/vendor.css",

  // js
  "js/main.js",
  "js/plugins.js",

  //images
  "images/about-photo.jpg",
  "images/about-photo@2x.jpg",

  // Icons
  "images/icons/icon-72x72.png",
  "images/icons/icon-96x96.png",
  "images/icons/icon-128x128.png",
  "images/icons/icon-192x192.png",
  "images/icons/icon-384x384.png",
  "images/icons/icon-512x512.png",

  // Screenshots
  "screenshots/screenshot-mobile.png",
  "screenshots/screenshot-desktop.png",

  // Portfolio images
  "images/portfolio/ns.jpg",
  "images/portfolio/ns@2x.jpg",
  "images/portfolio/ceaser.jpg",
  "images/portfolio/ceaser@2x.jpg",
  "images/portfolio/calculator.jpg",
  "images/portfolio/calculator@2x.jpg",
  "images/portfolio/nsweb.jpg",
  "images/portfolio/nsweb@2x.jpg",
  "images/portfolio/playfair.jpg",
  "images/portfolio/playfair@2x.jpg",
  "images/portfolio/row.jpg",
  "images/portfolio/row@2x.jpg",
  "images/portfolio/RailFence.jpg",
  "images/portfolio/RailFence@2x.jpg",

  //gellary images
  "images/portfolio/gellary/g-RailFence.jpg",
  "images/portfolio/gellary/about-photo.jpg",
  "images/portfolio/gellary/g-calculator.jpg",
  "images/portfolio/gellary/g-ceaser.jpg",
  "images/portfolio/gellary/g-numbersystems - web.jpg",
  "images/portfolio/gellary/g-numbersystems.jpg",
  "images/portfolio/gellary/g-playfair.jpg",
  "images/portfolio/gellary/g-row.jpg",

  // Avatar
  "images/avatars/user-01.jpg",
  "images/avatars/user-02.jpg",
  "images/avatars/user-03.jpg",
  "images/avatars/user-04.jpg",
];

// Install event: cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(filesToCache))
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter(
              (name) =>
                name.startsWith("belal-portfolio-cache-") && name !== CACHE_NAME
            )
            .map((name) => caches.delete(name))
        )
      )
  );
  self.clients.claim();
});

// Fetch event: cache-first, fallback to network, fallback to offline page
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request)
        .then((networkResponse) => {
          // Optionally cache new requests here if needed
          return networkResponse;
        })
        .catch(() => {
          // If request is for a navigation to a page, show offline fallback
          if (event.request.mode === "navigate") {
            return caches.match(OFFLINE_URL);
          }
        });
    })
  );
});
