import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SparqlQueryInputModal = ({ open, onClose, onRun, defaultQuery }) => {
    const [query, setQuery] = useState(defaultQuery);

    // Reset query when modal is reopened
    React.useEffect(() => {
        if (open) setQuery(defaultQuery);
    }, [open, defaultQuery]);

    if (!open) return null;
    return (
        <ModalOverlay>
            <ModalContent>
                <Header>
                    <Title>Enter SPARQL Query</Title>
                </Header>
                <ContentArea>
                    <Textarea value={query} onChange={e => setQuery(e.target.value)} spellCheck={false} />
                </ContentArea>
                <Footer>
                    <Button onClick={onClose} style={{ marginRight: 10 }}>
                        Cancel
                    </Button>
                    <Button primary onClick={() => onRun(query)}>
                        Run
                    </Button>
                </Footer>
            </ModalContent>
        </ModalOverlay>
    );
};

SparqlQueryInputModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onRun: PropTypes.func.isRequired,
    defaultQuery: PropTypes.string.isRequired
};

export default SparqlQueryInputModal;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2100;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.25);
    width: 700px;
    max-width: 98vw;
    min-height: 320px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const Header = styled.div`
    padding: 18px 28px 8px 28px;
    border-bottom: 1px solid #eee;
    background: #f8f8f8;
`;

const Title = styled.div`
    font-size: 1.3rem;
    font-weight: 600;
`;

const ContentArea = styled.div`
    flex: 1;
    padding: 18px 28px;
    background: #f4f7fa;
    display: flex;
    flex-direction: column;
`;

const Textarea = styled.textarea`
    width: 100%;
    height: 200px;
    font-size: 1.05rem;
    font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
    border: 1px solid #bbb;
    border-radius: 6px;
    padding: 10px;
    resize: vertical;
    background: #fff;
`;

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 16px 28px 18px 28px;
    border-top: 1px solid #eee;
    background: #f8f8f8;
`;

const Button = styled.button`
    font-size: 1rem;
    padding: 7px 22px;
    background: ${props => (props.primary ? '#2a7ae2' : '#eee')};
    color: ${props => (props.primary ? '#fff' : '#222')};
    border: 1px solid #bbb;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 0;
    transition: background 0.2s;
    &:hover {
        background: ${props => (props.primary ? '#1a5ab8' : '#ddd')};
    }
`;
