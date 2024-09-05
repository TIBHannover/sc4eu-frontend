import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { commitChanges } from '../utils/CommitChanges';
import PropTypes from 'prop-types';
import { useQueryClient } from '@tanstack/react-query';

const CommitChanges = ({ refetch, openCommit, setOpenCommit, setHasUncommittedChanges }) => {
    const [commitMessage, setCommitMessage] = useState('');
    const queryClient = useQueryClient();

    const handleCommitMessageChange = event => {
        setCommitMessage(event.target.value);
    };
    const handleCommit = async () => {
        await commitChanges(queryClient, commitMessage);
        setHasUncommittedChanges(false);
        setOpenCommit(false);
    };
    return (
        <Dialog open={openCommit} onClose={() => setOpenCommit(false)} maxWidth="xl">
            <DialogTitle>Save Changes</DialogTitle>
            <DialogContent>
                <DialogContentText>Please enter a short description of your changes</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="commitMessage"
                    label="Enter your Message"
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
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

CommitChanges.propTypes = {
    refetch: PropTypes.func.isRequired,
    openCommit: PropTypes.bool.isRequired,
    setOpenCommit: PropTypes.func.isRequired,
    setHasUncommittedChanges: PropTypes.func.isRequired
};

export default CommitChanges;
