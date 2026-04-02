import { Popover, List, ListItemButton, ListItemText, Grid, Card, CardContent, Chip, Typography, Box, ListItemIcon, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import { colorStyled } from '../../../styledComponents/styledColor';

export const CardActivityWidget = ({ urgentTerms, votes, discussionReplies, newTerms, onUrgentClick, onDiscussionClick, onNewTermsClick }) => {
    const [activeAnchorEl, setActiveAnchorEl] = useState(null);
    const [activeCard, setActiveCard] = useState(null);

    if (!urgentTerms && !discussionReplies && !newTerms) return null;

    const nearClosedConsensuses = [];
    votes?.forEach(vote => {
        const approvedCount = vote.decisions.filter(e => e.choice === 'approved').length;
        const rejectedCount = vote.decisions.filter(e => e.choice === 'rejected').length;
        const leadingCount = Math.max(approvedCount, rejectedCount);
        const THRESHOLD_COUNT = 4;
        const isOneVoteShort = THRESHOLD_COUNT - leadingCount === 1;
        if (isOneVoteShort) {
            nearClosedConsensuses.push(vote.term_uuid);
        }
    });

    const actionCards = [
        {
            label: 'Urgent',
            text: urgentTerms.length === 1 ? urgentTerms.length + ' term is waiting for you' : urgentTerms.length + ' terms are waiting for you',
            nearClosed: nearClosedConsensuses.length !== 0 ? `With ${nearClosedConsensuses.length} needing only one vote to close` : undefined,
            sub: 'Open voting window →',
            onClick: e => {
                setActiveAnchorEl(e.currentTarget);
                setActiveCard('urgent');
            },
            count: urgentTerms.length,
            backGroundColor: colorStyled.error,
            fontColor: colorStyled.onError
        },
        {
            label: 'Discussion',
            text: 'Someone replied to you in ' + discussionReplies.length + ' terms',
            sub: 'Jump to thread →',
            onClick: e => {
                setActiveAnchorEl(e.currentTarget);
                setActiveCard('discussion');
            },
            count: discussionReplies.length,
            backGroundColor: colorStyled.tertiary,
            fontColor: colorStyled.onTertiary
        },
        {
            label: 'New terms',
            text: newTerms.length === 1 ? newTerms.length + ' term is waiting for you' : newTerms.length + ' terms are waiting for you',
            sub: 'Filter table →',
            onClick: onNewTermsClick,
            count: newTerms.length,
            backGroundColor: colorStyled.tertiaryContainer,
            fontColor: colorStyled.onTertiaryContainer  
        }
    ].filter(card => card.count > 0);

    return (
        <Grid container spacing={1} sx={{ mb: 1 }}>
            {actionCards.map(card => (
                <Grid item xs={12} sm={4} key={card.label}>
                    <Card variant="outlined" sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'grey.50' } }} onClick={card.onClick}>
                        <CardContent>
                            <Chip label={card.label} size="small" style={{ backgroundColor: card.backGroundColor, color: card.fontColor }} />
                            <Typography variant="body2" fontWeight={500} mt={1}>
                                {card.text}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {card.sub}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            <Box sx={{ maxHeight: '10vh', overflowY: 'auto' }}>
                <Popover
                    open={!!activeAnchorEl}
                    anchorEl={activeAnchorEl}
                    onClose={() => setActiveAnchorEl(null)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                >
                    <List dense sx={{ minWidth: '20vw', maxWidth: '40vw', maxHeight: '40vh', overflowY: 'auto' }}>
                        {(activeCard === 'urgent' ? urgentTerms : discussionReplies).map(term => (
                            <ListItemButton
                                key={term.identifier}
                                onClick={() => {
                                    setActiveAnchorEl(null);
                                    setActiveCard(null);
                                    activeCard === 'urgent' ? onUrgentClick(term) : onDiscussionClick(term);
                                }}
                            >
                                <ListItemText primary={term.label} secondary={`Status: ${term.status}`} />
                                {nearClosedConsensuses?.includes(term.identifier) && (
                                    <ListItemIcon>
                                        <Tooltip title="Just one vote left to reach consensus">
                                            <LocalFireDepartmentOutlinedIcon sx={{ color: colorStyled.tertiary }} />
                                        </Tooltip>
                                    </ListItemIcon>
                                )}
                            </ListItemButton>
                        ))}
                    </List>
                </Popover>
            </Box>
        </Grid>
    );
};

CardActivityWidget.propTypes = {
    urgentTerms: PropTypes.arrayOf(PropTypes.object).isRequired,
    discussionReplies: PropTypes.arrayOf(PropTypes.object).isRequired,
    newTerms: PropTypes.arrayOf(PropTypes.object).isRequired,
    onUrgentClick: PropTypes.func.isRequired,
    onDiscussionClick: PropTypes.func.isRequired,
    onNewTermsClick: PropTypes.func.isRequired
};
