import React, { useState } from 'react';
import { Box, Modal, Button, Backdrop, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ThumbUp } from '@mui/icons-material';
import { colorStyled } from '../styledComponents/styledColor';
import { MAX_WIDTH } from '../styledComponents/styledComponents';

const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '90%',
    backgroundColor: 'white',
    border: '1px solid #d9dcdd',
    borderRadius: '4px',
    overflow: 'hidden'
};

const closeBtnStyle = {
    position: 'absolute',
    top: '10px',
    right: '20px',
    fontWeight: 'bold',
    cursor: 'pointer'
};

const GoogleSurvey = () => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleModalToggle = () => {
        setOpen(!open);
    };

    const hideSpinner = () => {
        setIsLoading(false);
    };

    const getGoogleSurvey = () => {
        return (
            <iframe
                title="Survey"
                src="https://docs.google.com/forms/d/e/1FAIpQLScrlKvjAOUudSIGJ5gQnxqFccnfWeyXAWNjreauTq5ERdfKqA/viewform"
                style={{ width: '100%', height: 'calc(100% - 130px)', border: 'none', backgroundColor: '#ffffff' }}
                onLoad={hideSpinner}
            />
        );
    };

    return (
        <div>
            <StyledButton size="large" aria-label="add" onClick={handleModalToggle}>
                <ThumbUp />
                <StyledSpan>Rate Us</StyledSpan>
            </StyledButton>
            <Modal
                open={open}
                onClose={handleModalToggle}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    invisible: true,
                    onClick: null
                }}
            >
                <Box sx={style}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Survey</h2>
                    <button style={closeBtnStyle} onClick={handleModalToggle} onKeyDown={() => {}}>
                        X
                    </button>
                    {isLoading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 'calc(100% - 130px)'
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : null}
                    {getGoogleSurvey()}
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        style={{
                            marginTop: '10px',
                            marginLeft: '10px',
                            backgroundColor: colorStyled.old.darkSecondary,
                            color: colorStyled.onSecondary
                        }}
                        onClick={handleModalToggle}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default GoogleSurvey;

const StyledButton = styled(Button)`
    display: flex;
    justify-content: space-around;
    right: 60px;
    min-width: 150px;
    background-color: ${colorStyled.tertiary};
    color: ${colorStyled.onTertiary};
    color: white;
    border-radius: 4px;

    @media (max-width: 1300px) {
        right: 50px;
        min-width: 50px;
    }

    :hover {
        background-color: ${colorStyled.tertiaryContainer};
        color: ${colorStyled.onTertiaryContainer};
    }
`;

const StyledSpan = styled('span')`
    display: block;

    @media (max-width: 1300px) {
        display: none;
    }
`;
