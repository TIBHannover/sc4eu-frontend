/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';

clientsClaim();

// eslint-disable-next-line no-unused-expressions
self.__WB_MANIFEST;

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(async names => {
            await Promise.all(names.map(cache => caches.delete(cache)));
        })
    );
});

self.addEventListener('push', event => {
    if (Notification.permission !== 'granted') {
        console.error('Notification permission not granted');
        return;
    }
    let notificationData = {
        title: 'New Notification',
        body: 'You have a new notification',
        data: {
            url: process.env.REACT_APP_PUBLIC_URL
        }
    };

    try {
        if (event.data) {
            const payload = event.data.json();

            notificationData = {
                title: payload.title || notificationData.title,
                body: payload.body || notificationData.body,
                icon: payload.icon || notificationData.icon,
                badge: payload.badge || notificationData.badge,
                tag: payload.tag,
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

self.addEventListener('notificationclick', event => {
    event.notification.close();

    const path = event.notification.data?.url || process.env.REACT_APP_PUBLIC_URL;
    const url = new URL(path, self.location.origin);
    const target = url.origin === self.location.origin ? url.pathname + url.search + url.hash : process.env.REACT_APP_PUBLIC_URL;

    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(async windows => {
            const window = windows.find(w => new URL(w.url).origin === self.location.origin);
            if (window) {
                // App is already open: focus it and let React router navigate (no page reload).
                await window.focus();
                window.postMessage({ type: 'NOTIFICATION_CLICK', url: target });
                return;
            }
            return self.clients.openWindow(target);
        })
    );
});

// Any other custom service worker logic can go here.
