import { useMemo, useState } from 'react';
import { MaterialReactTable, MRT_EditActionButtons, useMaterialReactTable } from 'material-react-table';
import { Box, Button, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getFileContent, saveNewContent } from '../network/GitAPICalls';

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
                size: 150
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
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteTerm(row.original.id);
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
        initialState: { columnVisibility: { description: false } },
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

async function fetchAllTermsFromGitHub() {
    //get this data from GitHub
    return await getFileContent('https://github.com/tib-ts/vocabulary_development/blob/main/vocabulary.json');
    //const gitHubFileContent = await getGitHubFileContent('https://github.com/tgfawad/Ontologies/blob/main/vocabulary.json');
    //console.log(data);
    //return await wait(1000).then(() => [...fetchedTerms]);
}

async function fetchAllTerms() {
    //get this data from GitHub
    return await fetchAllTermsFromGitHub();
    //return await wait(1000).then(() => [...fetchedTerms]);
}

async function saveAllTerms(newData) {
    return await saveNewContent('https://github.com/tib-ts/vocabulary_development/blob/main/vocabulary.json', newData);
}
function wait(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}
//READ hook (get users from api)
function useGetTerms() {
    return useQuery({
        queryKey: ['terms'],
        queryFn: fetchAllTerms
        //refetchOnWindowFocus: false
    });
    // const termsQuery = useQuery({
    //     queryKey: ['terms'],
    //     queryFn: () => wait(1000).then(() => [...fetchedTerms]),
    //     // {
    //     //     //send api request here
    //     //     wait(1000).then(() => [...fetchedTerms]);
    //     //     //return Promise.resolve(fetchedTerms);
    //     // }
    //     refetchOnWindowFocus: false
    // });
    //
    // if (termsQuery.isLoading) {
    //     return <h1>Loading ... </h1>;
    // }
    // if (termsQuery.isError) {
    //     return <pre>{JSON.stringify(termsQuery.error)}</pre>;
    // }
    // return termsQuery;
}
//CREATE hook (post new term to api)
function useCreateTerm() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const dataToCommit = queryClient.getQueryData(['terms']);
            const stringData = JSON.stringify(dataToCommit);
            await saveAllTerms(stringData);
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: newTerm => {
            queryClient.setQueryData(['terms'], prevTerms => [
                ...prevTerms,
                {
                    ...newTerm
                }
            ]);
        },
        onSettled: () => {
            // const dataToCommit = queryClient.getQueryData(['terms']);
            // const stringData = JSON.stringify(dataToCommit);
            // console.log(stringData);
            // saveAllTerms(stringData).then(r => {
            //     console.log('data saved successfully');
            //     queryClient.invalidateQueries({ queryKey: ['terms'] });
            // });
            queryClient.invalidateQueries({ queryKey: ['terms'] }); //refetch terms after mutation, disabled for demo
        }
    });
}

//UPDATE hook (put user in api)
function useUpdateTerm() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const dataToCommit = queryClient.getQueryData(['terms']);
            const stringData = JSON.stringify(dataToCommit);
            await saveAllTerms(stringData);
            return Promise.resolve();
        },

        //client side optimistic update
        onMutate: newTerm => {
            queryClient.setQueryData(['terms'], prevTerms => prevTerms?.map(prevTerm => (prevTerm.id === newTerm.id ? newTerm : prevTerm)));
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['terms'] }) //refetch users after mutation, disabled for demo
    });
}

//DELETE hook (delete user in api)
function useDeleteTerm() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async termId => {
            const dataToCommit = queryClient.getQueryData(['terms']);
            const stringData = JSON.stringify(dataToCommit);
            await saveAllTerms(stringData);
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: termId => {
            queryClient.setQueryData(['terms'], prevTerms => prevTerms?.filter(term => term.id !== termId));
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['terms'] }) //refetch users after mutation, disabled for demo
    });
}

const validateRequired = value => !!value.length;
function validateTerm(term) {
    return {
        label: !validateRequired(term.label) ? 'Label is Required' : '',
        id: !validateRequired(term.id) ? 'ID is Required' : ''
    };
}
