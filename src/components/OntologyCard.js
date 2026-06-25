import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CardActionArea, CardActions, CardContent, CardMedia, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Delete, Download, Refresh } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { reverse } from 'named-urls';
import ROUTES from '../constants/routes';
import { MODE_OF_OPERATIONS } from '../constants/globalConstants';
import { deleteOntology, getOntologyById, userIsAllowdToUploadOntology } from '../network/ontologyIndexing';
import { redux_addOntology, redux_removeOntology } from '../redux/actions/rrm_actions';
import DeleteConfirmationDialog from '../utils/DeleteConfirmationDialog';
import UpdateConfirmationDialog from '../utils/UpdateConfirmationDialog';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import githubIcon from '../assets/images/github.svg';
import gitlabIcon from '../assets/images/gitlab.svg';
import file_solid from '../assets/images/file-solid.svg';
import { updateOntologyData } from '../network/UpdateOntologyData';
import { StyledCard, StyledOntologyTooltip } from 'styledComponents/styledComponents';

function OntologyCard({ ontology, currentUser, callback, autoRefresh, ontologyVersion, redux_addOntology, redux_removeOntology }) {
    const history = useHistory();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [loading, setLoading] = useState({
        download: false,
        delete: false,
        refresh: false
    });
    const [error, setError] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        if (autoRefresh && ontology.lookup_type !== 'local' && ontology.commitsBehind > 0) {
            console.log('Auto-refresh is enabled. Updating ontology data...');
            handleUpdateConfirm();
        }
    }, [autoRefresh]);

    const getSourceIcon = ontology => {
        if (ontology && ontology.lookup_type === 'online') {
            return githubIcon;
        } else if (ontology && ontology.lookup_type === 'online-gitlab') {
            return gitlabIcon;
        }
        return file_solid;
    };

    const handleDownload = async e => {
        e.stopPropagation();
        setLoading(prev => ({ ...prev, download: true }));
        setError(null);
        try {
            const res = await getOntologyById(ontology.uuid);
            const blob = new Blob([res.ontology_data]);
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `${ontology.name}.ttl`;
            link.href = url;
            link.click();
        } catch (error) {
            console.error('Error downloading ontology:', error);
            setError('Failed to download ontology. Please try again.');
        } finally {
            setLoading(prev => ({ ...prev, download: false }));
        }
    };

    const handleDelete = async e => {
        e.stopPropagation();
        try {
            const allows = await userIsAllowdToUploadOntology();
            if (allows.result === true) {
                setDeleteDialogOpen(true);
            } else {
                setError('You are not authorized to delete this ontology');
            }
        } catch (error) {
            console.error('Error checking authorization:', error);
            setError('Failed to verify authorization. Please try again.');
        }
    };

    const handleDeleteConfirm = async () => {
        setLoading(prev => ({ ...prev, delete: true }));
        setError(null);
        try {
            const res = await deleteOntology(ontology.uuid);
            if (res.success === true) {
                callback(res.result);
            } else {
                setError('Failed to delete ontology. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting ontology:', error);
            setError('Failed to delete ontology. Please try again.');
        } finally {
            setLoading(prev => ({ ...prev, delete: false }));
            setDeleteDialogOpen(false);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    };
    const handleUpdateCancel = () => {
        setUpdateDialogOpen(false);
    };

    const handleUpdateConfirm = async () => {
        setLoading(prev => ({ ...prev, update: true, refresh: true }));
        setError(null);
        try {
            const latestData = await updateOntologyData(ontology);
            if (latestData.success) {
                // Update the ontology object to reflect that it's up to date
                if (ontology.commitsBehind) {
                    ontology.commitsBehind = 0;
                }
                // Reset loading states after successful update
                setLoading(prev => ({ ...prev, update: false, refresh: false }));
                // Call the callback to update the parent component's state
                if (callback) {
                    callback(latestData.result);
                }
            } else {
                setError('Failed to refresh ontology data. Please try again.');
                setLoading(prev => ({ ...prev, update: false, refresh: false }));
            }
        } catch (error) {
            console.error('Error checking authorization:', error);
            setError('Failed to verify authorization. Please try again.');
            setLoading(prev => ({ ...prev, update: false, refresh: false }));
        } finally {
            setUpdateDialogOpen(false);
        }
    };

    const handleRefresh = async e => {
        e.stopPropagation();
        try {
            const allows = await userIsAllowdToUploadOntology();
            if (allows.result === true) {
                setUpdateDialogOpen(true);
            } else {
                setError('You are not authorized to update this ontology');
            }
        } catch (error) {
            console.error('Error checking authorization:', error);
            setError('Failed to verify authorization. Please try again.');
        }
    };

    const handleCardClick = async () => {
        await redux_removeOntology();
        await redux_addOntology(ontology);
        Cookies.set(MODE_OF_OPERATIONS, 'hybrid');
        history.push({
            pathname: reverse(ROUTES.VIEW_ONTOLOGY),
            search: `?view=hybrid&ontologyId=${ontology.uuid}`,
            ontologyVersion: ontologyVersion
        });
    };

    // CardActionArea should be disabled (not clickable) during loading.refresh or loading.update
    const cardActionDisabled = loading.download || loading.delete || loading.refresh || loading.update;
    return (
        <>
            <StyledOntologyTooltip
                title={
                    <React.Fragment>
                        <Typography component="div" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                            {ontology.name}
                        </Typography>
                        <Typography component="div">{ontology.description || 'No description available'}</Typography>
                        {(ontology.lookup_type === 'online' || ontology.lookup_type === 'online-gitlab') && (
                            <Typography component="div" style={{ marginTop: '8px' }}>
                                <strong>Git Branch:</strong> {ontology.gitBranch}
                                <br />
                                <strong>Version:</strong> {ontology.commitStatus}
                                {ontology.commitsBehind > 0 && (
                                    <>
                                        <br />
                                        <strong style={{ color: theme.palette.error.contrastText }}>
                                            {ontology.commitsBehind} {ontology.commitsBehind === 1 ? 'commit' : 'commits'} behind
                                        </strong>
                                    </>
                                )}
                            </Typography>
                        )}
                        {error && (
                            <Typography
                                component="div"
                                style={{
                                    marginTop: '8px',
                                    color: theme.palette.error.contrastText,
                                    fontWeight: 'bold'
                                }}
                            >
                                {error}
                            </Typography>
                        )}
                    </React.Fragment>
                }
                placement="top"
                arrow
                enterDelay={50}
                leaveDelay={200}
            >
                <StyledCard sx={{ maxWidth: 345, cursor: cardActionDisabled ? 'not-allowed' : 'pointer' }}>
                    <div style={{ position: 'relative', height: '100%' }}>
                        <CardActionArea
                            onClick={cardActionDisabled ? undefined : handleCardClick}
                            style={{ height: 'calc(100% - 48px)' }}
                            disabled={cardActionDisabled}
                            sx={{ '&:hover .MuiCardActionArea-focusHighlight': { opacity: 0 } }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    top: 12,
                                    left: 0,
                                    width: '100%',
                                    zIndex: 2,
                                    pointerEvents: 'none'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="50"
                                    image={getSourceIcon(ontology)}
                                    style={{
                                        objectFit: 'contain',
                                        position: 'absolute',
                                        top: '0px',
                                        left: '12px',
                                        width: '50px',
                                        zIndex: 1
                                    }}
                                    alt="collection type icon"
                                />
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={'bold'}
                                    style={{
                                        color: `${theme.palette.primary.contrastText}D9`,
                                        marginLeft: '8px',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        pointerEvents: 'auto'
                                    }}
                                >
                                    Ontology
                                </Typography>
                            </div>
                            <CardContent style={{ paddingTop: '45px', paddingLeft: '45px', paddingBottom: '16px' }}>
                                <Typography gutterBottom component="div" fontWeight={'bold'} marginBottom={1} style={{ color: theme.palette.primary.contrastText }}>
                                    {ontology.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions
                            disableSpacing
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                padding: '8px'
                            }}
                        >
                            <IconButton
                                aria-label="download"
                                onClick={handleDownload}
                                disabled={loading.download || loading.delete || loading.refresh}
                            >
                                {loading.download ? <CircularProgress size={24} /> : <Download />}
                            </IconButton>
                            {currentUser !== 0 && currentUser !== null && !autoRefresh && (
                                <IconButton
                                    aria-label="delete"
                                    onClick={handleDelete}
                                    disabled={loading.download || loading.delete || loading.refresh}
                                >
                                    {loading.delete ? <CircularProgress size={24} /> : <Delete />}
                                </IconButton>
                            )}
                            {currentUser !== 0 &&
                                currentUser !== null &&
                                (ontology.lookup_type === 'online' || ontology.lookup_type === 'online-gitlab') && (
                                    <IconButton
                                        aria-label="refresh"
                                        onClick={handleRefresh}
                                        disabled={loading.refresh || !(ontology.commitsBehind > 0)}
                                    >
                                        {loading.refresh ? <CircularProgress size={24} /> : <Refresh />}
                                    </IconButton>
                                )}
                        </CardActions>
                    </div>
                </StyledCard>
            </StyledOntologyTooltip>
            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title="Delete Ontology"
                contentText={`Are you sure you want to delete ontology "${ontology.name}"? This action cannot be undone.`}
            />
            <UpdateConfirmationDialog
                open={updateDialogOpen}
                onClose={handleUpdateCancel}
                onConfirm={handleUpdateConfirm}
                title="Update Ontology"
                contentText={`Are you sure you want to update ontology "${ontology.name}"?`}
            />
        </>
    );
}

OntologyCard.propTypes = {
    ontology: PropTypes.object.isRequired,
    currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
    callback: PropTypes.func.isRequired,
    autoRefresh: PropTypes.bool.isRequired,
    ontologyVersion: PropTypes.string.isRequired,
    redux_addOntology: PropTypes.func.isRequired,
    redux_removeOntology: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    redux_removeOntology: () => dispatch(redux_removeOntology()),
    redux_addOntology: data => dispatch(redux_addOntology(data))
});

export default connect(null, mapDispatchToProps)(OntologyCard);
