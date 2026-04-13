import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { colorStyled } from '../../../styledComponents/styledColor';
import { Box, ListItem, ListItemAvatar, Paper } from '@mui/material';
import { getAllUsers } from '../../../network/UserProfileCalls';
import List from '@mui/material/List';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { commitDiscussionOnly } from '../utils/CommitChanges';
import { useQueryClient } from '@tanstack/react-query';
import { usePushNotifications } from '../../../hooks/usePushNotifications';
import { SMALL_SCREEN_WIDTH } from '../../../styledComponents/styledComponents';
import { useMediaQuery } from '@material-ui/core';

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

const CommentsSection = ({ user, resourceId, comments: termComments, handleSaveDiscussion, setHasUncommittedChanges }) => {
    const userDisplayName = user?.['displayName'];
    const [newCommentText, setNewCommentText] = useState('');
    const [comments, setComments] = useState(termComments);

    const [users, setUsers] = useState([]);

    const [mentionAnchorEl, setMentionAnchorEl] = useState(null);
    const [mentionSearch, setMentionSearch] = useState('');
    const [cursorPosition, setCursorPosition] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const textFieldRef = React.useRef(null);
    const [mentionedUsers, setMentionedUsers] = useState([]);

    const { notifyNewComment } = usePushNotifications(user.displayName);
    const queryClient = useQueryClient();
    const isMobile = useMediaQuery(`(max-width:${SMALL_SCREEN_WIDTH})`);

    useEffect(() => {
        getAllUsers().then(users => {
            setUsers(users);
        });
    }, []); // Empty dependency array means this runs once on mount

    const addComment = async (author, content, mentionedUsers) => {
        const newComment = {
            id: Math.random()
                .toString(36)
                .substring(2, 11),
            author,
            content,
            timestamp: new Date().toISOString(),
            mentionedUsers: mentionedUsers.length > 0 ? mentionedUsers : undefined
        };

        const updatedComments = [...comments, newComment];

        await handleSaveDiscussion({ resourceId: resourceId, comments: updatedComments });
        setComments(updatedComments);
        setNewCommentText(''); // Clear the text field after adding comment
        //setHasUncommittedChanges(true);
        // Discussion here needs to be commited automatically
        commitDiscussionOnly(queryClient);
        await notifyNewComment();
    };

    const handleTextChange = e => {
        const newValue = e.target.value;
        setNewCommentText(newValue);

        const cursorPos = e.target.selectionStart;
        const textBeforeCursor = newValue.slice(0, cursorPos);
        const matchMention = /@(\w*)$/.exec(textBeforeCursor);

        if (matchMention) {
            const searchTerm = matchMention[1].toLowerCase();
            setMentionSearch(searchTerm);

            // Filter out invalid users and handle null display_name
            const filtered = users
                .filter(user => user && user.display_name) // Filter out null/undefined
                .filter(user => user.display_name.toLowerCase().includes(searchTerm))
                .slice(0, 5);

            setFilteredUsers(filtered);
            setMentionAnchorEl(textFieldRef.current);
            setCursorPosition(cursorPos);
        } else {
            setMentionAnchorEl(null);
        }
    };

    const handleMentionSelect = selectedUser => {
        if (!selectedUser || !selectedUser.display_name) {
            console.error('Invalid user selected:', selectedUser);
            return;
        }

        const textBeforeMention = newCommentText.slice(0, cursorPosition - mentionSearch.length - 1);
        const textAfterMention = newCommentText.slice(cursorPosition);
        const newText = `${textBeforeMention}@${selectedUser.display_name}${textAfterMention} `;
        if (!mentionedUsers.includes(selectedUser.display_name)) {
            setMentionedUsers([...mentionedUsers, selectedUser.display_name]);
        }
        setNewCommentText(newText);
        setMentionAnchorEl(null);
    };

    const handleKeyDown = e => {
        if (mentionAnchorEl && e.key === 'Enter' && filteredUsers.length > 0) {
            e.preventDefault();
            handleMentionSelect(filteredUsers[0]);
        }
    };

    return (
        <Paper elevation={0} style={{ paddingLeft: '1px', background: 'inherit' }}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
                <hr style={dividerStyle} />
            </Box>
            <List sx={{ maxHeight: '25vh', overflow: 'auto' }}>
                {comments.map((comment, index) => (
                    <ListItem key={index} alignItems="flex-start" style={{ paddingBottom: '1px' }}>
                        {!isMobile && (
                            <ListItemAvatar>
                                <Avatar {...stringAvatar(comment.author)} style={avatarStyle} />
                            </ListItemAvatar>
                        )}
                        <Box style={contentStyle}>
                            <div style={authorDateStyle}>
                                <Typography variant="subtitle1" component="span" style={{ fontWeight: 'bold' }}>
                                    {comment.author}
                                </Typography>
                                {isMobile && <Avatar {...stringAvatar(comment.author)} style={avatarStyle} />}
                                <Typography variant="body2" color="textSecondary">
                                    {getTimeDifferenceString(comment.timestamp)}
                                </Typography>
                            </div>
                            <Typography variant="body1" gutterBottom style={{ wordBreak: 'break-word' }}>
                                {comment.content}
                            </Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>

            <Box style={{ position: 'relative', display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
                <TextField
                    ref={textFieldRef}
                    multiline
                    rows={4} // Adjust the rows as needed to ensure there's enough space for the button
                    variant="outlined"
                    placeholder={"Add a comment\nmention a user by typing '@' and their name"}
                    fullWidth
                    style={{ paddingRight: '1px' }}
                    value={newCommentText}
                    onChange={handleTextChange}
                    onKeyDown={handleKeyDown}
                />
                <Popper open={Boolean(mentionAnchorEl)} anchorEl={mentionAnchorEl} placement="top-start" style={{ zIndex: 1300 }}>
                    <Paper>
                        <MenuList>
                            {filteredUsers.map(user => (
                                <MenuItem key={user.uuid} onClick={() => handleMentionSelect(user)}>
                                    <Avatar {...stringAvatar(user.display_name)} style={{ width: 24, height: 24, marginRight: 8 }} />
                                    {user.display_name}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Paper>
                </Popper>
                <Box style={{ position: 'absolute', right: 5, bottom: 5 }}>
                    <Button
                        variant="contained"
                        style={{
                            ...buttonStyle,
                            backgroundColor: newCommentText.trim() ? colorStyled.old.darkSecondary : 'gray'
                        }} // Adjust styling as needed
                        onClick={() => addComment(userDisplayName, newCommentText, mentionedUsers)}
                        disabled={!newCommentText.trim()}
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

// Styling
const avatarStyle = {
    marginRight: '10px'
};

const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0
};

const dividerStyle = {
    flexGrow: 1,
    border: 'none',
    borderBottom: '1px solid #ccc'
};

const authorDateStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap'
};

const buttonStyle = {
    borderRadius: '20px',
    display: 'flex',
    backgroundColor: colorStyled.old.darkSecondary
};
