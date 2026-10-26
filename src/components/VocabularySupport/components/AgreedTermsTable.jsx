import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Alert, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

import { ToolbarNavBar } from './ToolbarNavBar';
import { LARGE_SCREEN_SIZE } from '../../../styledComponents/styledComponents';

const MAX_CELL_LENGTH = 30;

const EllipsisCell = ({ value }) => (
    <span title={value} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>
        {value && value.length > MAX_CELL_LENGTH ? `${value.slice(0, MAX_CELL_LENGTH)}...` : value}
    </span>
);
EllipsisCell.propTypes = { value: PropTypes.string };

const EmptyAgreedTerms = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, p: 4, textAlign: 'center' }}>
        <TaskAltOutlinedIcon fontSize="large" color="disabled" />
        <Typography variant="body1">There are no accepted terms yet.</Typography>
        <Typography variant="body2" color="text.secondary">
            Start a consensus and build your defined vocabulary of definitions.
        </Typography>
    </Box>
);

/**
 * Read-only table with all the terms that were agreed upon (status `accept`).
 * Row click opens the term details via `onTermSelect`.
 */
const AgreedTermsTable = ({ terms, isLoading, onTermSelect, onOpenTimeline }) => {
    const theme = useTheme();
    const isMobileScreen = useMediaQuery(`(max-width:${LARGE_SCREEN_SIZE})`);

    const columnVisibility = useMemo(() => (isMobileScreen ? { altLabel: false, description: false } : {}), [isMobileScreen]);

    const columns = useMemo(
        () => [
            { accessorKey: 'label', header: 'Term', size: 150 },
            {
                accessorKey: 'altLabel',
                header: 'Alternative Labels',
                size: 150,
                Cell: ({ cell }) => <EllipsisCell value={[].concat(cell.getValue() || []).join(', ')} />
            },
            { accessorKey: 'description', header: 'Description', size: 300, Cell: ({ cell }) => <EllipsisCell value={cell.getValue()} /> },
            {
                accessorKey: 'modified',
                header: 'Agreed on',
                size: 120,
                Cell: ({ cell }) => (cell.getValue() ? new Date(cell.getValue()).toLocaleDateString() : '')
            }
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: terms,
        getRowId: row => row.identifier,
        initialState: { sorting: [{ id: 'label', desc: false }], density: 'compact', pagination: { pageSize: 10, pageIndex: 0 } },
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        enableHiding: false,
        muiTableProps: { sx: { tableLayout: 'fixed' } },
        enableGlobalFilter: true,
        enableColumnFilters: false,
        muiPaginationProps: { rowsPerPageOptions: [], showRowsPerPage: false },
        renderTopToolbarCustomActions: () => (
            <ToolbarNavBar
                isMobileScreen={isMobileScreen}
                items={[
                    {
                        key: 'timeline',
                        icon: <HistoryOutlinedIcon fontSize="small" />,
                        label: 'Timeline',
                        tooltip: 'View this vocabulary history of changes',
                        colorRole: 'secondary',
                        onClick: onOpenTimeline
                    }
                ]}
            />
        ),
        renderEmptyRowsFallback: () => <EmptyAgreedTerms />,
        state: { isLoading, columnVisibility },
        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => onTermSelect(row.original.identifier),
            sx: { cursor: 'pointer' }
        }),
        mrtTheme: () => ({ baseBackgroundColor: theme.palette.surface.containerLow })
    });

    return (
        <>
            <Alert severity="info" variant="outlined" sx={{ mb: 1 }}>
                <b>Agreed vocabulary.</b> These terms have passed consensus: they are final and read-only. Click a term to see its details and
                discussion.
            </Alert>
            <MaterialReactTable table={table} muiTableContainerProps={{ sx: { width: '50%', maxWidth: '50vw', overflowX: 'auto' } }} />
        </>
    );
};

AgreedTermsTable.propTypes = {
    terms: PropTypes.arrayOf(PropTypes.object).isRequired,
    isLoading: PropTypes.bool,
    onTermSelect: PropTypes.func.isRequired,
    onOpenTimeline: PropTypes.func.isRequired
};

export default AgreedTermsTable;
