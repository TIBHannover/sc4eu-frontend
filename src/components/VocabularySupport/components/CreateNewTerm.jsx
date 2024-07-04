import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, ListItem, ListItemText, MenuItem, Tab, Tabs } from '@mui/material';
import { colorStyled } from '../../../styledComponents/styledColor';
import PropTypes from 'prop-types';
import { MIN_WIDTH_FOR_MONITOR } from '../../../styledComponents/styledComponents';
import TextField from '@material-ui/core/TextField';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { MRT_EditActionButtons } from 'material-react-table';
import { getAutoCompleteResult, getJumpToResult } from '../VocabularySearch/api/search';
import { useCreateTerm } from '../hooks/useCreateTerm';

const CreateNewTerm = ({ displayType, table, row, internalEditComponents, handleCreateTerm }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [jumpToResult, setJumpToResult] = useState([]);
    const [openNewTerm, setNewTermOpen] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);

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
        console.log('Adding term from terminology: ', value);
        const url =
            process.env.REACT_APP_TS_ONTOLOGIES_URL + encodeURIComponent(value['ontology_name']) + '/terms?iri=' + encodeURIComponent(value['iri']);
        const creatTermFromTerminology = {
            label: value['label'],
            id: value['id'],
            comment: value['description'] ? value['description'][0] : 'Not Available',
            //description: value['description'] ? value['description'][0] : '',
            description: 'url:' + url,
            status: 'draft'

            // description: (
            //     <a href={url} target="_blank" rel="noopener noreferrer">
            //         {value['label']}
            //     </a>
            // ),
        };
        await handleCreateTerm({ values: creatTermFromTerminology, table: table });
        console.log('Adding term from terminology: ', creatTermFromTerminology);
        setSelectedItem(value['id']);
    };

    return (
        <Dialog
            open={openNewTerm}
            onClose={() => {
                setNewTermOpen(false);
            }}
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
                    {internalEditComponents} {/* or render custom edit components here */}
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
                <MRT_EditActionButtons variant="text" table={table} row={row} />
            </DialogActions>
        </Dialog>
    );
};

CreateNewTerm.propTypes = {
    table: PropTypes.object.isRequired,
    row: PropTypes.object.isRequired,
    internalEditComponents: PropTypes.array.isRequired,
    handleCreateTerm: PropTypes.func.isRequired,
    displayType: PropTypes.string.isRequired
};

export default CreateNewTerm;

const validateRequired = value => !!value.length;
function validateTerm(term) {
    console.log('validating term', term);
    return {
        label: !validateRequired(term.label) ? 'Label is Required' : '',
        // id: !validateRequired(term.id) ? 'ID is Required' : '',
        comment: !validateRequired(term.comment) ? 'Comment is Required' : ''
    };
}
