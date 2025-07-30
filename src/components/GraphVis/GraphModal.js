import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GraphModal = ({ open, onClose, children }) => {
    if (!open) return null;
    return (
        <ModalOverlay>
            <ModalContent>
                <Header>
                    <Title>SPARQL Query Result Graph</Title>
                    <CloseButton onClick={onClose}>Close</CloseButton>
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

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.25);
    width: 95vw;
    max-width: 1600px;
    height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 30px 10px 30px;
    border-bottom: 1px solid #eee;
    background: #f8f8f8;
`;

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
`;

const CloseButton = styled.button`
    font-size: 1.1rem;
    padding: 6px 18px;
    background: #eee;
    border: 1px solid #bbb;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background: #ddd;
    }
`;

const ContentArea = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 0;
    background: #f4f7fa;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
`;
