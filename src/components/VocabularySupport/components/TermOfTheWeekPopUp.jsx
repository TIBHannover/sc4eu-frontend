import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton, CircularProgress, TextField, useTheme } from '@mui/material';
import { Cancel as RejectedIcon, ThumbUpAltOutlined, ThumbDownAltOutlined } from '@mui/icons-material';
import { updateExpertDecision } from '../../../network/TermVoteCalls';

/**
 * Props
 * -----
 * term          : object | null   // the term data returned by /api/v1/term-of-week
 * open          : boolean        // whether the dialog is visible
 * onClose       : () => void     // called when the user closes the dialog (or after a successful vote)
 * onVote        : (choice) => void // called when user votes (agree/disagree)
 */
const TermOfWeekPopup = ({ term, username, open, onLoading, onClose, onVote }) => {
    const theme = useTheme();

    const approvedCount = term.decisions.filter(e => e.choice === 'approved').length;
    const rejectedCount = term.decisions.filter(e => e.choice === 'rejected').length;
    const votedUsers = term.decisions.filter(expert => expert.choice !== null);
    const totalVotes = term.decisions.filter(e => e.choice !== null).length;

    const [comment, setComment] = useState(null);

    const [loadingDecision, setLoadingDecision] = useState(null);

    if (!term || !open) return null;

    const handleWeekVote = async decision => {
        setLoadingDecision(decision);
        try {
            const res = await updateExpertDecision(term.identifier, term.vote_uuid, username, decision, comment);
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (res.success) {
                onVote();
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoadingDecision(null);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                sx={{
                    '.MuiDialog-paper': {
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        bgcolor: theme.palette.background.paper
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        px: 3,
                        py: 2
                    }}
                >
                    <Box display="flex" alignItems="center">
                        <Typography variant="h6" fontWeight="bold" color="inherit">
                            Term of the Week
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={handleClose}
                        size="small"
                        sx={{
                            color: theme.palette.primary.main,
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' }
                        }}
                    >
                        <RejectedIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers sx={{ p: 3 }}>
                    <Box mb={2}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom color={theme.palette.text.primary}>
                            {term.label || 'What do you think?'}
                        </Typography>

                        {term.description && (
                            <Typography variant="body1" color={theme.palette.text.primary} paragraph>
                                {term.description}
                            </Typography>
                        )}
                    </Box>

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        gap={2}
                        sx={{
                            bgcolor: theme.palette.background.default,
                            border: `1px solid ${theme.palette.divider}`,
                            p: 2,
                            borderRadius: '8px',
                            mb: 3
                        }}
                    >
                        <Typography variant="body1" paragraph>
                            <strong>Consensus progress:</strong> {totalVotes} people voted
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {approvedCount} agree • {rejectedCount} not agree
                        </Typography>
                    </Box>

                    <Typography variant="body2" color={theme.palette.text.primary} align="center" mb={2}>
                        Just 1 click to vote
                    </Typography>

                    <Box sx={{ 
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary
                    }}>
                        <TextField
                            label="Comment (Optional)"
                            multiline
                            rows={3}
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            fullWidth
                            variant="outlined"
                            size="small"
                            disabled={loadingDecision !== null}
                        />
                    </Box>
                </DialogContent>

                <DialogActions
                    sx={{
                        justifyContent: 'center',
                        p: 2,
                        gap: 2
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleWeekVote('approved');
                        }}
                        disabled={loadingDecision !== null}
                        startIcon={loadingDecision === 'approved' ? <CircularProgress size={18} color="inherit" /> : <ThumbUpAltOutlined />}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontWeight: 'bold',
                            bgcolor: theme.palette.secondary.main,
                            '&:hover': {
                                bgcolor: `${theme.palette.secondary.main}BF`,
                            }
                        }}
                    >
                        Agree
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={loadingDecision === 'rejected' ? <CircularProgress size={18} color="inherit" /> : <ThumbDownAltOutlined />}
                        onClick={() => {
                            handleWeekVote('rejected');
                        }}
                        disabled={loadingDecision !== null}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontWeight: 'bold',
                            bgcolor: theme.palette.error.main,
                            '&:hover': { bgcolor: `${theme.palette.error.main}BF`, color: theme.palette.error.contrastText }
                        }}
                    >
                        Not Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TermOfWeekPopup;
