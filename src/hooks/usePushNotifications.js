import { useState, useEffect, useCallback } from 'react';
import { isPushSupported } from '../utils/pushNotifications';
import PropTypes from 'prop-types';

const VAPID_PUBLIC_KEY = process.env.REACT_APP_VAPID_PUBLIC_KEY;

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replaceAll('-', '+').replaceAll('_', '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.codePointAt(i);
    }
    return outputArray;
}

export function usePushNotifications(user) {
    const [permission, setPermission] = useState(Notification.permission);
    const [subscription, setSubscription] = useState(null);
    const [isSupported, setIsSupported] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const supported = isPushSupported();
        setIsSupported(supported);

        if (supported) {
            // Get existing subscription
            navigator.serviceWorker.ready.then(registration => {
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
            setError(
                'Notifications are blocked. Click the lock icon in your ' + 'browser address bar and reset notification permission, then try again.'
            );
            return;
        }

        if (permission !== 'granted') {
            try {
                const result = await requestPermission();
                setPermission(result);

                if (result === 'default') {
                    setError('Notification prompt was blocked by your browser.');
                    return;
                }
                if (result === 'denied') {
                    setError('Notifications were denied. Click the lock icon in your ' + 'browser address bar to reset permission.');
                    return;
                }
            } catch (err) {
                setError('Could not request notification permission.');
                console.error(err);
                return;
            }
        }

        const registration = await navigator.serviceWorker.ready;
        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
        });
        setSubscription(sub);

        await fetch(`${process.env.REACT_APP_EXPRESS_BACKEND_URL}subscriber`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...sub.toJSON(),
                username: user
            })
        });
        return sub;
    }, [permission, requestPermission]);

    const unsubscribe = useCallback(async () => {
        if (!subscription) return;

        await subscription.unsubscribe();

        await fetch(`${process.env.REACT_APP_EXPRESS_BACKEND_URL}unsubscriber`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ endpoint: subscription.endpoint })
        });

        setSubscription(null);
    }, [subscription]);

    const notifyTermUpdate = async (term_uuid, term_label, payload) => {
        let notification_title = `Term ${term_label} has been added!`;
        let notification_body = 'Click to see';
        const type = payload.header.split(' ')[0];
        if (type === 'Delete') {
            notification_title = `Term ${term_label} has been removed!`;
            notification_body = 'You will find it in a recently deleted terms tab';
        }
        if (type === 'Update') {
            notification_title = `Term ${term_label} has been updated!`;
        }
        await fetch(`${process.env.REACT_APP_EXPRESS_BACKEND_URL}notifyTermUpdate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: notification_title,
                body: notification_body,
                update_type: type,
                term_uuid: term_uuid
            })
        });
    };

    const notifyNewComment = async (resourceId, mentionedUsers) => {
        await fetch(`${process.env.REACT_APP_EXPRESS_BACKEND_URL}notifyNewComment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'New comment has been added to a discussion. Check it out!',
                term_uuid: resourceId,
                mentioned_user_names: mentionedUsers
            })
        });
    };

    return {
        isSupported,
        permission,
        subscription,
        error,
        clearError: () => setError(null),
        requestPermission,
        subscribe,
        unsubscribe,
        notifyTermUpdate,
        notifyNewComment
    };
}

usePushNotifications.propTypes = {
    user: PropTypes.string.isRequired
};
