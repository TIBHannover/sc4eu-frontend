import React, { useState } from 'react';
import { Button, Grid, TextField, Typography, CircularProgress, IconButton, Link } from '@mui/material';
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

    const handleInputChange = e => setInputText(e.target.value);

    const handleAnnotate = async () => {
        if (!inputText.trim()) return;

        setIsLoading(true);
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
            alert('An error occurred while annotating the text. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setInputText('');
        setMatches([]);
        setAnnotatedText('');
    };

    const highlightText = () => {
        if (!annotatedText || matches.length === 0) return annotatedText;

        let parts = [];
        let lastIndex = 0;
        const sortedMatches = [...matches].sort((a, b) => (a.start === b.start ? b.end - b.start - (a.end - a.start) : a.start - b.start));

        sortedMatches.forEach((match, index) => {
            if (match.start >= lastIndex) {
                parts.push(annotatedText.slice(lastIndex, match.start));
                parts.push(
                    <HighlightedLabel key={`label_${index}`} color={termColors[match.matched_term]}>
                        {annotatedText.slice(match.start, match.end)}
                    </HighlightedLabel>
                );
                lastIndex = match.end;
            }
        });

        parts.push(annotatedText.slice(lastIndex));
        return parts;
    };

    const isAnnotateDisabled = !inputText.trim();
    const isResetDisabled = inputText.trim().length === 0;

    const getUniqueMatches = () => {
        const seen = new Set();
        return matches.filter(match => {
            if (seen.has(match.matched_term)) {
                return false;
            }
            seen.add(match.matched_term);
            return true;
        });
    };

    const table = useMaterialReactTable({
        columns: createColumns(inputText),
        data: getUniqueMatches(),
        initialState: { pagination: { pageSize: 10 }, density: 'compact' },
        renderTopToolbarCustomActions: () => <Typography variant="h6">Matched Terms</Typography>
    });

    return (
        <Grid container justifyContent="center">
            <Grid item md={9}>
                <div>
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
                            helperText={
                                <HelperTextContainer>
                                    <HelperText>
                                        <b>Example Text:</b>{' '}
                                        <i>
                                            The Delivery Commitment directly corresponds to the release plans and cycle time commitments introduced in
                                            the corresponding entities
                                        </i>
                                    </HelperText>
                                    <IconButton
                                        onClick={() =>
                                            setInputText(
                                                'The Delivery Commitment directly corresponds to the release plans and cycle time commitments introduced in the corresponding entities'
                                            )
                                        }
                                    >
                                        <FileCopyOutlinedIcon />
                                    </IconButton>
                                </HelperTextContainer>
                            }
                        />
                    </InputContainer>
                ) : (
                    <AnnotatedText>
                        <Typography variant="h6">Annotated Text</Typography>
                        <ScrollableText>{highlightText()}</ScrollableText>
                    </AnnotatedText>
                )}

                <ButtonContainer>
                    <Button variant="contained" color="primary" onClick={handleAnnotate} disabled={isAnnotateDisabled}>
                        Annotate
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleReset} disabled={isResetDisabled}>
                        Reset
                    </Button>
                </ButtonContainer>
                {isLoading ? <CircularProgress /> : <MaterialReactTable table={table} />}
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
