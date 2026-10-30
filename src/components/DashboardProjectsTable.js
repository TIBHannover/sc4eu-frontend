import React from 'react';
import { useTable } from 'react-table';
import PropTypes from 'prop-types';
import ProjectMembersDropdown from './ProjectMembersDropDown';
import { StyledTable } from 'styledComponents/styledComponents';
function DashboardProjectsTable(props) {
    const columns = props.columns;
    const data = props.userProjectsDetail;

    const tableInstance = useTable({
        columns,
        data,
        initialState: {
            hiddenColumns: ['uuid', 'description']
        }
    });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
    return (
        <StyledTable {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                if (cell.column.id === 'members') {
                                    return (
                                        <td key={cell.column.id}>
                                            <ProjectMembersDropdown
                                                projectUsers={cell.value}
                                                projectUUID={row.values.uuid}
                                                callBack={props.callback}
                                                addUserCallBack={props.addUserToProjectCallBack}
                                                currentUser={props.currentUser}
                                            />
                                        </td>
                                    );
                                }
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </StyledTable>
    );
}

DashboardProjectsTable.propTypes = {
    columns: PropTypes.array.isRequired,
    userProjectsDetail: PropTypes.array.isRequired,
    callback: PropTypes.func.isRequired,
    addUserToProjectCallBack: PropTypes.func.isRequired,
    currentUser: PropTypes.object
};

export default DashboardProjectsTable;

