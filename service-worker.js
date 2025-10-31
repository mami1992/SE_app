const CACHE_NAME = "se-app-v1";
const FILES_TO_CACHE = [
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./kirakomesalada.mp3",
  "./kirakomesalada2.mp3",
  "./SE.mp3",
  "./SE2.mp3",
  "./patison.mp3",
  "./patison2.mp3",
  "./icon192.png",
  "./icon512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});