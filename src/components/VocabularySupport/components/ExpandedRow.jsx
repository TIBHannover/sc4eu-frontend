import { Box, Button, Tooltip, IconButton, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PropTypes from 'prop-types';
import CommentsSection from './CommentsSection';
import { colorStyled } from '../../../styledComponents/styledColor';
import { TextField } from '@material-ui/core';
import StatusDropdown from './StatusDropdown';

const ExpandedRow = ({ term, updateTerm, termComments, handleSaveDiscussion, setHasUncommittedChanges }) => {
    const splitAltLabels = (altLabel) => {
        return altLabel ? altLabel.split(',') : [];
    };
    const [editMode, setEditMode] = useState(false);
    const [updatedTerm, setUpdatedTerm] = useState(term);

    const handleInputChange = e => {
        let { name, value } = e.target;
        if (name.startsWith('altLabel')){
            const index = parseInt(name.split('-')[1], 10);
            const altLabels = updatedTerm.altLabel.split(',');
            altLabels[index] = value;
            value = altLabels.join(',');
            setUpdatedTerm({ ...updatedTerm, altLabel: value });
        }
        else{
            setUpdatedTerm({ ...updatedTerm, [name]: value });
        }
    };

    const handleSave = () => {
        // Save the updated term
        console.log('Updated term:', updatedTerm);
        updateTerm(updatedTerm);
        setHasUncommittedChanges(true);
        setEditMode(false);
    };

    const renderSeeAlso = () => {
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

    return (
        <Box sx={{ paddingLeft: 2, width: '100%', height: '100%' }}>
            <Box sx={{ color: colorStyled.SECONDARY.dark, padding: 1, marginBottom: 2 }}>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    Term Details
                </Typography>
                <hr />
            </Box>
            {!editMode ? (
                <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
                    <Box sx={{ width: '50%', height: '100%' }}>
                        <Typography>
                            <Tooltip title="Unique identifier for the term">
                                <IconButton style={{ marginBottom: '4px'}} size="small">
                                    <HelpOutlineIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <strong>ID:</strong> {updatedTerm.id}
                        </Typography>
                        <Typography>
                            <Tooltip title="Provides Human-readable version of a resource's name. In the final agreed Term only one preferred and many alternative lables exist">
                                <IconButton style={{ marginBottom: '4px'}} size="small">
                                    <HelpOutlineIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <strong>Label:</strong> {updatedTerm.label}
                        </Typography>
                        <Typography>
                            <Tooltip title="Provides a human-readable description of a Term">
                                <IconButton style={{ marginBottom: '4px'}} size="small">
                                    <HelpOutlineIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <strong>Description:</strong> {updatedTerm.description}
                        </Typography>
                        <Typography>
                            <Tooltip title="Indicates a resource that might provide additional information about the subject resource">
                                <IconButton style={{ marginBottom: '4px'}} size="small">
                                    <HelpOutlineIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <strong>See Also:</strong> {renderSeeAlso()}
                        </Typography>
                        {updatedTerm.altLabel && splitAltLabels(updatedTerm.altLabel).map((label, index) => (
                            <Typography key={"altLabel" + index}>
                                <Tooltip title="Provides an alternative Label">
                                    <IconButton style={{ marginBottom: '4px'}} size="small">
                                        <HelpOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <strong>Alternative Label {index + 1}:</strong> {label}
                            </Typography>
                        ))}
                        <Typography>
                            <Tooltip title="Three possible options for status. Draft, Ready, Accpeted.
                             Draft is still under discussion, Ready when the consensus is reached,
                             Accpeted when it is final and becomes part of the vocabulary">
                                <IconButton style={{ marginBottom: '4px'}} size="small">
                                    <HelpOutlineIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <strong>Status:</strong> {updatedTerm.status}
                        </Typography>
                        <Button onClick={() => setEditMode(true)}>Edit Term</Button>
                    </Box>
                    <Box sx={{ width: '50%', height: '100%' }}>
                        <CommentsSection resourceId={term.id} comments={termComments || []} handleSaveDiscussion={handleSaveDiscussion} setHasUncommittedChanges={setHasUncommittedChanges} />
                    </Box>
                </Box>
            ) : (
                // <EditForm term={updatedTerm} setEditMode={setEditMode} handleSave={handleSave} handleInputChange={handleInputChange} />
                <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
                    <Box sx={{ height: '100%', width: '50%', display: 'flex', flexDirection: 'column' }}>
                        {/*<Typography variant="h6">Edit Term</Typography>*/}
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>
                            <Typography sx={{ marginBottom: '5px' }}><strong>Label:</strong></Typography>
                            <TextField name="label" value={updatedTerm.label} onChange={handleInputChange} fullWidth
                                       InputProps={{ sx: { height: '30px' } }} />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                            <Typography sx={{ marginBottom: '5px' }}><strong>Description:</strong></Typography>
                            <TextField name="description" value={updatedTerm.description} onChange={handleInputChange} fullWidth
                                       InputProps={{ sx: { height: '30px' } }} />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                            <Typography sx={{ marginBottom: '5px' }}><strong>See Also:</strong></Typography>
                            <TextField name="seeAlso" value={updatedTerm.seeAlso} onChange={handleInputChange} fullWidth
                                       InputProps={{ sx: { height: '30px' } }} />
                        </Box>
                        {updatedTerm.altLabel && splitAltLabels(updatedTerm.altLabel).map((label, index) => (
                            <Box key={"altLabel_" + index} sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                            <Typography sx={{ marginBottom: '5px' }}><strong>Alternative Label {index + 1}:</strong></Typography>
                                <TextField name={`altLabel-${index}`} value={label} onChange={handleInputChange} fullWidth
                                           InputProps={{ sx: { height: '30px' } }} />
                            </Box>
                        ))}
                        {splitAltLabels(updatedTerm.altLabel).length < 5 && (
                            <Button onClick={() => {
                                const altLabels = splitAltLabels(updatedTerm.altLabel);
                                altLabels.push('');
                                setUpdatedTerm({ ...updatedTerm, altLabel: altLabels.join(',') });
                            }}>
                                + Add Alternative Label
                            </Button>
                        )}
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                            <Typography sx={{ marginBottom: '5px' }}>
                                <strong>Status:</strong>
                            </Typography>
                            <StatusDropdown label="Status" name="status" sx={{ marginTop: '10px' }} status={updatedTerm.status}
                                            onChange={value => handleInputChange({ target: { name: 'status', value } })} />
                        </Box>
                        <Box sx={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                            <Button onClick={handleSave}>Save Changes</Button>
                            <Button onClick={() => setEditMode(false)}>Cancel</Button>
                        </Box>
                    </Box>
                    <Box sx={{ width: '50%', height: '100%' }}>
                        <CommentsSection resourceId={term.id} comments={updatedTerm.comments || []} handleSaveDiscussion={handleSaveDiscussion} />
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
    updateTerm: PropTypes.func.isRequired,
    termComments: PropTypes.array.isRequired,
    handleSaveDiscussion: PropTypes.func.isRequired,
    setHasUncommittedChanges: PropTypes.func.isRequired
};

export default ExpandedRow;
