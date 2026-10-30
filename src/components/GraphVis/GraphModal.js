import React from 'react';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalContent, Header, CloseGraphModalButton, ContentArea, Title } from 'styledComponents/styledComponents';

const GraphModal = ({ open, onClose, children }) => {
    if (!open) return null;
    return (
        <ModalOverlay>
            <ModalContent>
                <Header>
                    <Title>SPARQL Query Result Graph</Title>
                    <CloseGraphModalButton onClick={onClose}>Close</CloseGraphModalButton>
                </Header>
                <ContentArea>{children}</ContentArea>
            </ModalContent>
        </ModalOverlay>
    );
};

GraphModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default GraphModal;
