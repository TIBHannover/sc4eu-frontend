import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
    Box,
    ListItem,
    ListItemAvatar,
    Paper,
    Collapse,
    Button,
    Avatar,
    Typography,
    TextField,
    IconButton,
    List,
    MenuList,
    MenuItem,
    Tooltip,
    Popper,
    useTheme,
    alpha
} from '@mui/material';
import { getAllUsers } from '../../../network/UserProfileCalls';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { commitDiscussionOnly } from '../utils/CommitChanges';
import { useQueryClient } from '@tanstack/react-query';
import { usePushNotifications } from '../../../hooks/usePushNotifications';
import { SMALL_SCREEN_WIDTH } from '../../../styledComponents/styledComponents';
import { useMediaQuery } from '@material-ui/core';
import { COMMENT_EMOJI_SET } from '../utils/Discussions';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const INDENT_PX = 20;

const STATUS_OPTIONS = [
    { value: 'none', label: 'None', icon: <FlagOutlinedIcon fontSize="small" /> },
    { value: 'open', label: 'Open', icon: <FlagOutlinedIcon fontSize="small" sx={{ color: 'info.main' }} /> },
    { value: 'resolved', label: 'Resolved', icon: <CheckOutlinedIcon fontSize="small" sx={{ color: 'success.main' }} /> }
];

const STATUS_ICON = {
    none: <FlagOutlinedIcon fontSize="small" />,
    open: <FlagOutlinedIcon fontSize="small" sx={{ color: 'info.main' }} />,
    resolved: <CheckOutlinedIcon fontSize="small" sx={{ color: 'success.main' }} />
};

const STATUS_TOOLTIP = {
    none: 'Set status',
    open: 'Marked as open — requires help',
    resolved: 'Marked as resolved — question answered'
};

function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.codePointAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

export function stringAvatar(name) {
    const nameParts = name.split(' ');
    let initials;

    if (nameParts.length === 1) {
        initials = `${nameParts[0][0]}${nameParts[0][1] || ''}`;
    } else {
        initials = `${nameParts[0][0]}${nameParts[1][0]}`;
    }

    return {
        sx: {
            backgroundColor: stringToColor(name),

            [`@media (max-width: ${SMALL_SCREEN_WIDTH})`]: {
                height: 24,
                width: 24
            }
        },
        children: initials
    };
}

function getTimeDifferenceString(isoDateString) {
    const date = new Date(isoDateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 2) {
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        const timeString = date.toLocaleString('en-US', options);
        if (diffDays === 1) {
            return `Yesterday at ${timeString}`;
        }
        return `Today at ${timeString}`;
    } else {
        return `${diffDays} days ago`;
    }
}

function buildTree(flatComments) {
    const byId = new Map();
    const roots = [];

    flatComments.forEach(c => byId.set(c.id, { ...c, children: [] }));

    flatComments.forEach(c => {
        const node = byId.get(c.id);
        if (c.parentId && byId.has(c.parentId)) {
            byId.get(c.parentId).children.push(node);
        } else {
            roots.push(node);
        }
    });

    return roots;
}

function countDescendants(node) {
    return node.children.reduce((sum, c) => sum + 1 + countDescendants(c), 0);
}

