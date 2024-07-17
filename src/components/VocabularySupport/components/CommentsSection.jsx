import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { colorStyled } from '../../../styledComponents/styledColor';
import { Box, ListItem, ListItemAvatar, Paper } from '@mui/material';
import List from '@mui/material/List';

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

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
const textAreaStyle = {
    marginTop: '10px',
    width: '100%',
    borderRadius: '10px', // Make the text box rounder
    minHeight: '50px' // Make the text box longer
};
const buttonStyle = {
    borderRadius: '20px', // Make the button rounder
    backgroundColor: colorStyled.SECONDARY.dark,
    display: 'flex'
};

function getTimeDifferenceString(date) {
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

const CommentsSection = () => {
    const [newCommentText, setNewCommentText] = useState('');

    const [comments, setComments] = useState([
        {
            avatar: 'Fawad Khan',
            author: 'Fawad Khan',
            date: new Date(),
            text: "This is just a first comment, I don't like the Label"
        }
    ]);
    const addComment = (author, text) => {
        const newComment = {
            avatar: author,
            author,
            date: new Date(),
            text
        };
        setComments([...comments, newComment]);
        setNewCommentText(''); // Clear the text field after adding comment
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
                            <Avatar {...stringAvatar(comment.avatar)} style={avatarStyle} />
                        </ListItemAvatar>
                        <Box style={contentStyle}>
                            <div style={authorDateStyle}>
                                <Typography variant="subtitle1" component="span" style={{ fontWeight: 'bold' }}>
                                    {comment.author}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {getTimeDifferenceString(comment.date)}
                                </Typography>
                            </div>
                            <Typography variant="body1" gutterBottom>
                                {comment.text}
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
                        style={buttonStyle} // Adjust styling as needed
                        onClick={() => addComment('New Author', newCommentText)}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default CommentsSection;
