import React, { useState } from 'react';
import {
    Box,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItemText,
    Button,
    Chip,
    Typography,
    IconButton,
    ListItemButton,
    Tabs,
    Tab
} from '@mui/material';
import PropTypes from 'prop-types';
import { Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { getAutoCompleteResult, getJumpToResult } from '../VocabularySearch/api/search';
import { colorStyled } from '../../../styledComponents/styledColor';

const CreateNewTerm = ({ displayType, table, row, internalEditComponents, handleCreateTerm, handleCancelCreateTerm }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [autoCompleteResults, setAutoCompleteResults] = useState([]);
    const [jumpToResults, setJumpToResults] = useState([]);
    const [altLabelsList, setAltLabelsList] = useState(Array.isArray(row?.original?.altLabel) ? row.original.altLabel : ['']);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [errors, setErrors] = useState({ label: '', description: '' });

    const handleSearch = async value => {
        setSearchQuery(value);
        if (value.length > 2) {
            const [autoCompleteResult, jumpToResult] = await Promise.all([
                getAutoCompleteResult({ searchQuery: value }, 5),
                getJumpToResult({ searchQuery: value }, 10)
            ]);
            setAutoCompleteResults(autoCompleteResult);
            setJumpToResults(jumpToResult);
        } else {
            setAutoCompleteResults([]);
            setJumpToResults([]);
        }
    };

    const handleAddTermFromTerminology = async value => {
        const url = `${process.env.REACT_APP_TS_ONTOLOGIES_URL}${encodeURIComponent(value.ontology_name)}/terms?iri=${encodeURIComponent(value.iri)}`;
        const termFromTerminology = {
            label: value.label,
            id: value.id,
            description: value.description ? value.description[0] : 'Not Available',
            seeAlso: `url:${url}`,
            status: 'draft',
            created: new Date().toLocaleDateString('en-CA')
        };
        await handleCreateTerm({ values: termFromTerminology, table: table });
        console.log('Adding term from terminology: ', termFromTerminology);
    };

    const handleSelectTerm = term => {
        setSelectedTerm(term);
    };

    const validateForm = () => {
        const newErrors = {
            label: '',
            description: ''
        };

        if (!row.getValue('label')) {
            newErrors.label = 'Label is required';
        }
        if (!row.getValue('description')) {
            newErrors.description = 'Description is required';
        }

        setErrors(newErrors);
        return !newErrors.label && !newErrors.description;
    };

    const handleSave = async () => {
        if (activeTab === 0 && selectedTerm) {
            // If a term is selected from search results, use it
            await handleAddTermFromTerminology(selectedTerm);
            handleCancelCreateTerm(table); // Close the dialog after saving
        } else if (activeTab === 1) {
            // Creating/editing a new term
            if (validateForm()) {
                const allCells = row.getAllCells();
                const tableCells = allCells.filter(cell => cell.column.id !== 'mrt-row-expand' && cell.column.id !== 'mrt-row-actions');

                const newTerm = tableCells.reduce((acc, cell) => {
                    acc[cell.column.id] = cell.getValue();
                    return acc;
                }, {});

                const newTermWithAltLabel = {
                    ...newTerm,
                    altLabel: altLabelsList.join(', ')
                };

                if (displayType === 'create') {
                    await handleCreateTerm({ values: newTermWithAltLabel, table });
                } else if (displayType === 'edit') {
                    await handleCreateTerm({
                        values: { ...row.original, ...newTermWithAltLabel },
                        table
                    });
                }
                handleCancelCreateTerm(table); // Close the dialog after saving
            }
        }
    };

    const handleCancel = () => {
        handleCancelCreateTerm();
    };

    const handleRemoveAltLabel = index => {
        setAltLabelsList(prevList => prevList.filter((_, i) => i !== index));
    };

    const handleAddAltLabel = () => {
        setAltLabelsList(prevList => {
            if (prevList.length < 5) {
                return [...prevList, ''];
            }
            return prevList;
        });
    };

    const handleAltLabelChange = (index, value) => {
        setAltLabelsList(prevList => {
            const newList = [...prevList];
            newList[index] = value;
            return newList;
        });
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Dialog
            open={true}
            onClose={handleCancelCreateTerm}
            maxWidth="md"
            fullWidth
            PaperProps={{
                style: {
                    position: 'fixed',
                    top: 0,
                    margin: 0
                }
            }}
        >
            <DialogTitle>
                <Typography variant="h5">{displayType === 'create' ? 'Create New Term' : 'Edit Term'}</Typography>
                <IconButton aria-label="close" onClick={handleCancelCreateTerm} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
                    <Tab label="Search Existing Terms" />
                    <Tab label="Define New Term" />
                </Tabs>

                {activeTab === 0 && (
                    <Box>
                        <Autocomplete
                            freeSolo
                            options={autoCompleteResults.map(result => result.autosuggest)}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label="Search Term"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {params.InputProps.endAdornment}
                                                <IconButton>
                                                    <SearchIcon />
                                                </IconButton>
                                            </React.Fragment>
                                        )
                                    }}
                                />
                            )}
                            onInputChange={(_, value) => handleSearch(value)}
                            onChange={(_, value) => setSearchQuery(value)}
                        />

                        {jumpToResults.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Suggested Terms
                                </Typography>
                                <List>
                                    {jumpToResults.map((result, index) => (
                                        <ListItemButton
                                            key={index}
                                            selected={selectedTerm && selectedTerm.id === result.id}
                                            onClick={() => handleSelectTerm(result)}
                                        >
                                            <ListItemText
                                                primary={result.label}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {result.description}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {result.ontology_name} - {result.id}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </Box>
                )}

                {activeTab === 1 && (
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Term Details
                        </Typography>
                        {internalEditComponents.map((component, index) => {
                            if (component.key.split('_').pop() === 'altLabel') {
                                return (
                                    <Box key={`altLabel-${index}`} sx={{ mt: 2 }}>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Alternative Labels
                                        </Typography>
                                        {altLabelsList.map((altLabel, idx) => (
                                            <Box key={idx} display="flex" alignItems="center" mb={1}>
                                                <TextField
                                                    label={`Alternative Label ${idx + 1}`}
                                                    value={altLabel}
                                                    onChange={e => handleAltLabelChange(idx, e.target.value)}
                                                    fullWidth
                                                    margin="dense"
                                                />
                                                <IconButton
                                                    onClick={() => handleRemoveAltLabel(idx)}
                                                    disabled={altLabelsList.length === 1}
                                                    sx={{ ml: 1 }}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                            </Box>
                                        ))}
                                        <Button
                                            startIcon={<AddIcon />}
                                            onClick={handleAddAltLabel}
                                            disabled={altLabelsList.length >= 5}
                                            size="small"
                                            sx={{ mt: 1 }}
                                        >
                                            Add Alternative Label
                                        </Button>
                                    </Box>
                                );
                            } else {
                                const fieldName = component.key.split('_').pop();
                                return React.cloneElement(component, {
                                    key: component.key || index,
                                    error: !!errors[fieldName],
                                    helperText: errors[fieldName]
                                });
                            }
                        })}
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCancel}
                    sx={{
                        backgroundColor: colorStyled.SECONDARY.dark,
                        color: 'white',
                        '&:hover': { backgroundColor: 'darkgray' }
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    sx={{
                        backgroundColor: colorStyled.SECONDARY.dark,
                        color: 'white',
                        '&:hover': { backgroundColor: 'darkgray' }
                    }}
                >
                    {activeTab === 0 && selectedTerm ? 'Add Selected Term' : displayType === 'create' ? 'Create' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

CreateNewTerm.propTypes = {
    table: PropTypes.object.isRequired,
    row: PropTypes.object.isRequired,
    internalEditComponents: PropTypes.array.isRequired,
    handleCreateTerm: PropTypes.func.isRequired,
    displayType: PropTypes.string.isRequired,
    setOpenCreateModal: PropTypes.func.isRequired,
    handleCancelCreateTerm: PropTypes.func.isRequired
};

export default CreateNewTerm;

const validateRequired = value => !!value.length;
function validateTerm(term) {
    console.log('validating term', term);
    return {
        label: !validateRequired(term.label) ? 'Label is Required' : '',
        description: !validateRequired(term.description) ? 'Description is Required' : ''
    };
}
