// PWA
const CACHE_NAME = "SkyPoster-v1";
const urlsToCache = [
  "/",
];

// install
addEventListener("install", function (event) {
  event.waitUntil(
     caches.open(CACHE_NAME).then(function (cache) {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
     })
  );
});

// activate
addEventListener("activate", function (event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
     caches.keys().then(function (cacheNames) {
        return Promise.all(
           cacheNames.map(function (cacheName) {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                 return caches.delete(cacheName);
              }
           })
        );
     })
  );
});

// fetch
addEventListener("fetch", function (event) {
  event.respondWith(
     caches.match(event.request).then(function (response) {
        if (response) {
           return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(function (response) {
           if (!response || response.status !== 200 || response.type !== "basic") {
              return response;
           }

           var responseToCache = response.clone();

           caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, responseToCache);
           });

           return response;
        });
     })
  );
});

// Web push sender
addEventListener('push', (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
  });
});

// Web push detect change
addEventListener('pushsubscriptionchange', function(event) {
  event.waitUntil(
    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
  )
});
