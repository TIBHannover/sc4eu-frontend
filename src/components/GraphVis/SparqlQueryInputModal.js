import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SparqlQueryForm from './SparqlQueryForm';

const SparqlQueryInputModal = ({ open, onClose, onRun, defaultQuery, defaultMode = 'freeform', defaultVisualQuery = '' }) => {
    const [query, setQuery] = useState(defaultQuery);
    const [mode, setMode] = useState(defaultMode); // 'freeform' or 'visual'
    const [visualQuery, setVisualQuery] = useState(defaultVisualQuery);

    // Reset queries and mode when modal is reopened
    React.useEffect(() => {
        if (open) {
            setQuery(defaultQuery);
            setVisualQuery(defaultVisualQuery);
            setMode(defaultMode);
        }
    }, [open, defaultQuery, defaultVisualQuery, defaultMode]);

    // When switching tabs, just set the mode. Do not sync queries between tabs.
    const handleTabSwitch = newMode => {
        setMode(newMode);
    };

    if (!open) return null;
    return (
        <ModalOverlay>
            <ModalContent>
                <Header>
                    <Title>SPARQL Query</Title>
                    <ModeSwitch>
                        <SwitchButton active={mode === 'freeform'} onClick={() => handleTabSwitch('freeform')}>
                            Freeform
                        </SwitchButton>
                        <SwitchButton active={mode === 'visual'} onClick={() => handleTabSwitch('visual')}>
                            Visual Builder
                        </SwitchButton>
                    </ModeSwitch>
                </Header>
                <ContentArea>
                    {mode === 'freeform' ? (
                        <Textarea value={query} onChange={e => setQuery(e.target.value)} spellCheck={false} />
                    ) : (
                        <SparqlQueryForm open={true} onClose={onClose} onRun={q => setVisualQuery(q)} />
                    )}
                </ContentArea>
                <Footer>
                    <Button onClick={onClose} style={{ marginRight: 10 }}>
                        Cancel
                    </Button>
                    <Button
                        primary
                        onClick={() => onRun(mode === 'freeform' ? query : visualQuery, mode)}
                        disabled={mode === 'visual' && !visualQuery}
                    >
                        Run
                    </Button>
                </Footer>
            </ModalContent>
        </ModalOverlay>
    );
};
const ModeSwitch = styled.div`
    display: flex;
    gap: 8px;
    margin-left: auto;
`;

const SwitchButton = styled.button`
    font-size: 1rem;
    padding: 5px 16px;
    background: ${props => (props.active ? '#2a7ae2' : '#eee')};
    color: ${props => (props.active ? '#fff' : '#222')};
    border: 1px solid #bbb;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 0;
    transition: background 0.2s;
    &:hover {
        background: ${props => (props.active ? '#1a5ab8' : '#ddd')};
    }
`;

SparqlQueryInputModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onRun: PropTypes.func.isRequired,
    defaultQuery: PropTypes.string.isRequired,
    defaultMode: PropTypes.string,
    defaultVisualQuery: PropTypes.string
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
