import { Box, Typography, TextField, Button } from '@material-ui/core';
import AlternativeDefinitionsSection from './AlternativeDefinitionsSection';
import AlternativeLabelsSection from './AlternativeLabelsSection';
import DiscussionSection from './DiscussionSection';
import StatusDropdown from './StatusDropdown';
import PropTypes from 'prop-types';

const EditForm = ({ term, setEditMode, handleSave, handleInputChange }) => {
    return (
        <Box>
            <Typography variant="h6">Edit Term</Typography>
            <TextField label="Label" name="label" sx={{ marginTop: '10px' }} value={term.label} onChange={handleInputChange} fullWidth />
            <TextField
                label="Description"
                name="description"
                sx={{ marginTop: '10px' }}
                value={term.description}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField label="See Also" name="seeAlso" sx={{ marginTop: '10px' }} value={term.seeAlso} onChange={handleInputChange} fullWidth />
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
    term: PropTypes.object.isRequired,
    setEditMode: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired
};
export default EditForm;
