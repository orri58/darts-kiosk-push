// Shows the messages from the Darts Kiosk. Nothing else: no cache, no data.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  let d = {};
  try {
    d = event.data ? event.data.json() : {};
  } catch (e) {
    d = { body: event.data ? event.data.text() : '' };
  }
  const title = d.title || 'Darts Kiosk';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: d.body || '',
      tag: d.tag || undefined,
      renotify: !!d.tag,
      requireInteraction: !!d.urgent,
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      vibrate: d.urgent ? [300, 120, 300, 120, 600] : [200],
      timestamp: d.at ? d.at * 1000 : Date.now(),
      data: { url: d.url || '' },
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url;
  if (url) event.waitUntil(self.clients.openWindow(url));
});
