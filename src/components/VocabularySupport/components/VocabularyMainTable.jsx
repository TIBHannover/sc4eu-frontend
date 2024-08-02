import { createRow, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { colorStyled } from '../../../styledComponents/styledColor';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import ExpandedRow from './ExpandedRow';
import CreateNewTerm from './CreateNewTerm';
import CommitChanges from './CommitChanges';
import { useCreateTerm } from '../hooks/useCreateTerm';
import { useUpdateTerm } from '../hooks/useUpdateTerm';
import { useDeleteTerm } from '../hooks/useDeleteTerm';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const VocabularyMainTable = ({ terms, refetch, isLoadingTerms, isLoadingTermsError, isFetchingTerms }) => {
    const [validationErrors, setValidationErrors] = useState({});
    const { mutateAsync: createTerm, isPending: isCreatingTerm } = useCreateTerm();
    const { mutateAsync: updateTerm, isPending: isUpdatingTerm } = useUpdateTerm();
    const { mutateAsync: deleteTerm, isPending: isDeletingTerm } = useDeleteTerm();
    const [openNewTerm, setNewTermOpen] = useState(false);
    const [openCommit, setOpenCommit] = useState(false);

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
                seeAlso: PropTypes.string,
                label: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    };
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: (
                    <Tooltip title="Unique identifier for the term">
                        <>
                            <span>ID</span>
                            <IconButton style={{ marginBottom: '3px'}} size="small">
                                <HelpOutlineIcon fontSize="small" />
                            </IconButton>
                        </>
                    </Tooltip>
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
                    <Tooltip
                        title="Provides Human-readable version of a resource's name. In the final agreed Term only one preferred and many alternative lables exist">
                        <>
                            <span>Label</span>
                            <IconButton style={{ marginBottom: '3px'}} size="small">
                                <HelpOutlineIcon fontSize="small" />
                            </IconButton>
                        </>
                    </Tooltip>
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
                accessorKey: 'description',
                header: (
                    <Tooltip title="Provides a human-readable description of a Term">
                        <>
                            <span>Description</span>
                            <IconButton style={{ marginBottom: '3px'}} size="small">
                                <HelpOutlineIcon fontSize="small" />
                            </IconButton>
                        </>
                    </Tooltip>
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
                    <Tooltip
                        title="Indicates a resource that might provide additional information about the subject resource">
                        <>
                            <span>See Also</span>
                            <IconButton style={{ marginBottom: '3px'}} size="small">
                                <HelpOutlineIcon fontSize="small" />
                            </IconButton>
                        </>
                    </Tooltip>
                ),
                size: 200,
                Cell: TerminologyCellComponent
            },
            {
                accessorKey: 'status',
                header: (
                    <Tooltip title="Three possible options for status. Draft, Ready, Accpeted.
                             Draft is still under discussion, Ready when the consensus is reached,
                             Accpeted when it is final and becomes part of the vocabulary">
                        <>
                            <span>Status</span>
                            <IconButton style={{ marginBottom: '3px'}} size="small">
                                <HelpOutlineIcon fontSize="small" />
                            </IconButton>
                        </>
                    </Tooltip>
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
        table.setCreatingRow(null);
    };

    const handleSaveTerm = async ({ values, table }) => {
        console.log('saving term', values);
        const newValidationErrors = validateTerm(values);
        if (Object.values(newValidationErrors).some(error => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateTerm(values);
        table.setEditingRow(null);
    };
    const openDeleteConfirmModal = async row => {
        if (window.confirm('Are you sure you want to delete this term?')) {
            console.log('deleting term', row.id);
            await deleteTerm(row.id);
            table.setEditingRow(null);
        }
    };

    const table = useMaterialReactTable({
        columns,
        data: terms,
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        enableEditing: true,
        getRowId: row => row.id,
        positionActionsColumn: 'last',
        enableRowExpansion: true,
        renderDetailPanel: ({ row }) => <ExpandedRow term={row.original} updateTerm={updateTerm} />,
        initialState: { columnVisibility: { id: false } },
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

        muiTableContainerProps: {
            sx: {
                minHeight: '500px'
            }
        },
        onCreatingRowSave: handleCreateTerm,
        onEditingRowSave: handleSaveTerm,
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <CreateNewTerm
                displayType={'create'}
                table={table}
                row={row}
                internalEditComponents={internalEditComponents}
                handleCreateTerm={handleCreateTerm}
            />
        ),
        renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
            <CreateNewTerm
                displayType={'edit'}
                table={table}
                row={row}
                internalEditComponents={internalEditComponents}
                handleCreateTerm={handleCreateTerm}
            />
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="contained"
                onClick={() => {
                    setNewTermOpen(true);
                    table.setCreatingRow(createRow(table, { id: crypto.randomUUID(), status: 'draft' }));
                }}
                style={{ backgroundColor: colorStyled.SECONDARY.dark }}
            >
                Create New Term
            </Button>
        ),
        renderBottomToolbarCustomActions: () => (
            <>
                <Button variant="contained" onClick={() => setOpenCommit(true)} style={{ backgroundColor: colorStyled.SECONDARY.dark }}>
                    Commit Changes
                </Button>
                {openCommit && <CommitChanges refetch={refetch} openCommit={openCommit} setOpenCommit={setOpenCommit} />}
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
        <ScrollableDiv>
            <MaterialReactTable table={table} />
        </ScrollableDiv>
    );
};

VocabularyMainTable.propTypes = {
    terms: PropTypes.array.isRequired,
    refetch: PropTypes.func.isRequired,
    isLoadingTerms: PropTypes.bool.isRequired,
    isLoadingTermsError: PropTypes.bool.isRequired,
    isFetchingTerms: PropTypes.bool.isRequired
};

export default VocabularyMainTable;

const validateRequired = value => !!value.length;
function validateTerm(term) {
    console.log('validating term', term);
    return {
        label: !validateRequired(term.label) ? 'Label is Required' : '',
        description: !validateRequired(term.description) ? 'Description is Required' : ''
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
    value: PropTypes.string.isRequired
};
