import React, { useState, useCallback, useMemo } from 'react';
import { Button, Grid, TextField, Typography, CircularProgress, IconButton, Backdrop } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { annotateText } from '../../network/annotatorService';
import { generateLightColor } from './utils';
import { createColumns } from './tableConfig';
import {
    HighlightedLabel,
    InputContainer,
    HelperTextContainer,
    HelperText,
    AnnotatedText,
    ScrollableText,
    ButtonContainer,
    ErrorText
} from './styles';

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
                error.name === 'APIError'
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
    const isAnnotateDisabled = !inputText.trim();
    const isResetDisabled = !inputText.trim();

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

                {!isLoading && matches.length > 0 && <MaterialReactTable table={table} />}
            </Grid>
        </Grid>
    );
};
