import MaterialUIPopUp from '../../ReusableComponents/MaterialUIPopUp';
import { Box, Chip, GlobalStyles, LinearProgress, Paper, Typography, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
import UserAvatar from '../../ReusableComponents/UserAvatar';
import ClampLines from 'react-clamp-lines';
import React from 'react';
import PropTypes from 'prop-types';

const getDecisionDisplay = choice => {
    switch (choice) {
        case 'approved':
            return {
                icon: <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />,
                label: 'agree'
            };
        case 'rejected':
            return {
                icon: <CancelIcon sx={{ fontSize: 16, color: 'error.main' }} />,
                label: 'not agree'
            };
        case 'abstain':
            return {
                icon: <BackHandOutlinedIcon sx={{ fontSize: 16, color: 'action' }} />,
                label: 'undecided'
            };
        default:
            return {
                icon: null,
                label: 'unknown'
            };
    }
};

const LastConsensusView = ({ term, consensus, open, onClose }) => {
    const theme = useTheme();

    const abstainCount = consensus.decisions?.filter(decision => decision.choice === 'abstain').length || 0;
    const approvalPercentage = (consensus.approved_decisions / consensus.total_decisions) * 100;
    const consensusPassed = consensus.status === 'accept';
    return (
        <MaterialUIPopUp
            open={open}
            onClose={onClose}
            message={
                <Box
                    sx={{
                        p: 3,
                        bgcolor: theme.palette.background.paper,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        borderRadius: 1
                    }}
                >
                    <Box>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {term.label}
                        </Typography>

                        <GlobalStyles
                            styles={{
                                '.clamp-lines__button': {
                                    color: theme.palette.primary.main,
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer',
                                    fontWeight: 500
                                }
                            }}
                        />
                        <Box
                            sx={{
                                backgroundColor: theme.palette.background.default,
                                borderLeft: `4px solid ${theme.palette.secondary.main}`,
                                borderRadius: 1,
                                p: 1.5,
                                mb: 1.5
                            }}
                        >
                            <Typography variant="body1" component="div" sx={{ color: theme.palette.text.primary, lineHeight: 1.5 }}>
                                <ClampLines text={term.description} id="last-consensus-description" lines={3} />
                            </Typography>
                        </Box>

                        <Divider
                            sx={{
                                bgcolor: consensusPassed ? 'success' : 'error',
                                height: 2,
                                mb: 1
                            }}
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <Chip
                                icon={consensusPassed ? <CheckCircleIcon /> : <CancelIcon />}
                                label={consensusPassed ? 'Consensus Accepted' : 'Consensus Not Accepted'}
                                color={consensusPassed ? 'success' : 'error'}
                                size="small"
                                sx={{ fontWeight: 600 }}
                            />
                        </Box>
                    </Box>

                    <Paper
                        variant="outlined"
                        sx={{
                            backgroundColor: theme.palette.background.default,
                            p: 2,
                            borderRadius: 1,
                            borderColor: 'divider'
                        }}
                    >
                        <Typography variant="body1" paragraph>
                            <strong>Consensus progress:</strong> {consensus.total_decisions} people voted
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={approvalPercentage}
                            sx={{
                                height: 8,
                                borderRadius: 1,
                                bgcolor: 'grey.300',
                                mb: 1,
                                '.MuiLinearProgress-bar': {
                                    bgcolor: consensus.total_decisions === 0 ? 'grey.500' : 'success.main'
                                }
                            }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            {consensus.approved_decisions} agree • {consensus.rejected_decisions} not agree • {abstainCount} undecided
                        </Typography>
                    </Paper>

                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider',
                            backgroundColor: theme.palette.background.default
                        }}
                    >
                        <Typography variant="subtitle1" gutterBottom>
                            Created By
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                            <UserAvatar identifier={consensus.assignee_uuid} />
                            <Typography variant="body2" fontWeight={500}>
                                {consensus.assignee}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                                {new Date(consensus.created_at).toLocaleString()}
                            </Typography>
                        </Box>

                        {consensus.reason && (
                            <Typography
                                variant="body2"
                                sx={{
                                    mt: 1,
                                    fontStyle: 'italic',
                                    color: theme.palette.text.primary
                                }}
                            >
                                “{consensus.reason}”
                            </Typography>
                        )}
                    </Paper>

                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            borderRadius: 1,
                            borderColor: 'divider',
                            backgroundColor: theme.palette.background.default,
                            maxHeight: 300,
                            overflow: 'auto'
                        }}
                    >
                        <Typography variant="subtitle1" gutterBottom>
                            Votes
                        </Typography>

                        {consensus.decisions?.length > 0 ? (
                            consensus.decisions.map((decision, idx) => {
                                const { icon, label } = getDecisionDisplay(decision.choice);

                                return (
                                    <Box
                                        key={`${decision.vote_id}-${decision.user_id}`}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1,
                                            p: 1.5,
                                            borderBottom: idx < consensus.decisions.length - 1 ? '1px solid' : 'none',
                                            borderColor: 'divider',
                                            '&:hover': {
                                                backgroundColor: 'action.hover'
                                            },
                                            '&:last-child': {
                                                borderBottom: 'none'
                                            }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <UserAvatar identifier={decision.user_uuid} />
                                            <Typography variant="body2" fontWeight={500}>
                                                {decision.user_name}
                                            </Typography>
                                            {icon}
                                            <Typography variant="body2">{label}</Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                                                {new Date(decision.updated_at).toLocaleString()}
                                            </Typography>
                                        </Box>

                                        {decision.comment && (
                                            <Box
                                                sx={{
                                                    pl: 4.5,
                                                    borderLeft: '2px solid',
                                                    borderColor: theme.palette.divider,
                                                    ml: 1
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        mt: 0.5,
                                                        fontStyle: 'italic',
                                                        color: theme.palette.text.primary
                                                    }}
                                                >
                                                    “{decision.comment}”
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                );
                            })
                        ) : (
                            <Typography variant="body2" color="text.disabled" sx={{ p: 1 }}>
                                No votes submitted
                            </Typography>
                        )}
                    </Paper>
                </Box>
            }
            paperSizeStyles={{
                minHeight: '89%',
                maxHeight: '89%',
                minWidth: '80%',
                maxWidth: '80%'
            }}
        />
    );
};

LastConsensusView.propTypes = {
    term: PropTypes.object.isRequired,
    consensus: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default LastConsensusView;
