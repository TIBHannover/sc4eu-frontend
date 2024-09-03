import { createRow, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Modal, Box, Button, IconButton, Tooltip } from '@mui/material';
import { colorStyled } from '../../../styledComponents/styledColor';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import ExpandedRow from './ExpandedRow';
import CreateNewTerm from './CreateNewTerm';
import CommitChanges from './CommitChanges';
import { useCreateTerm } from '../hooks/useCreateTerm';
import { useUpdateTerm } from '../hooks/useUpdateTerm';
import { useDeleteTerm } from '../hooks/useDeleteTerm';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useCreateDiscussion } from '../hooks/useCreateDiscussion';
import { useHistory } from 'react-router-dom';

const VocabularyMainTable = ({
                                 terms,
                                 refetch,
                                 isLoadingTerms,
                                 isLoadingTermsError,
                                 isFetchingTerms,
                                 discussions,
                                 handleSaveDiscussion
                             }) => {
    const [validationErrors, setValidationErrors] = useState({});
    const { mutateAsync: createTerm, isPending: isCreatingTerm } = useCreateTerm();
    const { mutateAsync: updateTerm, isPending: isUpdatingTerm } = useUpdateTerm();
    const { mutateAsync: deleteTerm, isPending: isDeletingTerm } = useDeleteTerm();
    const { mutateAsync: createDiscussion } = useCreateDiscussion();
    //const [openNewTerm, setNewTermOpen] = useState(false);
    const [openCommit, setOpenCommit] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [termComments, setTermComments] = useState([]);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [hasUncommittedChanges, setHasUncommittedChanges] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (hasUncommittedChanges) {
                event.preventDefault();
                event.returnValue = 'You have uncommitted changes. Do you really want to leave?';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        const unblock = history.block((location, action) => {
            if (hasUncommittedChanges) {
                if (window.confirm('You have uncommitted changes. Do you really want to leave?')) {
                    unblock();
                    history.push(location.pathname);
                } else {
                    return false;
                }
            }
        });

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            unblock();
        };
    }, [hasUncommittedChanges, history]);

    const handleRowClick = (row, event, discussions) => {
        if (event.target.closest('.action-button')) {
            return;
        }
        const resourceId = row.original.id;
        const currentResourceDiscussion = discussions.find((d) => d.resourceId === resourceId);
        setTermComments(currentResourceDiscussion?.comments || []);
        // console.log('rowComments: ', rowComments);
        setSelectedTerm(row.original);
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
        setSelectedTerm(null);
    };

    const TerminologyCellComponent = ({ row }) => {
        const seeAlso = row.original.seeAlso;
        const Label = row.original.label;
        //It may as well be possible that we are adding brand-new term and description is not available
        if (seeAlso?.startsWith('url:')) {
            const url = seeAlso.slice(4); // remove "url:" prefix
            return (
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {Label}
                </a>
            );
        } else {
            return <span>{seeAlso ? seeAlso : ''}</span>;
        }
    };
    TerminologyCellComponent.propTypes = {
        row: PropTypes.shape({
            original: PropTypes.shape({
                seeAlso: PropTypes.node,
                label: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    };
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: (
                    <>
                        <span>ID</span>
                        <Tooltip title="Unique identifier for the term">
                            <IconButton style={{ marginBottom: '3px' }} size="small">
                                <HelpOutlineIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </>
                ),
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
                header: (
                    <>
                        <span>Label</span>
                        <Tooltip
                            title="Provides Human-readable version of a resource's name. In the final agreed Term only one preferred and many alternative lables exist">
                            <IconButton style={{ marginBottom: '3px' }} size="small">
                                <HelpOutlineIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </>
                ),
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
                accessorKey: 'altLabel',
                header: (
                    <>
                        <span>Alternative Labels</span>
                        <Tooltip
                            title="Provides alternative Human-readable version of a resource's name. In the final agreed Term only one preferred and many alternative lables exist">
                            <IconButton style={{ marginBottom: '3px' }} size="small">
                                <HelpOutlineIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </>
                ),
                size: 150,
                internalEditComponent: 'MRT_EditArray',
                Cell: ({ cell }) => EllipsisTextCell({ value: cell.getValue() })
                // muiEditTextFieldProps: {
                //     required: true,
                //     error: !!validationErrors?.altLabel,
                //     helperText: validationErrors?.altLabel,
                //     onFocus: () =>
                //         setValidationErrors({
                //             ...validationErrors,
                //             altLabel: undefined
                //         })
                // }
            },
            {
                accessorKey: 'description',
                header: (
                    <>
                        <span>Description</span>
                        <Tooltip title="Provides a human-readable description of a Term">
                            <IconButton style={{ marginBottom: '3px' }} size="small">
                                <HelpOutlineIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </>
                ),
                size: 150,
                Cell: ({ cell }) => EllipsisTextCell({ value: cell.getValue() }),
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.description,
                    helperText: validationErrors?.description,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            description: undefined
                        })
                }
            },
            {
                accessorKey: 'seeAlso',
                header: (
                    <>
                        <span>See Also</span>
                        <Tooltip
                            title="Indicates a resource that might provide additional information about the subject resource">
                            <IconButton style={{ marginBottom: '3px' }} size="small">
                                <HelpOutlineIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </>
                ),
                size: 200,
                enableEditing: false,
                Cell: TerminologyCellComponent
            },
            {
                accessorKey: 'status',
                header: (
                    <>
                        <span>Status</span>
                        <Tooltip title="Three possible options for status. Draft, Ready, Accpeted.
                             Draft is still under discussion, Ready when the consensus is reached,
                             Accpeted when it is final and becomes part of the vocabulary">
                            <IconButton style={{ marginBottom: '3px' }} size="small">
                                <HelpOutlineIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </>
                ),
                size: 150,
                enableEditing: false
            }
        ],
        [validationErrors]
    );

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
        //We have to create a new discussion for this term
        const newDiscussion = { resourceId: uuid, comments: [] };
        await createDiscussion(newDiscussion);
        table.setCreatingRow(null);
        setOpenCreateModal(false); // Close the create modal
        setHasUncommittedChanges(true);
    };

    const handleSaveTerm = async ({ values, table }) => {
        const newValidationErrors = validateTerm(values);
        if (Object.values(newValidationErrors).some(error => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateTerm(values);
        table.setEditingRow(null);
        setHasUncommittedChanges(true);
    };

    // const handleSaveDiscussion = async ({ values }) => {
    //     await updateDiscussion(values);
    // };

    const openDeleteConfirmModal = async row => {
        if (window.confirm('Are you sure you want to delete this term?')) {
            await deleteTerm(row.id);
            table.setEditingRow(null);
            setHasUncommittedChanges(true);
        }
    };

    // Define the default values for a new row
    const defaultValues = {
        id: crypto.randomUUID(),   // Override 'id' with a new UUID
        label: '',           // Default value for label
        altLabel: [],        // Default value for altLabel
        description: '',     // Default value for description
        seeAlso: 'N/A',          // Default value for seeAlso
        status: 'draft'            // Override 'status' with 'draft'
    };
    // Function to handle setting a creating row
    const handleCreateRow = (row = {}) => {
        table.setCreatingRow(createRow(table, {
            ...defaultValues,           // Apply defaults
            ...row,                     // Spread any existing row values (will override defaults if present)
            id: row.id || crypto.randomUUID(),    // Override 'id' with a new UUID if not present
            status: row.status || 'draft'         // Set 'status' to 'draft' if not present
        }));
        setOpenCreateModal(true); // Open the create modal
    };

    const table = useMaterialReactTable({
        columns,
        data: terms,
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        enableEditing: true,
        getRowId: row => row.id,
        positionActionsColumn: 'last',
        muiTableBodyRowProps: ({ row }) => ({
            onClick: (event) => handleRowClick(row, event, discussions),
            sx: {
                cursor: 'pointer' //you might want to change the cursor too when adding an onClick
            }
        }),
        //enableRowExpansion: true,
        // renderDetailPanel: ({ row }) => <ExpandedRow term={row.original} updateTerm={updateTerm} />,
        initialState: {
            columnVisibility: { id: false },
            density: 'compact'
        },
        // muiToolbarAlertBannerProps: isLoadingTermsError
        //     ? {
        //           color: 'error',
        //           children: `Error Loading Data: ${error.message}`
        //       }
        //     : isLoadingTerms
        //     ? {
        //           color: 'info',
        //           children: 'Loading Data from GitHub'
        //       }
        //     : undefined,

        // muiTableContainerProps: {
        //     sx: {
        //         minHeight: '500px'
        //     }
        // },
        onCreatingRowSave: handleCreateTerm,
        onEditingRowSave: handleSaveTerm,
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => {
            return (<CreateNewTerm
                displayType={'create'}
                table={table}
                row={row}
                internalEditComponents={internalEditComponents}
                handleCreateTerm={handleCreateTerm}
            />);
        },
        renderEditRowDialogContent: ({ table, row, internalEditComponents }) => {
            // Convert altLabel to an array
            if (typeof row.original.altLabel === 'string') {
                row.original.altLabel = row.original.altLabel.split(', ').map(label => label.trim());
            } else if (!Array.isArray(row.original.altLabel)) {
                row.original.altLabel = [];
            }

            return (<CreateNewTerm
                displayType={'edit'}
                table={table}
                row={row}
                internalEditComponents={internalEditComponents}
                handleCreateTerm={handleSaveTerm}
            />);
        },
        renderTopToolbarCustomActions: ({ table, row }) => (
            <>
                <Button
                    variant="contained"
                    onClick={() => {
                        handleCreateRow(row);
                    }}
                    style={{ backgroundColor: colorStyled.SECONDARY.dark }}
                >
                    Create New Term
                </Button>
                {hasUncommittedChanges && <span style={{ fontSize: '0.8em', color: 'red' }}> You have made changes, Don't forget to commit your changes</span>}
            </>
        ),
        renderBottomToolbarCustomActions: () => (
            <>
                <Button variant="contained" onClick={() => setOpenCommit(true)}
                        style={{ backgroundColor: colorStyled.SECONDARY.dark }}>
                    Commit Changes
                </Button>
                {openCommit &&
                    <CommitChanges refetch={refetch} openCommit={openCommit} setOpenCommit={setOpenCommit} setHasUncommittedChanges={setHasUncommittedChanges} />}
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
                {/*<Tooltip title="Edit">*/}
                {/*    <IconButton style={{ color: colorStyled.SECONDARY.dark }} onClick={() => table.setEditingRow(row)}>*/}
                {/*        <EditIcon />*/}
                {/*    </IconButton>*/}
                {/*</Tooltip>*/}

                <Tooltip title="Delete">
                    <IconButton className="action-button" style={{ color: colorStyled.SECONDARY.dark }}
                                onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        )
    });

    return (
        <ScrollableDiv>
            <MaterialReactTable table={table} />
            <Modal open={openPopup} onClose={handleClosePopup}>
                <Box sx={{
                    padding: 2,
                    backgroundColor: 'white',
                    margin: 'auto',
                    marginTop: '10%',
                    width: '80%',
                    maxHeight: '80%',
                    overflowY: 'auto'
                }}>
                    {selectedTerm &&
                        <ExpandedRow term={selectedTerm} updateTerm={updateTerm} termComments={termComments || []}
                                     handleSaveDiscussion={handleSaveDiscussion} setHasUncommittedChanges={setHasUncommittedChanges} />}
                </Box>
            </Modal>
        </ScrollableDiv>
    );
};

VocabularyMainTable.propTypes = {
    terms: PropTypes.arrayOf(PropTypes.object).isRequired,
    refetch: PropTypes.func.isRequired,
    isLoadingTerms: PropTypes.bool.isRequired,
    isLoadingTermsError: PropTypes.bool.isRequired,
    isFetchingTerms: PropTypes.bool.isRequired,
    discussions: PropTypes.array.isRequired,
    handleSaveDiscussion: PropTypes.func.isRequired
};

export default VocabularyMainTable;

const validateRequired = value => value && value.length > 0;

function validateTerm(term) {
    return {
        label: !validateRequired(term.label) ? 'Label is Required' : '',
        description: !validateRequired(term.description) ? 'Description is Required' : ''
        //altLabel: term.altLabel.some(label => !validateRequired(label)) ? 'All Alternative Labels are Required' : ''
    };
}

const ScrollableDiv = styled.div`
    overflow-y: auto;
    padding-bottom: 5px;
    height: 80vh;
`;

const CellContent = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
`;

const EllipsisTextCell = ({ value }) => {
    const displayValue = value && value.length > 30 ? `${value.slice(0, 30)}...` : value;
    return <CellContent title={value}> {displayValue}</CellContent>;
};
EllipsisTextCell.propTypes = {
    value: PropTypes.string
};
