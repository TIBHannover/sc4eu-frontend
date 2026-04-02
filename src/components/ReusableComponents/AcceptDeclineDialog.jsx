import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import { colorStyled } from '../../styledComponents/styledColor';
import { SMALL_SCREEN_WIDTH } from '../../styledComponents/styledComponents';
const AcceptDeclineDialog = ({ open, onDecline, onAccept, title, message }) => {

    return (
        <Dialog
            open={open}
            onClose={onDecline}
            PaperProps={{
                sx: {
                    padding: 2,
                    [`@media (max-width:${SMALL_SCREEN_WIDTH})`]: {
                        width: '90vw',        
                        maxWidth: '90vw',     
                        minHeight: 'auto',  
                    },
                },
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={onDecline} variant='contained' style={{ backgroundColor: colorStyled.primary, color: colorStyled.onPrimary }}>
                    No thanks
                </Button>
                <Button onClick={onAccept} variant="contained" style={{ backgroundColor: colorStyled.primary, color: colorStyled.onPrimary }}>
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
