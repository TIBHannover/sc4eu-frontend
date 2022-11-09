import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import success from '../assets/images/success.png';
import error from '../assets/images/error.png';
import styled from 'styled-components';
import { PRIMARY } from '../styledComponents/styledComponents';
import { getEmailVerify } from '../network/UserProfileCalls';
import { editUserModal } from '../network/UserProfileCalls';
import PopUp from '../components/PopUp';

const EmailVerify = () => {
    const [message, setMessage] = useState('');
    const [openPopUp, setPopUp] = useState(true);
    const [image, setImage] = useState('');
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                getEmailVerify(param.user_id, param.token).then(data => {
                    if (data.success === true) {
                        editUserModal({ uuid: param.user_id, is_email_valid: true }).then(response => {
                            console.log(response);
                            if (response.result === true) {
                                setMessage('Email verified successfully');
                                setImage(success);
                            } else {
                                setMessage('Something went wrong please try again');
                                setImage(error);
                            }
                        });
                    } else {
                        setMessage(data.error);
                        setImage(error);
                    }
                });
            } catch (error) {
                setMessage('Something went wrong please try again');
                setImage(error);
            }
        };
        verifyEmailUrl();
    }, [param]);

    return (
        <StyledDiv style={{ backgroundColor: PRIMARY.lighter, height: '100%' }}>
            <PopUp open={openPopUp} onClose={() => setPopUp(false)} image={image} message={message} />
            {!openPopUp ? <Redirect to="/" /> : <div />}
        </StyledDiv>
    );
};

export default EmailVerify;

const StyledDiv = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
