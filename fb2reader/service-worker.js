const CACHE_NAME = "fb2-reader-cache-v1";
const urlsToCache = [
  "./index.html",
  "./manifest.json",
  "./style.css", // Если есть файл стилей
  "./script.js", // Ваш JavaScript
  "./icon-192x192.png",
  "./icon-512x512.png"
];

// Установка Service Worker и кэширование файлов
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Файлы добавлены в кэш");
      return cache.addAll(urlsToCache);
    })
  );
});

// Обработка запросов: сначала ищется в кэше, потом в сети
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Удаление старых кэшей при обновлении
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

