import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import { colorStyled } from '../../styledComponents/styledColor';

const MaterialUIPopUp = ({ open, onClose, title, message, paperSizeStyles }) => {
    const defaultPaperSizeStyles = {
        minHeight: '70%',
        maxHeight: '70%',
        minWidth: '80%',
        maxWidth: '80%'
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    ...defaultPaperSizeStyles,
                    ...paperSizeStyles
                }
            }}
            //should be used instead of PaperProps, after material-ui version update
            // slotProps={{
            //     paper: {
            //         style: {
            //             ...defaultPaperSizeStyles,
            //             ...paperSizeStyles
            //         }
            //     }
            // }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button variant="contained" onClick={onClose} style={{ backgroundColor: colorStyled.SECONDARY.dark }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

MaterialUIPopUp.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.element.isRequired,
    paperSizeStyles: PropTypes.object
};

export const MaterialUIPopUpTypes = {
    HISTORY: 'history',
    DISCUSSIONS: 'discussions'
};

export default MaterialUIPopUp;
