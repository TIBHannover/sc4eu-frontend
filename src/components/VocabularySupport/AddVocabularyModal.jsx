import React, { useMemo, useState } from 'react';
import { createRow, MaterialReactTable, MRT_EditActionButtons, useMaterialReactTable } from 'material-react-table';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    ListItem,
    ListItemText,
    MenuItem,
    Tab,
    Tabs,
    Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetTerms } from './hooks/useGetTerms';
import { useCreateTerm } from './hooks/useCreateTerm';
import { useUpdateTerm } from './hooks/useUpdateTerm';
import { useDeleteTerm } from './hooks/useDeleteTerm';
import { useCommitChanges } from './hooks/useCommitChanges';
import TextField from '@material-ui/core/TextField';
import List from '@mui/material/List';
import { getAutoCompleteResult, getJumpToResult } from './VocabularySearch/api/search';
import { colorStyled } from '../../styledComponents/styledColor';
import { MIN_WIDTH_FOR_MONITOR } from '../../styledComponents/styledComponents';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';

export default function AddVocabulary() {
    const [validationErrors, setValidationErrors] = useState({});
    const [openCommit, setOpenCommit] = useState(false);
    const [commitMessage, setCommitMessage] = useState('');

    // Define the Cell component separately
    const TerminologyCellComponent = ({ row }) => {
        const value = row.original.description;
        const Label = row.original.label;
        if (value.startsWith('url:')) {
            const url = value.slice(4); // remove "url:" prefix
            return (
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {Label}
                </a>
            );
        } else {
            return <span>{value}</span>;
        }
    };
    TerminologyCellComponent.propTypes = {
        row: PropTypes.shape({
            original: PropTypes.shape({
                description: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                size: 150,
                enableEditing: false
                // muiEditTextFieldProps: {
                //     required: true,
                //     error: !!validationErrors?.id,
                //     helperText: validationErrors?.id,
                //     onFocus: () =>
                //         setValidationErrors({
                //             ...validationErrors,
                //             id: 'undefined'
                //         })
                // }
            },
            {
                accessorKey: 'label',
                header: 'Label',
                size: 150,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.label,
                    helperText: validationErrors?.label,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            label: undefined
                        })
                }
            },
            {
                accessorKey: 'comment',
                header: 'Comment',
                size: 150,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.comment,
                    helperText: validationErrors?.comment,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            comment: undefined
                        })
                }
            },
            {
                accessorKey: 'description',
                header: 'Definition/Go To Term',
                size: 200,
                Cell: TerminologyCellComponent
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 150
            }
        ],
        [validationErrors]
    );

    const {
        data: fetchedTerms = [],
        refetch,
        isError: isLoadingTermsError,
        error,
        isFetching: isFetchingTerms,
        isLoading: isLoadingTerms
    } = useGetTerms();
    const { mutateAsync: createTerm, isPending: isCreatingTerm } = useCreateTerm();
    const { mutateAsync: updateTerm, isPending: isUpdatingTerm } = useUpdateTerm();
    const { mutateAsync: deleteTerm, isPending: isDeletingTerm } = useDeleteTerm();
    const { mutateAsync: commitChanges } = useCommitChanges(refetch, commitMessage);

    const handleCreateTerm = async ({ values, table }) => {
        const uuid = crypto.randomUUID();
        console.log('creating term', values);
        const newValidationErrors = validateTerm(values);
        if (Object.values(newValidationErrors).some(error => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        values.id = uuid;
        await createTerm(values);
        table.setCreatingRow(null);
        setSearchQuery('');
        setSearchResults([]);
        setJumpToResult([]);
    };

    //UPDATE action
    const handleSaveTerm = async ({ values, table }) => {
        const newValidationErrors = validateTerm(values);
        if (Object.values(newValidationErrors).some(error => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateTerm(values);
        table.setEditingRow(null);
    };

    //DELETE action
    const openDeleteConfirmModal = async row => {
        if (window.confirm('Are you sure you want to delete this term?')) {
            console.log('deleting term', row.id);
            await deleteTerm(row.id);
            table.setEditingRow(null);
        }
    };

    function createNewTermAction(table) {
        return (
            <Button
                variant="contained"
                onClick={() => {
                    setNewTermOpen(true);
                    table.setCreatingRow(createRow(table, { id: crypto.randomUUID() }));
                }}
                style={{ backgroundColor: colorStyled.SECONDARY.dark }}
            >
                Create New Term
            </Button>
        );
    }

    const [tabIndex, setTabIndex] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [jumpToResult, setJumpToResult] = useState([]);
    const [openNewTerm, setNewTermOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSearch = async event => {
        setSearchQuery(event.target.value);
        const inputForAutoComplete = {};
        inputForAutoComplete['searchQuery'] = event.target.value;

        const [autoCompleteResult, jumpToResult] = await Promise.all([
            getAutoCompleteResult(inputForAutoComplete, 5),
            getJumpToResult(inputForAutoComplete, 10)
        ]);

        console.log(jumpToResult);
        setSearchResults(autoCompleteResult);
        setJumpToResult(jumpToResult);
    };

    //const tableSearchResult = useMaterialReactTable({});
    function createRowDialogContent(table, row, internalEditComponents) {
        const handleTabChange = (event, newValue) => {
            setTabIndex(newValue);
        };

        const handleAddTermFromTerminology = async value => {
            console.log('Adding term from terminology: ', value);
            const url =
                process.env.REACT_APP_TS_ONTOLOGIES_URL +
                encodeURIComponent(value['ontology_name']) +
                '/terms?iri=' +
                encodeURIComponent(value['iri']);
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
                onClose={() => setNewTermOpen(false)}
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
                    Add New Term
                </DialogTitle>

                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Define New Term" />
                    <Tab label="Search Terminology" />
                </Tabs>

                {tabIndex === 0 && (
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {internalEditComponents} {/* or render custom edit components here */}
                    </DialogContent>
                )}

                {tabIndex === 1 && (
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
    }

    function createCommitChangesButton() {
        return (
            <Button variant="contained" onClick={() => setOpenCommit(true)} style={{ backgroundColor: colorStyled.SECONDARY.dark }}>
                Commit Changes
            </Button>
        );
    }

    function createCommitChangesDialog() {
        return (
            <Dialog open={openCommit} onClose={() => setOpenCommit(false)} maxWidth="xl">
                <DialogTitle>Commit Changes</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please enter your commit message.</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="commitMessage"
                        label="Commit Message"
                        type="text"
                        fullWidth
                        multiline
                        maxRows={5}
                        value={commitMessage}
                        onChange={handleCommitMessageChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenCommit(false);
                            setCommitMessage('');
                        }}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleCommit} disabled={commitMessage.length === 0}>
                        Commit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    // Function to handle the click event of the commit button
    const handleCommit = () => {
        commitChanges(commitMessage);
        setOpenCommit(false);
        setCommitMessage('');
    };

    // Function to handle the change event of the TextField
    const handleCommitMessageChange = event => {
        setCommitMessage(event.target.value);
    };

    const table = useMaterialReactTable({
        columns,
        data: fetchedTerms,
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        enableEditing: true,
        getRowId: row => row.id,
        positionActionsColumn: 'last',
        enableRowExpansion: true,
        renderDetailPanel: ({ row }) => (
            <Box sx={{ padding: '16px' }}>
                <strong>ID:</strong> {row.original.id}
                <br />
                <strong>Label:</strong> {row.original.label}
                <br />
                <strong>Comment:</strong> {row.original.comment}
                <br />
                <strong>Definition/URL:</strong> <TerminologyCellComponent row={row} />
                <br />
                <strong>Status:</strong> {row.original.status}
            </Box>
        ),
        initialState: { columnVisibility: { id: false } },
        muiToolbarAlertBannerProps: isLoadingTermsError
            ? {
                  color: 'error',
                  children: `Error Loading Data: ${error.message}`
              }
            : isLoadingTerms
            ? {
                  color: 'info',
                  children: 'Loading Data from GitHub'
              }
            : undefined,

        muiTableContainerProps: {
            sx: {
                minHeight: '500px'
            }
        },
        onCreatingRowCancel: () => {
            console.log('onCreatingRowCancel');
            setSearchQuery('');
            setSearchResults([]);
            setJumpToResult([]);
            setValidationErrors({});
        },
        onCreatingRowSave: handleCreateTerm,
        onEditingRowCancel: () => {
            setSearchQuery('');
            setSearchResults([]);
            setJumpToResult([]);
            setValidationErrors({});
        },
        onEditingRowSave: handleSaveTerm,
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => createRowDialogContent(table, row, internalEditComponents),
        renderTopToolbarCustomActions: ({ table }) => (
            <>
                {createNewTermAction(table)}
                {/*{createCommitChangesButton()}*/}
            </>
        ),
        renderBottomToolbarCustomActions: () => (
            <>
                {createCommitChangesButton()}
                {createCommitChangesDialog()}
            </>
        ),
        state: {
            isLoading: isLoadingTerms,
            isSaving: isCreatingTerm || isUpdatingTerm || isDeletingTerm,
            showAlertBanner: isLoadingTermsError,
            showProgressBars: isFetchingTerms
        },

        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton style={{ color: colorStyled.SECONDARY.dark }} onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                    <IconButton style={{ color: colorStyled.SECONDARY.dark }} onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        )
    });

    return (
        <>
            <MaterialReactTable table={table} />
        </>
    );
}

const validateRequired = value => !!value.length;
function validateTerm(term) {
    console.log('validating term', term);
    return {
        label: !validateRequired(term.label) ? 'Label is Required' : '',
        // id: !validateRequired(term.id) ? 'ID is Required' : '',
        comment: !validateRequired(term.comment) ? 'Comment is Required' : ''
    };
}
