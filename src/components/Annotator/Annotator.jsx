import React, { useState, useCallback, useMemo } from 'react';
import { Button, Grid, TextField, Typography, CircularProgress, IconButton, Link, Backdrop } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import styled from 'styled-components';
import { annotateText } from '../../network/annotatorService';

const generateLightColor = () => {
    const r = Math.floor(Math.random() * 156 + 150);
    const g = Math.floor(Math.random() * 156 + 150);
    const b = Math.floor(Math.random() * 156 + 150);
    return `rgb(${r}, ${g}, ${b})`;
};

const generateLink = (iri, ontologyId) =>
    `${process.env.REACT_APP_TS_ONTOLOGIES_URL}${ontologyId}/terms?iri=${encodeURIComponent(iri)}&obsoletes=false`;

const getContext = (text, start, end) => {
    const words = text.split(/\s+/); // Split by spaces
    let charCount = 0;
    let wordIndexStart = 0;
    let wordIndexEnd = 0;

    // Find the word index for the start and end positions
    for (let i = 0; i < words.length; i++) {
        const wordLength = words[i].length;
        if (charCount + wordLength >= start && wordIndexStart === 0) {
            wordIndexStart = i;
        }
        if (charCount + wordLength >= end) {
            wordIndexEnd = i;
            break;
        }
        charCount += wordLength + 1; // +1 for the space
    }

    // Get two words before and after the matched term
    const beforeWords = words.slice(Math.max(0, wordIndexStart - 2), wordIndexStart).join(' ');
    const afterWords = words.slice(wordIndexEnd + 1, wordIndexEnd + 3).join(' ');

    // Add ellipsis if necessary
    const beforeEllipsis = wordIndexStart > 2 ? '...' : '';
    const afterEllipsis = wordIndexEnd + 3 < words.length ? '...' : '';

    const term = text.slice(start, end);

    // Make sure the matched term is excluded from the before and after context
    return {
        before: beforeWords ? `${beforeEllipsis} ${beforeWords}`.trim() : '',
        term,
        after: afterWords ? `${afterWords} ${afterEllipsis}`.trim() : ''
    };
};

const createColumns = inputText => [
    {
        header: 'Term',
        accessorKey: 'matched_term',
        Cell: ({ row }) => (
            <Link href={generateLink(row?.original?.iri, row?.original?.ontologyId)} target="_blank" rel="noopener noreferrer">
                {row?.original?.matched_term}
            </Link>
        )
    },
    {
        header: 'Context',
        accessorKey: 'context',
        Cell: ({ row }) => {
            const { before, term, after } = getContext(inputText, row?.original?.start, row?.original?.end);
            return (
                <span>
                    <span style={{ color: 'grey' }}>{before} </span>
                    <strong>{term}</strong>
                    <span style={{ color: 'grey' }}> {after}</span>
                </span>
            );
        }
    },
    {
        header: 'IRI',
        accessorKey: 'iri',
        Cell: ({ row }) => (
            <Link href={row?.original?.iri} target="_blank" rel="noopener noreferrer">
                {row?.original?.iri}
            </Link>
        )
    },
    {
        header: 'Synonyms',
        accessorKey: 'synonyms',
        size: 120,
        Cell: ({ row }) => (
            <div>
                {row?.original?.synonyms.map((synonym, index) => (
                    <div key={index}>{synonym}</div>
                ))}
            </div>
        )
    }
];

