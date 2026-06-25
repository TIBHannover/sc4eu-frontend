import { IconButton, Tooltip, Typography, useMediaQuery , useTheme, } from '@mui/material';
import { usePushNotifications } from '../../hooks/usePushNotifications';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import { SMALL_SCREEN_WIDTH } from 'styledComponents/styledComponents';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

export const NotificationToggle = ({ user }) => {
    const theme = useTheme();
    const { subscribe, unsubscribe, subscription, error, clearError } = usePushNotifications(user);
    const isSubscribed = !!subscription;
    const isMobile = useMediaQuery(`(max-width:${SMALL_SCREEN_WIDTH})`);
    const mobileNotificationError = (
        <>
            <ErrorOutlineOutlinedIcon />
            Notifications blocked. Reset in browser site settings.
        </>
    );

    const fullError = (
        <>
            <ErrorOutlineOutlinedIcon />
            {error}
        </>
    );

    const handleToggle = async () => {
        if (!isSubscribed) {
            await subscribe();
        } else {
            await unsubscribe();
        }
    };

    return (
        <>
            {error && (
                <Tooltip title="click to remove">
                    <Typography onClick={clearError} sx={{ zIndex: 1000, color: theme.palette.error.contrastText, cursor: 'pointer' }}>
                        {isMobile ? mobileNotificationError : fullError}
                    </Typography>
                </Tooltip>
            )}
            <Tooltip title={!isSubscribed ? 'Enable notifications' : 'Disable notifications'}>
                <IconButton onClick={handleToggle}>
                    {!isSubscribed ? <ToggleOffOutlinedIcon sx={{ fontSize: 35 }} /> : <ToggleOnOutlinedIcon sx={{ fontSize: 35 }} />}
                </IconButton>
            </Tooltip>
        </>
    );
};
