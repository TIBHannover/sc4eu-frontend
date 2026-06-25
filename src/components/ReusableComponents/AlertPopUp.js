import React from 'react';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { AutoModal, StyledAlertPopUpButton } from 'styledComponents/styledComponents';
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
                <StyledAlertPopUpButton onClick={handleOk}>OK</StyledAlertPopUpButton>
                <StyledAlertPopUpButton onClick={props.onClose}>Cancel</StyledAlertPopUpButton>
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