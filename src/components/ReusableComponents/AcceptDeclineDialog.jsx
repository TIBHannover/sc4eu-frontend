import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import { colorStyled } from '../../styledComponents/styledColor';

const AcceptDeclineDialog = ({ open, onDecline, onAccept, title, message, paperSizeStyles }) => {
    const defaultPaperSizeStyles = {
        minHeight: '20%',
        maxHeight: '20%',
        minWidth: '20%',
        maxWidth: '20%'
    };

    return (
        <Dialog
            open={open}
            onClose={onDecline}
            PaperProps={{
                style: {
                    ...defaultPaperSizeStyles,
                    ...paperSizeStyles
                }
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button onClick={onDecline} style={{ backgroundColor: colorStyled.SECONDARY.dark }}>
                    No thanks
                </Button>
                <Button onClick={onAccept} variant="contained" style={{ backgroundColor: colorStyled.SECONDARY.dark }}>
                    Yes please
                </Button>
            </DialogActions>
        </Dialog>
    );
};

AcceptDeclineDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onDecline: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.element.isRequired,
    paperSizeStyles: PropTypes.object
};


export default AcceptDeclineDialog;
