import { Box, Button, Tooltip, IconButton, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AlternativeDefinitionsSection from './AlternativeDefinitionsSection';
import AlternativeLabelsSection from './AlternativeLabelsSection';
import DiscussionSection from './DiscussionSection';
import StatusDropdown from './StatusDropdown';
import EditForm from './EditForm';
import PropTypes from 'prop-types';
import CommentsSection from './CommentsSection';

const ExpandedRow = ({ term, updateTerm }) => {
    const [editMode, setEditMode] = useState(false);
    const [updatedTerm, setUpdatedTerm] = useState(term);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setUpdatedTerm({ ...updatedTerm, [name]: value });
    };

    const handleSave = () => {
        // Save the updated term
        console.log('Updated term:', updatedTerm);
        updateTerm(updatedTerm);
        setEditMode(false);
    };

    const renderSeeAlso = () => {
        if (term.seeAlso.startsWith('url:')) {
            const url = term.seeAlso.substring(4);
            return (
                <Link href={url} target="_blank" rel="noopener noreferrer">
                    {term.label}
                </Link>
            );
        }
        return term.seeAlso;
    };

    return (
        <Box sx={{ paddingLeft: 2 }}>
            {!editMode ? (
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '50%' }}>
                        <Typography>
                            <Tooltip title="Unique identifier for the term">
                                <IconButton style={{ marginBottom: '4px'}} size="small">
                                    <HelpOutlineIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <strong>ID:</strong> {term.id}
                        </Typography>
                        <Typography>
                            <Tooltip title="Provides Human-readable version of a resource's name. In the final agreed Term only one preferred and many alternative lables exist">
                                <IconButton style={{ marginBottom: '4px'}} size="small">
                                    <HelpOutlineIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <strong>Label:</strong> {term.label}
                        </Typography>
                        <Typography>
                            <Tooltip title="Provides a human-readable description of a Term">
                                <IconButton style={{ marginBottom: '4px'}} size="small">
                                    <HelpOutlineIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <strong>Description:</strong> {term.description}
                        </Typography>
                        <Typography>
                            <Tooltip title="Indicates a resource that might provide additional information about the subject resource">
                                <IconButton style={{ marginBottom: '4px'}} size="small">
                                    <HelpOutlineIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <strong>See Also:</strong> {renderSeeAlso()}
                        </Typography>
                        {/*<AlternativeDefinitionsSection alternatives={term.alternativeDefinitions} />*/}
                        {/*<AlternativeLabelsSection alternatives={term.alternativeLabels} />*/}
                        {/*<DiscussionSection comments={term.comments} />*/}
                        <Typography>
                            <Tooltip title="Three possible options for status. Draft, Ready, Accpeted.
                             Draft is still under discussion, Ready when the consensus is reached,
                             Accpeted when it is final and becomes part of the vocabulary">
                                <IconButton style={{ marginBottom: '4px'}} size="small">
                                    <HelpOutlineIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <strong>Status:</strong> {term.status}
                        </Typography>
                        {/*<Box sx={{ display: 'flex', alignItems: 'center' }}>*/}
                        {/*    <Typography style={{ marginRight: '10px' }}>Status:</Typography>*/}
                        {/*    <StatusDropdown status={term.status} onChange={value => setUpdatedTerm({ ...term, status: value })} />*/}
                        {/*</Box>*/}
                        <Button onClick={() => setEditMode(true)}>Edit Term</Button>
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <CommentsSection comments={term.comments} />
                    </Box>
                </Box>
            ) : (
                <EditForm term={updatedTerm} setEditMode={setEditMode} handleSave={handleSave} handleInputChange={handleInputChange} />
            )}
        </Box>
    );
};

ExpandedRow.propTypes = {
    term: PropTypes.object.isRequired,
    updateTerm: PropTypes.func.isRequired
    // term: PropTypes.shape({
    //     id: PropTypes.string,
    //     label: PropTypes.string,
    //     description: PropTypes.string,
    //     seeAlso: PropTypes.string,
    //     alternativeDefinitions: PropTypes.array,
    //     alternativeLabels: PropTypes.array,
    //     comments: PropTypes.array,
    //     status: PropTypes.string
    // }).isRequired
};

export default ExpandedRow;
