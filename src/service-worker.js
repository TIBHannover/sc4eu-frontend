/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';

clientsClaim();

// eslint-disable-next-line no-unused-expressions
self.__WB_MANIFEST;

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', event => {
    console.log('Updating service worker after receiveing SKIP_WAITING message');
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(async names => {
            await Promise.all(names.map(cache => caches.delete(cache)));
        })
    );
});

self.addEventListener('push', event => {
    console.log('Push event received:', event);
    if (Notification.permission !== 'granted') {
        console.error('Notification permission not granted');
        return;
    }
    let notificationData = {
        title: 'New Notification',
        body: 'You have a new notification',
        data: {
            url: '/ocp/'
        }
    };

    try {
        if (event.data) {
            const payload = event.data.json();
            console.log('Payload:', payload);

            notificationData = {
                title: payload.title || notificationData.title,
                body: payload.body || notificationData.body,
                icon: payload.icon || notificationData.icon,
                badge: payload.badge || notificationData.badge,
                tag: payload.type || 'default',
                data: {
                    url: payload.url || notificationData.data.url,
                    vote_id: payload.vote_id,
                    type: payload.type
                },
                requireInteraction: true
            };
        }
    } catch (error) {
        console.error('Error parsing push notification data:', error);
    }

    event.waitUntil(
        self.registration.showNotification(notificationData.title, {
            body: notificationData.body,
            icon: notificationData.icon,
            badge: notificationData.badge,
            tag: notificationData.tag,
            data: notificationData.data,
            requireInteraction: notificationData.requireInteraction
        })
    );
});

// Any other custom service worker logic can go here.
