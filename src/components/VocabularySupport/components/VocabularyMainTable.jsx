import { createRow, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Box, Button, darken, IconButton, lighten, Modal, Tooltip, useTheme } from '@mui/material';
import { colorStyled } from '../../../styledComponents/styledColor';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import ExpandedRow from './ExpandedRow';
import CreateNewTerm from './CreateNewTerm';
import CommitChanges from './CommitChanges';
import { useCreateTerm } from '../hooks/useCreateTerm';
import { useUpdateTerm } from '../hooks/useUpdateTerm';
import { useDeleteTerm } from '../hooks/useDeleteTerm';
import { useCreateDiscussion } from '../hooks/useCreateDiscussion';
import { useHistory } from 'react-router-dom';
import ChangesTimeline from '../../ondet/ChangesTimeline';
import MaterialUIPopUp, { MaterialUIPopUpTypes } from '../../ReusableComponents/MaterialUIPopUp';
import Cookies from 'js-cookie';
import { getGroupedMentionsByCommentInstant, getMentionedCommentsLength, RenderGroupedMentions } from '../utils/Discussions';
import { StyledBadge } from '../../../styledComponents/styledComponents';

const VocabularyMainTable = ({
    terms,
    refetch,
    isLoadingTerms,
    isLoadingTermsError,
    isFetchingTerms,
    discussions,
    handleSaveDiscussion,
    handleDeleteDiscussion,
    userName
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
    const [activeMUIPopUp, setActiveMUIPopUp] = useState(null);
    const history = useHistory();
    const theme = useTheme();
    const baseBackgroundColor =
        theme.palette.mode === 'light'
            ? 'rgba(245, 245, 245, 1)' // white
            : 'rgba(84, 90, 95, 1)'; // light gray

    const cookieMentionedCommentsCount = Number(Cookies.get('mentionedCommentsCount') || 0);
    const mentionedDiscussions = getGroupedMentionsByCommentInstant(terms, discussions, userName);
    const mentionedCommentsLength = getMentionedCommentsLength(discussions, userName);

    useEffect(() => {
        const handleBeforeUnload = event => {
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

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleRowClick = (row, event, discussions) => {
        if (event.target.closest('.action-button')) {
            return;
        }
        const resourceId = row.original.identifier;
        const currentResourceDiscussion = discussions.find(d => d.resourceId === resourceId);
        setTermComments(currentResourceDiscussion?.comments || []);
        // console.log('rowComments: ', rowComments);
        setSelectedTerm(row.original);
        setOpenPopup(true);
    };

    const handleNavigateToMentionedTerm = resourceId => {
        const term = terms.find(t => t.identifier === resourceId);
        const discussion = discussions.find(d => d.resourceId === resourceId);
        setSelectedTerm(term);
        setTermComments(discussion?.comments || []);
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
        setSelectedTerm(null);
    };

    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    const TerminologyCellComponent = ({ row }) => {
        const seeAlso = row.original.seeAlso;
        const Label = row.original.label;
        //It may as well be possible that we are adding brand-new term and description is not available

        const handleClick = event => {
            event.stopPropagation();
        };

        if (seeAlso?.startsWith('url:')) {
            const url = seeAlso.slice(4); // remove "url:" prefix
            return (
                <a href={url} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
                    {Label}
                </a>
            );
        } else {
            if (isValidUrl(seeAlso)) {
                return (
                    <a href={seeAlso} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
                        {Label}
                    </a>
                );
            }
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
                accessorKey: 'identifier',
                header: 'Identifier', // Keep this as a string to retain sorting & actions
                Header: (
                    { column } // Custom header with tooltip
                ) => (
                    <Tooltip title="Unique identifier for the term">
                        <span>{column.columnDef.header}</span>
                    </Tooltip>
                ),
                size: 150,
                enableEditing: false,
                filterVariant: 'text',
                muiFilterTextFieldProps: {
                    placeholder: 'Filter Identifier',
                    sx: { minWidth: '120px' }
                }
            },
            {
                accessorKey: 'label',
                header: 'Label', // Keep this as a string to retain sorting & actions
                Header: (
                    { column } // Custom header with tooltip
                ) => (
                    <Tooltip title="Provides a human-readable version of a resource's name. In the final agreed term, only one preferred and many alternative labels exist.">
                        <span>{column.columnDef.header}</span>
                    </Tooltip>
                ),
                size: 150,
                Cell: ({ cell }) => EllipsisTextCell({ value: cell.getValue() }),
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.label,
                    helperText: validationErrors?.label,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            label: undefined
                        })
                },
                filterVariant: 'text',
                muiFilterTextFieldProps: {
                    placeholder: 'Filter Label',
                    sx: { minWidth: '120px' }
                }
            },
            {
                accessorKey: 'altLabel',
                header: 'Alternative Labels', // Keep this as a string to retain sorting & actions
                Header: (
                    { column } // Custom header with tooltip
                ) => (
                    <Tooltip title="Provides alternative Human-readable version of a resource's name. In the final agreed Term only one preferred and many alternative labels exist">
                        <span>{column.columnDef.header}</span>
                    </Tooltip>
                ),
                size: 150,
                internalEditComponent: 'MRT_EditArray',
                Cell: ({ cell }) => EllipsisTextCell({ value: cell.getValue() }),
                filterVariant: 'text',
                muiFilterTextFieldProps: {
                    placeholder: 'Filter Alt Labels',
                    sx: { minWidth: '120px' }
                }
            },
            {
                accessorKey: 'description',
                header: 'Description', // Keep this as a string to retain sorting & actions
                Header: (
                    { column } // Custom header with tooltip
                ) => (
                    <Tooltip title="Provides a human-readable description of a Term">
                        <span>{column.columnDef.header}</span>
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
                },
                filterVariant: 'text',
                muiFilterTextFieldProps: {
                    placeholder: 'Filter Description',
                    sx: { minWidth: '120px' }
                }
            },
            {
                accessorKey: 'seeAlso',
                header: 'See Also',
                Header: (
                    { column } // Custom header with tooltip
                ) => (
                    <Tooltip title="Indicates a resource that might provide additional information about the subject resource">
                        <span>{column.columnDef.header}</span>
                    </Tooltip>
                ),
                size: 200,
                enableEditing: true,
                Cell: TerminologyCellComponent,
                filterVariant: 'text',
                muiFilterTextFieldProps: {
                    placeholder: 'Filter See Also',
                    sx: { minWidth: '120px' }
                }
            },
            {
                accessorKey: 'created',
                header: 'Created',
                Header: (
                    { column } // Custom header with tooltip
                ) => (
                    <Tooltip title="The Creation Date of the term">
                        <span>{column.columnDef.header}</span>
                    </Tooltip>
                ),
                size: 150,
                enableEditing: false,
                filterVariant: 'select',
                filterFn: (row, columnId, filterValue) => {
                    const createdDate = new Date(row.getValue(columnId));
                    const now = new Date();
                    switch (filterValue) {
                        case 'last1day':
                            return createdDate >= new Date(now.setDate(now.getDate() - 1));
                        case 'last1week':
                            return createdDate >= new Date(now.setDate(now.getDate() - 7));
                        case 'last1month':
                            return createdDate >= new Date(now.setMonth(now.getMonth() - 1));
                        case 'last3months':
                            return createdDate >= new Date(now.setMonth(now.getMonth() - 3));
                        case 'all':
                            return true;
                        default:
                            return true;
                    }
                },
                filterSelectOptions: [
                    { text: 'Last 1 Day', value: 'last1day' },
                    { text: 'Last 1 Week', value: 'last1week' },
                    { text: 'Last 1 Month', value: 'last1month' },
                    { text: 'Last 3 Months', value: 'last3months' },
                    { text: 'All', value: 'all' }
                ],
                muiFilterTextFieldProps: {
                    placeholder: 'Filter Created',
                    select: true
                }
            },
            {
                accessorKey: 'status',
                header: 'Status',
                Header: (
                    { column } // Custom header with tooltip
                ) => (
                    <Tooltip title="The status of the term. It can be Draft, Reject or Accept">
                        <span>{column.columnDef.header}</span>
                    </Tooltip>
                ),
                size: 150,
                enableEditing: false,
                filterVariant: 'select',
                filterFn: 'equals',
                filterSelectOptions: [
                    { text: 'Draft', value: 'draft' },
                    { text: 'Reject', value: 'reject' },
                    { text: 'Accept', value: 'accept' }
                ],
                muiFilterTextFieldProps: {
                    placeholder: 'Filter Status',
                    select: true
                }
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
        values.identifier = uuid;
        await createTerm(values);
        //We have to create a new discussion for this term
        const newDiscussion = { resourceId: uuid, comments: [] };
        await createDiscussion(newDiscussion);
        table.setCreatingRow(null);
        //setNewTermOpen(false); // Close the create modal
        setOpenCreateModal(false); // Close the create modal
        setHasUncommittedChanges(true);
    };

    const handleCancelCreateTerm = () => {
        if (table.getState().creatingRow) {
            table.setCreatingRow(null);
        }
        setOpenCreateModal(false);
    };

    const handleSaveTerm = async ({ values, table }) => {
        console.log('values: ', values);
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
            await handleDeleteDiscussion(row.id);
            table.setEditingRow(null);
            setHasUncommittedChanges(true);
        }
    };

    // Define the default values for a new row
    const defaultValues = {
        identifier: crypto.randomUUID(), // Override 'id' with a new UUID
        label: '', // Default value for label
        altLabel: [], // Default value for altLabel
        description: '', // Default value for description
        seeAlso: '', // Default value for seeAlso
        status: 'draft', // Override 'status' with 'draft'
        created: new Date().toLocaleDateString('en-CA') // Default value for created
    };
    // Function to handle setting a creating row
    const handleCreateRow = (row = {}) => {
        console.log('row: ', row);
        table.setCreatingRow(
            createRow(table, {
                ...defaultValues, // Apply defaults
                ...row, // Spread any existing row values (will override defaults if present)
                identifier: row.identifier || crypto.randomUUID(), // Override 'id' with a new UUID if not present
                status: row.status || 'draft' // Set 'status' to 'draft' if not present
            })
        );
        setOpenCreateModal(true); // Open the create modal
    };

    const table = useMaterialReactTable({
        columns,
        data: terms,
        initialState: {
            sorting: [{ id: 'label', desc: false }],
            columnVisibility: { identifier: false, altLabel: false, seeAlso: false },
            density: 'compact',
            pagination: { pageSize: 15, pageIndex: 0 },
            showFilters: true,
            columnFilters: []
        },
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        enableEditing: true,
        getRowId: row => row.identifier,
        positionActionsColumn: 'last',
        enableSorting: true,
        enableFiltering: true,
        muiTableBodyRowProps: ({ row }) => ({
            onClick: event => handleRowClick(row, event, discussions),
            sx: {
                cursor: 'pointer' //you might want to change the cursor too when adding an onClick
            }
        }),
        muiTableBodyProps: {
            sx: theme => ({
                '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td': {
                    backgroundColor: darken(baseBackgroundColor, 0.1)
                },
                '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]):hover > td': {
                    backgroundColor: darken(baseBackgroundColor, 0.2)
                },
                '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]) > td': {
                    backgroundColor: lighten(baseBackgroundColor, 0.1)
                },
                '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]):hover > td': {
                    backgroundColor: darken(baseBackgroundColor, 0.2)
                }
            })
        },
        mrtTheme: theme => ({
            baseBackgroundColor: baseBackgroundColor,
            draggingBorderColor: theme.palette.secondary.main
        }),
        onCreatingRowSave: handleCreateTerm,
        onEditingRowSave: handleSaveTerm,
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => {
            // Filter out non-editable components
            const editableComponents = internalEditComponents.filter(component => {
                const fieldName = component.key.split('_').pop();
                return !['identifier', 'created', 'status'].includes(fieldName);
            });

            return (
                openCreateModal && (
                    <CreateNewTerm
                        displayType={'create'}
                        table={table}
                        row={row}
                        internalEditComponents={editableComponents}
                        handleCreateTerm={handleCreateTerm}
                        setOpenCreateModal={setOpenCreateModal}
                        handleCancelCreateTerm={handleCancelCreateTerm}
                    />
                )
            );
        },
        renderEditRowDialogContent: ({ table, row, internalEditComponents }) => {
            // Convert altLabel to an array
            if (typeof row.original.altLabel === 'string') {
                row.original.altLabel = row.original.altLabel.split(', ').map(label => label.trim());
            } else if (!Array.isArray(row.original.altLabel)) {
                row.original.altLabel = [];
            }

            // Filter out non-editable components
            const editableComponents = internalEditComponents.filter(component => {
                const fieldName = component.key.split('_').pop();
                return !['identifier', 'created', 'status'].includes(fieldName);
            });

            return (
                <CreateNewTerm
                    displayType={'edit'}
                    table={table}
                    row={row}
                    internalEditComponents={editableComponents}
                    handleCreateTerm={handleSaveTerm}
                    setOpenCreateModal={setOpenCreateModal}
                    handleCancelCreateTerm={handleCancelCreateTerm}
                />
            );
        },
        renderTopToolbarCustomActions: ({ table, row }) => (
            <div style={{ display: 'flex', gap: 5, justifyContent: 'flex-start' }}>
                <Tooltip title="Add new term">
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleCreateRow(row);
                        }}
                        style={{ backgroundColor: colorStyled.SECONDARY.dark }}
                    >
                        Create New Term
                    </Button>
                </Tooltip>
                <Tooltip title="Timeline">
                    <Button
                        variant="contained"
                        onClick={() => {
                            setActiveMUIPopUp(MaterialUIPopUpTypes.HISTORY);
                        }}
                        style={{ backgroundColor: colorStyled.SECONDARY.dark }}
                    >
                        Timeline
                    </Button>
                </Tooltip>
                {Object.keys(mentionedDiscussions).length !== 0 && (
                    <Tooltip title="Mentions">
                        <StyledBadge badgeContent={mentionedCommentsLength - cookieMentionedCommentsCount}>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setActiveMUIPopUp(MaterialUIPopUpTypes.DISCUSSIONS);
                                    Cookies.set('mentionedCommentsCount', mentionedCommentsLength);
                                }}
                                style={{ backgroundColor: colorStyled.SECONDARY.dark }}
                            >
                                Mentions
                            </Button>
                        </StyledBadge>
                    </Tooltip>
                )}
                {hasUncommittedChanges && (
                    <span style={{ fontSize: '1.5em', color: 'red' }}> You have made changes, Please don't forget to save your changes</span>
                )}
            </div>
        ),
        renderBottomToolbarCustomActions: () => (
            <>
                <Button
                    variant="contained"
                    disabled={!hasUncommittedChanges}
                    onClick={() => setOpenCommit(true)}
                    style={{
                        backgroundColor: hasUncommittedChanges ? colorStyled.SECONDARY.dark : 'gray',
                        border: hasUncommittedChanges ? '2px' + ' solid red' : ''
                    }}
                >
                    Save Changes
                </Button>
                {openCommit && (
                    <CommitChanges
                        refetch={refetch}
                        openCommit={openCommit}
                        setOpenCommit={setOpenCommit}
                        setHasUncommittedChanges={setHasUncommittedChanges}
                    />
                )}
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
                    <IconButton className="action-button" style={{ color: colorStyled.SECONDARY.dark }} onClick={() => openDeleteConfirmModal(row)}>
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
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 2,
                        backgroundColor: 'white',
                        margin: 'auto',
                        width: '70%',
                        overflowY: 'auto',
                        position: 'fixed',
                        top: 0,
                        left: '15%',
                        outline: 'none'
                    }}
                >
                    {selectedTerm && (
                        <ExpandedRow
                            term={selectedTerm}
                            updateTerm={updateTerm}
                            termComments={termComments || []}
                            handleSaveDiscussion={handleSaveDiscussion}
                            setHasUncommittedChanges={setHasUncommittedChanges}
                            handleClosePopup={handleClosePopup}
                        />
                    )}
                </Box>
            </Modal>
            <MaterialUIPopUp
                open={activeMUIPopUp === MaterialUIPopUpTypes.HISTORY}
                onClose={() => {
                    setActiveMUIPopUp(null);
                }}
                title="Timeline"
                message={<ChangesTimeline id="https://raw.githubusercontent.com/tib-ts/vocabulary_development/refs/heads/main/sc4eu_vo.ttl" />}
            />
            <MaterialUIPopUp
                open={activeMUIPopUp === MaterialUIPopUpTypes.DISCUSSIONS}
                onClose={() => setActiveMUIPopUp(null)}
                title="Mentioned discussions"
                message={<RenderGroupedMentions groupedMentioned={mentionedDiscussions} onNavigateToTerm={handleNavigateToMentionedTerm} />}
            />
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
    handleSaveDiscussion: PropTypes.func.isRequired,
    handleDeleteDiscussion: PropTypes.func.isRequired,
    userName: PropTypes.string
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
