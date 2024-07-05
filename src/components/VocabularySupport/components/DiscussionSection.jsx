import PropTypes from 'prop-types';
import { Box, Typography, TextField } from '@mui/material';

const DiscussionSection = ({ comments, isEditable, onChange }) => {
    return (
        <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Discussion</Typography>
            {comments.map((comment, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>{comment}</Typography>
                    {isEditable && <TextField name={`comments-${index}`} value={comment} onChange={onChange} sx={{ marginLeft: 2 }} />}
                </Box>
            ))}
            {isEditable && <TextField placeholder="Add a comment" />}
        </Box>
    );
};

DiscussionSection.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.string).isRequired,
    isEditable: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};
export default DiscussionSection;
