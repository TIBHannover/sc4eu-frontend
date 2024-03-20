import { useMemo, useState } from 'react';
import { MaterialReactTable, MRT_EditActionButtons, useMaterialReactTable } from 'material-react-table';
import { Box, Button, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getFileContent, saveNewContent } from '../network/GitAPICalls';
import { parseRDF, writeRDF } from '../network/parseRDFCalls';
import { useEffect } from 'react';

export default function AddVocabulary(factory, deps) {
    const [validationErrors, setValidationErrors] = useState({});
    //should be memoized or stable
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
                accessorKey: 'description',
                header: 'Description',
                size: 200
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 150
            },
            {
                accessorKey: 'comment',
                header: 'Comment',
                size: 150,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.id,
                    helperText: validationErrors?.id,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            comment: undefined
                        })
                }
            }
        ],
        [validationErrors]
    );

    //call CREATE hook
    const { mutateAsync: createTerm, isPending: isCreatingTerm } = useCreateTerm();
    //call READ hook
    const { data: fetchedTerms = [], isError: isLoadingTermsError, isFetching: isFetchingTerms, isLoading: isLoadingTerms } = useGetTerms();
    //call UPDATE hook
    const { mutateAsync: updateTerm, isPending: isUpdatingTerm } = useUpdateTerm();
    //call DELETE hook
    const { mutateAsync: deleteTerm, isPending: isDeletingTerm } = useDeleteTerm();

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
    const openDeleteConfirmModal = row => {
        if (window.confirm('Are you sure you want to delete this term?')) {
            deleteTerm(row.original.id).then(() => {
                console.log('Term Deleted');
            });
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

    const table = useMaterialReactTable({
        columns,
        data: fetchedTerms,
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        enableEditing: true,
        getRowId: row => row.id,
        positionActionsColumn: 'last',
        initialState: { columnVisibility: { description: true } },
        muiToolbarAlertBannerProps: isLoadingTermsError
            ? {
                  color: 'error',
                  children: 'Error Loading Data'
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
        renderTopToolbarCustomActions: ({ table }) => createNewTermAction(table),
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

    return <MaterialReactTable table={table} />;
}

// This needs to be read from user input
const gitHubFileUrl = 'https://raw.githubusercontent.com/tib-ts/vocabulary_development/main/testexample.ttl';

async function fetchAllTermsFromGitHub() {
    try {
        return await getFileContent('https://github.com/tib-ts/vocabulary_development/blob/main/vocabulary.json');
    } catch (e) {
        //console.log('Error in fetching data from GitHub ' + e);
        return null;
    }
}

async function fetchAllTermsFromGitHubRDF() {
    try {
        // console.log('fetching data from GitHub' + gitHubFileUrl);
        return await parseRDF(gitHubFileUrl);
    } catch (e) {
        console.log('Error in fetching data from GitHub ' + e);
        return null;
    }
}

async function fetchAllTerms() {
    //get data from GitHub RDF file
    return await fetchAllTermsFromGitHubRDF();
    //get this data from GitHub JSON file
    //return await fetchAllTermsFromGitHub();
}

//READ hook (get terms from api)
function useGetTerms() {
    return useQuery({
        queryKey: ['terms'],
        queryFn: fetchAllTerms,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        staleTime: 1000 //cache for 1 second
    });
}
async function saveAllTerms(newData) {
    console.log('new data to save', newData);
    //return await saveNewContent('https://github.com/tib-ts/vocabulary_development/blob/main/vocabulary.json', newData);

    return await writeRDF(gitHubFileUrl, newData);
}

//CREATE hook (post new term to api)
function useCreateTerm() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            try {
                const dataToCommit = queryClient.getQueryData(['terms']);
                const stringData = JSON.stringify(dataToCommit);
                return await saveAllTerms(dataToCommit);
                //return Promise.resolve();
            } catch (e) {
                console.log('Error in mutationFn' + e);
            }
        },
        //client side optimistic update
        onMutate: async newTerm => {
            queryClient.setQueryData(['terms'], prevTerms => [
                ...prevTerms,
                {
                    ...newTerm
                }
            ]);
            console.log(' in the onMutate: ', queryClient.getQueryData(['terms']));
            //console.log('new term added :' + queryClient.getQueryData(['terms']));
            // writeRDF(gitHubFileUrl, queryClient.getQueryData(['terms'])).then(r => console.log('data saved successfully'));
        },
        onSettled: async () => {
            console.log('data saved successfully');
            console.log('Query data before invalidation:', queryClient.getQueryData(['terms']));
            queryClient.invalidateQueries({ queryKey: ['terms'] });
            console.log('Query data after invalidation:', queryClient.getQueryData(['terms']));
        }
    });
}

//UPDATE hook (put term in api)
function useUpdateTerm() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const dataToCommit = queryClient.getQueryData(['terms']);
            const stringData = JSON.stringify(dataToCommit);
            await saveAllTerms(dataToCommit);
            return Promise.resolve();
        },

        //client side optimistic update
        onMutate: newTerm => {
            queryClient.setQueryData(['terms'], prevTerms => prevTerms?.map(prevTerm => (prevTerm.id === newTerm.id ? newTerm : prevTerm)));
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['terms'] }) //refetch terms after mutation, disabled for demo
    });
}

//DELETE hook (delete term in api)
function useDeleteTerm() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async termId => {
            const dataToCommit = queryClient.getQueryData(['terms']);
            const stringData = JSON.stringify(dataToCommit);
            await saveAllTerms(dataToCommit);
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: termId => {
            queryClient.setQueryData(['terms'], prevTerms => prevTerms?.filter(term => term.id !== termId));
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['terms'] })
    });
}

const validateRequired = value => !!value.length;
function validateTerm(term) {
    return {
        label: !validateRequired(term.label) ? 'Label is Required' : '',
        id: !validateRequired(term.id) ? 'ID is Required' : '',
        comment: !validateRequired(term.id) ? 'Comment is Required' : ''
    };
}
