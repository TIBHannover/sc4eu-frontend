import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import AlternativeDefinitionsSection from './AlternativeDefinitionsSection';
import AlternativeLabelsSection from './AlternativeLabelsSection';
import DiscussionSection from './DiscussionSection';
import StatusDropdown from './StatusDropdown';
import EditForm from './EditForm';
import PropTypes from 'prop-types';
import CommentsSection from './CommentsSection';

const ExpandedRow = ({ term }) => {
    const [editMode, setEditMode] = useState(false);
    const [updatedTerm, setUpdatedTerm] = useState(term);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setUpdatedTerm({ ...updatedTerm, [name]: value });
    };

    const handleSave = () => {
        setEditMode(false);
    };

    return (
        <Box sx={{ padding: 2 }}>
            {!editMode ? (
                <>
                    <Typography>
                        <strong>ID:</strong> {term.id}
                    </Typography>
                    <Typography>
                        <strong>Label:</strong> {term.label}
                    </Typography>
                    <Typography>
                        <strong>Comment:</strong> {term.comment}
                    </Typography>
                    <Typography>
                        <strong>Definition:</strong> {term.description}
                    </Typography>
                    {/*<AlternativeDefinitionsSection alternatives={term.alternativeDefinitions} />*/}
                    {/*<AlternativeLabelsSection alternatives={term.alternativeLabels} />*/}
                    {/*<DiscussionSection comments={term.comments} />*/}
                    <Typography>
                        <strong>Status:</strong> {term.status}
                    </Typography>
                    {/*<Box sx={{ display: 'flex', alignItems: 'center' }}>*/}
                    {/*    <Typography style={{ marginRight: '10px' }}>Status:</Typography>*/}
                    {/*    <StatusDropdown status={term.status} onChange={value => setUpdatedTerm({ ...term, status: value })} />*/}
                    {/*</Box>*/}
                    <CommentsSection />
                    <Button onClick={() => setEditMode(true)}>Edit</Button>
                </>
            ) : (
                <EditForm term={updatedTerm} setEditMode={setEditMode} handleSave={handleSave} handleInputChange={handleInputChange} />
            )}
        </Box>
    );
};

ExpandedRow.propTypes = {
    term: PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        comment: PropTypes.string,
        description: PropTypes.string,
        alternativeDefinitions: PropTypes.array,
        alternativeLabels: PropTypes.array,
        comments: PropTypes.array,
        status: PropTypes.string
    }).isRequired
};

export default ExpandedRow;
