import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProjectUsersDetail, getUserProjectsDetail } from '../network/UserProfileCalls';
import DashboardProjectsTable from './DashboardProjectsTable';

export default class DashboardProjects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userProjectsDetail: null
        };
    }

    componentDidMount = async () => {
        await this.getProjectsFromBackend();
    };

    getProjectsFromBackend = async () => {
        const userProjectsDetails = await getUserProjectsDetail(this.props.currentUser.userId);

        for (const projectDetails of userProjectsDetails) {
            const projectUsers = await this.retrieveProjectUsersDetail(projectDetails);
            projectDetails.members = projectUsers;
        }

        this.setState({ userProjectsDetail: userProjectsDetails });
    };

    retrieveProjectUsersDetail = async project => {
        const usersDetail = await getProjectUsersDetail(project.uuid);
        const usersNames = [];
        for (const userDetail of usersDetail) {
            usersNames.push(userDetail.display_name);
        }
        return usersNames;
        //return project;
    };

    addNewMemberCallback = email => {
        console.log(email);
    };

    COLUMNS = [
        {
            Header: 'Project Name',
            accessor: 'name'
        },
        {
            Header: 'Access Type',
            accessor: 'accessType'
        },
        {
            Header: 'Created By',
            accessor: 'createdBy'
        },
        {
            Header: 'Project Members',
            accessor: 'members'
        },
        {
            Header: 'Description',
            accessor: 'description'
        }
    ];

    render() {
        return (
            <div>
                {this.state.userProjectsDetail ? (
                    <DashboardProjectsTable
                        columns={this.COLUMNS}
                        userProjectsDetail={this.state.userProjectsDetail}
                        callback={this.addNewMemberCallback}
                    />
                ) : (
                    <div> ...loading</div>
                )}
            </div>
        );
    }
}

DashboardProjects.propTypes = {
    currentUser: PropTypes.object.isRequired
};
