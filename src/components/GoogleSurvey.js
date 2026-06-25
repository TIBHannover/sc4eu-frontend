import React, { useState } from 'react';
import { Box, Modal, Button, Backdrop, CircularProgress, useTheme } from '@mui/material';
import { ThumbUp } from '@mui/icons-material';
import { StyledButton, StyledSpan } from 'styledComponents/styledComponents';
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
    const theme = useTheme();
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
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.secondary.contrastText
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


