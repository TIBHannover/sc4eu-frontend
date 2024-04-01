import { useMemo, useState } from 'react';
import { MaterialReactTable, MRT_EditActionButtons, useMaterialReactTable } from 'material-react-table';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getFileContent, saveNewContent } from '../../network/GitAPICalls';
import { parseRDF, writeRDF } from '../../network/parseRDFCalls';
import { useGetTerms } from './hooks/useGetTerms';
import { useCreateTerm } from './hooks/useCreateTerm';
import { useUpdateTerm } from './hooks/useUpdateTerm';
import { useDeleteTerm } from './hooks/useDeleteTerm';
import { useCommitChanges } from './hooks/useCommitChanges';
import TextField from '@material-ui/core/TextField';

export default function AddVocabulary(factory, deps) {
    const [validationErrors, setValidationErrors] = useState({});

    // State for controlling the visibility of the Dialog
    const [open, setOpen] = useState(false);
    // State for storing the commit message
    const [commitMessage, setCommitMessage] = useState('');

    const columns = useMemo(
        () => [
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
                accessorKey: 'id',
                header: 'ID',
                size: 150,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.id,
                    helperText: validationErrors?.id,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            id: undefined
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
                header: 'Description',
                size: 200
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 150
            }
        ],
        [validationErrors]
    );

    //call READ hook (get terms from api)
    const {
        data: fetchedTerms = [],
        refetch,
        isError: isLoadingTermsError,
        error,
        isFetching: isFetchingTerms,
        isLoading: isLoadingTerms
    } = useGetTerms();
    //call CREATE hook (post new term to api)
    const { mutateAsync: createTerm, isPending: isCreatingTerm } = useCreateTerm();
    //call UPDATE hook (update term in api)
    const { mutateAsync: updateTerm, isPending: isUpdatingTerm } = useUpdateTerm();
    //call DELETE hook (delete term in api)
    const { mutateAsync: deleteTerm, isPending: isDeletingTerm } = useDeleteTerm();
    //call COMMIT hook (commit changes to api)
    const { mutateAsync: commitChanges } = useCommitChanges(refetch, commitMessage);

    //CREATE action
    const handleCreateTerm = async ({ values, table }) => {
        const uuid = crypto.randomUUID();
        const newValidationErrors = validateTerm(values);
        if (Object.values(newValidationErrors).some(error => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        values.id = uuid;
        await createTerm(values);
        table.setCreatingRow(null); //exit creating mode
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
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = async row => {
        if (window.confirm('Are you sure you want to delete this term?')) {
            console.log('deleting term', row.id);
            await deleteTerm(row.id);
            table.setEditingRow(null); //exit editing mode
            // deleteTerm(row.original.id).then(() => {
            //     setValidationErrors({});
            //     console.log('Term Deleted');
            // });
        }
    };

    function createNewTermAction(table) {
        return (
            <Button
                variant="contained"
                onClick={() => {
                    table.setCreatingRow(true);
                }}
            >
                Create New Term
            </Button>
        );
    }

    function createRowDialogContent(table, row, internalEditComponents) {
        return (
            <>
                <DialogTitle variant="h3">Define New Term</DialogTitle>

                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>

                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        );
    }

    function createCommitChangesButton() {
        return (
            <Button variant="contained" onClick={() => setOpen(true)}>
                Commit Changes
            </Button>
        );
    }

    // Function to handle the click event of the commit button
    const handleCommit = () => {
        commitChanges(commitMessage);
        setOpen(false);
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
        deleteDisplayMode: 'modal',
        enableEditing: true,
        getRowId: row => row.id,
        positionActionsColumn: 'last',
        initialState: { columnVisibility: { description: true } },
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
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateTerm,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveTerm,
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => createRowDialogContent(table, row, internalEditComponents),
        renderTopToolbarCustomActions: ({ table }) => (
            <>
                {createNewTermAction(table)}
                {/*{createCommitChangesButton()}*/}
            </>
        ),
        renderBottomToolbarCustomActions: () => <>{createCommitChangesButton()}</>,
        state: {
            isLoading: isLoadingTerms,
            isSaving: isCreatingTerm || isUpdatingTerm || isDeletingTerm,
            showAlertBanner: isLoadingTermsError,
            showProgressBars: isFetchingTerms
        },

        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        )
    });

    //return <MaterialReactTable table={table} />;
    return (
        <>
            <MaterialReactTable table={table} />
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xl">
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
                            setOpen(false);
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
        </>
    );
}

const validateRequired = value => !!value.length;
function validateTerm(term) {
    return {
        label: !validateRequired(term.label) ? 'Label is Required' : '',
        id: !validateRequired(term.id) ? 'ID is Required' : '',
        comment: !validateRequired(term.comment) ? 'Comment is Required' : ''
    };
}

// This needs to be read from user input
//const gitHubFileUrl = 'https://raw.githubusercontent.com/tib-ts/vocabulary_development/main/testexample.ttl';

/*
 * Fetches all terms from the server. this function is used for fetching JSON data from GitHub. For now it is not used.
 * @returns {Promise} A promise that resolves with the fetched data.
 */
