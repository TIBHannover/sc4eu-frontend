import { Box, Tooltip, Typography, LinearProgress } from '@mui/material';
import { colorStyled } from '../../../styledComponents/styledColor';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import { SMALL_SCREEN_WIDTH } from '../../../styledComponents/styledComponents';
import { useMediaQuery } from '@material-ui/core';

export const ConsensusProgress = ({ term }) => {
    const THRESHOLD_COUNT = 4;
    const approvedCount = term.decisions.filter(e => e.choice === 'approved').length;
    const rejectedCount = term.decisions.filter(e => e.choice === 'rejected').length;
    const totalVotes = approvedCount + rejectedCount;
    const leadingCount = Math.max(approvedCount, rejectedCount);
    const progressColour = approvedCount >= rejectedCount ? colorStyled.GREEN_COLOR : colorStyled.RED_COLOR;
    const barValue = Math.min((leadingCount / THRESHOLD_COUNT) * 100, 100);
    const majority = totalVotes > 0 ? Math.round((leadingCount / totalVotes) * 100) : 0;
    const isOneVoteShort = THRESHOLD_COUNT - leadingCount === 1;
    const isMobile = useMediaQuery(`(max-width: ${SMALL_SCREEN_WIDTH})`);

    return (
        <Box sx={{ mx: 1 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: isMobile ? 'flex-start' : 'space-between' }}>
                {totalVotes === 0 ? (
                    <Typography variant="caption" color="text.secondary">
                        No votes yet
                    </Typography>
                ) : leadingCount >= THRESHOLD_COUNT && majority >= 75 ? (
                    <Typography variant="caption" color="text.secondary">
                        {majority === 100 ? 'Unanimous' : 'Majority'} consensus reached{' '}
                        <CelebrationOutlinedIcon sx={{ color: colorStyled.TEXTCOLOR }} />
                    </Typography>
                ) : (
                    <>
                        <Typography variant="caption" color="text.secondary">
                            Consensus progress:
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {leadingCount}/{THRESHOLD_COUNT} votes · {majority}% majority{' '}
                            {isOneVoteShort && (
                                <Tooltip title="Just one vote left to reach consensus">
                                    <LocalFireDepartmentOutlinedIcon sx={{ color: colorStyled.ORANGE_COLOR }} />
                                </Tooltip>
                            )}
                        </Typography>
                    </>
                )}
            </Box>
            <LinearProgress
                variant="determinate"
                value={barValue}
                sx={{
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: progressColour
                    }
                }}
            />
        </Box>
    );
};
