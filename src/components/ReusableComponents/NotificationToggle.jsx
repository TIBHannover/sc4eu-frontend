import { IconButton, Tooltip } from "@mui/material";
import { usePushNotifications } from "../../hooks/usePushNotifications"
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';

export const NotificationToggle = ({ user }) => {
    const { subscribe, unsubscribe, subscription } = usePushNotifications(user);
    const isSubscribed = !!subscription;

    const handleToggle = async () => {
        if (!isSubscribed) {
            await subscribe();
        } else {
            await unsubscribe();
        }
    }

    return (
        <Tooltip title={!isSubscribed ? 'Enable notifications' : 'Disable notifications'}>
            <IconButton onClick={handleToggle}>
                {!isSubscribed ? <ToggleOffOutlinedIcon sx={{ fontSize: 35 }} /> : <ToggleOnOutlinedIcon sx={{ fontSize: 35 }}/>}
            </IconButton>
        </Tooltip>
    )
}