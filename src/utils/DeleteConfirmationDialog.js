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
                backgroundColor: colorStyled.old.light,
                borderRadius: '12px',
                padding: '8px'
            }
        }}
    >
        <DialogTitle style={{ color: colorStyled.old.darkSecondary, fontWeight: 'bold' }}>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText style={{ color: colorStyled.old.darkerSecondary }}>{contentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button
                onClick={onClose}
                style={{
                    color: colorStyled.old.darkerSecondary,
                    textTransform: 'none'
                }}
            >
                {cancelButtonText}
            </Button>
            <Button
                onClick={onConfirm}
                style={{
                    backgroundColor: colorStyled.old.darkSecondary,
                    color: colorStyled.onSecondary,
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
