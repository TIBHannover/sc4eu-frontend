import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
import BoringAvatar from 'boring-avatars';

const UserAvatar = ({ identifier, size, style, className }) => {
    const theme = useTheme();

    const beamColors = [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.tertiary.main,
        theme.palette.primary.light,
        theme.palette.tertiary.light
    ];

    const mergedStyle = { marginRight: 8, ...style };

    return (
        <BoringAvatar
            size={size}
            name={identifier || 'unknown-user'}
            variant="beam"
            colors={beamColors}
            style={mergedStyle}
            className={className}
        />
    );
};

UserAvatar.propTypes = {
    identifier: PropTypes.string,
    size: PropTypes.number,
    style: PropTypes.object,
    className: PropTypes.string
};

UserAvatar.defaultProps = {
    identifier: '',
    size: 40,
    style: undefined,
    className: undefined
};

export default UserAvatar;
