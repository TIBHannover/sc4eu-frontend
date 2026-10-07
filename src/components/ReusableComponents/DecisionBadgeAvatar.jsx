import React from 'react';
import PropTypes from 'prop-types';
import { Badge, useTheme } from '@mui/material';
import { ThumbUp, ThumbDown, BackHand, Help } from '@mui/icons-material';
import UserAvatar from './UserAvatar';

const getDecisionStyle = (choice, theme) => {
    switch (choice) {
        case 'approved':
            return {
                icon: <ThumbUp fontSize="inherit" />,
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText
            };
        case 'abstain':
            return {
                icon: <BackHand fontSize="inherit" />,
                backgroundColor: theme.palette.tertiary.main,
                color: theme.palette.tertiary.contrastText
            };
        case 'rejected':
            return {
                icon: <ThumbDown fontSize="inherit" />,
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText
            };
        default:
            return {
                icon: <Help fontSize="inherit" />,
                backgroundColor: theme.palette.outline.variant,
                color: theme.palette.text.secondary
            };
    }
};

const DecisionBadgeAvatar = ({ decision }) => {
    const theme = useTheme();
    const style = getDecisionStyle(decision.choice, theme);

    return (
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={style.icon}
            sx={{
                '.MuiBadge-badge': {
                    backgroundColor: style.backgroundColor,
                    color: style.color,
                    width: 16,
                    height: 16,
                    fontSize: 12,
                    border: `1px solid ${theme.palette.divider}`
                }
            }}
        >
            <UserAvatar identifier={decision.user_uuid || decision.user_name} />
        </Badge>
    );
};

DecisionBadgeAvatar.propTypes = {
    decision: PropTypes.shape({
        user_uuid: PropTypes.string,
        user_name: PropTypes.string,
        choice: PropTypes.string
    }).isRequired
};

export default DecisionBadgeAvatar;
