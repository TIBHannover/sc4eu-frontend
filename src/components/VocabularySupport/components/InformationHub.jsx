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
    CircularProgress,
    AvatarGroup,
    Badge,
    Popover,
    Select,
    MenuItem,
    Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DatePicker from 'react-datepicker';
import { stringAvatar } from './CommentsSection';
import Divider from '@mui/material/Divider';
import { Tabs } from '@mui/material/';
import { getVotes, getWeeklyTerm } from '../../../network/TermVoteCalls';
import { StyledChip, StyledBadge } from '../../../styledComponents/styledComponents';
import PropTypes from 'prop-types';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { colorStyled } from '../../../styledComponents/styledColor';
import TermOfTheWeekPopup from './TermOfTheWeekPopUp';
import { SMALL_SCREEN_WIDTH } from '../../../styledComponents/styledComponents';
import { useMediaQuery } from '@material-ui/core';
import { ConsensusProgress } from '../utils/Consensus';

const SORT_BY_OPTIONS = Object.freeze({
    RECENT_UPDATE: 'recent_update',
    LATEST_UPDATE: 'latest_update',
    ALPHABETICAL: 'alphabetical',
    ALPHABETICAL_REVERSE: 'alphabetical_reverse',
    MOST_VOTES: 'most_votes',
    MOST_COMMENTS: 'most_comments'
});

