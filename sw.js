// Shows the messages from the Darts Kiosk; a tap opens the bar page. No cache, no data.
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
  // through this page (same site, also inside the iPhone home screen app); it forwards to the bar
  const url = (event.notification.data && event.notification.data.url) || '';
  const page = new URL('./?open=theke' + (url ? '&to=' + encodeURIComponent(url) : ''), self.registration.scope);
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      const own = list.find((c) => c.url.startsWith(self.registration.scope) && 'navigate' in c);
      if (own) return own.focus().then((c) => (c || own).navigate(page.href)).catch(() => self.clients.openWindow(page.href));
      return self.clients.openWindow(page.href);
    }),
  );
});
