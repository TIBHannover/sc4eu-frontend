import { createRow, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState, useRef } from 'react';
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
import { getGroupedMentionsByCommentInstant, getMentionedCommentsLength } from '../utils/Discussions';
import { LARGE_SCREEN_SIZE, StyledBadge, StyledChip, StyledTooltip } from '../../../styledComponents/styledComponents';
import InformationHub from './InformationHub';
import { useMediaQuery } from '@mui/material';
import { CardActivityWidget } from './CardActivityWidget';
import { getTermVotes, getVotes, deleteTermVotes } from '../../../network/TermVoteCalls';
import VoteView from './VoteView';

/* eslint-disable react/prop-types */
const VocabularyMainTable = ({
    terms,
    refetch,
    isLoadingTerms,
    isLoadingTermsError,
    isFetchingTerms,
    discussions,
    handleSaveDiscussion,
    handleDeleteDiscussion,
    currentUser
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
    const mentionedDiscussions = getGroupedMentionsByCommentInstant(terms, discussions, currentUser.displayName);
    const mentionedCommentsLength = getMentionedCommentsLength(discussions, currentUser.displayName);
    const isMobileScreen = useMediaQuery(`(max-width:${LARGE_SCREEN_SIZE})`);
    const isMobileScreen = useMediaQuery(`(max-width:${LARGE_SCREEN_SIZE})`);

    const [density, setDensity] = useState(isMobileScreen ? 'comfortable' : 'compact');
    const [density, setDensity] = useState(isMobileScreen ? 'comfortable' : 'compact');

    const [urgentVoteTerm, setUrgentVoteTerm] = useState(null);
    const [urgentVoteData, setUrgentVoteData] = useState(null);
    const [votesMap, setVotesMap] = useState([]);

    const [pagination, setPagination] = useState({
        pageSize: 10,
        pageIndex: 0
    });

    const urgentTerms = terms.filter(term =>
        votesMap.some(vote => vote.term_uuid === term.identifier && !vote.decisions?.some(decision => decision.user_name === currentUser.displayName))
    );
    const discussionReplies = terms.filter(term =>
        discussions.some(
            discussion =>
                discussion.comments.length !== 0 &&
                term.identifier === discussion.resourceId &&
                discussion.comments.some(comment => comment.mentionedUsers && comment.mentionedUsers.includes(currentUser.displayName))
        )
    );
    const newTerms = terms.filter(term => new Date(term.created) >= new Date(new Date().setDate(new Date().getDate() - 70)));

    useEffect(() => {
        const fetchVotes = async () => {
            const votesData = await getVotes();
            setVotesMap(votesData);
        };

        fetchVotes();
    }, []);

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

    useEffect(() => {
        const activeCardCount = countActiveCards(urgentTerms, discussionReplies, newTerms);
        const newPageSize = isMobileScreen ? getPageSize(activeCardCount) : 10;

        if (table.getState().pagination.pageSize !== newPageSize) {
            table.setPagination(prev => ({
                ...prev,
                pageSize: newPageSize,
                pageIndex: 0
            }));
        }
    }, [urgentTerms, discussionReplies, newTerms, isMobileScreen]);

    const countActiveCards = (urgentTerms, discussionReplies, newTerms) => {
        return [urgentTerms.length > 0, discussionReplies.length > 0, newTerms.length > 0].filter(Boolean).length;
    };

    const getPageSize = (cards) => {
        if (isMobileScreen) {
            if (cards === 3) return 6;
            if (cards === 2) return 7;
            if (cards === 1) return 9;
            return 10;
        } else {
            return 10;
        }
    };

    useEffect(() => {
        const newPageSize = getPageSize();
        setPagination(prev => ({
            ...prev,
            pageSize: newPageSize
            pageSize: newPageSize
        }));
        setDensity(isMobileScreen ? 'comfortable' : 'compact');
    }, [isMobileScreen, terms.length]);
        setDensity(isMobileScreen ? 'comfortable' : 'compact');
    }, [isMobileScreen, terms.length]);

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

    const columnVisibility = useMemo(() => {
        return isMobileScreen
        return isMobileScreen
            ? {
                  identifier: false,
                  altLabel: false,
                  seeAlso: false,
                  description: false,
                  created: false,
                  modified: false
              }
            : {
                  identifier: false,
                  altLabel: false,
                  seeAlso: false
              };
    }, [isMobileScreen]);
    }, [isMobileScreen]);

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
                header: 'Label',
                size: 150,
                size: 150,

                muiTableBodyCellProps: {
                    sx: {
                        maxWidth: 150,
                        maxWidth: 150,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }
                },

                muiTableHeadCellProps: {
                    sx: {
                        maxWidth: 150
                        maxWidth: 150
                    }
                },

                Cell: ({ cell }) => <EllipsisTextCell value={cell.getValue()} />
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
                id: 'activeConsensus',
                accessorFn: row => (votesMap.some(c => c.term_uuid === row.identifier) ? 'true' : 'false'),
                header: 'Consensus',
                Header: ({ column }) => (
                    <Tooltip title="Shows if there is an active consensus. Clicking open active consensus vote view">
                        <span>{column.columnDef.header}</span>
                        <StyledChip label="New" size="small" customVariant="agreement" sx={{ ml: '0.5' }} />
                    </Tooltip>
                ),
                size: 100,
                size: 100,
                enableEditing: false,
                filterVariant: 'select',
                filterSelectOptions: [
                    { text: 'In Consensus', value: 'true' },
                    { text: 'Not in Consensus', value: 'false' }
                ],
                filterFn: (row, columnId, filterValue) => {
                    if (filterValue === '' || filterValue === null || filterValue === undefined) return true;
                    return row.getValue(columnId) === filterValue;
                },
                Cell: ({ row }) => {
                    const inConsensus = votesMap.find(consensus => consensus.term_uuid === row.original.identifier);
                    return inConsensus ? (
                        <StyledChip
                            label="In Consensus"
                            size="small"
                            customVariant="agreement"
                            sx={{ cursor: 'pointer' }}
                            onClick={async event => {
                                event.stopPropagation();
                                await handleWidgetUrgentTermClick(row.original);
                            }}
                        />
                    ) : null;
                },
                muiTableBodyCellProps: {
                    sx: { maxWidth: 100 }
                    sx: { maxWidth: 100 }
                },
                muiTableHeadCellProps: {
                    sx: { maxWidth: 100 }
                    sx: { maxWidth: 100 }
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
                size: 90,
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
                    placeholder: 'Filter',
                    select: true,
                    sx: {
                        width: '100%'
                    }
                },
                muiTableHeadCellProps: {
                    sx: {
                        width: '90px',
                        minWidth: '90px',
                        maxWidth: '90px'
                    }
                },
                muiTableBodyCellProps: {
                    sx: {
                        width: '90px',
                        minWidth: '90px',
                        maxWidth: '90px'
                    }
                }
            },
            {
                accessorKey: 'modified',
                id: 'modified',
                header: 'Last modified',
                Header: ({ column }) => (
                    <Tooltip
                        title={
                            <>
                                <span style={{ fontSize: '1.2em' }}>
                                    Shows the last date time, when the term was edited: term metadata updated or a new comment in a discussion.
                                </span>
                            </>
                        }
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span>{column.columnDef.header}</span>
                        </div>
                    </Tooltip>
                ),
                Cell: ({ cell }) => {
                    if (cell.getValue()) {
                        return new Date(cell.getValue()).toLocaleDateString() + ', ' + new Date(cell.getValue()).toLocaleTimeString();
                    }
                    return ' ';
                },
                size: 150,
                enableEditing: false,
                filterVariant: 'select',
                filterFn: (row, columnId, filterValue) => {
                    const modifiedDatetime = new Date(row.getValue(columnId));
                    const now = new Date();
                    switch (filterValue) {
                        case 'last1day':
                            return modifiedDatetime >= new Date(now.setDate(now.getDate() - 1));
                        case 'last1week':
                            return modifiedDatetime >= new Date(now.setDate(now.getDate() - 7));
                        case 'last1month':
                            return modifiedDatetime >= new Date(now.setMonth(now.getMonth() - 1));
                        case 'last3months':
                            return modifiedDatetime >= new Date(now.setMonth(now.getMonth() - 3));
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
                    placeholder: 'Filter Modified',
                    select: true,
                    sx: {
                        width: '100%'
                    }
                },
                muiTableHeadCellProps: {
                    sx: {
                        width: '150px',
                        minWidth: '150px',
                        maxWidth: '150px'
                    }
                },
                muiTableBodyCellProps: {
                    sx: {
                        width: '150px',
                        minWidth: '150px',
                        maxWidth: '150px'
                    }
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
                size: 100,
                enableEditing: false,
                filterVariant: 'select',
                filterFn: 'equals',
                filterSelectOptions: [
                    { text: 'Draft', value: 'draft' },
                    { text: 'Reject', value: 'reject' },
                    { text: 'Accept', value: 'accept' }
                ],
                muiFilterTextFieldProps: {
                    placeholder: 'Filter',
                    select: true
                },
                muiTableBodyCellProps: {
                    sx: {
                        maxWidth: 100
                    }
                },
                muiTableHeadCellProps: {
                    sx: {
                        maxWidth: 100
                    }
                }
            }
        ],
        [validationErrors, votesMap]
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
            pendingDeletedTermIds.current.push(row.id);
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
        activeConsensus: '',
        seeAlso: '', // Default value for seeAlso
        status: 'draft', // Override 'status' with 'draft'
        created: new Date().toLocaleDateString('en-CA'), // Default value for created
        modified: new Date().toISOString() // Default value for modified
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
            density: isMobileScreen ? 'comfortable' : 'compact',
            pagination: { pageSize: getPageSize(), pageIndex: 0 },
            showColumnFilters: !isMobileScreen
            density: isMobileScreen ? 'comfortable' : 'compact',
            pagination: { pageSize: getPageSize(), pageIndex: 0 },
            showColumnFilters: !isMobileScreen
        },
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        getRowId: row => row.identifier,
        enableEditing: currentUser.role === 'System Admin',
        enableRowActions: currentUser.role === 'System Admin',
        positionActionsColumn: 'last',
        enableSorting: true,
        enableFiltering: true,
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        enableGlobalFilter: false,
        enableHiding: false,
        muiPaginationProps: {
            rowsPerPageOptions: [],
            showRowsPerPage: false
        },
        muiPaginationProps: {
            rowsPerPageOptions: [],
            showRowsPerPage: false
        },
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
                return !['identifier', 'created', 'modified', 'status'].includes(fieldName);
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
                return !['identifier', 'created', 'modified', 'status'].includes(fieldName);
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
            <div style={{ display: 'flex', gap: 5, justifyContent: 'flex-start', flexWrap: 'nowrap' }}>
                <Tooltip title="Add new term">
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleCreateRow(row);
                        }}
                        sx={{
                            backgroundColor: colorStyled.primary,
                            whiteSpace: 'nowrap',
                            minWidth: 50,
                            '&:hover': { backgroundColor: colorStyled.primaryContainer, color: colorStyled.onPrimaryContainer }
                        }}
                    >
                        {isMobileScreen ? 'New Term' : 'Create New Term'}
                        {isMobileScreen ? 'New Term' : 'Create New Term'}
                    </Button>
                </Tooltip>
                <Tooltip title="View this vocabulary history of changes">
                    <Button
                        variant="contained"
                        onClick={() => {
                            setActiveMUIPopUp(MaterialUIPopUpTypes.HISTORY);
                        }}
                        sx={{
                            backgroundColor: colorStyled.primary,
                            whiteSpace: 'nowrap',
                            minWidth: 50,
                            '&:hover': { backgroundColor: colorStyled.primaryContainer, color: colorStyled.onPrimaryContainer }
                        }}
                    >
                        Timeline
                    </Button>
                </Tooltip>

                <Tooltip title="Review active discussions and view ongoing agreements">
                    <StyledBadge badgeContent={mentionedCommentsLength - cookieMentionedCommentsCount} customVariant="orange">
                        <Button
                            variant="contained"
                            onClick={() => {
                                setActiveMUIPopUp(MaterialUIPopUpTypes.DISCUSSIONS);
                                Cookies.set('mentionedCommentsCount', mentionedCommentsLength);
                            }}
                            sx={{
                                backgroundColor: colorStyled.primary,
                                whiteSpace: 'nowrap',
                                minWidth: 50,
                                '&:hover': { backgroundColor: colorStyled.primaryContainer, color: colorStyled.onPrimaryContainer }
                            }}
                        >
                            {isMobileScreen ? 'Hub' : 'Information Hub'}
                            {isMobileScreen ? 'Hub' : 'Information Hub'}
                        </Button>
                    </StyledBadge>
                </Tooltip>
            </div>
        ),
        renderBottomToolbarCustomActions: () => (
            <>
                <StyledTooltip title="You have made changes, Please don't forget to save your changes" disableHoverListener={!hasUncommittedChanges}>
                    <Button
                        variant="contained"
                        disabled={!hasUncommittedChanges}
                        onClick={() => setOpenCommit(true)}
                        style={{
                            backgroundColor: hasUncommittedChanges ? colorStyled.primary : 'gray',
                            border: hasUncommittedChanges ? '2px' + ' solid red' : ''
                        }}
                    >
                        Save Changes
                    </Button>
                </StyledTooltip>
                {openCommit && (
                    <CommitChanges
                        refetch={refetch}
                        openCommit={openCommit}
                        setOpenCommit={setOpenCommit}
                        setHasUncommittedChanges={setHasUncommittedChanges}
                        user={currentUser.displayName}
                        onSuccess={async () => {
                            await deleteTermVotes(pendingDeletedTermIds.current);
                            pendingDeletedTermIds.current = [];
                        }}
                        onFail={() => {
                            console.error(`Error while commiting changes with ${pendingDeletedTermIds.current} terms`);
                        }}
                    />
                )}
            </>
        ),
        state: {
            columnVisibility,
            density,
            pagination,
            pagination,
            isLoading: isLoadingTerms,
            isSaving: isCreatingTerm || isUpdatingTerm || isDeletingTerm,
            showAlertBanner: isLoadingTermsError,
            showProgressBars: isFetchingTerms
        },
        onPaginationChange: setPagination,
        onPaginationChange: setPagination,
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Delete">
                    <IconButton className="action-button" style={{ color: colorStyled.secondary }} onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        )
    });

    const handleWidgetNewTermsClick = () => {
        table.setColumnFilters([{ id: 'created', value: 'last3months' }]);
    };

    const handleWidgetDiscussionReplyClick = term => {
        setSelectedTerm(term);
        const currentResourceDiscussion = discussions.find(d => d.resourceId === term.identifier);
        setTermComments(currentResourceDiscussion.comments);
        setOpenPopup(true);
    };

    const handleWidgetUrgentTermClick = async term => {
        const data = await getTermVotes(term.identifier);
        setUrgentVoteTerm(term);
        setUrgentVoteData(data[0]);
        setActiveMUIPopUp(MaterialUIPopUpTypes.ACTIVE_CONSENSUS);
    };

    const handleConsensusDecisionMade = async () => {
        const updatedVotes = await getVotes();
        setVotesMap(updatedVotes);
    };

    return (
        <ScrollableDiv>
            <CardActivityWidget
                urgentTerms={urgentTerms}
                urgentTerms={urgentTerms}
                votes={votesMap}
                discussionReplies={discussionReplies}
                newTerms={newTerms}
                discussionReplies={discussionReplies}
                newTerms={newTerms}
                onUrgentClick={handleWidgetUrgentTermClick}
                onNewTermsClick={handleWidgetNewTermsClick}
                onDiscussionClick={handleWidgetDiscussionReplyClick}
                isMobileScreen={isMobileScreen}
                isMobileScreen={isMobileScreen}
            />
            <MaterialReactTable
                table={table}
                muiTableContainerProps={{
                    sx: {
                        width: '50%',
                        maxWidth: '50vw',
                        overflowX: 'auto'
                    }
                }}
            />
            <MaterialReactTable
                table={table}
                muiTableContainerProps={{
                    sx: {
                        width: '50%',
                        maxWidth: '50vw',
                        overflowX: 'auto'
                    }
                }}
            />
            <Modal open={openPopup} onClose={handleClosePopup}>
                <Box
                    sx={{
                        position: 'fixed',
                        top: { xs: '50%', xl: '25%' },
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        width: { xs: '95%', xl: '70vw' },
                        height: { xs: '95%', xl: '53%' },
                        overflowY: 'auto',
                        padding: 2,
                        outline: 'none',
                        borderRadius: 1
                    }}
                >
                    {selectedTerm && (
                        <ExpandedRow
                            term={selectedTerm}
                            currentUser={currentUser}
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
                message={<ChangesTimeline id="https://raw.githubusercontent.com/tib-ts/vocabulary_development_ver_1/refs/heads/ver_1/terms.ttl" />}
                type={MaterialUIPopUpTypes.DISCUSSIONS}
            />
            <MaterialUIPopUp
                open={activeMUIPopUp === MaterialUIPopUpTypes.DISCUSSIONS}
                onClose={() => setActiveMUIPopUp(null)}
                title="Information Hub"
                message={
                    <InformationHub
                        terms={terms}
                        discussions={discussions}
                        mentionedUser={currentUser.displayName}
                        onTermSelect={handleNavigateToMentionedTerm}
                    />
                }
                type={MaterialUIPopUpTypes.DISCUSSIONS}
            />
            {urgentVoteTerm && urgentVoteData && (
                <MaterialUIPopUp
                    open={activeMUIPopUp === MaterialUIPopUpTypes.ACTIVE_CONSENSUS}
                    onClose={() => {
                        setActiveMUIPopUp(null);
                    }}
                    title="Active consensus"
                    message={
                        <VoteView
                            term={urgentVoteTerm}
                            vote={urgentVoteData}
                            username={currentUser.displayName}
                            setVoteViewMode={() => {
                                setUrgentVoteTerm(null);
                                setUrgentVoteData(null);
                            }}
                            onDecisionMade={handleConsensusDecisionMade}
                        />
                    }
                    type={MaterialUIPopUpTypes.ACTIVE_CONSENSUS}
                />
            )}
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
    currentUser: PropTypes.string.isRequired
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
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding-bottom: 5px;
    max-height: 90vh;

    @media (max-width: ${LARGE_SCREEN_SIZE}) {
        padding: 5px;
    }
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