function useMentionInput(users) {
    const [text, setText] = useState('');
    const [mentionedUsers, setMentionedUsers] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [mentionSearch, setMentionSearch] = useState('');
    const [cursorPosition, setCursorPosition] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const fieldRef = useRef(null);

    const handleTextChange = useCallback(
        e => {
            const newValue = e.target.value;
            setText(newValue);

            const cursorPos = e.target.selectionStart;
            const textBeforeCursor = newValue.slice(0, cursorPos);
            const matchMention = /@(\w*)$/.exec(textBeforeCursor);

            if (matchMention) {
                const searchTerm = matchMention[1].toLowerCase();
                setMentionSearch(searchTerm);

                const filtered = users
                    .filter(u => u?.display_name)
                    .filter(u => u.display_name.toLowerCase().includes(searchTerm))
                    .slice(0, 5);

                setFilteredUsers(filtered);
                setAnchorEl(fieldRef.current);
                setCursorPosition(cursorPos);
            } else {
                setAnchorEl(null);
            }
        },
        [users]
    );

    const handleMentionSelect = useCallback(
        selectedUser => {
            if (!selectedUser?.display_name) {
                console.error('Invalid user selected:', selectedUser);
                return;
            }

            setText(prev => {
                const textBeforeMention = prev.slice(0, cursorPosition - mentionSearch.length - 1);
                const textAfterMention = prev.slice(cursorPosition);
                return `${textBeforeMention}@${selectedUser.display_name}${textAfterMention} `;
            });

            setMentionedUsers(prev => (prev.includes(selectedUser.display_name) ? prev : [...prev, selectedUser.display_name]));
            setAnchorEl(null);
        },
        [cursorPosition, mentionSearch]
    );

    const handleKeyDown = useCallback(
        e => {
            if (anchorEl && e.key === 'Enter' && filteredUsers.length > 0) {
                e.preventDefault();
                handleMentionSelect(filteredUsers[0]);
            }
        },
        [anchorEl, filteredUsers, handleMentionSelect]
    );

    const reset = useCallback(() => {
        setText('');
        setMentionedUsers([]);
        setAnchorEl(null);
    }, []);

    return {
        text,
        setText,
        mentionedUsers,
        anchorEl,
        filteredUsers,
        fieldRef,
        handleTextChange,
        handleMentionSelect,
        handleKeyDown,
        reset
    };
}

function MentionPopper({ anchorEl, filteredUsers, onSelect }) {
    return (
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="top-start" style={{ zIndex: 1300 }}>
            <Paper>
                <MenuList>
                    {filteredUsers.map(user => (
                        <MenuItem key={user.uuid} onClick={() => onSelect(user)}>
                            <Avatar {...stringAvatar(user.display_name)} style={{ width: 24, height: 24, marginRight: 8 }} />
                            {user.display_name}
                        </MenuItem>
                    ))}
                </MenuList>
            </Paper>
        </Popper>
    );
}

function StatusPicker({ commentId, status, onStatusChange, open, onOpen, onClose, visible }) {
    const anchorRef = useRef(null);
    const currentStatus = status ?? 'none';

    return (
        <>
            <Tooltip title="Set status">
                <IconButton
                    size="small"
                    ref={anchorRef}
                    sx={{
                        p: 0.25,
                        visibility: visible ? 'visible' : 'hidden'
                    }}
                    onClick={() => (open ? onClose() : onOpen())}
                >
                    <FlagOutlinedIcon fontSize="small" />
                </IconButton>
            </Tooltip>

            <Popper open={open} anchorEl={anchorRef.current} placement="top-end" style={{ zIndex: 1300 }}>
                <ClickAwayListener onClickAway={onClose}>
                    <Paper sx={{ display: 'flex', gap: 0.5, p: 0.5 }}>
                        {STATUS_OPTIONS.map(({ value, label, icon }) => (
                            <Tooltip key={label} title={label}>
                                <IconButton
                                    size="small"
                                    onClick={() => {
                                        onStatusChange(commentId, value);
                                        onClose();
                                    }}
                                    sx={{ color: 'unset', backgroundColor: currentStatus === value ? 'action.selected' : 'transparent' }}
                                >
                                    {icon}
                                </IconButton>
                            </Tooltip>
                        ))}
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </>
    );
}

