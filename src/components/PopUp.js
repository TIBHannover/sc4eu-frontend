import React from 'react';
import { useTheme } from '@mui/material';
import SC3 from '../assets/images/logo.png';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { StyledDiv, StyledImage } from 'styledComponents/styledComponents';
const PopUp = props => {
    const theme = useTheme();
    if (!props.open) {
        return null;
    }
    
    return (
        <StyledDiv>
            <button
                style={{ height: '20%' }}
                onClick={e => {
                    e.stopPropagation();
                }}
                className="modalContainer"
            >
                <StyledImage src={SC3} alt="/" height="50px" width="50px" />
                <hr />
            </button>
            <div style={{ height: '80%', backgroundColor: theme.palette.background.default }}>
                <div style={{ height: '80%' }}>
                    <div style={{ padding: '30px', float: 'left' }}>
                        <img style={{ height: '150x', width: '150px' }} src={props.image} alt="/" />
                    </div>
                    <div style={{ padding: '30px', marginLeft: '50px' }}>
                        <span
                            style={{
                                fontSize: '24px',
                                color: '#000000',
                                fontWeight: 600,
                                textAlign: 'center'
                            }}
                        >
                            {props.message}
                        </span>
                    </div>
                </div>
                <div style={{ height: '20%' }}>
                    <Button
                        onClick={props.onClose}
                        style={{ float: 'right', margin: '0px 30px 30px 0', width: '80px', backgroundColor: theme.palette.secondary.main }}
                    >
                        OK
                    </Button>
                </div>
            </div>
        </StyledDiv>
    );
};

PopUp.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

export default PopUp;
