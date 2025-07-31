import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SparqlQueryForm = forwardRef(({ open, onClose, onRun }, ref) => {
    // Get resources and relations from redux
    const resources = useSelector(state => state.ResourceRelationModelReducer.resources) || [];
    const relations = useSelector(state => state.ResourceRelationModelReducer.relations) || [];

    // Triple pattern fields: subject, predicate, object, filter, limit
    const [subject, setSubject] = useState('?subject');
    const [predicate, setPredicate] = useState('?predicate');
    const [object, setObject] = useState('?object');
    const [filter, setFilter] = useState('');
    const [limit, setLimit] = useState(100);

    // Call onRun with the current query whenever any field changes
    React.useEffect(() => {
        if (onRun) {
            onRun(buildQuery());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subject, predicate, object, filter, limit]);

    // Expose getCurrentQuery to parent via ref
    useImperativeHandle(ref, () => ({
        getCurrentQuery: () => buildQuery()
    }));

    if (!open) return null;

    // Generate a flexible triple pattern SPARQL query
    const buildQuery = () => {
        let filterLine = filter ? `  FILTER(${filter}) .\n` : '';
        let limitLine = limit ? `LIMIT ${limit}` : '';
        return `CONSTRUCT { ${subject} ${predicate} ${object} }\nWHERE {\n  ${subject} ${predicate} ${object} .\n${filterLine}}\n${limitLine}`;
    };

    // Render as a plain form (not a modal), no buttons
    return (
        <ContentArea>
            <FormRow>
                <label>Subject:</label>
                <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="?subject or <URI>" />
            </FormRow>
            <FormRow>
                <label>Predicate:</label>
                <input type="text" value={predicate} onChange={e => setPredicate(e.target.value)} placeholder="?predicate or <URI>" />
            </FormRow>
            <FormRow>
                <label>Object:</label>
                <input type="text" value={object} onChange={e => setObject(e.target.value)} placeholder="?object, <URI>, or literal" />
            </FormRow>
            <FormRow>
                <label>FILTER:</label>
                <input type="text" value={filter} onChange={e => setFilter(e.target.value)} placeholder="e.g. str(?predicate)=..." />
            </FormRow>
            <FormRow>
                <label>LIMIT:</label>
                <input type="number" min="1" value={limit} onChange={e => setLimit(Number(e.target.value))} placeholder="100" />
            </FormRow>
            <FormRow>
                <label>SPARQL Preview:</label>
                <PreviewBox>{buildQuery()}</PreviewBox>
            </FormRow>
        </ContentArea>
    );
});

SparqlQueryForm.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onRun: PropTypes.func.isRequired
};

export default SparqlQueryForm;

// ...existing code...
const ContentArea = styled.div`
    flex: 1;
    padding: 18px 28px;
    background: #f4f7fa;
    display: flex;
    flex-direction: column;
`;
const FormRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    & > label {
        width: 90px;
        font-weight: 500;
        margin-right: 10px;
    }
    & > select,
    & > input {
        flex: 1;
        font-size: 1rem;
        padding: 6px 10px;
        border-radius: 4px;
        border: 1px solid #bbb;
    }
`;
const PreviewBox = styled.pre`
    background: #fff;
    border: 1px solid #bbb;
    border-radius: 6px;
    padding: 10px;
    font-size: 0.98rem;
    font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
    margin: 0;
    width: 100%;
    min-height: 60px;
    color: #333;
`;
