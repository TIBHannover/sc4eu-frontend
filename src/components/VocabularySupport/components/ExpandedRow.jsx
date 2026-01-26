import {
    Box,
    Typography,
    TextField,
    Button,
    Tooltip,
    IconButton,
    Link,
    FormControlLabel,
    RadioGroup,
    Radio,
    Paper,
    Chip
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PropTypes from 'prop-types';
import CommentsSection from './CommentsSection';
import { colorStyled } from '../../../styledComponents/styledColor';
import {
    getTermLastConsensus,
    getTermVote,
    initiateNewVote,
    manualCloseConsensus
} from '../../../network/TermVoteCalls';
import VoteView from './VoteView';
import MaterialUIPopUp from '../../ReusableComponents/MaterialUIPopUp';
import FadingNotification from '../../ReusableComponents/FadingNotification';
import InfoIcon from '@mui/icons-material/Info';
import { StyledTooltip } from '../../../styledComponents/styledComponents';
import LastConsensusView from './LastConsensusView';
import { commitChanges } from '../utils/CommitChanges';
import { useQueryClient } from '@tanstack/react-query';

const ExpandedRow = ({ term, currentUser, updateTerm, termComments, handleSaveDiscussion, setHasUncommittedChanges, handleClosePopup }) => {
    const [editMode, setEditMode] = useState(false);
    const [viewAgreementMode, setViewAgreementMode] = useState(false);
    const [activeAgreement, setActiveAgreement] = useState(false);
    const [notification, setNotification] = useState(false);
    const [initiateTermAgreement, setInitiateTermAgreement] = useState(false);
    const [agreementType, setAgreementType] = useState(null);
    const [reason, setReason] = useState(null);
    const [openLastConsensusDialog, setOpenLastConsensusDialog] = useState(false);
    const [lastConsensus, setLastConsensus] = useState(null);
    const [isConsensusSubmitted, setIsConsensusSubmitted] = useState(false);
    const [isConsensusClosed, setIsConsensusClosed] = useState(false);
    const queryClient = useQueryClient();

    const [updatedTerm, setUpdatedTerm] = useState({
        ...term,
        altLabel: term.altLabel || '',
        description: term.description || '',
        seeAlso: term.seeAlso || '',
        status: term.status || '',
        created: term.created || '',
        modified: term.modified || ''
    });

    useEffect(() => {
        const getVote = async () => {
            const data = await getTermVote(term.identifier);
            if (!data.error) {
                setActiveAgreement(data[0]);
            }
        };
        const getLastConsensus = async () => {
            const data = await getTermLastConsensus(term.identifier);
            if (!data.error) {
                setLastConsensus(data);
            }
        }

        getVote();
        getLastConsensus();
    }, [isConsensusSubmitted, isConsensusClosed, term.identifier]);

    const splitAltLabels = altLabel => {
        return altLabel ? altLabel.split(',') : [''];
    };

    const handleInputChange = e => {
        let { name, value } = e.target;
        if (name.startsWith('altLabel')) {
            const index = Number.parseInt(name.split('-')[1], 10);
            const altLabels = splitAltLabels(updatedTerm.altLabel);
            altLabels[index] = value;
            value = altLabels.join(',');
            setUpdatedTerm({ ...updatedTerm, altLabel: value, modified: new Date().toISOString() });
        } else {
            setUpdatedTerm({ ...updatedTerm, [name]: value, modified: new Date().toISOString() });
        }
    };

    const handleAddAlternativeLabel = () => {
        if (!updatedTerm.altLabel) {
            setUpdatedTerm({ ...updatedTerm, altLabel: '' });
            return;
        }

        const altLabels = splitAltLabels(updatedTerm.altLabel);
        altLabels.push('');
        setUpdatedTerm({ ...updatedTerm, altLabel: altLabels.join(','), modified: new Date().toISOString() });
    };

    const handleSave = () => {
        updateTerm(updatedTerm);
        setHasUncommittedChanges(true);
        setEditMode(false);
    };

    const handleClose = () => {
        handleClosePopup();
    };

    const renderSeeAlso = () => {
        if (!updatedTerm.seeAlso) {
            return '';
        }
        if (updatedTerm.seeAlso.startsWith('url:')) {
            const url = updatedTerm.seeAlso.substring(4);
            return (
                <Link href={url} target="_blank" rel="noopener noreferrer">
                    {updatedTerm.label}
                </Link>
            );
        }
        return updatedTerm.seeAlso;
    };

    const handleAgreementSubmit = async () => {
        await initiateNewVote(term.identifier, currentUser.displayName, agreementType, reason);
        setInitiateTermAgreement(false);
        setAgreementType(null);
        setReason(null);
        setNotification(true);
        setIsConsensusSubmitted(true);
    };

    return (
        <Box sx={{ paddingLeft: 2, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {notification && <FadingNotification message="Vote successfully submitted" timeout={3000} />}
            {initiateTermAgreement && (
                <MaterialUIPopUp
                    open={initiateTermAgreement}
                    onClose={() => {
                        setInitiateTermAgreement(false);
                        setAgreementType(null);
                        setReason(null);
                    }}
                    title="Start Term Consensus"
                    message={
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="body1" paragraph>
                                    This action invites all users registered in a vocabulary platform to participate in deciding the term’s status.
                                    Once enough people have voted, the decision is made by a two-thirds majority,
                                    ensuring that changes reflect broad agreement in a community.
                                </Typography>
                            </Paper>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Select consensus type:
                                </Typography>
                                <RadioGroup value={agreementType} onChange={e => setAgreementType(e.target.value)}>
                                    <Box sx={{ mb: 2 }}>
                                        <FormControlLabel
                                            value="ACCEPT"
                                            control={<Radio />}
                                            label={
                                                <Box>
                                                    <Typography>Accept</Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0 }}>
                                                        Term's status will be changed to the accepted if consensus succeeds.
                                                    </Typography>
                                                </Box>
                                            }
                                            sx={{ alignItems: 'flex-start' }}
                                        />
                                    </Box>
                                    <Box>
                                        <FormControlLabel
                                            value="REJECT"
                                            control={<Radio />}
                                            label={
                                                <Box>
                                                    <Typography>Not Accept</Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0 }}>
                                                        Term's status will be changed to not accepted if consensus succeeds.
                                                    </Typography>
                                                </Box>
                                            }
                                            sx={{ alignItems: 'flex-start' }}
                                        />
                                    </Box>
                                </RadioGroup>
                            </Paper>
                            <Paper>
                                <TextField
                                    label="Reason (Optional)"
                                    multiline
                                    rows={3}
                                    value={reason}
                                    onChange={e => setReason(e.target.value)}
                                    fullWidth
                                />
                            </Paper>
                            <Tooltip title="Select at least one vote type" disableHoverListener={!!agreementType}>
                                <Box sx={{ width: 'fit-content' }}>
                                    <Button
                                        onClick={() => handleAgreementSubmit()}
                                        variant="contained"
                                        sx={{
                                            backgroundColor: colorStyled.ORANGE_COLOR,
                                            '&:hover': { backgroundColor: colorStyled.ORANGE_COLOR }
                                        }}
                                        disabled={!agreementType}
                                    >
                                        Initiate Consensus
                                    </Button>
                                </Box>
                            </Tooltip>
                        </Box>
                    }
                    paperSizeStyles={{
                        minHeight: '0%',
                        maxHeight: '60%',
                        minWidth: '60%',
                        maxWidth: '60%'
                    }}
                />
            )}
            {openLastConsensusDialog && (
                <LastConsensusView consensus={lastConsensus} open={openLastConsensusDialog} onClose={() => setOpenLastConsensusDialog(false)}/>
            )}
            {viewAgreementMode && (
                <VoteView term={term} vote={activeAgreement} username={currentUser.displayName} setVoteViewMode={setViewAgreementMode} />
            )}
            {!editMode && !viewAgreementMode && (
                <Box>
                    <Box sx={{ display: 'flex', width: '100%', flexGrow: 1, gap: '20px', padding: '5px' }}>
                        <Paper
                            elevation={2}
                            sx={{
                                width: '50%',
                                maxHeight: 'calc(90vh - 100px)',
                                flex: '1',
                                display: 'flex',
                                flexDirection: 'column',
                                overflowY: 'auto'
                            }}
                        >
                            <Typography variant="h6" sx={{ textAlign: 'center' }}>
                                Term's Detail
                                {activeAgreement && (
                                    <StyledTooltip title="There is an ongoing consensus - new consensus could not be started.">
                                        <InfoIcon />
                                    </StyledTooltip>
                                )}
                            </Typography>
                            <Typography>
                                <Tooltip title="Unique identifier for the term">
                                    <IconButton style={{ marginBottom: '4px' }} size="small">
                                        <HelpOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <strong>Identifier:</strong> {updatedTerm.identifier}
                            </Typography>
                            <Typography>
                                <Tooltip title="Provides Human-readable version of a resource's name. In the final agreed Term only one preferred and many alternative labels exist">
                                    <IconButton style={{ marginBottom: '4px' }} size="small">
                                        <HelpOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <strong>Label:</strong> {updatedTerm.label}
                            </Typography>
                            {/* Alternative labels */}
                            {updatedTerm.altLabel &&
                                splitAltLabels(updatedTerm.altLabel).map((label, index) => (
                                    <Typography key={'altLabel' + index}>
                                        <Tooltip title="Provides an alternative Label">
                                            <IconButton style={{ marginBottom: '4px' }} size="small">
                                                <HelpOutlineIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <strong>Alternative Label {index + 1}:</strong> {label}
                                    </Typography>
                                ))}
                            {/* Description */}
                            <Typography>
                                <Tooltip title="Provides a human-readable description of a Term">
                                    <IconButton style={{ marginBottom: '4px' }} size="small">
                                        <HelpOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <strong>Description:</strong> {updatedTerm.description}
                            </Typography>
                            {/* See also */}
                            <Typography>
                                <Tooltip title="Indicates a resource that might provide additional information about the subject resource">
                                    <IconButton style={{ marginBottom: '4px' }} size="small">
                                        <HelpOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <strong>See Also:</strong> {renderSeeAlso()}
                            </Typography>
                            <Typography>
                                <Tooltip title="Provides the creation date of the term">
                                    <IconButton style={{ marginBottom: '4px' }} size="small">
                                        <HelpOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <strong>Created at:</strong> {updatedTerm.created}
                            </Typography>
                            <Typography>
                                <Tooltip title="Provides the last modified date of the term">
                                    <IconButton style={{ marginBottom: '4px' }} size="small">
                                        <HelpOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <strong>Last modified:</strong> {updatedTerm.modified}
                            </Typography>
                            {/* Status */}
                            <Typography>
                                <Tooltip title="Status: Draft, Reject, Accept">
                                    <IconButton style={{ marginBottom: '4px' }} size="small">
                                        <HelpOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <strong>Status:</strong> {updatedTerm.status}
                                {lastConsensus && (
                                    <Chip
                                        label="Check last consensus"
                                        size="small"
                                        sx={{ ml: 0.5, mb: 0.5, backgroundColor: colorStyled.PRIMARY.main }}
                                        onClick={() => setOpenLastConsensusDialog(true)}
                                    />
                                )}
                            </Typography>

                            {/* Action buttons */}
                            <Box sx={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-start', gap: '15px' }}>
                                <Button onClick={() => setEditMode(true)} variant="contained" sx={buttonStyle}>
                                    Edit Term
                                </Button>
                                <Button onClick={handleClose} variant="contained" sx={buttonStyle}>
                                    Close
                                </Button>
                                {!activeAgreement && (
                                    <Tooltip title="Decide if the term's status is ready to be changed">
                                        <Button
                                            disabled={activeAgreement}
                                            onClick={() => setInitiateTermAgreement(true)}
                                            variant="contained"
                                            sx={buttonStyle}
                                        >
                                            Start consensus
                                        </Button>
                                    </Tooltip>
                                )}
                                {activeAgreement && (
                                    <>
                                        <Button
                                            onClick={() => setViewAgreementMode(true)}
                                            variant="contained"
                                            sx={{
                                                backgroundColor: colorStyled.ORANGE_COLOR,
                                                '&:hover': { backgroundColor: colorStyled.ORANGE_COLOR }
                                            }}
                                        >
                                            View ongoing consensus
                                        </Button>
                                        {currentUser.role.toString().toLowerCase() === 'system admin' && (
                                            <Button
                                                onClick={async () => {
                                                    const data = await manualCloseConsensus(term.identifier, activeAgreement.uuid);
                                                    if (data.status === "accept" || data.status === "not accept") {
                                                        const newTerm = {
                                                            ...term,
                                                            status: data.status,
                                                            modified: new Date().toISOString(),
                                                        };
                                                        await updateTerm(newTerm);
                                                        await commitChanges(queryClient, `Update ${term.label} status after consensus` );
                                                    }
                                                    setIsConsensusClosed(true);
                                                }}
                                                variant="contained"
                                                sx={buttonStyle}
                                            >
                                                Close consensus
                                            </Button>
                                        )}
                                    </>
                                )}
                            </Box>
                        </Paper>
                        <Box
                            sx={{
                                width: '50%',
                                padding: '10px',
                                backgroundColor: '#f4f4f4',
                                borderRadius: '8px',
                                overflowY: 'auto',
                                maxHeight: 'calc(100vh - 100px)'
                            }}
                        >
                            <Typography variant="h6" sx={{ textAlign: 'center' }}>
                                Discussion
                            </Typography>
                            <CommentsSection
                                resourceId={term.identifier}
                                comments={termComments || []}
                                mentionedUsers={[]}
                                handleSaveDiscussion={handleSaveDiscussion}
                                setHasUncommittedChanges={setHasUncommittedChanges}
                            />
                        </Box>
                    </Box>
                </Box>
            )}
            {editMode && !viewAgreementMode && (
                <Box sx={{ display: 'flex', width: '100%', flexGrow: 1, gap: '20px', padding: '5px' }}>
                    <Box
                        sx={{
                            width: '50%',
                            maxHeight: 'calc(90vh - 100px)',
                            overflowY: 'auto',
                            flex: '1',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle2" sx={{ marginBottom: '5px' }}>
                                <strong>Label:</strong>
                            </Typography>
                            <TextField
                                name="label"
                                value={updatedTerm.label}
                                onChange={handleInputChange}
                                fullWidth
                                InputProps={{ sx: { height: '40px' } }}
                                InputLabelProps={{ sx: { lineHeight: '40px' } }}
                                sx={{ marginBottom: '15px' }}
                            />
                        </Box>
                        {splitAltLabels(updatedTerm.altLabel).map((label, index) => (
                            <Box key={'altLabel_' + index} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="subtitle2" sx={{ marginTop: '10px' }}>
                                    <strong>Alternative Label {index + 1}:</strong>
                                </Typography>
                                <TextField
                                    name={`altLabel-${index}`}
                                    value={label}
                                    onChange={handleInputChange}
                                    fullWidth
                                    InputProps={{ sx: { height: '40px' } }}
                                    InputLabelProps={{ sx: { lineHeight: '40px' } }}
                                    sx={{ marginBottom: '15px' }}
                                    placeholder={`Alternative Label ${index + 1}`}
                                />
                            </Box>
                        ))}
                        {(!updatedTerm.altLabel || splitAltLabels(updatedTerm.altLabel).length < 5) && (
                            <Button onClick={handleAddAlternativeLabel}>+ Add Alternative Label</Button>
                        )}
                        {/* Other fields */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                            <Typography variant="subtitle2" sx={{ marginBottom: '5px' }}>
                                <strong>Description:</strong>
                            </Typography>
                            <TextField
                                name="description"
                                value={updatedTerm.description}
                                onChange={handleInputChange}
                                fullWidth
                                InputProps={{ sx: { height: '40px' } }}
                                InputLabelProps={{ sx: { lineHeight: '40px' } }}
                                sx={{ marginBottom: '15px' }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                            <Typography variant="subtitle2" sx={{ marginBottom: '5px' }}>
                                <strong>See Also:</strong>
                            </Typography>
                            <TextField
                                name="seeAlso"
                                value={updatedTerm.seeAlso}
                                onChange={handleInputChange}
                                fullWidth
                                InputProps={{ sx: { height: '40px' } }}
                                InputLabelProps={{ sx: { lineHeight: '40px' } }}
                                sx={{ marginBottom: '15px' }}
                            />
                        </Box>
                        <Box sx={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-start', gap: '15px' }}>
                            <Button onClick={handleSave} variant="contained" sx={buttonStyle}>
                                Save Updates
                            </Button>
                            <Button onClick={() => setEditMode(false)} variant="contained" sx={buttonStyle}>
                                Cancel
                            </Button>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            width: '50%',
                            padding: '10px',
                            backgroundColor: '#f4f4f4',
                            borderRadius: '8px',
                            overflowY: 'auto',
                            maxHeight: 'calc(100vh - 100px)'
                        }}
                    >
                        <CommentsSection
                            resourceId={term.identifier}
                            comments={updatedTerm.comments || []}
                            mentionedUsers={[]}
                            handleSaveDiscussion={handleSaveDiscussion}
                            setHasUncommittedChanges={setHasUncommittedChanges}
                        />
                    </Box>
                </Box>
            )}

            <Typography sx={{ fontSize: '12px', color: 'gray', textAlign: 'center', marginTop: '10px' }}>
                Press escape to go back to the table
            </Typography>
        </Box>
    );
};

ExpandedRow.propTypes = {
    term: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    updateTerm: PropTypes.func.isRequired,
    termComments: PropTypes.array.isRequired,
    handleSaveDiscussion: PropTypes.func.isRequired,
    setHasUncommittedChanges: PropTypes.func.isRequired,
    handleClosePopup: PropTypes.func.isRequired
};

export default ExpandedRow;

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: colorStyled.SECONDARY.dark,
    '&:hover': { backgroundColor: 'darkgray' }
};
