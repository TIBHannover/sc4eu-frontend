import PropTypes from 'prop-types';
import { MenuItem, Select } from '@mui/material';

const StatusDropdown = ({ status, onChange }) => {
    return (
        <Select
            value={status}
            onChange={e => onChange(e.target.value)}
            variant="outlined"
            sx={{ height: '40px', width: '30%' }}
        >
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="rejeccted">Rejected</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
        </Select>
    );
};

StatusDropdown.propTypes = {
    status: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
export default StatusDropdown;
