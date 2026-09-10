import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQueryClient } from '@tanstack/react-query';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    Button,
    Chip,
    FormControlLabel,
    IconButton,
    Link,
    Paper,
    Radio,
    RadioGroup,
    Snackbar,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';

import { getTermVotes, getTermLastConsensus, initiateNewVote, manualCloseConsensus } from '../../../network/TermVoteCalls';
import { SMALL_SCREEN_WIDTH, StyledChip } from '../../../styledComponents/styledComponents';
import { commitChanges } from '../utils/CommitChanges';
import CommentsSection from './CommentsSection';
import FadingNotification from '../../ReusableComponents/FadingNotification';
import LastConsensusView from './LastConsensusView';
import MaterialUIPopUp from '../../ReusableComponents/MaterialUIPopUp';
import VoteView from './VoteView';

const ExpandedRow = ({ term, currentUser, updateTerm, termComments, handleSaveDiscussion, setHasUncommittedChanges, handleClosePopup }) => {
    const theme = useTheme();
    const history = useHistory();

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
    const [showCopyNotification, setShowCopyNotification] = useState(false);
    const queryClient = useQueryClient();
    const isMobile = useMediaQuery(`(max-width:${SMALL_SCREEN_WIDTH})`);

    const handleSetVoteViewMode = (isOpen) => {
        setViewAgreementMode(isOpen);
        if (isOpen && activeAgreement) {
            history.push(`/vocabulary_support/terms/${term.identifier}/consensuses/${activeAgreement.uuid}`);
        } else {
            history.push(`/vocabulary_support/terms/${term.identifier}`);
        }
    };

    const handleCopyLink = event => {
        event.stopPropagation();
        navigator.clipboard.writeText(window.location.href).then(() => {
            setShowCopyNotification(true);
        });
    };

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
            const data = await getTermVotes(term.identifier);
            if (!data.error) {
                setActiveAgreement(data[0]);
            }
        };
        const getLastConsensus = async () => {
            const data = await getTermLastConsensus(term.identifier);
            if (data || !data?.error) {
                setLastConsensus(data);
            }
        };

        getVote();
        getLastConsensus();
    }, [isConsensusSubmitted, isConsensusClosed, term.identifier]);

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        '&:hover': { backgroundColor: `${theme.palette.secondary.main}99`, color: theme.palette.secondary.contrastText }
    };

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
        <Box sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
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
                                    Once enough people have voted, the decision is made by a two-thirds majority, ensuring that changes reflect broad
                                    agreement in a community.
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
                                    <Button onClick={() => handleAgreementSubmit()} variant="contained" sx={buttonStyle} disabled={!agreementType}>
                                        Initiate Consensus
                                    </Button>
                                </Box>
                            </Tooltip>
                        </Box>
                    }
                />
            )}
            {openLastConsensusDialog && (
                <LastConsensusView consensus={lastConsensus} open={openLastConsensusDialog} onClose={() => setOpenLastConsensusDialog(false)} />
            )}
            {viewAgreementMode && (
                <VoteView term={term} vote={activeAgreement} username={currentUser.displayName} setVoteViewMode={handleSetVoteViewMode} />
            )}
            {!editMode && !viewAgreementMode && (
                <Box
                    sx={{
                        backgroundColor: 'background.paper',
                        borderRadius: 2,
                        flex: '1 1 auto',
                        minHeight: 0,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {/* Header bar shared by both panels */}
                    <Box
                        sx={{
                            px: 3,
                            py: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 1,
                            borderBottom: theme => `1px solid ${theme.palette.divider}`
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            <strong>Modified:</strong>{' '}
                            {new Date(updatedTerm.modified).toLocaleDateString() + ', ' + new Date(updatedTerm.modified).toLocaleTimeString()}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Tooltip title="Copy URL of this term into a clipboard for easy sharing">
                                <Button size="small" startIcon={<FileCopyOutlinedIcon fontSize="small" />} onClick={handleCopyLink}>
                                    Copy term URL
                                </Button>
                            </Tooltip>
                            <Tooltip title="Close">
                                <IconButton aria-label="close" size="small" onClick={handleClosePopup} sx={{ ml: 2 }}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                    <Snackbar
                        open={showCopyNotification}
                        autoHideDuration={3000}
                        onClose={() => setShowCopyNotification(false)}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert severity="success" variant="standard">
                            Link copied to clipboard
                        </Alert>
                    </Snackbar>

                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            flex: '1 1 auto',
                            minHeight: 0,
                            flexDirection: { xs: 'column', xl: 'row' }
                        }}
                    >
                        {/* LEFT: Term's Detail */}
                        <Box
                            sx={{
                                width: { xs: '100%', xl: '50%' },
                                flex: '1',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: 3,
                                p: 3,
                                overflowY: 'auto',
                                borderRight: theme => ({ xl: `1px solid ${theme.palette.divider}` })
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2
                                }}
                            >
                                {/* Title & badges */}
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                                        {activeAgreement && <StyledChip label="Pending Consensus" size="small" customVariant="pendingConsensus" />}
                                        <StyledChip
                                            label={updatedTerm.status || 'Unknown'}
                                            size="small"
                                            customVariant={
                                                {
                                                    reject: 'rejected',
                                                    draft: 'draft',
                                                    accept: 'accepted'
                                                }[updatedTerm.status?.toLowerCase()] || 'draft'
                                            }
                                        />
                                        {lastConsensus && (
                                            <Chip
                                                label="Check last consensus"
                                                size="small"
                                                variant="outlined"
                                                onClick={() => setOpenLastConsensusDialog(true)}
                                            />
                                        )}
                                    </Box>
                                    <Typography variant="h4" fontWeight={800} color="text.primary">
                                        {updatedTerm.label}
                                    </Typography>
                                </Box>

                                {/* Alternative labels */}
                                {updatedTerm.altLabel &&
                                    splitAltLabels(updatedTerm.altLabel).map((label, index) => (
                                        <Box key={'altLabel' + index} sx={{ fontSize: '1rem' }}>
                                            <Typography component="span" variant="body2" color="text.secondary" fontWeight={600} sx={{ fontSize: 'inherit' }}>
                                                Alternative Label {index + 1}:
                                            </Typography>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                fontWeight={600}
                                                sx={{
                                                    fontSize: 'inherit',
                                                    ml: 1,
                                                    px: 1,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                    backgroundColor: 'action.hover'
                                                }}
                                            >
                                                {label}
                                            </Typography>
                                        </Box>
                                    ))}

                                {/* Description */}
                                <Box
                                    sx={{
                                        borderLeft: theme => `3px solid ${theme.palette.primary.main}`,
                                        pl: 2
                                    }}
                                >
                                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem' }}>
                                        {updatedTerm.description}
                                    </Typography>
                                </Box>

                                <Accordion
                                    disableGutters
                                    elevation={0}
                                    sx={{
                                        backgroundColor: 'transparent',
                                        '&:before': { display: 'none' },
                                        '&.Mui-expanded': { margin: 0 }
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon fontSize="small" />}
                                        sx={{
                                            minHeight: 36,
                                            px: 0,
                                            '& .MuiAccordionSummary-content': { margin: '8px 0' }
                                        }}
                                    >
                                        <Typography variant="body1" sx={{ fontSize: '1.125rem' }}>
                                            More technical details{' '}
                                            <Typography variant="body2" fontStyle="italic" component="span" sx={{ fontSize: '1rem' }}>
                                                (see Also)
                                            </Typography>
                                        </Typography>
                                    </AccordionSummary>

                                    <AccordionDetails sx={{ pt: 0, px: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        <Typography variant="body1" sx={{ fontSize: '1.125rem' }}>
                                            <Tooltip title="Unique identifier for the term">
                                                <IconButton size="small">
                                                    <HelpOutlineIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <strong>Identifier:</strong> {updatedTerm.identifier}
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontSize: '1.125rem' }}>
                                            <Tooltip title="Indicates a resource that might provide additional information about the subject resource">
                                                <IconButton size="small">
                                                    <HelpOutlineIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <strong>See Also:</strong> {renderSeeAlso()}
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontSize: '1.125rem' }}>
                                            <strong>Created at:</strong> {new Date(updatedTerm.created).toLocaleDateString()}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>

                            {/* Actions */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    flexWrap: 'wrap'
                                }}
                            >
                                {!activeAgreement && (
                                    <Tooltip title="Decide if the term's status is ready to be changed">
                                        <Button
                                            disabled={activeAgreement}
                                            hidden={currentUser.role !== 'System Admin'}
                                            onClick={() => setInitiateTermAgreement(true)}
                                            variant="contained"
                                            sx={buttonStyle}
                                            fullWidth={isMobile}
                                        >
                                            Start consensus
                                        </Button>
                                    </Tooltip>
                                )}
                                {activeAgreement && (
                                    <>
                                        <Button
                                            onClick={() => handleSetVoteViewMode(true)}
                                            variant="contained"
                                            sx={buttonStyle}
                                            fullWidth={isMobile}
                                        >
                                            View ongoing consensus
                                        </Button>
                                        {currentUser.role.toString().toLowerCase() === 'system admin' && (
                                            <Button
                                                onClick={async () => {
                                                    const data = await manualCloseConsensus(term.identifier, activeAgreement.uuid);
                                                    if (data.status === 'accept' || data.status === 'not accept') {
                                                        const newTerm = {
                                                            ...term,
                                                            status: data.status,
                                                            modified: new Date().toISOString()
                                                        };
                                                        await updateTerm(newTerm);
                                                        await commitChanges(queryClient, `Update ${term.label} status after consensus`);
                                                    }
                                                    setIsConsensusClosed(true);
                                                }}
                                                variant="contained"
                                                sx={buttonStyle}
                                                fullWidth={isMobile}
                                            >
                                                Close consensus
                                            </Button>
                                        )}
                                    </>
                                )}
                                <Button
                                    onClick={() => setEditMode(true)}
                                    variant="outlined"
                                    sx={{ ...buttonStyle, backgroundColor: 'transparent', color: theme.palette.secondary.main }}
                                    fullWidth={isMobile}
                                >
                                    Edit Term
                                </Button>
                            </Box>
                        </Box>

                        {/* RIGHT: Discussion */}
                        <Box
                            sx={{
                                width: { xs: '100%', xl: '50%' },
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight: 0
                            }}
                        >
                            <Typography variant="subtitle1" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
                                Discussion
                            </Typography>
                            <Box sx={{ flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
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
                </Box>
            )}
            {editMode && !viewAgreementMode && (
                <Box sx={{ display: 'flex', width: '100%', gap: '20px', padding: '5px' }}>
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
                            <Typography variant="subtitle2" sx={{ marginBottom: '5px', color: theme.palette.text.primary }}>
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
                                <Typography variant="subtitle2" sx={{ marginTop: '10px', color: theme.palette.text.primary }}>
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
                            <Typography variant="subtitle2" sx={{ marginBottom: '5px', color: theme.palette.text.primary }}>
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
                            <Typography variant="subtitle2" sx={{ marginBottom: '5px', color: theme.palette.text.primary }}>
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
                </Box>
            )}
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
