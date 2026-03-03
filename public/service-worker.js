self.addEventListener('install', event => {
    console.log('Service worker installing...');
    event.waitUntil(
        caches.open('my-app-cache').then(cache => {
            return cache.addAll(['/', '/static/js/main.js', '/static/css/main.css']);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Add push notification listener
self.addEventListener('push', event => {
    console.log('Push event received:', event);
    // Handle push notifications here
});
