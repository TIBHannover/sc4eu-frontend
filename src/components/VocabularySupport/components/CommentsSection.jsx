import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { colorStyled } from '../../../styledComponents/styledColor';
import { Box, ListItem, ListItemAvatar, Paper } from '@mui/material';
import List from '@mui/material/List';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            backgroundColor: stringToColor(name)
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    };
}

function getTimeDifferenceString(isoDateString) {
    const date = new Date(isoDateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

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

    const addComment = async (author, content) => {
        const newComment = {
            "id": Math.random().toString(36).substring(2, 11),
            author,
            content,
            timestamp: (new Date()).toISOString()
        };

        const updatedComments = [...comments, newComment];

        await handleSaveDiscussion({"resourceId" : resourceId, "comments": updatedComments });
        setComments(updatedComments);
        setNewCommentText(''); // Clear the text field after adding comment
        setHasUncommittedChanges(true);
    };

    return (
        <Paper elevation={0} style={{ paddingLeft: '1px', background: 'inherit' }}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h7" component="div" style={{ marginRight: '10px' }}>
                    Comments
                </Typography>
                <hr style={dividerStyle} />
            </Box>
            <List style={{ maxHeight: '220px', overflow: 'auto' }}>
                {comments.map((comment, index) => (
                    <ListItem key={index} alignItems="flex-start" style={{ paddingBottom: '1px' }}>
                        <ListItemAvatar>
                            <Avatar {...stringAvatar(comment.author)} style={avatarStyle} />
                        </ListItemAvatar>
                        <Box style={contentStyle}>
                            <div style={authorDateStyle}>
                                <Typography variant="subtitle1" component="span" style={{ fontWeight: 'bold' }}>
                                    {comment.author}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {getTimeDifferenceString(comment.timestamp)}
                                </Typography>
                            </div>
                            <Typography variant="body1" gutterBottom>
                                {comment.content}
                            </Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>

            <Box style={{ position: 'relative', display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
                <TextField
                    multiline
                    rows={4} // Adjust the rows as needed to ensure there's enough space for the button
                    variant="outlined"
                    placeholder="Add a comment"
                    fullWidth
                    style={{ paddingRight: '1px' }}
                    value={newCommentText}
                    onChange={e => setNewCommentText(e.target.value)}
                />
                <Box style={{ position: 'absolute', right: 5, bottom: 5 }}>
                    <Button
                        variant="contained"
                        style={{
                            ...buttonStyle,
                            backgroundColor: newCommentText.trim() ? colorStyled.SECONDARY.dark : 'gray'
                    }} // Adjust styling as needed
                        onClick={() => addComment(userDisplayName, newCommentText)}
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
    flexDirection: 'column'
};

const dividerStyle = {
    flexGrow: 1,
    border: 'none',
    borderBottom: '1px solid #ccc'
};

const authorDateStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px' // Adds a small gap between the author name and the date
};

const buttonStyle = {
    borderRadius: '20px', // Make the button rounder
    backgroundColor: colorStyled.SECONDARY.dark,
    display: 'flex'
};
