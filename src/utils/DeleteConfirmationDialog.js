import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, useTheme } from '@mui/material';

const DeleteConfirmationDialog = ({
    open,
    onClose,
    onConfirm,
    title = 'Delete Confirmation',
    contentText,
    confirmButtonText = 'Delete',
    cancelButtonText = 'Cancel'
}) => {

    const theme = useTheme();
    
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: '12px',
                    padding: '8px'
                }
            }}
        >
            <DialogTitle style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText style={{ color: theme.palette.primary.main }}>{contentText}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        textTransform: 'none'
                    }}
                >
                    {cancelButtonText}
                </Button>
                <Button
                    onClick={onConfirm}
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        textTransform: 'none'
                    }}
                    variant="contained"
                >
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

DeleteConfirmationDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string,
    contentText: PropTypes.string.isRequired,
    confirmButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string
};

export default DeleteConfirmationDialog;
