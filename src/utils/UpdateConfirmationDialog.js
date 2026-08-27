import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const UpdateConfirmationDialog = ({
    open,
    onClose,
    onConfirm,
    title = 'Update Confirmation',
    contentText,
    confirmButtonText = 'Update',
    cancelButtonText = 'Cancel'
}) => {

    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    backgroundColor: theme.palette.background.default,
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
                        color: theme.palette.primary.main,
                        textTransform: 'none'
                    }}
                >
                    {cancelButtonText}
                </Button>
                <Button
                    onClick={onConfirm}
                    style={{
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.primary.main,
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

UpdateConfirmationDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string,
    contentText: PropTypes.string.isRequired,
    confirmButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string
};

export default UpdateConfirmationDialog;
