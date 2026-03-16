import { useState, useEffect, useCallback } from 'react';
import { isPushSupported } from '../utils/pushNotifications';

const VAPID_PUBLIC_KEY = process.env.REACT_APP_VAPID_PUBLIC_KEY;

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function usePushNotifications(user) {
    const [permission, setPermission] = useState(Notification.permission);
    const [subscription, setSubscription] = useState(null);
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        const supported = isPushSupported();
        console.log(`supported from usePushNotifications: ${supported}`)
        setIsSupported(supported);

        if (supported) {
            // Get existing subscription
            navigator.serviceWorker.ready.then((registration) => {
                registration.pushManager.getSubscription().then(setSubscription);
            });
        }
    }, []);

    const requestPermission = useCallback(async () => {
        if (!isSupported) {
            throw new Error('Push notifications are not supported');
        }

        const result = await Notification.requestPermission();
        setPermission(result);
        return result;
    }, [isSupported]);

    const subscribe = useCallback(async () => {
        if (permission === 'denied') {
            alert('Notifications are blocked. Please click the lock icon in your browser address bar and reset notification permission. After try again');
            return;
        }

        if (permission !== 'granted') {
            console.log('requesting permission...');
            const result = await requestPermission();
            console.log('permission result:', result);
            if (result !== 'granted') {
                throw new Error('Notification permission denied');
            }
        }

        console.log('subscribing to push...');
        const registration = await navigator.serviceWorker.ready;
        console.log('registration done...');
        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });
        console.log('push subscription created:', sub);
        setSubscription(sub);

        console.log('sending subscription to server...');
        const response = await fetch(`${process.env.REACT_APP_EXPRESS_BACKEND_URL}subscriber`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...sub.toJSON(),
                username: user
            }),
        });
        console.log('server response:', response.status);
        return sub;
    }, [permission, requestPermission]);

    const unsubscribe = useCallback(async () => {
        if (!subscription) return;

        await subscription.unsubscribe();

        await fetch(`${process.env.REACT_APP_EXPRESS_BACKEND_URL}unsubscriber`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ endpoint: subscription.endpoint }),
        });

        setSubscription(null);
    }, [subscription]);

    const notifyAddRemoveTerm = async () => {
        await fetch(`${process.env.REACT_APP_EXPRESS_BACKEND_URL}notifyAddRemoveTerm`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ update: "Term has been updated or removed. Find out!" }),
        });

    };

    const notifyNewComment = async () => {
        await fetch(`${process.env.REACT_APP_EXPRESS_BACKEND_URL}notifyNewComment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ update: "New comment has been added to a discussion. Check it out!" }),
        });

    };

    return {
        isSupported,
        permission,
        subscription,
        requestPermission,
        subscribe,
        unsubscribe,
        notifyAddRemoveTerm,
        notifyNewComment
    };
}