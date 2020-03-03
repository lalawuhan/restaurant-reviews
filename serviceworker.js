// attribution to https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
const cacheName = "v1";
let cacheFiles = [
    "/",
    "/css/styles.css",
    "/data/restaurants.json",
    "/img/1.jpg",
    "/img/2.jpg",
    "/img/3.jpg",
    "/img/4.jpg",
    "/img/5.jpg",
    "/img/6.jpg",
    "/img/7.jpg",
    "/img/8.jpg",
    "/img/9.jpg",
    "/img/10.jpg",
    "/js/dbhelper.js",
    "/js/main.js",
    "/js/restaurant_info.js",
    "/index.html",
    "/restaurant.html"
];
self.addEventListener("install", function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );
});
self.addEventListener("activate", function(e) {
    e.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames
                    .filter(function(cacheName) {
                        return (
                            cacheName.startsWith("mws-restaurant-") &&
                            cacheName != cacheName
                        );
                    })
                    .map(function(cacheName) {
                        return caches.delete(cacheName);
                    })
            );
        })
    );
});
self.addEventListener("fetch", function(event) {
    console.log("[Service Worker] Fetching", event.request.url);
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                if (response) {
                    console.log(
                        "[ServiceWorker] Found in cache",
                        event.request.url
                    );
                    return response;
                }
                return fetch(event.request);
            })
            .catch(function(error) {
                console.log("Error fetching and caching new data", error);
            })
    );
});
