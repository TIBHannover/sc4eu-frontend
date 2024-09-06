import React, { useState } from 'react';
import { Box, IconButton, Button, Divider, List, TextField, Dialog, DialogActions, DialogContent, DialogTitle, ListItem, ListItemText, MenuItem, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import { MIN_WIDTH_FOR_MONITOR } from '../../../styledComponents/styledComponents';
//import Divider from '@mui/material/Divider';
import { getAutoCompleteResult, getJumpToResult } from '../VocabularySearch/api/search';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const CreateNewTerm = ({ displayType, table, row, internalEditComponents, handleCreateTerm, setOpenCreateModal, handleCancelCreateTerm }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [jumpToResult, setJumpToResult] = useState([]);
    const [openNewTerm, setNewTermOpen] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [altLabelsList, setAltLabelsList] = useState(Array.isArray(row?.original?.altLabel) ? row.original.altLabel : ['']);

    const handleAddAltLabel = () => {
        if (altLabelsList.length < 5) {
            setAltLabelsList([...altLabelsList, '']);
        }
    };

    console.log("");
    const handleRemoveAltLabel = index => {
        setAltLabelsList(altLabelsList.filter((_, i) => i !== index));
    };

    const handleAltLabelChange = (index, value) => {
        const newAltLabels = [...altLabelsList];
        newAltLabels[index] = value;
        setAltLabelsList(newAltLabels);
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleSearch = async event => {
        setSearchQuery(event.target.value);
        const inputForAutoComplete = {};
        inputForAutoComplete['searchQuery'] = event.target.value;

        const [autoCompleteResult, jumpToResult] = await Promise.all([
            getAutoCompleteResult(inputForAutoComplete, 5),
            getJumpToResult(inputForAutoComplete, 10)
        ]);

        setSearchResults(autoCompleteResult);
        setJumpToResult(jumpToResult);
    };

    const handleAddTermFromTerminology = async value => {
        const url =
            process.env.REACT_APP_TS_ONTOLOGIES_URL + encodeURIComponent(value['ontology_name']) + '/terms?iri=' + encodeURIComponent(value['iri']);
        const creatTermFromTerminology = {
            label: value['label'],
            id: value['id'],
            description: value['description'] ? value['description'][0] : 'Not Available',
            //description: value['description'] ? value['description'][0] : '',
            seeAlso: 'url:' + url,
            status: 'draft'

            // description: (
            //     <a href={url} target="_blank" rel="noopener noreferrer">
            //         {value['label']}
            //     </a>
            // ),
        };
        await handleCreateTerm({ values: creatTermFromTerminology, table: table });
        console.log('Adding term from terminology: ', creatTermFromTerminology);
        //setSelectedItem(value['id']);
    };

    //this method needs to be shifted to VocabularyMainTable
    const handleSave = async () => {
        // Map the cell values to the corresponding field names
        const allCells = row.getAllCells();
        // Filter out non-table cells
        const tableCells = allCells.filter(cell => cell.column.id !== 'mrt-row-expand' && cell.column.id !== 'mrt-row-actions');

        const newTerm = tableCells.reduce((acc, cell) => {
            acc[cell.column.id] = cell.getValue();
            return acc;
        }, {});

        const newTermWithAltLabel = {
            ...newTerm,
            altLabel: altLabelsList.join(', '),
        }
        if (displayType === 'create') {
            await handleCreateTerm({ values: newTermWithAltLabel, table });
        } else if (displayType === 'edit') {
            // Update the existing term
            await handleCreateTerm({ values: { ...row.original, ...newTermWithAltLabel }, table });
        }
    };

    const handleCancel = () => {
        handleCancelCreateTerm(table);
    };

    return (
        <Dialog
            open={openNewTerm}
            onClose={handleCancel}
            maxWidth="xl"
            sx={{
                '& .MuiDialog-paper': {
                    width: '50vw',
                    height: '80vh',
                    [MIN_WIDTH_FOR_MONITOR]: {
                        width: '80vw',
                        height: '80vh'
                    }
                }
            }}
        >
            <DialogTitle variant="h5" style={{ textAlign: 'center' }}>
                {displayType === 'create' ? 'Create New Term' : 'Edit Term'}
            </DialogTitle>

            <Tabs value={tabIndex} onChange={handleTabChange}>
                {displayType === 'create' && <Tab label="Define New Term" />}
                {displayType === 'create' && <Tab label="Search Terminology" />}
            </Tabs>

            {tabIndex === 0 && (
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/*{internalEditComponents}*/}
                    {
                        internalEditComponents.map( (component, index) => {
                            if (component.key.split('_').pop() === 'altLabel') {
                                return (
                                    <React.Fragment key={`altLabel-${index}`}>
                                        {altLabelsList.map((altLabel, index) => (
                                            <Box key={index} display="flex" alignItems="center">
                                                <TextField
                                                    key={index}
                                                    label={`Alternative Label ${index + 1}`}
                                                    value={altLabel}
                                                    onChange={e => handleAltLabelChange(index, e.target.value)}
                                                    fullWidth
                                                    margin="normal"
                                                />
                                                <IconButton onClick={() => handleRemoveAltLabel(index)} disabled={altLabelsList.length === 1}>
                                                    <RemoveIcon />
                                                </IconButton>
                                            </Box>
                                        ))}
                                        <Button onClick={handleAddAltLabel} disabled={altLabelsList.length >= 5} startIcon={<AddIcon />}>
                                            Add Alternative Label
                                        </Button>
                                    </React.Fragment>
                                );
                            }
                            else {
                                return React.cloneElement(component, { key: component.key || index });
                            }
                        })
                    }

                </DialogContent>
            )}

            {tabIndex === 1 && displayType === 'create' && (
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <TextField label="Search" value={searchQuery} onChange={handleSearch} />
                    <List>
                        {searchResults.map((result, index) => (
                            <ListItem
                                button
                                key={index}
                                onClick={async () => {
                                    const autoSuggest = result['autosuggest'];
                                    setSearchQuery(autoSuggest);
                                    await handleSearch({ target: { value: autoSuggest } });
                                }}
                            >
                                <ListItemText primary={result['autosuggest']} sx={{ lineHeight: 1 }} />
                            </ListItem>
                        ))}
                    </List>
                    {jumpToResult.length > 0 && <Divider style={{ height: '1px', backgroundColor: 'darkgray' }} />}
                    <List>
                        {jumpToResult.map((result, index) => (
                            <MenuItem
                                selected={selectedItem === result['id']}
                                key={index}
                                style={{ backgroundColor: selectedItem === result['id'] ? 'darkgray' : '' }}
                                onClick={() => handleAddTermFromTerminology(result)}
                            >
                                <ListItemText>
                                    <b>{'Label: '}</b> {result['label']} <br />
                                    <b>{'Description: '} </b> {result['description']} <br />
                                    <b>{'iri: '}</b> {result['iri']} <br />
                                    {result['ontology_name']} - {result['id']}
                                </ListItemText>
                            </MenuItem>
                        ))}
                    </List>
                    {/*<MaterialReactTable table={tableSearchResult} />*/}
                </DialogContent>
            )}

            <DialogActions>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Create
                </Button>
                <Button onClick={handleCancel} variant="contained" color="primary">
                    Cancel
                </Button>
                {/*<MRT_EditActionButtons variant="text" table={table} row={row} />*/}
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
        // id: !validateRequired(term.id) ? 'ID is Required' : '',
        description: !validateRequired(term.description) ? 'Description is Required' : ''
        //altLabel: term.altLabel.some(label => !validateRequired(label)) ? 'All Alternative Labels are Required' : ''
    };
}
