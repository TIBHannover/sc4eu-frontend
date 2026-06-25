import React, { useState, useCallback, useMemo } from 'react';
import {
    Button,
    TextField,
    Typography,
    CircularProgress,
    IconButton,
    Backdrop,
    Grid,
    Tooltip,
    Box,
    Switch,
    ButtonGroup,
    Link,
    useTheme
} from '@mui/material';
import Select from 'react-select';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { CSVLink } from 'react-csv';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { annotateText } from '../../network/annotatorService';
import { generateLightColor } from './utils';
import { createColumns } from './tableConfig';
import {
    ContentContainer,
    HighlightedLabel,
    InputContainer,
    HelperTextContainer,
    HelperText,
    AnnotatedText,
    ScrollableText,
    ButtonContainer,
    ErrorText,
    lightSelectStyles
} from './styles';
import { SMALL_SCREEN_WIDTH } from '../../styledComponents/styledComponents';
import { useMediaQuery } from '@material-ui/core';

export const Annotator = () => {
    const [inputText, setInputText] = useState('');
    const [matches, setMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [annotatedText, setAnnotatedText] = useState('');
    const [termColors, setTermColors] = useState({});
    const [maxDepth, setMaxDepth] = useState(1);
    const [selectedDepthOption, setSelectedDepthOption] = useState({ value: 1, label: '1' });
    const [groupByAncestor, setGroupByAncestor] = useState(false);
    const [error, setError] = useState(null);
    const isMobile = useMediaQuery(`(max-width:${SMALL_SCREEN_WIDTH})`);
    const theme = useTheme();

    const highlightedText = useMemo(() => {
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
                        color={termColors[match.label]}
                        role="mark"
                        aria-label={`Highlighted term: ${match.label}`}
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
    const isResetDisabled = !inputText.trim();

    const tableData = useMemo(() => {
        if (groupByAncestor) {
            const grouped = {};

            matches.forEach(match => {
                if (maxDepth > 0 && match.ancestors?.length >= maxDepth) {
                    const ancestor = match.ancestors[maxDepth - 1];
                    const key = ancestor.iri;

                    if (!grouped[key]) {
                        grouped[key] = {
                            ancestor_term: ancestor.label,
                            ancestor_iri: ancestor.iri,
                            ancestor_synonyms: ancestor.synonyms || [],
                            ontologyId: ancestor.ontologyId,
                            labels: new Set()
                        };
                    }

                    grouped[key].labels.add(match.label);
                }
            });

            return Object.values(grouped).map(entry => ({
                ...entry,
                labels: Array.from(entry.labels)
            }));
        } else {
            const uniqueTerms = new Map();

            matches.forEach(match => {
                const key = match.label;

                // Add only if not already included
                if (!uniqueTerms.has(key)) {
                    uniqueTerms.set(key, {
                        label: match.label,
                        ancestor_term: match.ancestors?.[maxDepth - 1]?.label || '',
                        iri: match.iri,
                        ontologyId: match.ontologyId,
                        synonyms: match.synonyms
                    });
                }
            });

            return Array.from(uniqueTerms.values());
        }
    }, [matches, maxDepth, groupByAncestor]);

    const table = useMaterialReactTable({
        columns: createColumns(groupByAncestor),
        data: tableData,
        initialState: {
            pagination: { pageSize: 5, pageIndex: 0 },
            density: 'compact',
            enableColumnOrdering: true,
            columnOrder: groupByAncestor
                ? ['mrt-row-expand', 'ancestor_term', 'ontologyId', 'labels', 'ancestor_iri', 'ancestor_synonyms']
                : ['mrt-row-expand', 'label', 'ontologyId', 'ancestor_term', 'iri', 'synonyms']
        },
        state: {
            columnVisibility: {
                ancestor_term: groupByAncestor ? true : !isMobile,
                label: isMobile ? true : true,
                ontologyId: !isMobile,
                labels: !isMobile,
                ancestor_iri: !isMobile,
                ancestor_synonyms: !isMobile,
                iri: !isMobile,
                synonyms: !isMobile
            }
        },
        enablePagination: true,
        enableExpanding: true,
        renderDetailPanel: ({ row }) => (
            <Box sx={{ p: 2 }}>
                {console.log(row.original)}
                <Typography variant="body2">Ontology ID: {row.original.ontologyId}</Typography>
                <Typography variant="body2">Ancestor Term: {row.original.ancestor_term}</Typography>
                <Typography variant="body2">Synonyms: {row.original.synonyms}</Typography>
                <Typography variant="body2">
                    IRI:{' '}
                    <Link href={row.original.iri} target="_blank" rel="noopener noreferrer">
                        {row.original.iri}
                    </Link>
                </Typography>
            </Box>
        ),
        renderTopToolbarCustomActions: () => (
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h6" sx={{ mr: 2 }}>
                        Matched Terms
                    </Typography>
                </Grid>

                <Grid item>
                    <Tooltip
                        title="Set how deep to consider ancestor terms and whether to group matched terms by their common ancestors."
                        arrow
                        placement="top"
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            border="1px solid"
                            borderColor={theme.palette.secondary.main}
                            borderRadius={2}
                            px={1}
                            py={1}
                            gap={1}
                            backgroundColor={theme.palette.secondary.main}
                            color={theme.palette.secondary.contrastText}
                        >
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="body2" sx={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                                    Ancestor Depth:
                                </Typography>
                                <Box minWidth={60}>
                                    <Select
                                        options={[
                                            { value: 1, label: '1' },
                                            { value: 2, label: '2' },
                                            { value: 3, label: '3' },
                                            { value: 4, label: '4' }
                                        ]}
                                        value={selectedDepthOption}
                                        onChange={selectedOption => {
                                            setSelectedDepthOption(selectedOption);
                                            setMaxDepth(selectedOption.value);
                                        }}
                                        menuPortalTarget={document.body}
                                        isSearchable={false}
                                        menuPosition="absolute"
                                        styles={lightSelectStyles}
                                    />
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="body2" sx={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                                    Group by Ancestor Term
                                </Typography>
                                <Switch
                                    checked={groupByAncestor}
                                    onChange={() => setGroupByAncestor(!groupByAncestor)}
                                    name="groupByAncestor"
                                    size="small"
                                    style={{ backgroundColor: theme.palette.primary.main }}
                                    disabled={!annotatedText}
                                />
                            </Box>
                        </Box>
                    </Tooltip>
                </Grid>
            </Grid>
        ),
        renderBottomToolbarCustomActions: () => (
            <ButtonGroup variant="contained" size="small" aria-label="Basic button group">
                {csvData.length === 0 ? (
                    <Button
                        variant="contained"
                        disabled
                        style={{
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.secondary.contrastText,
                            opacity: 0.5
                        }}
                    >
                        Download CSV
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText }}
                    >
                        <CSVLink
                            data={csvData}
                            headers={csvHeaders}
                            filename="annotations.csv"
                            style={{ color: theme.palette.secondary.contrastText, textDecoration: 'none', display: 'block', width: '100%' }}
                        >
                            Download CSV
                        </CSVLink>
                    </Button>
                )}

                <Button
                    variant="contained"
                    onClick={exportToExcel}
                    disabled={csvData.length === 0}
                    style={{
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.secondary.contrastText,
                        opacity: csvData.length === 0 ? 0.5 : 1
                    }}
                >
                    Download Excel
                </Button>
            </ButtonGroup>
        )
    });

    const csvHeaders = groupByAncestor
        ? [
              { label: 'Ancestor Term', key: 'ancestor_term' },
              { label: 'Matched Terms', key: 'labels' },
              { label: 'Ontology ID', key: 'ontologyId' },
              { label: 'Ancestor IRI', key: 'ancestor_iri' },
              { label: 'Ancestor Synonyms', key: 'ancestor_synonyms' }
          ]
        : [
              { label: 'Matched Term', key: 'label' },
              { label: 'Ancestor Term', key: 'ancestor_term' },
              { label: 'Ontology ID', key: 'ontologyId' },
              { label: 'Matched Term IRI', key: 'iri' },
              { label: 'Matched Term Synonyms', key: 'synonyms' }
          ];

    const csvData = tableData;

    // Export to Excel
    const exportToExcel = () => {
        const excelData = csvData;
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Annotations');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'annotations.xlsx');
    };

    const handleCopyExample = useCallback(() => {
        setInputText(
            'The Delivery Commitment directly corresponds to the release plans and cycle time commitments introduced in the corresponding entities'
        );
    }, []);

    const handleInputChange = event => {
        setInputText(event.target.value);
        setError(null);
    };

    const handleAnnotate = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await annotateText(inputText);

            const newTermColors = {};
            response.matches.forEach(match => {
                if (!newTermColors[match.label]) {
                    newTermColors[match.label] = generateLightColor();
                }
            });

            setMatches(response.matches);
            setTermColors(newTermColors);
            setAnnotatedText(inputText);
        } catch (err) {
            setError(err.message || 'An error occurred while annotating the text');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setInputText('');
        setMatches([]);
        setAnnotatedText('');
        setTermColors({});
        setError(null);
    };

    return (
        <ContentContainer>
            <div role="main" aria-label="Text Annotator">
                <Typography variant="h5" gutterBottom textAlign="center" style={{ color: theme.palette.text.primary}}>
                    Annotator
                </Typography>
                <Typography variant="body2" gutterBottom style={{ color: theme.palette.text.primary}}>
                    This annotator utilizes terms from Digital Reference Ontology to match input text. We generate n-grams (unigrams, bigrams,
                    trigrams, Quadgrams, Pentagrams) from the text and perform matching with a confidence score greater than 90%.
                </Typography>
                <Typography variant="body2" gutterBottom style={{ color: theme.palette.text.primary}}>
                    <b>Future Work:</b> Our future plans include enhancing this service with semantic annotation capabilities using Sentence-BERT
                    (SBERT), as well as integrating additional descriptive metadata.
                </Typography>
                {!annotatedText ? (
                    <InputContainer>
                        <Typography variant="h6" style={{ color: theme.palette.text.primary}}>Text To Annotate</Typography>
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
                        <Typography variant="h6" style={{ color: theme.palette.text.primary}}>Annotated Text</Typography>
                        <ScrollableText role="region" aria-label="Annotated text with highlighted terms" style={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary}}>
                            {highlightedText}
                        </ScrollableText>
                    </AnnotatedText>
                )}

                <ButtonContainer>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText }}
                        onClick={handleAnnotate}
                        disabled={isAnnotateDisabled}
                        aria-label="Annotate text"
                    >
                        Annotate
                    </Button>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText }}
                        onClick={handleReset}
                        disabled={isResetDisabled}
                        aria-label="Reset form"
                    >
                        Reset
                    </Button>
                </ButtonContainer>

                <Backdrop open={isLoading} sx={{ color: theme.palette.background.default, zIndex: theme => theme.zIndex.drawer + 1 }}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                {!isLoading && matches.length > 0 && <MaterialReactTable table={table} />}
            </div>
        </ContentContainer>
    );
};
