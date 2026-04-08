// NotificationManager.jsx
import { usePushNotifications } from '../hooks/usePushNotifications';
import AcceptDeclineDialog from '../components/ReusableComponents/AcceptDeclineDialog';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { isPushSupported } from '../utils/pushNotifications';

export const NotificationManager = ({ user }) => {
    const { subscribe } = usePushNotifications(user);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        if (user && isPushSupported() && Notification.permission === 'default') {
            setTimeout(() => setShowPrompt(true), 3000);
        }
    }, [user]);

    return (
        <AcceptDeclineDialog
            title="Grant access to show notifications"
            message="Would you like to receive notifications about activity?"
            open={showPrompt}
            onAccept={async () => {
                await subscribe();
                setShowPrompt(false);
            }}
            onDecline={() => setShowPrompt(false)}
        >
        </AcceptDeclineDialog>
    );
};

NotificationManager.propTypes = {
    user: PropTypes.string.isRequired
}