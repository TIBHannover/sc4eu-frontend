import { Popover, List, ListItemButton, ListItemText, Grid, Card, CardContent, Chip, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const CardActivityWidget = ({ urgentTerms, discussionReplies, newTerms, onUrgentClick, onDiscussionClick, onNewTermsClick }) => {
    const [activeAnchorEl, setActiveAnchorEl] = useState(null);
    const [activeCard, setActiveCard] = useState(null);

    if (!urgentTerms && !discussionReplies && !newTerms) return null;

    const actionCards = [
        {
            label: 'Urgent',
            color: 'error',
            text: urgentTerms.length === 1 ? urgentTerms.length + ' term is waiting for you' : urgentTerms.length + ' terms are waiting for you',
            sub: 'Open voting window →',
            onClick: e => {
                setActiveAnchorEl(e.currentTarget);
                setActiveCard('urgent');
            },
            count: urgentTerms.length
        },
        {
            label: 'Discussion',
            color: 'success',
            text: 'Someone replied to you in ' + discussionReplies.length + ' terms',
            sub: 'Jump to thread →',
            onClick: e => {
                setActiveAnchorEl(e.currentTarget);
                setActiveCard('discussion');
            },
            count: discussionReplies.length
        },
        {
            label: 'New terms',
            color: 'warning',
            text: newTerms.length === 1 ? newTerms.length + ' term is waiting for you' : newTerms.length + ' terms are waiting for you',
            sub: 'Filter table →',
            onClick: onNewTermsClick,
            count: newTerms.length
        }
    ].filter(card => card.count > 0);

    return (
        <Grid container spacing={1} sx={{ mb: 1 }}>
            {actionCards.map(card => (
                <Grid item xs={12} sm={4} key={card.label}>
                    <Card variant="outlined" sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'grey.50' } }} onClick={card.onClick}>
                        <CardContent>
                            <Chip label={card.label} size="small" color={card.color} />
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
