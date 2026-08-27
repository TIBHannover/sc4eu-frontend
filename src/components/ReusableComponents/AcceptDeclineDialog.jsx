import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { SMALL_SCREEN_WIDTH } from '../../styledComponents/styledComponents';
const AcceptDeclineDialog = ({ open, onDecline, onAccept, title, message }) => {
    const theme = useTheme();
    
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
                <Button onClick={onDecline} variant='contained' style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText }}>
                    No thanks
                </Button>
                <Button onClick={onAccept} variant="contained" style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText }}>
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
