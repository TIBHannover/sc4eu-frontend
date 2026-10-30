import React from 'react';
import PropTypes from 'prop-types';
import { Badge, useTheme } from '@mui/material';
import { ThumbUp, ThumbDown, BackHand, Help } from '@mui/icons-material';
import UserAvatar from './UserAvatar';

const getDecisionStyle = (choice, theme) => {
    switch (choice) {
        case 'approved':
            return {
                icon: <ThumbUp color="success" fontSize="inherit" />
            };
        case 'abstain':
            return {
                icon: <BackHand color="action" fontSize="inherit" />
            };
        case 'rejected':
            return {
                icon: <ThumbDown color="error" fontSize="inherit" />
            };
        default:
            return {
                icon: <Help color="disabled" fontSize="inherit" />
            };
    }
};

const DecisionBadgeAvatar = React.forwardRef(({ decision, ...props }, ref) => {
    const theme = useTheme();
    const style = getDecisionStyle(decision.choice, theme);

    return (
        <Badge
            ref={ref}
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={style.icon}
            sx={{
                '.MuiBadge-badge': {
                    fontSize: 20
                }
            }}
            {...props}
        >
            <UserAvatar identifier={decision.user_uuid || decision.user_name} />
        </Badge>
    );
});

DecisionBadgeAvatar.displayName = 'DecisionBadgeAvatar';

DecisionBadgeAvatar.propTypes = {
    decision: PropTypes.shape({
        user_uuid: PropTypes.string,
        user_name: PropTypes.string,
        choice: PropTypes.string
    }).isRequired
};

export default DecisionBadgeAvatar;