const InformationHub = ({ terms, discussions, mentionedUser, onTermSelect }) => {
    const [searchText, setSearchText] = useState('');
    const [showOnlyMentions, setShowOnlyMentions] = useState(false);
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [votesMap, setVotesMap] = useState([]);
    const [loading, setLoading] = useState(false);

    const [termOfWeek, setTermOfWeek] = useState(null);
    const [showWeekTerm, setShowWeekTerm] = useState(false);
    const [weekTermLoading, setWeekTermLoading] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [sortBy, setSortBy] = useState(SORT_BY_OPTIONS.RECENT_UPDATE);

    const isMobile = useMediaQuery(`(max-width: ${SMALL_SCREEN_WIDTH})`);

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            try {
                await fetchTermOfWeek();
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    const fetchTermOfWeek = async () => {
        try {
            setWeekTermLoading(true);
            const votesData = await getVotes();
            setVotesMap(votesData);

            const weeklyTerm = await getWeeklyTerm();
            const termUuid = weeklyTerm?.term_uuid;

            if (!termUuid) {
                console.log('No term UUID found');
                return;
            }

            const termVoteData = votesData.find(vote => vote.term_uuid === termUuid);

            const decisions = termVoteData?.decisions || [];

            const matchingTerm = enhancedTerms.find(term => term.identifier === termUuid);

            if (!matchingTerm) return;

            const finalTerm = {
                ...matchingTerm,
                vote_uuid: weeklyTerm.vote_uuid,
                decisions
            };

            setTermOfWeek(finalTerm);
        } catch (error) {
            console.error('Error fetching term of week:', error);
        } finally {
            setWeekTermLoading(false);
        }
    };

    const DecisionBadgeAvatar = ({ decision }) => {
        return (
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={decision.choice === 'approved' ? <CheckIcon fontSize="inherit" /> : <CloseIcon fontSize="inherit" />}
                sx={{
                    '& .MuiBadge-badge': {
                        backgroundColor: decision.choice === 'approved' ? colorStyled.primary : colorStyled.error,
                        color: decision.choice === 'approved' ? colorStyled.onPrimary : colorStyled.onError,
                        width: 16,
                        height: 16,
                        fontSize: 12,
                        border: `1px solid ${colorStyled.outlineVariant}`
                    }
                }}
            >
                <Avatar alt={decision.user_name} {...stringAvatar(decision.user_name)} />
            </Badge>
        );
    };

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
            const decisions = votesMap.filter(votes => votes.term_uuid === term.identifier).flatMap(votes => votes.decisions);
            const votesIds = votesMap.map(votes => {
                return votes.term_uuid;
            });
            const hasVote = votesIds.includes(term.identifier);

            return {
                ...term,
                comments,
                hasMention,
                hasVote,
                decisions
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

        switch (sortBy) {
            case SORT_BY_OPTIONS.RECENT_UPDATE:
                return result.sort((a, b) => new Date(b.modified) - new Date(a.modified));
            case SORT_BY_OPTIONS.LATEST_UPDATE:
                return result.sort((a, b) => new Date(a.modified) - new Date(b.modified));
            case SORT_BY_OPTIONS.ALPHABETICAL:
                return result.sort((a, b) => a.label.localeCompare(b.label));
            case SORT_BY_OPTIONS.ALPHABETICAL_REVERSE:
                return result.sort((a, b) => b.label.localeCompare(a.label));
            case SORT_BY_OPTIONS.MOST_VOTES:
                return result.sort((a, b) => b.decisions.length - a.decisions.length);
            case SORT_BY_OPTIONS.MOST_COMMENTS:
                return result.sort((a, b) => b.comments.length - a.comments.length);
            default:
                return result.sort((a, b) => new Date(b.modified) - new Date(a.modified));
        }
    }, [enhancedTerms, activeTab, showOnlyMentions, dateFrom, dateTo, searchText, sortBy]);

    const renderTermItem = term => {
        const lastComment = getLastComment(term);
        const commentCount = term.comments.length;

        return (
            <ListItem
                key={term.identifier}
                onClick={event => {
                    const rowClickedClosests = event.target.closest('.MuiListItem-root');
                    if (rowClickedClosests === event.currentTarget) {
                        onTermSelect(term.identifier);
                    }
                }}
                sx={{
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

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        fontSize: '0.75rem'
                                    }}
                                >
                                    {new Date(term.modified).toLocaleDateString() + ' ' + new Date(term.modified).toLocaleTimeString()}
                                </Typography>

                                {term.hasVote && (
                                    <>
                                        <ConsensusProgress term={term} />
                                        <AvatarGroup
                                            max={4}
                                            onClick={event => {
                                                event.stopPropagation();
                                                setAnchorEl(event.currentTarget);
                                            }}
                                            sx={{
                                                gap: 0.5,
                                                marginLeft: 2,
                                                '& .MuiAvatar-root': {
                                                    width: 24,
                                                    height: 24,
                                                    fontSize: 12
                                                },
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {term.decisions.map(decision => (
                                                <Tooltip key={decision.user_name} title={decision.user_name}>
                                                    <DecisionBadgeAvatar decision={decision} />
                                                </Tooltip>
                                            ))}
                                        </AvatarGroup>
                                    </>
                                )}

                                <Popover
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={() => {
                                        setAnchorEl(null);
                                    }}
                                    anchorOrigin={{
                                        vertical: 'center',
                                        horizontal: 'right'
                                    }}
                                    slotProps={{
                                        paper: {
                                            sx: {
                                                maxHeight: 200
                                            }
                                        }
                                    }}
                                >
                                    <List>
                                        {term.decisions?.slice(3).map(decision => (
                                            <ListItem key={decision.user_name}>
                                                <ListItemAvatar>
                                                    <DecisionBadgeAvatar decision={decision} />
                                                </ListItemAvatar>
                                                <ListItemText>
                                                    <Typography sx={{ fontSize: '0.75rem' }}>{decision.user_name}</Typography>
                                                </ListItemText>
                                                <Box sx={{ ml: 3 }}></Box>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Popover>
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
                return votesMap.length;
            default:
                return '...';
        }
    };

    return (
        <Grid container spacing={1}>
            {termOfWeek && showWeekTerm && (
                <TermOfTheWeekPopup
                    term={termOfWeek}
                    open={showWeekTerm}
                    username={mentionedUser}
                    onLoading={weekTermLoading}
                    onClose={() => {
                        setShowWeekTerm(false);
                    }}
                    onVote={fetchTermOfWeek}
                />
            )}
            <Grid
                item
                xs={12}
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    backgroundColor: 'background.paper',
                    borderBottom: `1px solid ${colorStyled.outlineVariant}`,
                    pb: 1
                }}
            >
                <Grid container spacing={1} columnSpacing={2}>
                    <Grid item xs={12} xl="auto">
                        <Button
                            onClick={() => setShowWeekTerm(true)}
                            variant="outlined"
                            size="small"
                            sx={{
                                bgcolor: colorStyled.tertiary,
                                color: colorStyled.onTertiary,
                                '&:hover': {
                                    bgcolor: colorStyled.tertiaryContainer,
                                    color: colorStyled.onTertiaryContainer
                                }
                            }}
                        >
                            {isMobile ? 'Week Term' : 'Show Term of the Week'}
                        </Button>
                    </Grid>
                    <Grid item xs={12} xl={4}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            placeholder={isMobile ? 'Search' : 'Search discussions (by comment, author, term label)...'}
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
                    <Grid item xs={12} xl={1}>
                        <FormControlLabel
                            control={<Checkbox size="small" checked={showOnlyMentions} onChange={e => setShowOnlyMentions(e.target.checked)} />}
                            label={<Typography variant="body2">Only my mentions</Typography>}
                            sx={{ mr: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} xl="auto">
                        <DatePicker
                            selected={dateFrom}
                            onChange={setDateFrom}
                            placeholderText="From"
                            isClearable
                            customInput={<TextField size="small" />}
                        />
                    </Grid>
                    <Grid item xs={12} xl="auto">
                        <DatePicker
                            selected={dateTo}
                            onChange={setDateTo}
                            placeholderText="To"
                            isClearable
                            customInput={<TextField size="small" />}
                        />
                    </Grid>
                    <Grid item xs={12} lg="auto">
                        <Tabs value={activeTab} onChange={handleTabChange}>
                            <Tab
                                label={
                                    <StyledBadge badgeContent={getTabBadgeContent(0)} customVariant="blue">
                                        <span>{isMobile ? 'Discussion' : 'Terms with discussions'}</span>
                                    </StyledBadge>
                                }
                            />
                            <Tab
                                label={
                                    <StyledBadge badgeContent={getTabBadgeContent(1)} customVariant="blue">
                                        <span>{isMobile ? 'Consenus' : 'Terms with active consensus'}</span>
                                    </StyledBadge>
                                }
                            />
                        </Tabs>
                    </Grid>
                    <Grid item xs={12} lg="auto">
                        {filteredTerms.length > 0 && (
                            <Box sx={{ ml: 5 }}>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Sort by:
                                </Typography>
                                <Select
                                    size="small"
                                    value={sortBy}
                                    onChange={e => setSortBy(e.target.value)}
                                    variant="outlined"
                                    sx={{ minWidth: 200 }}
                                >
                                    <MenuItem value={SORT_BY_OPTIONS.RECENT_UPDATE}>Recently updated</MenuItem>
                                    <MenuItem value={SORT_BY_OPTIONS.LATEST_UPDATE}>Latest updated</MenuItem>
                                    <MenuItem value={SORT_BY_OPTIONS.ALPHABETICAL}>Alphabetical</MenuItem>
                                    <MenuItem value={SORT_BY_OPTIONS.ALPHABETICAL_REVERSE}>Alphabetical (Z to A)</MenuItem>
                                    <MenuItem value={SORT_BY_OPTIONS.MOST_VOTES}>Most votes</MenuItem>
                                    <MenuItem value={SORT_BY_OPTIONS.MOST_COMMENTS}>Most Comments</MenuItem>
                                </Select>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} sx={{ overflowY: 'auto', flexGrow: 1 }}>
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
                            <Typography variant="body2" sx={{ mt: 10 }}>
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
    discussions: PropTypes.arrayOf(
        PropTypes.shape({
            comments: PropTypes.arrayOf(PropTypes.string).isRequired,
            resourceId: PropTypes.string.isRequired
        })
    ).isRequired,
    mentionedUser: PropTypes.string.isRequired,
    onTermSelect: PropTypes.func.isRequired
};
