import { IconButton, Tooltip, Typography } from '@mui/material';
import { usePushNotifications } from '../../hooks/usePushNotifications';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import React from 'react';

export const NotificationToggle = ({ user }) => {
    const { subscribe, unsubscribe, subscription, error, clearError } = usePushNotifications(user);
    const isSubscribed = !!subscription;

    const handleToggle = async () => {
        clearError();
        if (!isSubscribed) {
            await subscribe();
        } else {
            await unsubscribe();
        }
    };

    const label = error || (!isSubscribed ? 'Enable notifications' : 'Disable notifications');

    return (
        <Tooltip title={<Typography variant='body2'>{label}</Typography>}>
            <IconButton onClick={handleToggle} aria-label={label} color={error ? 'error' : 'default'}>
                {!isSubscribed ? <NotificationsOffOutlinedIcon /> : <NotificationsActiveOutlinedIcon />}
            </IconButton>
        </Tooltip>
    );
};