export const Annotator = () => {
    const [inputText, setInputText] = useState('');
    const [matches, setMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [annotatedText, setAnnotatedText] = useState('');
    const [termColors, setTermColors] = useState({});
    const [error, setError] = useState(null);

    const handleInputChange = useCallback(e => setInputText(e.target.value), []);

    const handleAnnotate = useCallback(async () => {
        if (!inputText.trim()) return;

        setIsLoading(true);
        setError(null);
        try {
            const data = await annotateText(inputText);
            setMatches(data.matches);
            setAnnotatedText(inputText);

            const colorMap = {};
            data.matches.forEach(match => {
                if (!colorMap[match.matched_term]) {
                    colorMap[match.matched_term] = generateLightColor();
                }
            });
            setTermColors(colorMap);
        } catch (error) {
            console.error('Error:', error);
            setError(
                error.message.includes('HTTP error')
                    ? 'The annotation service is currently unavailable. Please try again later.'
                    : 'An unexpected error occurred. Please try again.'
            );
        } finally {
            setIsLoading(false);
        }
    }, [inputText]);

    const handleReset = useCallback(() => {
        setInputText('');
        setMatches([]);
        setAnnotatedText('');
        setError(null);
    }, []);

    const highlightText = useCallback(() => {
        if (!annotatedText || matches.length === 0) return annotatedText;

        let parts = [];
        let lastIndex = 0;
        const sortedMatches = [...matches].sort((a, b) => (a.start === b.start ? b.end - b.start - (a.end - a.start) : a.start - b.start));

        sortedMatches.forEach((match, index) => {
            if (match.start >= lastIndex) {
                parts.push(annotatedText.slice(lastIndex, match.start));
                parts.push(
                    <HighlightedLabel
                        key={`label_${index}`}
                        color={termColors[match.matched_term]}
                        role="mark"
                        aria-label={`Highlighted term: ${match.matched_term}`}
                    >
                        {annotatedText.slice(match.start, match.end)}
                    </HighlightedLabel>
                );
                lastIndex = match.end;
            }
        });

        parts.push(annotatedText.slice(lastIndex));
        return parts;
    }, [annotatedText, matches, termColors]);

    const isAnnotateDisabled = !inputText.trim();
    const isResetDisabled = inputText.trim().length === 0;

    const getUniqueMatches = useCallback(() => {
        const seen = new Set();
        return matches.filter(match => {
            if (seen.has(match.matched_term)) {
                return false;
            }
            seen.add(match.matched_term);
            return true;
        });
    }, [matches]);

    const columns = useMemo(() => createColumns(inputText), [inputText]);

    const table = useMaterialReactTable({
        columns,
        data: getUniqueMatches(),
        initialState: { pagination: { pageSize: 10 }, density: 'compact' },
        renderTopToolbarCustomActions: () => <Typography variant="h6">Matched Terms</Typography>
    });

    const handleCopyExample = useCallback(() => {
        setInputText(
            'The Delivery Commitment directly corresponds to the release plans and cycle time commitments introduced in the corresponding entities'
        );
    }, []);

    return (
        <Grid container justifyContent="center">
            <Grid item md={9}>
                <div role="main" aria-label="Text Annotator">
                    <Typography variant="h5" gutterBottom textAlign="center">
                        Annotator
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        This annotator utilizes terms from Digital Reference Ontology to match input text. We generate n-grams (unigrams, bigrams,
                        trigrams, Quadgrams, Pentagrams) from the text and perform matching with a confidence score greater than 90%.
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        <b>Future Work:</b> Our future plans include enhancing this service with semantic annotation capabilities using Sentence-BERT
                        (SBERT), as well as integrating additional descriptive metadata.
                    </Typography>
                </div>
                {!annotatedText ? (
                    <InputContainer>
                        <Typography variant="h6">Text To Annotate</Typography>
                        <TextField
                            variant="outlined"
                            multiline
                            rows={6}
                            fullWidth
                            value={inputText}
                            onChange={handleInputChange}
                            aria-label="Text input for annotation"
                            error={!!error}
                            helperText={
                                <HelperTextContainer>
                                    {error ? (
                                        <ErrorText>{error}</ErrorText>
                                    ) : (
                                        <>
                                            <HelperText>
                                                <b>Example Text:</b>{' '}
                                                <i>
                                                    The Delivery Commitment directly corresponds to the release plans and cycle time commitments
                                                    introduced in the corresponding entities
                                                </i>
                                            </HelperText>
                                            <IconButton onClick={handleCopyExample} aria-label="Copy example text">
                                                <FileCopyOutlinedIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </HelperTextContainer>
                            }
                        />
                    </InputContainer>
                ) : (
                    <AnnotatedText>
                        <Typography variant="h6">Annotated Text</Typography>
                        <ScrollableText role="region" aria-label="Annotated text with highlighted terms">
                            {highlightText()}
                        </ScrollableText>
                    </AnnotatedText>
                )}

                <ButtonContainer>
                    <Button variant="contained" color="primary" onClick={handleAnnotate} disabled={isAnnotateDisabled} aria-label="Annotate text">
                        Annotate
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleReset} disabled={isResetDisabled} aria-label="Reset form">
                        Reset
                    </Button>
                </ButtonContainer>

                <Backdrop open={isLoading} sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                {!isLoading && <MaterialReactTable table={table} />}
            </Grid>
        </Grid>
    );
};

const HighlightedLabel = styled.span`
    background-color: ${({ isHovered, color }) => (isHovered ? '#ffeb3b' : color)};
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #ffeb3b;
    }
`;

const InputContainer = styled.div`
    margin-bottom: 20px;
`;

const HelperTextContainer = styled.div`
    display: flex;
    align-items: center;
`;

const HelperText = styled.div`
    margin-right: 8px;
`;

const AnnotatedText = styled.div`
    margin-bottom: 20px;
`;

const ScrollableText = styled.div`
    height: 180px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    background-color: #f9f9f9;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const ErrorText = styled.div`
    color: ${({ theme }) => theme.palette?.error?.main || '#f44336'};
    margin-right: 8px;
`;
