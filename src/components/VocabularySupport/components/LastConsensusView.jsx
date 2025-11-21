import MaterialUIPopUp from '../../ReusableComponents/MaterialUIPopUp';
import { Box, Chip, LinearProgress, Paper, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from './CommentsSection';
import React from 'react';
import PropTypes from 'prop-types';
import { colorStyled } from '../../../styledComponents/styledColor';

const LastConsensusView = ({ consensus, open, onClose }) => {

    const approvalPercentage = (consensus.approved_decisions / consensus.rejected_decisions) * 100;
    const consensusPassed = consensus.status === "accept";

    return (
        <MaterialUIPopUp
            open={open}
            onClose={onClose}
            message={
                <Box
                    sx={{
                        p: 3,
                        bgcolor: colorStyled.CONTAINER_BACKGROUND_COLOR,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        borderRadius: 1
                    }}
                >
                    <Box>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {consensus.label}
                        </Typography>

                        <Divider
                            sx={{
                                bgcolor: consensus.type === 'accept' ? 'success.main' : 'error.main',
                                height: 2,
                                mb: 1
                            }}
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    color:
                                        consensus.type === 'accept'
                                            ? 'success.dark'
                                            : 'error.dark',
                                    fontWeight: 500,
                                    textTransform: 'uppercase',
                                    letterSpacing: 0.5
                                }}
                            >
                                {consensus.type === 'accept'
                                    ? '→ Accept Proposal'
                                    : '→ Not Accept Proposal'}
                            </Typography>

                            <Chip
                                icon={
                                    consensusPassed ? <CheckCircleIcon /> : <CancelIcon />
                                }
                                label={
                                    consensusPassed
                                        ? 'Consensus Accepted'
                                        : 'Consensus Not Accepted'
                                }
                                color={consensusPassed ? 'success' : 'error'}
                                size="small"
                                sx={{ fontWeight: 600 }}
                            />
                        </Box>
                    </Box>

                    <Paper
                        variant="outlined"
                        sx={{
                            backgroundColor: colorStyled.PRIMARY.lighter,
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
                                '& .MuiLinearProgress-bar': {
                                    bgcolor: consensus.total_decisions === 0
                                        ? 'grey.500'
                                        : 'success.main',
                                }
                            }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            {consensus.approved_decisions} agree • {consensus.rejected_decisions} not agree
                        </Typography>
                    </Paper>

                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider',
                            backgroundColor: colorStyled.CONTAINER_BACKGROUND_COLOR
                        }}
                    >
                        <Typography variant="subtitle1" gutterBottom>
                            Created By
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Avatar
                                {...stringAvatar(consensus.assignee)}
                                sx={{ mr: 2, width: 32, height: 32 }}
                            />
                            <Typography variant="body2" fontWeight={500}>
                                {consensus.assignee}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ ml: 'auto' }}
                            >
                                {new Date(consensus.created_at).toLocaleString()}
                            </Typography>
                        </Box>

                        {consensus.reason && (
                            <Typography
                                variant="body2"
                                sx={{
                                    mt: 1,
                                    fontStyle: 'italic',
                                    color: colorStyled.TEXTCOLOR
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
                            backgroundColor: colorStyled.CONTAINER_BACKGROUND_COLOR,
                            maxHeight: 300,
                            overflow: 'auto'
                        }}
                    >
                        <Typography variant="subtitle1" gutterBottom>
                            Votes
                        </Typography>

                        {consensus.decisions?.length > 0 ? (
                            consensus.decisions.map((decision, idx) => (
                                <Box
                                    key={idx}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                        p: 1.5,
                                        borderBottom:
                                            idx < consensus.decisions.length - 1
                                                ? '1px solid'
                                                : 'none',
                                        borderColor: 'divider',
                                        '&:hover': {
                                            backgroundColor: 'action.hover'
                                        },
                                        '&:last-child': {
                                            borderBottom: 'none'
                                        }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Avatar
                                            {...stringAvatar(decision.user_name)}
                                            sx={{ width: 28, height: 28 }}
                                        />
                                        <Typography variant="body2" fontWeight={500}>
                                            {decision.user_name}
                                        </Typography>
                                        {decision.choice === 'approved' ? (
                                            <>
                                                <CheckCircleIcon
                                                    sx={{ fontSize: 16, color: 'success.main' }}
                                                />
                                                <Typography variant="body2">agree</Typography>
                                            </>
                                        ) : (
                                            <>
                                                <CancelIcon
                                                    sx={{ fontSize: 16, color: 'error.main' }}
                                                />
                                                <Typography variant="body2">not agree</Typography>
                                            </>
                                        )}
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ ml: 'auto' }}
                                        >
                                            {new Date(decision.updated_at).toLocaleString()}
                                        </Typography>
                                    </Box>

                                    {decision.comment && (
                                        <Box
                                            sx={{
                                                pl: 4.5,
                                                borderLeft: '2px solid',
                                                borderColor: colorStyled.BORDER_COLOR,
                                                ml: 1
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    mt: 0.5,
                                                    fontStyle: 'italic',
                                                    color: colorStyled.TEXTCOLOR
                                                }}
                                            >
                                                “{decision.comment}”
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            ))
                        ) : (
                            <Typography
                                variant="body2"
                                color="text.disabled"
                                sx={{ p: 1 }}
                            >
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
    consensus: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default LastConsensusView;
