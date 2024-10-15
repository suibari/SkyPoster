// PWA
const CACHE_NAME = "SkyPoster-v1";
const urlsToCache = [
  "/",
];

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
