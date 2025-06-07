
const CACHE_NAME = 'gpo-platform-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/dashboard',
  '/workflow-management',
  '/proposals',
  '/voting',
  '/arbitration',
  '/collective-agreement'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline workflow updates
self.addEventListener('sync', (event) => {
  if (event.tag === 'workflow-sync') {
    event.waitUntil(
      // Sync workflow data when back online
      syncWorkflowData()
    );
  }
});

// Push notifications for workflow updates
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'تحديث جديد في سير العمل',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    tag: 'workflow-notification',
    actions: [
      {
        action: 'view',
        title: 'عرض',
        icon: '/icon-192x192.png'
      },
      {
        action: 'dismiss',
        title: 'إغلاق'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('GPO Platform', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/workflow-management')
    );
  }
});

async function syncWorkflowData() {
  try {
    // Implement workflow sync logic here
    console.log('Syncing workflow data...');
    // This would sync with your backend when connectivity is restored
  } catch (error) {
    console.error('Failed to sync workflow data:', error);
  }
}
