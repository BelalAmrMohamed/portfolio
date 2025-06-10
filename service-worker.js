const cacheName = "belal-portfolio-cache-v1";
const filesToCache = [
  "/portfolio/",
  "/portfolio/index.html",
  "/portfolio/site.webmanifest",
  "/portfolio/android-chrome-192x192.png",
  "/portfolio/android-chrome-512x512.png",
  "/portfolio/apple-touch-icon.png",
  "/portfolio/favicon.png",
  "/portfolio/favicon-16x16.png",
  "/portfolio/favicon-32x32.png",
  "/portfolio/Belal CV.pdf",

  // css
  "/portfolio/css/main.css",
  "/css/vendor.css",

  // js
  "/portfolio/js/main.js",
  "/portfolio/js/plugins.js",

  //images
  "/portfolio/images/about-photo.jpg",
  "/portfolio/images/about-photo@2x.jpg",

  // Icons
  "/portfolio/images/icons/icon-72x72.png",
  "/portfolio/images/icons/icon-96x96.png",
  "/portfolio/images/icons/icon-128x128.png",
  "/portfolio/images/icons/icon-192x192.png",
  "/portfolio/images/icons/icon-384x384.png",
  "/portfolio/images/icons/icon-512x512.png",

  // Screenshots
  "/portfolio/screenshots/screenshot-mobile.png",
  "/portfolio/screenshots/screenshot-desktop.png",

  // Portfolio images
  "/portfolio/images/portfolio/numbersystems.jpg",
  "/portfolio/images/portfolio/numbersystems@2x.jpg",
  "/portfolio/images/portfolio/ceaser.jpg",
  "/portfolio/images/portfolio/ceaser@2x.jpg",
  "/portfolio/images/portfolio/calculator.jpg",
  "/portfolio/images/portfolio/calculator@2x.jpg",
  "/portfolio/images/portfolio/numbersystems - web.jpg",
  "/portfolio/images/portfolio/numbersystems - web@2x.jpg",
  "/portfolio/images/portfolio/playfair.jpg",
  "/portfolio/images/portfolio/playfair@2x.jpg",
  "/portfolio/images/portfolio/row.jpg",
  "/portfolio/images/portfolio/row@2x.jpg",
  "/portfolio/images/portfolio/RailFence.jpg",
  "/portfolio/images/portfolio/RailFence@2x.jpg",

  //gellary images
  "/portfolio/images/portfolio/gellary/g-RailFence.jpg",
  "/portfolio/images/portfolio/gellary/about-photo.jpg",
  "/portfolio/images/portfolio/gellary/g-calculator.jpg",
  "/portfolio/images/portfolio/gellary/g-ceaser.jpg",
  "/portfolio/images/portfolio/gellary/g-numbersystems - web.jpg",
  "/portfolio/images/portfolio/gellary/g-numbersystems.jpg",
  "/portfolio/images/portfolio/gellary/g-playfair.jpg",
  "/portfolio/images/portfolio/gellary/g-row.jpg",

  // Avatar
  "/portfolio/images/avatars/user-01.jpg",
  "/portfolio/images/avatars/user-02.jpg",
  "/portfolio/images/avatars/user-03.jpg",
  "/portfolio/images/avatars/user-04.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(filesToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
