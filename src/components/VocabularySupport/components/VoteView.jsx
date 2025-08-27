import React, { useEffect, useState } from 'react';
import { Grid, Typography, Avatar, TextField, Button, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import {
    CheckCircle as ApprovedIcon,
    Cancel as RejectedIcon,
    ThumbUpAltOutlined,
    ThumbUpAlt,
    ThumbDownAltOutlined,
    ThumbDownAlt
} from '@mui/icons-material';
import { colorStyled } from '../../../styledComponents/styledColor';
import PropTypes from 'prop-types';
import { getTermVote, updateExpertDecision } from '../../../network/TermVoteCalls';
import Divider from '@mui/material/Divider';
import { stringAvatar } from './CommentsSection';

const styles = {
    button: {
        padding: '10px 20px',
        backgroundColor: colorStyled.SECONDARY.dark,
        '&:hover': { backgroundColor: 'darkgray' }
    },
    voteProgress: {
        backgroundColor: colorStyled.PRIMARY.lighter,
        p: 2,
        borderRadius: 1,
        mb: 3
    },
    voteCard: {
        p: 2,
        borderRadius: 1,
        mb: 3,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: colorStyled.CONTAINER_BACKGROUND_COLOR
    },
    recentVotesContainer: {
        maxHeight: 400,
        overflow: 'auto',
        border: '1px solid',
        borderColor: colorStyled.SCROLLBAR_BORDER_COLOR,
        borderRadius: 1,
        p: 1
    },
    voteItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: 1.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:hover': {
            backgroundColor: 'action.hover'
        },
        '&:last-child': {
            borderBottom: 'none'
        }
    },
    userInfoRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 1.5
    },
    commentBox: {
        pl: 4.5,
        borderLeft: '2px solid',
        borderColor: colorStyled.BORDER_COLOR,
        ml: 1
    },
    stickySidebar: {
        position: 'sticky',
        top: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 3
    }
};

