import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SparqlQueryForm from './SparqlQueryForm';
import { ModalOverlay, ModalContent, SparqlQueryInputModalButton, Title, Header, ModeSwitch, SwitchButton, ContentArea, Textarea, PreviewArea, Footer } from 'styledComponents/styledComponents';

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
                    <SparqlQueryInputModalButton onClick={onClose} style={{ marginRight: 10 }}>
                        Cancel
                    </SparqlQueryInputModalButton>
                    <SparqlQueryInputModalButton
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
                    </SparqlQueryInputModalButton>
                </Footer>
            </ModalContent>
        </ModalOverlay>
    );
};


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

