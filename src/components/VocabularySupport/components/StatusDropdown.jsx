import PropTypes from 'prop-types';
import { MenuItem, Select } from '@mui/material';

const StatusDropdown = ({ status, onChange }) => {
    return (
        <Select value={status} onChange={e => onChange(e.target.value)} variant="outlined" sx={{ height: '40px', width: '30%' }}>
            <MenuItem value="reject" style={{ backgroundColor: '#D9A5A5' }}>
                Reject
            </MenuItem>
            <MenuItem value="draft" style={{ backgroundColor: '#E4D8A4' }}>
                Draft
            </MenuItem>
            <MenuItem value="accept" style={{ backgroundColor: '#A7C8B4' }}>
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
