import React, { useState } from 'react';
import { Box, Modal, Button } from '@mui/material';
import { ThumbUp } from '@mui/icons-material';
import { colorStyled } from '../styledComponents/styledColor';

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

    const handleModalToggle = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Button
                variant="extended"
                size="large"
                aria-label="add"
                onClick={handleModalToggle}
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    right: '60px',
                    minWidth: '150px',
                    backgroundColor: '#ee7356',
                    color: 'white',
                    borderRadius: '4px'
                }}
            >
                <ThumbUp />
                Rate Us
            </Button>
            <Modal open={open} onClose={handleModalToggle}>
                <Box sx={style}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Survey</h2>
                    <span style={closeBtnStyle} onClick={handleModalToggle}>
                        X
                    </span>
                    <iframe
                        title="Survey"
                        src="https://docs.google.com/forms/d/e/1FAIpQLScrlKvjAOUudSIGJ5gQnxqFccnfWeyXAWNjreauTq5ERdfKqA/viewform"
                        style={{ width: '100%', height: 'calc(100% - 130px)', border: 'none', backgroundColor: '#ffffff' }}
                    />
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        style={{
                            marginTop: '10px',
                            marginLeft: '10px',
                            backgroundColor: colorStyled.SECONDARY.dark
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
