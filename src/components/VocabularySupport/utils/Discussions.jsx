import List from '@mui/material/List';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Grid,
    InputAdornment,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    Menu,
    TextField,
    Tooltip
} from '@mui/material';
import { IconButton, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../components/CommentsSection';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {colorStyled} from "../../../styledComponents/styledColor";

const menuFilterTypes = {
    comment: 'Filter by comment text...',
    term: 'Filter by term label...',
    author: 'Filter by author...'
};

export const getMentionedDiscussions = (terms, discussions, mentionedUser) => {
    let merged = [];

    const mentioned = discussions
        .filter(discussion => discussion.comments.some(comment => comment.mentionedUsers?.includes(mentionedUser)))
        .map(discussion => ({
            ...discussion,
            comments: discussion.comments.filter(comment => comment.mentionedUsers?.includes(mentionedUser))
        }));

    const termMap = new Map(terms.map(term => [term.identifier, term]));

    mentioned.forEach(mention => {
        const matchingTerm = termMap.get(mention.resourceId);
        if (matchingTerm) {
            merged.push({
                identifier: matchingTerm.identifier,
                label: matchingTerm.label,
                comments: mention.comments
            });
        }
    });

    return groupMentionedByCommentInstant(merged);
};

const groupMentionedByCommentInstant = mentioned => {
    const grouped = [];

    mentioned.forEach(i => {
        i.comments.forEach(comment => {
            const dateKey = new Date(comment.timestamp).toLocaleDateString();
            const labelKey = i.label;
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }

            if (!grouped[dateKey][labelKey]) {
                grouped[dateKey][labelKey] = {
                    label: labelKey,
                    resourceId: i.identifier,
                    comments: []
                };
            }

            grouped[dateKey][labelKey].comments.push({
                author: comment.author,
                content: comment.content
            });
        });
    });

    return grouped;
};

export const RenderGroupedMentions = ({ groupedMentioned, onNavigateToTerm }) => {
    const [filterText, setFilterText] = useState('');
    const [filterType, setFilterType] = useState('comment');
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    const isWithinRange = dateParam => {
        const date = new Date(dateParam);
        return (!dateFrom || date >= dateFrom) && (!dateTo || date <= dateTo);
    };

    const handleFilterByAuthor = author => {
        setFilterType('author');
        setFilterText(author);
    };

    const getFilteredData = () => {
        const filtered = {};

        for (const date of Object.keys(groupedMentioned)) {
            if (!isWithinRange(date)) continue;

            const groups = groupedMentioned[date];
            const filteredGroups = Object.values(groups)
                .map(group => {
                    let isGroupMatch = true;
                    let filteredComments;
                    switch (filterType) {
                        case 'author':
                            filteredComments = group.comments.filter(comment => comment.author.toLowerCase().includes(filterText.toLowerCase()));
                            break;
                        case 'comment':
                            filteredComments = group.comments.filter(comment => comment.content.toLowerCase().includes(filterText.toLowerCase()));
                            break;
                        case 'term':
                            isGroupMatch = group.label?.toLowerCase().includes(filterText.toLowerCase());
                            break;
                        default:
                            break;
                    }
                    if (filterType === 'term') {
                        return isGroupMatch ? { ...group, comments: group.comments } : null;
                    } else {
                        return filteredComments.length > 0 ? { ...group, comments: filteredComments } : null;
                    }
                })
                .filter(Boolean);

            if (filteredGroups.length > 0) {
                filtered[date] = filteredGroups;
            }
        }

        return filtered;
    };

    const filteredData = getFilteredData();
    const hasResults = Object.keys(filteredData).length > 0;

    return (
        <Box>
            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        value={filterText}
                        onChange={e => setFilterText(e.target.value)}
                        placeholder={menuFilterTypes[filterType]}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Tooltip title="Select filter type">
                                        <IconButton size="small" onClick={e => setFilterAnchorEl(e.currentTarget)}>
                                            <SearchIcon />
                                            <ArrowDropDownIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={() => setFilterAnchorEl(null)}>
                                        <MenuItem
                                            onClick={() => {
                                                setFilterType('comment');
                                                setFilterAnchorEl(null);
                                            }}
                                        >
                                            Filter by comment text
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setFilterType('term');
                                                setFilterAnchorEl(null);
                                            }}
                                        >
                                            Filter by term label
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setFilterType('author');
                                                setFilterAnchorEl(null);
                                            }}
                                        >
                                            Filter by author
                                        </MenuItem>
                                    </Menu>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', columnGap: 2, ml: 20 }}>
                        <DatePicker selected={dateFrom} onChange={setDateFrom} placeholderText="From date" isClearable />
                        <DatePicker selected={dateTo} onChange={setDateTo} placeholderText="To date" isClearable />
                    </Box>
                </Grid>
            </Grid>
            {hasResults ? (
                Object.keys(filteredData)
                    .sort((a, b) => new Date(b) - new Date(a))
                    .map(date => (
                        <Accordion key={date} sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                    {date}
                                </Typography>
                            </AccordionSummary>

                            <Divider sx={{ mb: 1 }} />

                            <AccordionDetails>
                                <List sx={{ pl: 2 }}>
                                    {filteredData[date].map(group => (
                                        <>
                                            <Box>
                                                <Tooltip title="Navigate to term" placement="top">
                                                    <Typography
                                                        variant="body2"
                                                        fontWeight="bold"
                                                        sx={{
                                                            color: colorStyled.PRIMARY.dark,
                                                            cursor: 'pointer',
                                                            display: 'inline-block'
                                                        }}
                                                        onClick={() => onNavigateToTerm(group.resourceId)}
                                                    >
                                                        {group.label}
                                                    </Typography>
                                                </Tooltip>
                                            </Box>
                                            <List sx={{ pl: 2 }}>
                                                {group.comments.map((comment, i) => (
                                                    <ListItem key={i} disableGutters>
                                                        <ListItemAvatar
                                                            onClick={() => handleFilterByAuthor(comment.author)}
                                                            sx={{ cursor: 'pointer' }}
                                                        >
                                                            <Tooltip title={`Filter by ${comment.author}`} arrow>
                                                                <Avatar {...stringAvatar(comment.author)} />
                                                            </Tooltip>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            secondary={
                                                                <Typography variant="body2">
                                                                    {comment.author} — {comment.content}
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ))
            ) : (
                <Typography variant="body2" align="center" sx={{ mt: 4 }}>
                    No results found. Try changing your search or date range
                </Typography>
            )}
        </Box>
    );
};

RenderGroupedMentions.propTypes = {
    groupedMentioned: PropTypes.array.isRequired,
    onNavigateToTerm: PropTypes.func.isRequired
};
