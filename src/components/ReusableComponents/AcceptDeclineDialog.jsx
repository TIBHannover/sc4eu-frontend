import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import { colorStyled } from '../../styledComponents/styledColor';

const AcceptDeclineDialog = ({ open, onDecline, onAccept, title, message }) => {

    return (
        <Dialog
            open={open}
            onClose={onDecline}
            fullWidth
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={onDecline} variant='contained' style={{ backgroundColor: colorStyled.SECONDARY.dark }}>
                    No thanks
                </Button>
                <Button onClick={onAccept} variant="contained" style={{ backgroundColor: colorStyled.SECONDARY.dark }}>
                    Yes please
                </Button>
            </DialogActions>
        </Dialog >
    );
};

AcceptDeclineDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onDecline: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.element.isRequired
};


export default AcceptDeclineDialog;
