import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ContentSparqlQueryFormArea, FormRow, PreviewBox } from 'styledComponents/styledComponents';

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
        <ContentSparqlQueryFormArea>
            <FormRow>
                <label htmlFor="subject">Subject:</label>
                <input id="subject" type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="?subject or <URI>" />
            </FormRow>
            <FormRow>
                <label htmlFor="predicate">Predicate:</label>
                <input id="predicate" type="text" value={predicate} onChange={e => setPredicate(e.target.value)} placeholder="?predicate or <URI>" />
            </FormRow>
            <FormRow>
                <label htmlFor="objec">Object:</label>
                <input id="object" type="text" value={object} onChange={e => setObject(e.target.value)} placeholder="?object, <URI>, or literal" />
            </FormRow>
            <FormRow>
                <label htmlFor="filter">FILTER:</label>
                <input id="filter" type="text" value={filter} onChange={e => setFilter(e.target.value)} placeholder="e.g. str(?predicate)=..." />
            </FormRow>
            <FormRow>
                <label htmlFor="limit">LIMIT:</label>
                <input id="limit" type="number" min="1" value={limit} onChange={e => setLimit(Number(e.target.value))} placeholder="100" />
            </FormRow>
            <FormRow>
                <label>
                    SPARQL Preview:
                    <PreviewBox>{buildQuery()}</PreviewBox>
                </label>
            </FormRow>
        </ContentSparqlQueryFormArea>
    );
});

SparqlQueryForm.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onRun: PropTypes.func.isRequired
};

export default SparqlQueryForm;
