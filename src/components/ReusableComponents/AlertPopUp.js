import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colorStyled } from '../../styledComponents/styledColor';
import { fontStyled } from '../../styledComponents/styledFont';

const AlertPopUp = props => {
    const handleOk = () => {
        props.isConfirm(true);
        props.onClose();
    };

    return (
        <AutoModal isOpen={props.isOpen} toggle={props.onClose} size="lg">
            <ModalHeader toggle={props.onClose}>Alert</ModalHeader>
            <ModalBody>{props.bodyText}</ModalBody>
            <ModalFooter>
                <StyledButton onClick={handleOk}>OK</StyledButton>
                <StyledButton onClick={props.onClose}>Cancel</StyledButton>
            </ModalFooter>
        </AutoModal>
    );
};

AlertPopUp.propTypes = {
    bodyText: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    isConfirm: PropTypes.func.isRequired
};

export default AlertPopUp;

const AutoModal = styled(Modal)`
    font-family: ${fontStyled.fontFamily};
    .modal-content {
        max-width: 60%;
        max-height: auto;
        margin: auto;
    }

    .modal-header,
    .modal-footer {
        border: 0 !important;
    }
`;

const StyledButton = styled(Button)`
    height: 40px;
    width: 70px;
    background-color: ${colorStyled.SECONDARY.dark};
`;
