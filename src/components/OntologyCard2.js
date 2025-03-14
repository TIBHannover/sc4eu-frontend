import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Tooltip } from '@mui/material';
import styled from 'styled-components';
import { colorStyled } from '../styledComponents/styledColor';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Delete, Download } from '@mui/icons-material';
import GitLabIcon from '@mui/icons-material/Description';
import FileIcon from '@mui/icons-material/InsertDriveFile';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { reverse } from 'named-urls';
import ROUTES from '../constants/routes';
import { MODE_OF_OPERATIONS } from '../constants/globalConstants';
import { deleteOntology, getOntologyById, userIsAllowdToUploadOntology } from '../network/ontologyIndexing';
import theme from '../theme';
import { redux_addOntology, redux_removeOntology } from '../redux/actions/rrm_actions';
import DeleteConfirmationDialog from '../utils/DeleteConfirmationDialog';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import microchip from '../assets/images/microchip.png';
import githubIcon from '../assets/images/github.svg';
import gitlabIcon from '../assets/images/gitlab.svg';
import file_solid from '../assets/images/file-solid.svg';
import public_collection from '../assets/images/public_collection.png';

const StyledTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)`
    & .MuiTooltip-tooltip {
        background-color: ${colorStyled.PRIMARY.dark};
        color: white;
        font-size: 14px;
        padding: 12px 16px;
        border-radius: 8px;
        max-width: 300px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
        margin: 8px;
    }
    & .MuiTooltip-arrow {
        color: ${colorStyled.PRIMARY.dark};
    }
`;

function OntologyCard2({ ontology, currentUser, callback, ontologyVersion, redux_addOntology, redux_removeOntology }) {
    const history = useHistory();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [loading, setLoading] = useState({
        download: false,
        delete: false
    });
    const [error, setError] = useState(null);

    const getSourceIcon = ontology => {
        console.log('ontology:', ontology);
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

    return (
        <>
            <StyledTooltip
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
                            </Typography>
                        )}
                        {error && (
                            <Typography
                                component="div"
                                style={{
                                    marginTop: '8px',
                                    color: theme.palette.error.main,
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
                <StyledCard sx={{ maxWidth: 345, cursor: 'pointer' }}>
                    <CardActionArea
                        onClick={handleCardClick}
                        style={{ height: '100%', position: 'relative' }}
                        disabled={loading.download || loading.delete}
                    >
                        <CardMedia
                            component="img"
                            height="50"
                            image={getSourceIcon(ontology)}
                            style={{
                                objectFit: 'contain',
                                position: 'absolute',
                                top: '12px',
                                left: '12px',
                                width: '50px',
                                zIndex: 1
                            }}
                            alt="collection type icon"
                        />
                        <CardContent style={{ paddingTop: '45px', paddingLeft: '45px', paddingBottom: '60px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography gutterBottom component="div" fontWeight={'bold'} marginBottom={theme.spacing(1)}>
                                    {ontology.name}
                                </Typography>
                            </div>
                        </CardContent>
                        <CardActions
                            disableSpacing
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                padding: '8px'
                            }}
                        >
                            <IconButton aria-label="download" onClick={handleDownload} disabled={loading.download || loading.delete}>
                                {loading.download ? <CircularProgress size={24} /> : <Download />}
                            </IconButton>
                            {currentUser !== 0 && currentUser !== null && (
                                <IconButton aria-label="delete" onClick={handleDelete} disabled={loading.download || loading.delete}>
                                    {loading.delete ? <CircularProgress size={24} /> : <Delete />}
                                </IconButton>
                            )}
                        </CardActions>
                    </CardActionArea>
                </StyledCard>
            </StyledTooltip>
            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title="Delete Ontology"
                contentText={`Are you sure you want to delete ontology "${ontology.name}"? This action cannot be undone.`}
            />
        </>
    );
}

OntologyCard2.propTypes = {
    ontology: PropTypes.object.isRequired,
    currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
    callback: PropTypes.func.isRequired,
    ontologyVersion: PropTypes.string.isRequired,
    redux_addOntology: PropTypes.func.isRequired,
    redux_removeOntology: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    redux_removeOntology: () => dispatch(redux_removeOntology()),
    redux_addOntology: data => dispatch(redux_addOntology(data))
});

export default connect(null, mapDispatchToProps)(OntologyCard2);

const StyledCard = styled(Card)`
    && {
        background-color: ${colorStyled.SECONDARY.dark};
        padding: 3px;
        border-radius: 20px;
        transition: transform 0.2s;
        width: 300px;
        height: 300px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        &:hover {
            transform: scale(1.05);
        }

        .MuiTypography-root {
            color: white;
        }

        .MuiIconButton-root {
            color: white;
            &:disabled {
                color: rgba(255, 255, 255, 0.3);
            }
        }
    }
`;
