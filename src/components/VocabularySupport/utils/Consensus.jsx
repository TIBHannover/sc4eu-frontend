import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@material-ui/core';
import { Box, LinearProgress, Tooltip, Typography, useTheme } from '@mui/material';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import { SMALL_SCREEN_WIDTH } from '../../../styledComponents/styledComponents';

const THRESHOLD_COUNT = 4;
const CONSENSUS_SHARE_THRESHOLD = 75;

const Bold = ({ children }) => (
    <Box component="span" sx={{ fontWeight: 'bold', fontSize: '1.05em' }}>
        {children}
    </Box>
);

Bold.propTypes = {
    children: PropTypes.node.isRequired
};

export const ConsensusProgress = ({ term }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(`(max-width: ${SMALL_SCREEN_WIDTH})`);

    const approvedCount = term.decisions.filter(e => e.choice === 'approved').length;
    const rejectedCount = term.decisions.filter(e => e.choice === 'rejected').length;
    const abstainCount = term.decisions.filter(e => e.choice === 'abstain').length;
    const totalVotes = approvedCount + rejectedCount;
    const leadingCount = Math.max(approvedCount, rejectedCount);
    const isApprovedLeading = approvedCount >= rejectedCount;
    const leadingSharePercent = totalVotes > 0 ? Math.round((leadingCount / totalVotes) * 100) : 0;
    const isConsensusReached = leadingCount >= THRESHOLD_COUNT && leadingSharePercent >= CONSENSUS_SHARE_THRESHOLD;
    const isOneVoteShort = THRESHOLD_COUNT - leadingCount === 1;

    const progressColour = isApprovedLeading ? theme.palette.secondary.main : theme.palette.error.main;
    const progressValue = Math.min((leadingCount / THRESHOLD_COUNT) * 100, 100);

    const renderContent = () => {
        if (totalVotes === 0) {
            return (
                <Typography variant="body2" color="text.secondary">
                    No votes yet
                </Typography>
            );
        }

        if (isConsensusReached) {
            return (
                <Typography variant="body2" color="text.secondary">
                    {leadingSharePercent === 100 ? 'Unanimous' : 'Major'} consensus reached to {isApprovedLeading ? 'agree' : 'not agree'} (
                    <Bold>{approvedCount}</Bold> agree, <Bold>{rejectedCount}</Bold> not agree, <Bold>{abstainCount}</Bold> undecided){' '}
                    <CelebrationOutlinedIcon fontSize="inherit" sx={{ color: theme.palette.secondary.main, verticalAlign: 'middle' }} />
                </Typography>
            );
        }

        return (
            <Typography variant="body2" color="text.secondary">
                <Box component="span" sx={{ fontWeight: 'medium', color: theme.palette.text.primary, mr: 0.5 }}>
                    Consensus progress:
                </Box>
                <Bold>{approvedCount}</Bold> agree, <Bold>{rejectedCount}</Bold> not agree, <Bold>{abstainCount}</Bold> undecided ·{' '}
                <Bold>{totalVotes}</Bold>/<Bold>{THRESHOLD_COUNT}</Bold> votes{' '}
                {isOneVoteShort && (
                    <Tooltip title="Just one vote left to reach consensus">
                        <LocalFireDepartmentOutlinedIcon fontSize="inherit" sx={{ color: theme.palette.primary.main, verticalAlign: 'middle' }} />
                    </Tooltip>
                )}
            </Typography>
        );
    };

    return (
        <Box
            sx={{
                mx: 1,
                py: 0.5,
                px: 1.5,
                borderRadius: 1,
                border: '1px solid',
                borderColor: theme.palette.divider,
                backgroundColor: theme.palette.background.default
            }}
        >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: isMobile ? 'flex-start' : 'space-between', mb: 0.5 }}>
                {renderContent()}
            </Box>
            <LinearProgress
                variant="determinate"
                value={progressValue}
                sx={{
                    height: 6,
                    borderRadius: 3,
                    '.MuiLinearProgress-bar': {
                        backgroundColor: progressColour,
                        borderRadius: 3
                    }
                }}
            />
        </Box>
    );
};

ConsensusProgress.propTypes = {
    term: PropTypes.shape({
        decisions: PropTypes.arrayOf(
            PropTypes.shape({
                choice: PropTypes.string
            })
        ).isRequired
    }).isRequired
};
