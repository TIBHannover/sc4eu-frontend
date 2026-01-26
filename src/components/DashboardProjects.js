import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addUserToProject, getProjectUsersDetail, getUserProjectsDetail, unregisterUserFromProject } from '../network/UserProfileCalls';
import DashboardProjectsTable from './DashboardProjectsTable';
import AlertPopUp from './ReusableComponents/AlertPopUp';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default class DashboardProjects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userProjectsDetail: null,
            updateFlipFlop: false,
            isPopUpOpen: false,
            popUpMessage: '',
            isAuthorized: false,
            selectedProjectID: null,
            selectedUserID: null
        };
    }

    componentDidMount = async () => {
        await this.getProjectsFromBackend();
    };

    componentDidUpdate = async prevProps => {
        if (prevProps.currentUser !== this.props.currentUser) {
            await this.getProjectsFromBackend();
        }
    };

    getProjectsFromBackend = async () => {
        if (this.props.currentUser && this.props.currentUser !== 0) {
            const userProjectsDetails = await getUserProjectsDetail(this.props.currentUser.userId);

            for (const projectDetails of userProjectsDetails) {
                const projectUsers = await this.retrieveProjectUsersDetail(projectDetails);
                projectDetails.members = projectUsers;
            }

            this.setState({ userProjectsDetail: userProjectsDetails });
        }
    };

    retrieveProjectUsersDetail = async project => {
        const usersDetail = await getProjectUsersDetail(project.uuid);
        const usersNames = [];
        for (const userDetail of usersDetail) {
            const theUser = { name: userDetail.display_name, UUID: userDetail.uuid, role: userDetail.role };
            usersNames.push(theUser);
        }
        return usersNames;
    };

    // Function to open the alert popup box asking the user if they want to delete the UserFromProject
    deleteUserFromProject = async (projectUUID, userUUID, userName) => {
        this.setState(prevState => ({
            isPopUpOpen: !prevState.isPopUpOpen,
            popUpMessage: `Are you sure you want to Delete ${userName} User?`,
            isAuthorized: true,
            selectedProjectID: projectUUID,
            selectedUserID: userUUID
        }));
    };

    // Callback function for the alert popup box to handle the user's confirmation
    callBackFromAlertBox = confirmed => {
        if (confirmed && this.state.isAuthorized) {
            const { selectedProjectID, selectedUserID } = this.state;
            unregisterUserFromProject(selectedProjectID, selectedUserID).then(res => {
                if (res) {
                    this.getProjectsFromBackend().then(() => {
                        this.setState(prevState => ({
                            updateFlipFlop: !prevState.updateFlipFlop,
                            isPopUpOpen: false,
                            popUpMessage: '',
                            isAuthorized: false,
                            selectedProjectID: null,
                            selectedUserID: null
                        }));
                    });
                }
            });
        }
    };

    addUserToProject = async (projectUUID, userUUID) => {
        addUserToProject(projectUUID, userUUID).then(res => {
            if (res) {
                this.getProjectsFromBackend().then(() => {
                    this.setState(prevState => ({ updateFlipFlop: !prevState.updateFlipFlop }));
                });
            }
        });
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
        },
        {
            Header: 'ProjectUUID',
            accessor: 'uuid'
        }
    ];

    render() {
        return (
            <div key={this.state.updateFlipFlop}>
                <AlertPopUp
                    bodyText={this.state.popUpMessage}
                    isOpen={this.state.isPopUpOpen}
                    onClose={() => {
                        this.setState(prevState=> ({ isPopUpOpen: !prevState.isPopUpOpen }));
                    }}
                    isConfirm={this.callBackFromAlertBox}
                />
                {this.state.userProjectsDetail ? (
                    <DashboardProjectsTable
                        columns={this.COLUMNS}
                        userProjectsDetail={this.state.userProjectsDetail}
                        callback={this.deleteUserFromProject}
                        addUserToProjectCallBack={this.addUserToProject}
                        currentUser={this.props.currentUser}
                    />
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100vh'
                        }}
                    >
                        <h2 className="h5" style={{ textAlign: 'center' }}>
                            <span>
                                <Icon icon={faSpinner} spin />
                            </span>{' '}
                            Loading
                        </h2>
                    </div>
                )}
            </div>
        );
    }
}

DashboardProjects.propTypes = {
    currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};
