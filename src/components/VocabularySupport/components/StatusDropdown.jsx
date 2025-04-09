import PropTypes from 'prop-types';
import { MenuItem, Select } from '@mui/material';

const StatusDropdown = ({ status, onChange }) => {
    return (
        <Select value={status} onChange={e => onChange(e.target.value)} variant="outlined" sx={{ height: '40px', width: '30%' }}>
            <MenuItem value="draft" style={{ backgroundColor: 'yellow' }}>
                Draft
            </MenuItem>
            <MenuItem value="reject" style={{ backgroundColor: 'red' }}>
                Reject
            </MenuItem>
            <MenuItem value="accept" style={{ backgroundColor: 'green' }}>
                Accept
            </MenuItem>
        </Select>
    );
};

StatusDropdown.propTypes = {
    status: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
export default StatusDropdown;
