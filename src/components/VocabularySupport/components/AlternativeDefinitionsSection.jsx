import PropTypes from 'prop-types';
import { Box, Typography, TextField } from '@mui/material';

const AlternativeDefinitionsSection = ({ alternatives, isEditable, onChange }) => {
    return (
        <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Alternative Definitions</Typography>
            {alternatives.map((alt, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>
                        {alt.definition} [Vote: {alt.votes}]
                    </Typography>
                    {isEditable && (
                        <TextField name={`alternativeDefinitions-${index}`} value={alt.definition} onChange={onChange} sx={{ marginLeft: 2 }} />
                    )}
                </Box>
            ))}
        </Box>
    );
};

AlternativeDefinitionsSection.propTypes = {
    alternatives: PropTypes.arrayOf(
        PropTypes.shape({
            definition: PropTypes.string,
            votes: PropTypes.number
        })
    ).isRequired,
    isEditable: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

export default AlternativeDefinitionsSection;
