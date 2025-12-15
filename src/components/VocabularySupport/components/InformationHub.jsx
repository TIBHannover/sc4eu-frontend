import React, { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    InputAdornment,
    Tooltip,
    Checkbox,
    FormControlLabel,
    Grid,
    ListItemAvatar,
    Tab,
    CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DatePicker from 'react-datepicker';
import { stringAvatar } from './CommentsSection';
import Divider from '@mui/material/Divider';
import { Tabs } from '@mui/material/';
import { getTermVotes } from '../../../network/TermVoteCalls';
import { StyledChip, StyledBadge } from '../../../styledComponents/styledComponents';
import PropTypes from 'prop-types';

const InformationHub = ({ terms, discussions, mentionedUser, onTermSelect }) => {
    const [searchText, setSearchText] = useState('');
    const [showOnlyMentions, setShowOnlyMentions] = useState(false);
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [votesMap, setVotesMap] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getVotes = async () => {
            setLoading(true);

            const data = await getTermVotes();
            setVotesMap(data || {});
            setLoading(false);
        };
        getVotes();
    }, []);

    const discussionsMap = useMemo(() => {
        return discussions.reduce((map, discussion) => {
            map[discussion.resourceId] = discussion.comments || [];
            return map;
        }, {});
    }, [discussions]);

    const enhancedTerms = useMemo(() => {
        return terms.map(term => {
            const comments = discussionsMap[term.identifier] || [];
            const hasMention = comments.some(c => c.mentionedUsers?.includes(mentionedUser));
            const hasVote = !!votesMap[term.identifier];

            return {
                ...term,
                comments,
                hasMention,
                hasVote
            };
        });
    }, [terms, discussionsMap, mentionedUser, votesMap]);

    const filterByTab = terms => {
        switch (activeTab) {
            case 0:
                return terms.filter(term => term.comments.length > 0);
            case 1:
                return terms.filter(term => term.hasVote);
            default:
                return terms;
        }
    };

    const filterByMentions = terms => {
        return showOnlyMentions ? terms.filter(term => term.hasMention) : terms;
    };

    const filterByDate = terms => {
        if (!dateFrom && !dateTo) return terms;

        return terms.filter(term => {
            if (term.comments.length === 0) return false;
            const commentDates = term.comments.map(c => new Date(c.timestamp));
            const earliest = new Date(Math.min(...commentDates));
            const latest = new Date(Math.max(...commentDates));
            return (!dateFrom || latest >= dateFrom) && (!dateTo || earliest <= dateTo);
        });
    };

    const filterBySearch = terms => {
        if (!searchText) return terms;

        const lower = searchText.toLowerCase();
        return terms.filter(
            term =>
                term.label.toLowerCase().includes(lower) ||
                term.description?.toLowerCase().includes(lower) ||
                term.comments.some(c => c.content.toLowerCase().includes(lower) || c.author.toLowerCase().includes(lower))
        );
    };

    const getLastComment = term => {
        if (term.comments.length === 0) return null;
        return term.comments.reduce((latest, curr) => (new Date(curr.timestamp) > new Date(latest.timestamp) ? curr : latest));
    };

    const filteredTerms = useMemo(() => {
        let result = enhancedTerms;
        result = filterByTab(result);
        result = filterByMentions(result);
        result = filterByDate(result);
        result = filterBySearch(result);

        return result.sort((a, b) => {
            const aComment = getLastComment(a);
            const bComment = getLastComment(b);
            const timeA = aComment ? new Date(aComment.timestamp) : 0;
            const timeB = bComment ? new Date(bComment.timestamp) : 0;
            return timeB - timeA;
        });
    }, [enhancedTerms, activeTab, showOnlyMentions, dateFrom, dateTo, searchText]);

    const renderTermItem = term => {
        const lastComment = getLastComment(term);
        const commentCount = term.comments.length;

        return (
            <ListItem
                key={term.identifier}
                onClick={() => onTermSelect(term.identifier)}
                sx={{
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: 'action.hover' },
                    p: 2,
                    borderRadius: 1,
                    alignItems: 'flex-start'
                }}
            >
                <ListItemAvatar sx={{ minWidth: 40, marginTop: '4px' }}>
                    {lastComment ? (
                        <Tooltip title={`Comment by ${lastComment.author}`}>
                            <Avatar
                                {...stringAvatar(lastComment.author)}
                                sx={{
                                    width: 32,
                                    height: 32,
                                    fontSize: '0.875rem',
                                    border: term.hasMention ? '2px solid' : 'none',
                                    borderColor: term.hasMention ? 'warning.dark' : 'transparent'
                                }}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title="No comments">
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    bgcolor: 'grey.300'
                                }}
                            >
                                <ChatBubbleOutlineIcon fontSize="small" />
                            </Avatar>
                        </Tooltip>
                    )}
                </ListItemAvatar>
                <Tooltip title={term.description}>
                    <ListItemText
                        primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ mr: 1 }}>
                                    {term.label}
                                </Typography>
                                {term.hasMention && <StyledChip label="Mention" size="small" customVariant="mention" sx={{ mr: '1em' }} />}
                                {term.hasVote && <StyledChip label="In Consensus" size="small" customVariant="agreement" sx={{ mr: '1em' }} />}
                                {lastComment && (
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{
                                            fontSize: '0.75rem'
                                        }}
                                    >
                                        {new Date(lastComment.timestamp).toLocaleDateString() +
                                            ' ' +
                                            new Date(lastComment.timestamp).toLocaleTimeString()}
                                    </Typography>
                                )}
                            </Box>
                        }
                        secondary={
                            <>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        <ChatBubbleOutlineIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                                        {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
                                    </Typography>
                                </Box>
                                {lastComment ? (
                                    <Typography variant="body2">{lastComment.content}</Typography>
                                ) : (
                                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.disabled' }}>
                                        No comments available
                                    </Typography>
                                )}
                            </>
                        }
                        sx={{ my: 0 }}
                    />
                </Tooltip>
            </ListItem>
        );
    };

    const handleTabChange = (event, value) => {
        setActiveTab(value);
    };

    const getTabBadgeContent = tabIndex => {
        if (loading) return '...';

        switch (tabIndex) {
            case 0:
                return enhancedTerms.filter(t => t.comments.length > 0).length;
            case 1:
                return Object.keys(votesMap).length;
            default:
                return '...';
        }
    };

    return (
        <Grid container xs={12} sx={{ p: 2 }}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        placeholder="Search discussions (by comment, author, term label)..."
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                            sx: { backgroundColor: 'background.paper' }
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            height: '100%',
                            alignItems: 'center'
                        }}
                    >
                        <FormControlLabel
                            control={<Checkbox size="small" checked={showOnlyMentions} onChange={e => setShowOnlyMentions(e.target.checked)} />}
                            label={<Typography variant="body2">Only my mentions</Typography>}
                            sx={{ mr: 2 }}
                        />
                        <DatePicker
                            selected={dateFrom}
                            onChange={setDateFrom}
                            placeholderText="From"
                            isClearable
                            customInput={<TextField size="small" sx={{ width: 120 }} />}
                        />
                        <DatePicker
                            selected={dateTo}
                            onChange={setDateTo}
                            placeholderText="To"
                            isClearable
                            customInput={<TextField size="small" sx={{ width: 120, ml: 1 }} />}
                        />
                    </Box>
                </Grid>
            </Grid>

            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
                <Tab
                    label={
                        <StyledBadge badgeContent={getTabBadgeContent(0)} customVariant="blue">
                            <span>Terms with discussions</span>
                        </StyledBadge>
                    }
                />
                <Tab
                    label={
                        <StyledBadge badgeContent={getTabBadgeContent(1)} customVariant="blue">
                            <span>Terms with active consensus</span>
                        </StyledBadge>
                    }
                />
            </Tabs>

            <Grid item xs={12}>
                <Paper elevation={0}>
                    <List disablePadding>
                        {loading ? (
                            <Box>
                                <CircularProgress size={24} />
                                <Typography variant="body2" sx={{ ml: 2 }}>
                                    Loading data...
                                </Typography>
                            </Box>
                        ) : filteredTerms.length > 0 ? (
                            filteredTerms.map((term, index) => (
                                <Box key={term.identifier}>
                                    {renderTermItem(term)}
                                    {index < filteredTerms.length - 1 && <Divider sx={{ mx: 2 }} />}
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body2">
                                {activeTab === 0 ? 'No discussions found matching your criteria' : 'No active reviews found'}
                            </Typography>
                        )}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default InformationHub;

InformationHub.propTypes = {
    terms: PropTypes.arrayOf(
        PropTypes.shape({
            comments: PropTypes.arrayOf(PropTypes.string).isRequired,
            hasVote: PropTypes.bool.isRequired,
            hasMention: PropTypes.bool.isRequired
        })
    ).isRequired,
    discussions: PropTypes.arrayOf(PropTypes.shape({
        comments: PropTypes.arrayOf(PropTypes.string).isRequired,
        resourceId: PropTypes.string.isRequired,
    })).isRequired,
    mentionedUsers: PropTypes.array.isRequired,
    onTermSelect: PropTypes.func.isRequired
};
