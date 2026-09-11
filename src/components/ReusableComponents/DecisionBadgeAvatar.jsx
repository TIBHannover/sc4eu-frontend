import React from 'react';
import PropTypes from 'prop-types';
import { Badge, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import UserAvatar from './UserAvatar';

const DecisionBadgeAvatar = ({ decision }) => {
    const theme = useTheme();

    return (
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={decision.choice === 'approved' ? <CheckIcon fontSize="inherit" /> : <CloseIcon fontSize="inherit" />}
            sx={{
                '.MuiBadge-badge': {
                    backgroundColor: decision.choice === 'approved' ? theme.palette.secondary.main : theme.palette.error.main,
                    color: decision.choice === 'approved' ? theme.palette.secondary.contrastText : theme.palette.error.contrastText,
                    width: 16,
                    height: 16,
                    fontSize: 12,
                    border: `1px solid ${theme.palette.divider}`
                }
            }}
        >
            <UserAvatar identifier={decision.user_id || decision.user_name} />
        </Badge>
    );
};

DecisionBadgeAvatar.propTypes = {
    decision: PropTypes.shape({
        user_id: PropTypes.string,
        user_name: PropTypes.string,
        choice: PropTypes.string
    }).isRequired
};

export default DecisionBadgeAvatar;