function ReactionPicker({ commentId, onReact, open, onOpen, onClose, visible }) {
    const anchorRef = useRef(null);

    return (
        <>
            <Tooltip title="Add Reaction">
                <IconButton
                    size="small"
                    ref={anchorRef}
                    sx={{
                        p: 0.25,
                        visibility: visible ? 'visible' : 'hidden'
                    }}
                    onClick={() => (open ? onClose() : onOpen())}
                >
                    <AddReactionOutlinedIcon fontSize="small" />
                </IconButton>
            </Tooltip>

            <Popper open={open} anchorEl={anchorRef.current} placement="top-end" style={{ zIndex: 1300 }}>
                <ClickAwayListener onClickAway={onClose}>
                    <Paper sx={{ display: 'flex', gap: 0.5, p: 0.5 }}>
                        {COMMENT_EMOJI_SET.map(({ code, emoji, label }) => (
                            <Tooltip key={code} title={label}>
                                <IconButton
                                    size="small"
                                    onClick={() => {
                                        onReact(commentId, code);
                                        onClose();
                                    }}
                                    sx={{ color: 'unset' }}
                                >
                                    {emoji}
                                </IconButton>
                            </Tooltip>
                        ))}
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </>
    );
}

function ReactionChip({ code, users, currentUser, onRemove }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const entry = COMMENT_EMOJI_SET.find(e => e.code === code);
    const isActive = users.includes(currentUser);

    return (
        <>
            <Box
                onMouseEnter={e => setAnchorEl(e.currentTarget)}
                onMouseLeave={() => setAnchorEl(null)}
                onClick={isActive ? () => onRemove(code) : undefined}
                sx={theme => ({
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.25,
                    px: 0.75,
                    py: 0.25,
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: isActive ? theme.palette.primary.main : 'divider',
                    backgroundColor: isActive ? theme.palette.background.paper : 'transparent',
                    fontSize: '0.75rem',
                    cursor: isActive ? 'pointer' : 'default',
                    userSelect: 'none'
                })}
            >
                <span>{entry.emoji}</span>
                <span>{users.length}</span>
            </Box>
            <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="top-start" sx={{ zIndex: 1300 }}>
                <Paper sx={{ p: 1, minWidth: '5vw' }}>
                    <Typography variant="body1" display="flex" justifyContent="center" fontWeight="bold" gutterBottom>
                        {entry.label}
                    </Typography>
                    {users.map(user => (
                        <Typography key={user} variant="caption" display="block">
                            {user}
                        </Typography>
                    ))}
                </Paper>
            </Popper>
        </>
    );
}

function VoteColumn({ votes, userVote, onVote }) {
    let voteColor = 'text.secondary';

    if (userVote === 'up') {
        voteColor = 'primary.main';
    } else if (userVote === 'down') {
        voteColor = 'error.main';
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0.25, minWidth: 28 }}>
            <IconButton size="small" onClick={() => onVote('up')} sx={{ p: 0.25, color: userVote === 'up' ? 'primary.main' : 'text.disabled' }}>
                <KeyboardArrowUpIcon fontSize="small" />
            </IconButton>
            <Typography
                variant="caption"
                sx={{
                    fontWeight: 600,
                    lineHeight: 1,
                    color: voteColor
                }}
            >
                {votes ?? 0}
            </Typography>
            <IconButton size="small" onClick={() => onVote('down')} sx={{ p: 0.25, color: userVote === 'down' ? 'error.main' : 'text.disabled' }}>
                <KeyboardArrowDownIcon fontSize="small" />
            </IconButton>
        </Box>
    );
}

