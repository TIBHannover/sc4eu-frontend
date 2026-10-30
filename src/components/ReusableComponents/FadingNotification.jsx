import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Notification } from 'styledComponents/styledComponents';

const FadingNotification = ({ message, timeout }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, timeout);

        return () => clearTimeout(timer);
    }, [timeout]);

    return show ? <Notification show={show}>{message}</Notification> : null;
};

export default FadingNotification;

FadingNotification.propTypes = {
    message: PropTypes.string.isRequired,
    timeout: PropTypes.number.isRequired,
}
