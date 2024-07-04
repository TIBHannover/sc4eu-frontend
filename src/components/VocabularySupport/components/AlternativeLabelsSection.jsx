import PropTypes from 'prop-types';
import { Box, Typography, TextField } from '@mui/material';

const AlternativeLabelsSection = ({ alternatives, isEditable, onChange }) => {
    return (
        <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Alternative Labels</Typography>
            {alternatives.map((alt, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>
                        {alt.label} [Vote: {alt.votes}]
                    </Typography>
                    {isEditable && <TextField name={`alternativeLabels-${index}`} value={alt.label} onChange={onChange} sx={{ marginLeft: 2 }} />}
                </Box>
            ))}
        </Box>
    );
};

AlternativeLabelsSection.propTypes = {
    alternatives: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            votes: PropTypes.number
        })
    ).isRequired,
    isEditable: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

export default AlternativeLabelsSection;
