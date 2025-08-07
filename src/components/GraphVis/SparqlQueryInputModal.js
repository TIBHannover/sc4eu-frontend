import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SparqlQueryForm from './SparqlQueryForm';

// Styled component for preview area (must be defined before use)
const PreviewArea = styled.div`
    width: 100%;
    background: #f9fafb;
    border-radius: 6px;
    border: 1px solid #eee;
    padding: 8px 0 0 0;
`;

const SparqlQueryInputModal = ({ open, onClose, onRun, defaultQuery = '', defaultMode, defaultVisualQuery = '' }) => {
    // Always default to 'freeform' if defaultMode is not provided or is empty
    const initialMode = defaultMode && typeof defaultMode === 'string' && defaultMode.trim() ? defaultMode : 'freeform';
    const [query, setQuery] = useState(defaultQuery || '');
    const [mode, setMode] = useState(initialMode); // 'freeform', 'llm', or 'visual'
    const [visualQuery, setVisualQuery] = useState(defaultVisualQuery || '');

    // Reset queries and mode when modal is reopened
    React.useEffect(() => {
        if (open) {
            setQuery(defaultQuery || '');
            setVisualQuery(defaultVisualQuery || '');
            setMode(initialMode);
        }
    }, [open, defaultQuery, defaultVisualQuery, initialMode]);

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
                        {/* <SwitchButton active={mode === 'visual'} onClick={() => handleTabSwitch('visual')}>
                            Visual Builder
                        </SwitchButton> */}
                        <SwitchButton active={mode === 'llm'} onClick={() => handleTabSwitch('llm')}>
                            LLM
                        </SwitchButton>
                    </ModeSwitch>
                </Header>
                <ContentArea>
                    {mode === 'freeform' && <Textarea value={query} onChange={e => setQuery(e.target.value)} spellCheck={false} />}
                    {mode === 'llm' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                            <Textarea
                                value={'Under construction'}
                                onChange={e => setQuery(e.target.value)}
                                spellCheck={false}
                                placeholder="Enter your LLM prompt or query here..."
                            />
                            <PreviewArea>
                                <div style={{ fontWeight: 600, marginBottom: 4 }}>Preview</div>
                                <div
                                    style={{
                                        background: '#fff',
                                        border: '1px solid #bbb',
                                        borderRadius: 6,
                                        minHeight: 80,
                                        padding: 10,
                                        fontFamily: 'Fira Mono, Consolas, Menlo, monospace',
                                        whiteSpace: 'pre-wrap',
                                        color: '#222'
                                    }}
                                >
                                    {query}
                                </div>
                            </PreviewArea>
                        </div>
                    )}
                    {mode === 'visual' && <SparqlQueryForm open={true} onClose={onClose} onRun={q => setVisualQuery(q)} />}
                </ContentArea>
                <Footer>
                    <Button onClick={onClose} style={{ marginRight: 10 }}>
                        Cancel
                    </Button>
                    <Button
                        primary
                        onClick={() => {
                            if (mode === 'freeform' || mode === 'llm') {
                                onRun(query, mode);
                            } else {
                                onRun(visualQuery, mode);
                            }
                        }}
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
    defaultQuery: PropTypes.string,
    defaultMode: PropTypes.string,
    defaultVisualQuery: PropTypes.string
};

SparqlQueryInputModal.defaultProps = {
    defaultQuery: '',
    defaultMode: 'freeform',
    defaultVisualQuery: ''
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
