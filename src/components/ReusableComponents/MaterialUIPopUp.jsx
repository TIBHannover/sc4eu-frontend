import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PropTypes from "prop-types";

const MaterialUIPopUp = ({ open, onClose, title, message }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    minHeight: '70%',
                    maxHeight: '70%',
                    minWidth: '80%',
                    maxWidth: '80%',
                }
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

MaterialUIPopUp.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.element.isRequired
};

export const MaterialUIPopUpTypes = {
    HISTORY: 'history',
    DISCUSSIONS: 'discussions'
};

export default MaterialUIPopUp;
