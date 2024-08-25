import { Box, Typography, TextField, Button, Tooltip, IconButton } from '@material-ui/core';
import StatusDropdown from './StatusDropdown';
import PropTypes from 'prop-types';
import CommentsSection from './CommentsSection';

const EditForm = ({ term, setEditMode, handleSave, handleInputChange }) => {
    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
            <Box sx={{ height: '100%', width: '50%', display: 'flex', flexDirection: 'column' }}>
                {/*<Typography variant="h6">Edit Term</Typography>*/}
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>
                    <Typography sx={{ marginBottom: '5px' }}><strong>Label:</strong></Typography>
                    <TextField name="label" value={term.label} onChange={handleInputChange} fullWidth
                               InputProps={{ sx: { height: '30px' } }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                    <Typography sx={{ marginBottom: '5px' }}><strong>Description:</strong></Typography>
                    <TextField name="description" value={term.description} onChange={handleInputChange} fullWidth
                               InputProps={{ sx: { height: '30px' } }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                    <Typography sx={{ marginBottom: '5px' }}><strong>See Also:</strong></Typography>
                    <TextField name="seeAlso" value={term.seeAlso} onChange={handleInputChange} fullWidth
                               InputProps={{ sx: { height: '30px' } }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                    <Typography sx={{ marginBottom: '5px' }}>
                        <strong>Status:</strong>
                    </Typography>
                    <StatusDropdown label="Status" name="status" sx={{ marginTop: '10px' }} status={term.status}
                                    onChange={value => handleInputChange({ target: { name: 'status', value } })} />
                </Box>
                <Box sx={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={handleSave}>Save Changes</Button>
                    <Button onClick={() => setEditMode(false)}>Cancel</Button>
                </Box>
            </Box>
            <Box sx={{ width: '50%', height: '100%' }}>
                <CommentsSection comments={term.comments || []} />
            </Box>
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
