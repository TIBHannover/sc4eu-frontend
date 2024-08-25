// import PropTypes from 'prop-types';
// import React, { useState } from 'react';
// import { MaterialReactTable } from 'material-react-table';
// import { IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ExpandedRow from './ExpandedRow';
//
// const ActionCell = ({ row, handleEdit }) => {
//     const { original } = row.original;
//     return (
//         <>
//             <IconButton onClick={() => handleEdit(original)}>
//                 <EditIcon />
//             </IconButton>
//             <IconButton>
//                 <DeleteIcon />
//             </IconButton>
//         </>
//     );
// };
//
// ActionCell.propTypes = {
//     row: PropTypes.shape({
//         original: PropTypes.object.isRequired
//     }).isRequired,
//     handleEdit: PropTypes.func.isRequired
// };
//
// const MainTable = ({ terms, columns }) => {
//     const [expandedRow, setExpandedRow] = useState(null);
//
//     const handleEdit = term => {
//         setExpandedRow(term);
//     };
//
//     return (
//         <MaterialReactTable
//             columns={columns}
//             data={terms}
//             getRowProps={row => ({
//                 onClick: () => setExpandedRow(row.original),
//                 style: {
//                     cursor: 'pointer'
//                 }
//             })}
//             renderDetailPanel={({ row }) =>
//                 expandedRow && expandedRow.id === row.original.id && <ExpandedRow term={expandedRow} setExpandedRow={setExpandedRow} />
//             }
//         />
//     );
// };
//
// MainTable.propTypes = {
//     terms: PropTypes.array.isRequired,
//     columns: PropTypes.array.isRequired
// };
// export default MainTable;
