import { Dialog, DialogContent, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

const MaterialUIPopUp = ({ open, onClose, message, type, fullHeight }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    minWidth: { xs: '95%', lg: '80%' },
                    maxWidth: { xs: '95%', lg: '80%' },
                    minHeight: { xs: '95%', lg: '80%' },
                    maxHeight: { xs: '95%', lg: '80%' }
                }
            }}
        >
            <DialogContent
                sx={
                    fullHeight
                        ? {
                              flex: '1 1 auto',
                              minHeight: 0,
                              display: 'flex',
                              flexDirection: 'column',
                              p: 0
                          }
                        : undefined
                }
            >
                {message}
            </DialogContent>
            {!fullHeight && (
                <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 0, top: 0 }}>
                    <CloseIcon />
                </IconButton>
            )}
        </Dialog>
    );
};

MaterialUIPopUp.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.element.isRequired,
    type: PropTypes.string.isRequired,
    fullHeight: PropTypes.bool
};

MaterialUIPopUp.defaultProps = {
    fullHeight: false
};

export const MaterialUIPopUpTypes = {
    HISTORY: 'history',
    DISCUSSIONS: 'discussions',
    ACTIVE_CONSENSUS: 'active_consensus',
    TERM_DETAILS: 'term_details'
};

export default MaterialUIPopUp;
