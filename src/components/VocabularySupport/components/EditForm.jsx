import { Box, Typography, TextField, Button } from '@material-ui/core';
import AlternativeDefinitionsSection from './AlternativeDefinitionsSection';
import AlternativeLabelsSection from './AlternativeLabelsSection';
import DiscussionSection from './DiscussionSection';
import StatusDropdown from './StatusDropdown';
import PropTypes from 'prop-types';

const EditForm = ({ term, setEditMode, handleSave, handleInputChange }) => {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6">Edit Term</Typography>
            <TextField label="Label" name="label" value={term.label} onChange={handleInputChange} fullWidth />
            <TextField label="Comment" name="comment" value={term.comment} onChange={handleInputChange} fullWidth />
            <TextField label="Definition" name="definition" value={term.definition} onChange={handleInputChange} fullWidth />
            {/*<AlternativeDefinitionsSection alternatives={term.alternativeDefinitions} isEditable onChange={handleInputChange} />*/}
            {/*<AlternativeLabelsSection alternatives={term.alternativeLabels} isEditable onChange={handleInputChange} />*/}
            {/*<DiscussionSection comments={term.comments} isEditable onChange={handleInputChange} />*/}
            <StatusDropdown status={term.status} onChange={value => handleInputChange({ target: { name: 'status', value } })} />
            <Button onClick={handleSave}>Save Changes</Button>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
        </Box>
    );
};

EditForm.propTypes = {
    term: PropTypes.shape({
        label: PropTypes.string,
        comment: PropTypes.string,
        definition: PropTypes.string,
        alternativeDefinitions: PropTypes.array,
        alternativeLabels: PropTypes.array,
        comments: PropTypes.array,
        status: PropTypes.string
    }).isRequired,
    setEditMode: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired
};
export default EditForm;
