import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { colorStyled } from '../styledComponents/styledColor';

const DeleteConfirmationDialog = ({
    open,
    onClose,
    onConfirm,
    title = 'Delete Confirmation',
    contentText,
    confirmButtonText = 'Delete',
    cancelButtonText = 'Cancel'
}) => (
    <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
            style: {
                backgroundColor: colorStyled.surfaceContainerHigh,
                borderRadius: '12px',
                padding: '8px'
            }
        }}
    >
        <DialogTitle style={{ color: colorStyled.onSurface, fontWeight: 'bold' }}>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText style={{ color: colorStyled.onSurfaceVariant }}>{contentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button
                onClick={onClose}
                style={{
                    color: colorStyled.primary,
                    textTransform: 'none'
                }}
            >
                {cancelButtonText}
            </Button>
            <Button
                onClick={onConfirm}
                style={{
                    backgroundColor: colorStyled.error,
                    color: colorStyled.onError,
                    textTransform: 'none'
                }}
                variant="contained"
            >
                {confirmButtonText}
            </Button>
        </DialogActions>
    </Dialog>
);

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
