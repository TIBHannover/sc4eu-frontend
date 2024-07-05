import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import { useCommitChanges } from '../hooks/useCommitChanges';
import PropTypes from 'prop-types';

const CommitChanges = ({ refetch, openCommit, setOpenCommit }) => {
    const [commitMessage, setCommitMessage] = useState('');
    const { mutateAsync: commitChanges } = useCommitChanges(refetch, commitMessage);

    console.log('CommitChanges', refetch, commitMessage);

    const handleCommitMessageChange = event => {
        setCommitMessage(event.target.value);
    };
    const handleCommit = () => {
        commitChanges();
        setOpenCommit(false);
        setCommitMessage('');
    };
    return (
        <Dialog open={openCommit} onClose={() => setOpenCommit(false)} maxWidth="xl">
            <DialogTitle>Commit Changes</DialogTitle>
            <DialogContent>
                <DialogContentText>Please enter your commit message.</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="commitMessage"
                    label="Commit Message"
                    type="text"
                    fullWidth
                    multiline
                    maxRows={5}
                    value={commitMessage}
                    onChange={handleCommitMessageChange}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setOpenCommit(false);
                        setCommitMessage('');
                    }}
                >
                    Cancel
                </Button>
                <Button onClick={handleCommit} disabled={commitMessage.length === 0}>
                    Commit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

CommitChanges.propTypes = {
    refetch: PropTypes.func.isRequired,
    openCommit: PropTypes.bool.isRequired,
    setOpenCommit: PropTypes.func.isRequired
};

export default CommitChanges;