// async function fetchAllTermsFromGitHub() {
//     try {
//         return await getFileContent('https://github.com/tib-ts/vocabulary_development/blob/main/vocabulary.json');
//     } catch (e) {
//         //console.log('Error in fetching data from GitHub ' + e);
//         return null;
//     }
// }

// async function fetchAllTermsFromGitHubRDF() {
//     try {
//         // console.log('fetching data from GitHub' + gitHubFileUrl);
//         return await parseRDF(gitHubFileUrl);
//     } catch (e) {
//         console.log('Error in fetching data from GitHub ' + e);
//         return null;
//     }
// }
//
// async function fetchAllTerms() {
//     //get data from GitHub RDF file
//     return await fetchAllTermsFromGitHubRDF();
//     //get this data from GitHub JSON file
//     //return await fetchAllTermsFromGitHub();
// }
//
// //READ hook (get terms from api)
// function useGetTerms() {
//     console.log('Inside useGetTerms');
//     return useQuery({
//         queryKey: ['terms'],
//         queryFn: fetchAllTerms,
//         refetchOnWindowFocus: true,
//         refetchOnReconnect: true
//     });
// }
// async function saveAllTerms(newData) {
//     console.log('new data to save', newData);
//     //return await saveNewContent('https://github.com/tib-ts/vocabulary_development/blob/main/vocabulary.json', newData);
//
//     return await writeRDF(gitHubFileUrl, newData);
// }

//CREATE hook (post new term to api)
// function useCreateTerm() {
//     console.log('Inside useCreateTerm');
//     const queryClient = useQueryClient();
//
//     return useMutation({
//         mutationFn: async () => {
//             try {
//                 console.log('Inside mutationFn');
//                 const dataToCommit = queryClient.getQueryData(['terms']);
//                 //const stringData = JSON.stringify(dataToCommit);
//                 //await saveAllTerms(dataToCommit);
//                 return Promise.resolve();
//             } catch (e) {
//                 console.log('Error in mutationFn' + e);
//             }
//         },
//         //client side optimistic update
//         onMutate: async newTerm => {
//             queryClient.setQueryData(['terms'], prevTerms => [
//                 ...prevTerms,
//                 {
//                     ...newTerm
//                 }
//             ]);
//             console.log(' in the onMutate: ', queryClient.getQueryData(['terms']));
//             //console.log('new term added :' + queryClient.getQueryData(['terms']));
//             // writeRDF(gitHubFileUrl, queryClient.getQueryData(['terms'])).then(r => console.log('data saved successfully'));
//         },
//         onSettled: async () => {
//             console.log('Nothing happens here' + queryClient.getQueryData(['terms']));
//             //queryClient.invalidateQueries({ queryKey: ['terms'] });
//         }
//     });
// }

// function useUpdateTerm() {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: async () => {
//             const dataToCommit = queryClient.getQueryData(['terms']);
//             //const stringData = JSON.stringify(dataToCommit);
//             //await saveAllTerms(dataToCommit);
//             return Promise.resolve();
//         },
//
//         //client side optimistic update
//         onMutate: newTerm => {
//             queryClient.setQueryData(['terms'], prevTerms => prevTerms?.map(prevTerm => (prevTerm.id === newTerm.id ? newTerm : prevTerm)));
//         },
//         onSettled: () => {
//             console.log('Nothing happens here');
//             //queryClient.invalidateQueries({ queryKey: ['terms'] }) //refetch terms after mutation, disabled for demo
//         }
//     });
// }

//DELETE hook (delete term in api)
// function useDeleteTerm() {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: async termId => {
//             const dataToCommit = queryClient.getQueryData(['terms']);
//             //const stringData = JSON.stringify(dataToCommit);
//             //await saveAllTerms(dataToCommit);
//             return Promise.resolve();
//         },
//         //client side optimistic update
//         onMutate: termId => {
//             queryClient.setQueryData(['terms'], prevTerms => prevTerms?.filter(term => term.id !== termId));
//         },
//         onSettled: () => {
//             console.log('Nothing happens here');
//             //queryClient.invalidateQueries({ queryKey: ['terms'] });
//         }
//     });
// }

// /**
//  * Custom React hook to commit changes to the server.
//  * This hook uses the `useMutation` hook from `react-query` to handle the mutation.
//  * The mutation function fetches the current terms from the query client's cache,
//  * then saves these terms to the server.
//  *
//  * @returns {MutationObserver} The mutation observer returned by `useMutation`.
//  * This observer can be used to execute the mutation (by calling `mutate` or `mutateAsync`),
//  * and to access information about the mutation's current status.
//  */
// function useCommitChanges() {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: async => {
//             const dataToCommit = queryClient.getQueryData(['terms']);
//             console.log('data to commit', dataToCommit);
//             saveAllTerms(dataToCommit).then(r => {
//                 console.log('data saved successfully');
//                 return Promise.resolve();
//             });
//             //return Promise.resolve();
//         },
//         //client side optimistic update
//         onMutate: termId => {
//             console.log('nothing is happening here');
//         },
//         onSettled: () => {
//             queryClient.invalidateQueries({ queryKey: ['terms'] }).then(r => console.log('data invalidated successfully'));
//         }
//     });
// }
