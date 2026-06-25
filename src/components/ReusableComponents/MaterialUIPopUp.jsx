import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const MaterialUIPopUp = ({ open, onClose, title, message, type }) => {
    const theme = useTheme();
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
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            {type !== MaterialUIPopUpTypes.ACTIVE_CONSENSUS && (
                <DialogActions style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button variant="contained" onClick={onClose} style={{ backgroundColor: theme.palette.secondary.main }}>
                        Close
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

MaterialUIPopUp.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.element.isRequired,
    paperSizeStyles: PropTypes.object,
    type: PropTypes.string.isRequired
};

export const MaterialUIPopUpTypes = {
    HISTORY: 'history',
    DISCUSSIONS: 'discussions',
    ACTIVE_CONSENSUS: 'active_consensus'
};

export default MaterialUIPopUp;
