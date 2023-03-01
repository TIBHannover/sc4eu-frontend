import React from 'react';
import styled from 'styled-components';
import SC3 from '../assets/images/logo.png';
import PropTypes from 'prop-types';
import { PRIMARY, SECONDARY } from '../styledComponents/styledComponents';
import { Button } from 'reactstrap';

const PopUp = props => {
    if (!props.open) {
        return null;
    }

    return (
        <StyledDiv>
            <div
                style={{ height: '20%' }}
                onClick={e => {
                    e.stopPropagation();
                }}
                className="modalContainer"
            >
                <StyledImage src={SC3} alt="/" height="50px" width="50px" />
                <hr />
            </div>
            <div style={{ height: '80%', backgroundColor: PRIMARY.lighter }}>
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
                        style={{ float: 'right', margin: '0px 30px 30px 0', width: '80px', backgroundColor: SECONDARY.dark }}
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

const StyledDiv = styled.div`
    width: 700px;
    height: 350px;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
    border-radius: 8px;
    // overflow: hidden;
`;

const StyledImage = styled.img`
    height: 40px;
    width: 40px;
    margin: 12px 12px 0px 12px;
`;
