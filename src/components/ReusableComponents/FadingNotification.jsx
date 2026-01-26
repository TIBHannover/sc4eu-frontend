import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const Notification = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    animation: ${props => (props.show ? fadeIn : fadeOut)} 0.5s forwards;
`;

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