const VoteView = ({ term, vote, username, setVoteViewMode }) => {
    const [decision, setDecision] = useState('');
    const [comment, setComment] = useState(null);
    const [decisions, setDecisions] = useState(vote.decisions);
    const [decisionMade, setDecisionMade] = useState(false);
    const [userHasVoted, setUserHasVoted] = useState(decisions.some(e => e.user_name === username && e.choice !== null));
    const approvedCount = decisions.filter(e => e.choice === 'approved').length;
    const rejectedCount = decisions.filter(e => e.choice === 'rejected').length;
    const votedUsers = decisions.filter(expert => expert.choice !== null);
    const totalVotes = decisions.filter(e => e.choice !== null).length;
    const [expandedComments, setExpandedComments] = useState(new Set());

    useEffect(() => {
        const getVote = async () => {
            const data = await getTermVote(term.identifier);
            if (data.length !== 0) {
                setDecisions(data[0].decisions);
            }
        };
        getVote();
    }, [decisionMade]);

    const handleExpertDecision = async () => {
        await updateExpertDecision(term.identifier, vote.uuid, username, decision, comment);
        setDecisionMade(true);
        setUserHasVoted(true);
        setComment(null);
        setDecision('');
    };

    return (
        <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {term.label}
                        </Typography>

                        <Divider
                            sx={{
                                bgcolor: vote.type === 'accept' ? 'success.main' : 'error.main',
                                height: 2,
                                mb: 1
                            }}
                        />

                        <Typography
                            variant="body1"
                            sx={{
                                color: vote.type === 'accept' ? 'success.dark' : 'error.dark',
                                fontWeight: 500,
                                textTransform: 'uppercase',
                                letterSpacing: 0.5
                            }}
                        >
                            {vote.type === 'accept' ? '→ Accept Proposal' : '→ Reject Proposal'}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {vote.type === 'accept' ? 'Change term status to accept' : 'Change term status to reject'}
                        </Typography>
                    </Box>

                    <Box sx={styles.voteProgress}>
                        <Typography variant="body1" paragraph>
                            <strong>Consensus progress:</strong> {totalVotes} people voted
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {approvedCount} approved • {rejectedCount} rejected
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                            Note: At least three votes are required to reach a consensus. Furthermore, a two-thirds majority is required for the proposed change of status.
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} md={8}>
                    {userHasVoted ? (
                        <Box sx={styles.voteCard}>
                            <Typography variant="body1" paragraph>
                                You have already voted. Would you like to change your vote?
                            </Typography>
                            <Button
                                variant="contained"
                                sx={styles.button}
                                onClick={() => {
                                    setUserHasVoted(false);
                                    setDecisionMade(false);
                                }}
                            >
                                Change vote
                            </Button>
                        </Box>
                    ) : (
                        <Box sx={styles.voteCard}>
                            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                                Make your decision
                            </Typography>

                            <RadioGroup value={decision} onChange={e => setDecision(e.target.value)} sx={{ gap: 2, mb: 2 }} row>
                                <FormControlLabel
                                    value="approved"
                                    control={<Radio icon={<ThumbUpAltOutlined />} checkedIcon={<ThumbUpAlt color="success" />} />}
                                    label="Approve"
                                />
                                <FormControlLabel
                                    value="rejected"
                                    control={<Radio icon={<ThumbDownAltOutlined />} checkedIcon={<ThumbDownAlt color="error" />} />}
                                    label="Reject"
                                />
                            </RadioGroup>

                            <TextField
                                label="Comment (Optional)"
                                multiline
                                rows={3}
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                fullWidth
                                sx={{ mb: 2 }}
                            />

                            <Button variant="contained" disabled={!decision} fullWidth size="large" onClick={handleExpertDecision} sx={styles.button}>
                                Submit Decision
                            </Button>
                        </Box>
                    )}
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box sx={styles.stickySidebar}>
                        <Box sx={styles.voteCard}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <Avatar {...stringAvatar(vote.assignee)} sx={{ mr: 2, width: 32, height: 32 }} />
                                <Typography variant="subtitle1" gutterBottom>
                                    Created by {vote.assignee}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                                    {new Date(vote.created_at).toLocaleDateString() + ', ' + new Date(vote.created_at).toLocaleTimeString()}
                                </Typography>
                            </Box>
                            {vote.reason && (
                                <Box
                                    sx={{
                                        mt: 1,
                                        overflow: 'auto',
                                        maxHeight: 223
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontStyle: 'italic',
                                            color: colorStyled.TEXTCOLOR,
                                            mt: 1
                                        }}
                                    >
                                        {vote.reason}
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        <Box sx={styles.voteCard}>
                            <Typography variant="subtitle1" gutterBottom>
                                Recent Votes
                            </Typography>

                            <Box sx={styles.recentVotesContainer}>
                                {votedUsers.length > 0 ? (
                                    votedUsers
                                        .sort((a, b) => new Date(b.voted_at) - new Date(a.voted_at))
                                        .slice(0, 5)
                                        .map((user, index) => (
                                            <Box key={index} sx={styles.voteItem}>
                                                <Box sx={styles.userInfoRow}>
                                                    <Avatar {...stringAvatar(vote.assignee)} sx={{ width: 32, height: 32 }} />
                                                    <Typography variant="body2" fontWeight="medium">
                                                        {user.user_name}
                                                    </Typography>
                                                    {user.choice === 'approved' ? (
                                                        <>
                                                            <ApprovedIcon color="success" fontSize="small" />
                                                            <Typography variant="body2">approved</Typography>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <RejectedIcon color="error" fontSize="small" />
                                                            <Typography variant="body2">rejected</Typography>
                                                        </>
                                                    )}
                                                    <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                                                        {new Date(user.updated_at).toLocaleDateString() +
                                                            ', ' +
                                                            new Date(user.updated_at).toLocaleTimeString()}
                                                    </Typography>
                                                </Box>

                                                {user.comment && (
                                                    <Box sx={styles.commentBox}>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontStyle: 'italic',
                                                                color: colorStyled.TEXTCOLOR,
                                                                mt: 0.5
                                                            }}
                                                        >
                                                            "
                                                            {expandedComments.has(index)
                                                                ? user.comment
                                                                : user.comment.length > 100
                                                                ? user.comment.substring(0, 100)
                                                                : user.comment}
                                                            "
                                                            {user.comment.length > 100 && (
                                                                <Typography
                                                                    component="span"
                                                                    variant="caption"
                                                                    onClick={() => {
                                                                        const newExpanded = new Set(expandedComments);
                                                                        if (newExpanded.has(index)) {
                                                                            newExpanded.delete(index);
                                                                        } else {
                                                                            newExpanded.add(index);
                                                                        }
                                                                        setExpandedComments(newExpanded);
                                                                    }}
                                                                    sx={{
                                                                        color: colorStyled.SECONDARY.link,
                                                                        cursor: 'pointer',
                                                                        ml: 0.5,
                                                                        '&:hover': {
                                                                            textDecoration: 'underline'
                                                                        }
                                                                    }}
                                                                >
                                                                    {expandedComments.has(index) ? ' show less' : '... show more'}
                                                                </Typography>
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        ))
                                ) : (
                                    <Typography variant="body2" color="text.disabled" sx={{ p: 1 }}>
                                        No votes yet
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" sx={styles.button} onClick={() => setVoteViewMode(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

VoteView.propTypes = {
    term: PropTypes.object.isRequired,
    vote: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    setVoteViewMode: PropTypes.object.isRequired
};

export default VoteView;