function ReplyComposer({ users, isMobile, onSubmit, onCancel }) {
    const mention = useMentionInput(users);

    const handleSubmit = () => {
        if (!mention.text.trim()) return;
        onSubmit(mention.text, mention.mentionedUsers);
        mention.reset();
    };

    return (
        <Box sx={{ mt: 1, mb: 1.5, position: 'relative' }}>
            <TextField
                inputRef={mention.fieldRef}
                fullWidth
                multiline
                minRows={2}
                autoFocus
                size="small"
                placeholder={isMobile ? 'Add a reply' : "Add a reply — mention a user by typing '@' and their name"}
                value={mention.text}
                onChange={mention.handleTextChange}
                onKeyDown={mention.handleKeyDown}
            />
            <MentionPopper anchorEl={mention.anchorEl} filteredUsers={mention.filteredUsers} onSelect={mention.handleMentionSelect} />
            <Box sx={{ display: 'flex', gap: 1, mt: 0.75 }}>
                <Button size="small" variant="contained" disabled={!mention.text.trim()} onClick={handleSubmit}>
                    Reply
                </Button>
                <Button size="small" onClick={onCancel}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
}

function CommentNode({
    node,
    depth,
    users,
    isMobile,
    onReply,
    onVote,
    onReact,
    onStatusChange,
    currentUser,
    collapsedIds,
    toggleCollapsed,
    replyingId,
    setReplyingId
}) {
    const theme = useTheme();

    const replying = replyingId === node.id;
    const isCollapsed = collapsedIds.has(node.id);
    const hasChildren = node.children.length > 0;
    const replyCount = countDescendants(node);
    const [hovered, setHovered] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);
    const [statusPickerOpen, setStatusPickerOpen] = useState(false);

    const avatarStyle = { marginRight: '10px' };
    const authorDateStyle = { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' };

    const hasStatus = node.status && node.status !== 'none';

    let commentBackgroundColor = theme.palette.background.paper;
    if (node.status === 'open') {
        commentBackgroundColor = alpha(theme.palette.info.main, 0.08);
    } else if (hovered) {
        commentBackgroundColor = theme.palette.surface.container;
    }

    return (
        <Box
            sx={{
                pl: depth > 0 ? `${INDENT_PX}px` : 0,
                borderLeft: depth > 0 ? theme.palette.divider : 'none',
                ml: depth > 0 ? 1 : 0,
                borderRadius: 2,
                backgroundColor: commentBackgroundColor,
                transition: 'background-color 0.2s ease'
            }}
        >
            <ListItem
                alignItems="flex-start"
                style={{ paddingBottom: '1px', paddingLeft: depth > 0 ? 8 : 16 }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                    <VoteColumn votes={node.votes} userVote={node.userVote} onVote={dir => onVote(node.id, dir)} />

                    {!isMobile && (
                        <ListItemAvatar sx={{ minWidth: 'auto' }}>
                            <Avatar {...stringAvatar(node.author)} style={avatarStyle} />
                        </ListItemAvatar>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                        <div style={authorDateStyle}>
                            <Typography variant="subtitle1" component="span" style={{ fontWeight: 'bold' }}>
                                {node.author}
                            </Typography>
                            {isMobile && <Avatar {...stringAvatar(node.author)} style={avatarStyle} />}
                            <Typography variant="body2" color="textSecondary">
                                {getTimeDifferenceString(node.timestamp)}
                            </Typography>
                            {hasStatus && <Tooltip title={STATUS_TOOLTIP[node.status]}>{STATUS_ICON[node.status]}</Tooltip>}
                        </div>

                        <Typography variant="body1" gutterBottom style={{ wordBreak: 'break-word' }}>
                            {node.content}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: -0.5, flexWrap: 'wrap' }}>
                            <Button
                                size="small"
                                onClick={() => setReplyingId(replying ? null : node.id)}
                                sx={{ minWidth: 0, p: 0, textTransform: 'none', fontSize: '0.75rem' }}
                            >
                                Reply
                            </Button>

                            {hasChildren && (
                                <Button
                                    size="small"
                                    onClick={() => toggleCollapsed(node.id)}
                                    startIcon={isCollapsed ? <ChevronRightIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                                    sx={{ minWidth: 0, p: 0, textTransform: 'none', fontSize: '0.75rem' }}
                                >
                                    {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
                                </Button>
                            )}

                            {Object.entries(node.reactions ?? {})
                                .filter(([, reactors]) => reactors.length > 0)
                                .map(([code, reactors]) => (
                                    <ReactionChip
                                        key={code}
                                        code={code}
                                        users={reactors}
                                        currentUser={currentUser}
                                        onRemove={() => onReact(node.id, code)}
                                    />
                                ))}
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        borderRadius: 2,
                        backgroundColor: hovered ? theme.palette.surface.containerHigh : 'transparent'
                    }}
                >
                    <ReactionPicker
                        commentId={node.id}
                        onReact={onReact}
                        open={pickerOpen}
                        onOpen={() => setPickerOpen(true)}
                        onClose={() => setPickerOpen(false)}
                        visible={hovered || pickerOpen}
                    />
                    <StatusPicker
                        commentId={node.id}
                        status={node.status}
                        onStatusChange={onStatusChange}
                        open={statusPickerOpen}
                        onOpen={() => setStatusPickerOpen(true)}
                        onClose={() => setStatusPickerOpen(false)}
                        visible={hovered || statusPickerOpen}
                    />
                </Box>
            </ListItem>

            <Collapse in={replying} unmountOnExit>
                <ReplyComposer
                    users={users}
                    isMobile={isMobile}
                    onCancel={() => setReplyingId(null)}
                    onSubmit={(text, mentionedUsers) => {
                        onReply(node.id, text, mentionedUsers);
                        setReplyingId(null);
                    }}
                />
            </Collapse>

            {hasChildren && (
                <Collapse in={!isCollapsed} unmountOnExit>
                    <Box>
                        {node.children.map(child => (
                            <CommentNode
                                key={child.id}
                                node={child}
                                depth={depth + 1}
                                users={users}
                                isMobile={isMobile}
                                onReply={onReply}
                                onVote={onVote}
                                onReact={onReact}
                                onStatusChange={onStatusChange}
                                currentUser={currentUser}
                                collapsedIds={collapsedIds}
                                toggleCollapsed={toggleCollapsed}
                                replyingId={replyingId}
                                setReplyingId={setReplyingId}
                            />
                        ))}
                    </Box>
                </Collapse>
            )}
        </Box>
    );
}

const CommentsSection = ({ user, resourceId, comments: termComments, handleSaveDiscussion, setHasUncommittedChanges }) => {
    const theme = useTheme();

    const userDisplayName = user?.['displayName'];
    const [replyingId, setReplyingId] = useState(null);
    const [comments, setComments] = useState(termComments);
    const [users, setUsers] = useState([]);
    const [collapsedIds, setCollapsedIds] = useState(() => new Set());

    const topLevelMention = useMentionInput(users);
    const textFieldRef = topLevelMention.fieldRef;

    const { notifyNewComment } = usePushNotifications(user.displayName);
    const queryClient = useQueryClient();
    const isMobile = useMediaQuery(`(max-width:${SMALL_SCREEN_WIDTH})`);

    useEffect(() => {
        getAllUsers().then(users => {
            setUsers(users);
        });
    }, []);

    const dividerStyle = {
        flexGrow: 1,
        border: 'none',
        borderBottom: theme.palette.divider
    };

    const buttonStyle = {
        borderRadius: '20px',
        display: 'flex'
    };

    const tree = useMemo(() => buildTree(comments), [comments]);

    const toggleCollapsed = useCallback(id => {
        setCollapsedIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }, []);

    // Serializes every write (votes, replies, top-level comments) so a second
    // commit never starts until the previous one has fully resolved. Without
    // this, two quick actions (e.g. upvote then reply) can both read the same
    // GitHub file SHA and race — the second PUT gets rejected because the SHA
    // it sends is already stale by the time it lands.
    const commitQueueRef = useRef(Promise.resolve());

    const persist = useCallback(
        updatedComments => {
            const run = async () => {
                await handleSaveDiscussion({ resourceId, comments: updatedComments });
                setComments(updatedComments);
                await commitDiscussionOnly(queryClient);
            };

            const result = commitQueueRef.current.then(run, run);
            // Swallow so a failed commit doesn't permanently jam the queue for
            // whatever runs next — the caller of persist() still sees the error.
            commitQueueRef.current = result.catch(() => {});
            return result;
        },
        [handleSaveDiscussion, resourceId, queryClient]
    );

    const addComment = async (author, content, mentionedUsers, parentId = null) => {
        const newComment = {
            id: Math.random()
                .toString(36)
                .substring(2, 11),
            parentId,
            author,
            content,
            timestamp: new Date().toISOString(),
            mentionedUsers: mentionedUsers.length > 0 ? mentionedUsers : undefined,
            votes: 0,
            userVote: null
        };

        const updatedComments = [...comments, newComment];
        await persist(updatedComments);
        await notifyNewComment();
    };

    const handleTopLevelSubmit = () => {
        if (!topLevelMention.text.trim()) return;
        addComment(userDisplayName, topLevelMention.text, topLevelMention.mentionedUsers, null);
        topLevelMention.reset();
    };

    const handleReply = (parentId, text, mentionedUsers) => {
        addComment(userDisplayName, text, mentionedUsers, parentId);
    };

    const handleVote = async (commentId, direction) => {
        const updatedComments = comments.map(c => {
            if (c.id !== commentId) return c;

            const wasSame = c.userVote === direction;
            const hadOpposite = c.userVote !== null && !wasSame;

            let delta;
            if (wasSame) {
                delta = direction === 'up' ? -1 : 1;
            } else if (hadOpposite) {
                delta = direction === 'up' ? 2 : -2;
            } else {
                delta = direction === 'up' ? 1 : -1;
            }

            return {
                ...c,
                votes: (c.votes ?? 0) + delta,
                userVote: wasSame ? null : direction
            };
        });
        await persist(updatedComments);
    };

    const handleReact = (commentId, code) => {
        const updatedComments = comments.map(c => {
            if (c.id !== commentId) return c;
            const reactions = { ...c.reactions };
            // remove user from all codes first (one reaction per user per comment)
            for (const key of Object.keys(reactions)) {
                reactions[key] = reactions[key].filter(u => u !== userDisplayName);
            }
            // toggle: only add if user was not already on this code
            const wasReacted = (c.reactions?.[code] ?? []).includes(userDisplayName);
            if (!wasReacted) {
                reactions[code] = [...(reactions[code] ?? []), userDisplayName];
            }
            return { ...c, reactions };
        });
        persist(updatedComments);
    };

    const handleStatusChange = (commentId, value) => {
        const updatedComments = comments.map(comment => {
            if (comment.id !== commentId) return comment;
            if (comment.status === value) {
                return { ...comment, status: undefined };
            }
            return { ...comment, status: value };
        });
        persist(updatedComments);
    };

    return (
        <Paper elevation={0} style={{ paddingLeft: '1px', background: 'inherit' }}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
                <hr style={dividerStyle} />
            </Box>

            <List sx={{ maxHeight: '25vh', overflow: 'auto' }}>
                {tree.map(node => (
                    <CommentNode
                        key={node.id}
                        node={node}
                        depth={0}
                        users={users}
                        isMobile={isMobile}
                        onReply={handleReply}
                        onVote={handleVote}
                        onReact={handleReact}
                        onStatusChange={handleStatusChange}
                        currentUser={userDisplayName}
                        collapsedIds={collapsedIds}
                        toggleCollapsed={toggleCollapsed}
                        replyingId={replyingId}
                        setReplyingId={setReplyingId}
                    />
                ))}
            </List>

            <Box style={{ position: 'relative', display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
                <TextField
                    inputRef={textFieldRef}
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder={"Add a comment\nmention a user by typing '@' and their name"}
                    hidden={replyingId !== null}
                    fullWidth
                    style={{ paddingRight: '1px' }}
                    value={topLevelMention.text}
                    onChange={topLevelMention.handleTextChange}
                    onKeyDown={topLevelMention.handleKeyDown}
                />
                <MentionPopper
                    anchorEl={topLevelMention.anchorEl}
                    filteredUsers={topLevelMention.filteredUsers}
                    onSelect={topLevelMention.handleMentionSelect}
                />
                <Box style={{ position: 'absolute', right: 5, bottom: 5 }}>
                    <Button
                        variant="contained"
                        style={{
                            ...buttonStyle,
                            backgroundColor: topLevelMention.text.trim() ? theme.palette.secondary.main : theme.palette.action.disabledBackground
                        }}
                        onClick={handleTopLevelSubmit}
                        disabled={!topLevelMention.text.trim()}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user
});

CommentsSection.propTypes = {
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    resourceId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    handleSaveDiscussion: PropTypes.func.isRequired,
    setHasUncommittedChanges: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(CommentsSection);
