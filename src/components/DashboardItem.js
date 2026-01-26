import React, { Component } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { deleteUser, getUserProjects, getUserRole, unregisterUserFromProject, updateUserRole } from '../network/UserProfileCalls';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { addUserToProject } from '../network/UserProfileCalls';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { colorStyled } from '../styledComponents/styledColor';
import AlertPopUp from './ReusableComponents/AlertPopUp';
import styled from 'styled-components';

class DashboardItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleValue: null,
            selectedProjectOptions: [],
            dropdownOpen: false,
            userProjectDropDown: false,
            isPopUpOpen: false,
            popUpMessage: '',
            selectedProjectID: null,
            selectedUserID: null,
            Action: '',
            userRoleSelected: null
        };
    }

    componentDidMount = () => {
        //Get Current role and Current Projects for this user
        this.getRoleForUser();
        this.getProjectsForUser();
    };

    getRoleForUser = () => {
        const user = this.props.userData;
        getUserRole(user.uuid).then(userRoleFromBackend => {
            const index = this.props.roleOptions.findIndex(item => item.value === userRoleFromBackend);
            this.setState({ roleValue: this.props.roleOptions[index] });
        });
    };

    getProjectsForUser = () => {
        const user = this.props.userData;

        const thisUserProjects = [];
        getUserProjects(user.uuid).then(userProjectsUUID => {
            userProjectsUUID.forEach(uuid => {
                const foundIndex = this.props.projects.findIndex(item => item.projectUUID === uuid);
                if (foundIndex !== undefined) {
                    thisUserProjects.push(this.props.projects[foundIndex]);
                }
            });
            this.setState({ selectedProjectOptions: thisUserProjects });
        });
    };

    // Function to open the alert popup box asking the user if they want to delete the user
    deleteUser = () => {
        const user = this.props.userData;
        this.setState(prevState => ({
            isPopUpOpen: !prevState.isPopUpOpen,
            popUpMessage: 'Are you sure you want to Delete ' + user.display_name + ' ?',
            Action: 'UserDelete',
            selectedUserID: user.uuid
        }));
    };

    toggle = () => {
        this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
    };

    userProjectToggle = () => {
        this.setState(prevState => ({ userProjectDropDown: !prevState.userProjectDropDown }));
    };

    // Function to open the alert popup box asking the user if they want to delete the userProject
    deleteProjectFromUser = async (project, user) => {
        this.setState(prevState => ({
            isPopUpOpen: !prevState.isPopUpOpen,
            popUpMessage: 'Are you sure you want to Delete ?',
            Action: 'UserProjectDelete',
            selectedProjectID: project.projectUUID,
            selectedUserID: user.uuid
        }));
    };

    // Function to open the alert popup box asking the user if they want to add the NewProjectFromUser
    addNewProjectFromUser = async (user, project) => {
        this.setState({
            isPopUpOpen: true,
            popUpMessage: `Are you sure you want to Add "${project.value}" project ?`,
            Action: 'UserProjectAdd',
            selectedProjectID: project.projectUUID,
            selectedUserID: user.uuid
        });
    };

    // Function to open the alert popup box asking the user if they want to update the UserRole
    updateUserRole = async (user, roleSelected) => {
        this.setState({
            roleValue: roleSelected,
            isPopUpOpen: true,
            popUpMessage: `Are you sure you want to update role of "${user.display_name}" ?`,
            Action: 'UpdateUserRole',
            selectedUserID: user.uuid,
            userRoleSelected: roleSelected
        });
    };

    resetState = () => {
        this.setState({
            isPopUpOpen: false,
            popUpMessage: '',
            Action: null,
            selectedProjectID: null,
            selectedUserID: null,
            userRoleSelected: null
        });
    };

    // Callback function for the alert popup box to handle the user's confirmation
    callBackFromAlertBox = confirmed => {
        if (confirmed && this.state.Action === 'UserDelete') {
            // If confirmed is true and the action is UserDelete
            const user = this.props.userData;
            if (user.role === 'System Admin') {
                // If the user is a System Admin, not allowed to delete System Admin
                this.setState(prevState => ({
                    isPopUpOpen: !prevState.isPopUpOpen,
                    popUpMessage: 'Not allowed to delete System Admin',
                    Action: null
                }));
            } else {
                // Delete User
                deleteUser(this.state.selectedUserID).then(() => {
                    // Calls the deleteUser function and handles the response
                    this.props.callback();
                    this.resetState();
                });
            }
        } else if (confirmed && this.state.Action === 'UserProjectDelete') {
            // If confirmed is true and the action is UserProjectDelete
            const { selectedProjectID, selectedUserID } = this.state;
            unregisterUserFromProject(selectedProjectID, selectedUserID).then(res => {
                // Calls the unregisterUserFromProject function and handles the response
                if (res) {
                    if (res.result === true) {
                        this.getProjectsForUser();
                        this.resetState();
                    } else {
                        this.setState({
                            isPopUpOpen: true,
                            popUpMessage: 'Something went wrong, Please try again',
                            Action: null,
                            selectedProjectID: null,
                            selectedUserID: null
                        });
                    }
                }
            });
        } else if (confirmed && this.state.Action === 'UserProjectAdd') {
            // If confirmed is true and the action is UserProjectAdd
            const { selectedProjectID, selectedUserID } = this.state;
            addUserToProject(selectedProjectID, selectedUserID).then(res => {
                // Calls the addUserToProject function and handles the response
                if (res.result === true) {
                    this.getProjectsForUser();
                    this.resetState();
                } else {
                    console.warn(res);
                    this.resetState();
                }
            });
        } else if (confirmed && this.state.Action === 'UpdateUserRole') {
            // If confirmed is true and the action is UpdateUserRole
            const newRole = {
                user_id: this.state.selectedUserID,
                role_id: this.state.userRoleSelected.roleId
            };
            updateUserRole(newRole).then(response => {
                // Calls the updateUserRole function and handles the response
                if (response === 'true') {
                    console.info('User role updated successfully');
                    this.resetState();
                } else {
                    console.warn(response);
                    this.resetState();
                }
            });
        }
    };

    extractRow = () => {
        const user = this.props.userData;
        const availableProjects = this.props.projects.filter(
            project => !this.state.selectedProjectOptions.some(selectedProject => selectedProject?.value === project.value)
        );
        return (
            <>
                <td>{user.display_name}</td>
                <td>{user.email_address}</td>
                <td>{user.email_valid === false ? 'false' : 'true'}</td>
                <td>
                    {user.role === 'System Admin' ? (
                        user.role
                    ) : (
                        <>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret style={{ width: '100%' }}>
                                    {this.state.roleValue?.value}
                                </DropdownToggle>
                                <DropdownMenu style={{ width: '100%' }}>
                                    <CustomDropdownItem className="custom-dropdown-item" header>
                                        <p style={{ fontSize: '14px' }}> Select and change the role</p>
                                    </CustomDropdownItem>
                                    {this.props.roleOptions.map(option => (
                                        <div key={option.value}>
                                            <hr style={{ margin: '0px 0px 0px 0px' }} />
                                            <DropdownItem
                                                key={option.value}
                                                onClick={() => this.updateUserRole(user, option)}
                                                style={{ padding: '10px 0px 10px 15px' }}
                                                disabled={this.state.roleValue?.value === option.value}
                                            >
                                                <div style={{ marginLeft: '3%', float: 'left' }}>{option.value}</div>
                                                <FontAwesomeIcon
                                                    hidden={this.state.roleValue?.value === option.value}
                                                    icon={faPlus}
                                                    size={'1x'}
                                                    color={colorStyled.SECONDARY.darker}
                                                    title={'Click to change user role'}
                                                    style={{ float: 'right', marginRight: '3%' }}
                                                />
                                            </DropdownItem>
                                        </div>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </>
                    )}
                </td>
                <td>
                    {user.role === 'System Admin' ? (
                        'All projects Access'
                    ) : (
                        <>
                            <Dropdown isOpen={this.state.userProjectDropDown} toggle={this.userProjectToggle}>
                                <DropdownToggle caret style={{ width: '100%' }}>
                                    List of Projects
                                </DropdownToggle>
                                <DropdownMenu style={{ width: '100%' }}>
                                    <Scrollbars style={{ height: '50vh' }}>
                                        <DropdownItem header>Add new project</DropdownItem>
                                        {availableProjects.length > 0 ? (
                                            availableProjects.map((project, index) => (
                                                <div key={`project-${index}`}>
                                                    <hr style={{ margin: '0px 0px 0px 0px' }} />
                                                    <DropdownItem key={`project-${index}`} style={{ padding: '10px 0px 10px 15px' }}>
                                                        <div
                                                            style={{
                                                                marginLeft: '3%',
                                                                float: 'left',
                                                                width: '80%',
                                                                whiteSpace: 'normal',
                                                                wordBreak: 'break-all'
                                                            }}
                                                        >
                                                            {project.value}
                                                        </div>
                                                        <FontAwesomeIcon
                                                            icon={faPlus}
                                                            size={'1x'}
                                                            color={colorStyled.SECONDARY.darker}
                                                            title={'Click to add new project to this user'}
                                                            style={{ float: 'right', marginRight: '3%' }}
                                                            onClick={() => this.addNewProjectFromUser(user, project)}
                                                        />
                                                    </DropdownItem>
                                                </div>
                                            ))
                                        ) : (
                                            <div style={{ padding: '10px 0px 10px 0px' }}>
                                                <hr style={{ margin: '0px 0px 0px 0px' }} />
                                                <DropdownItem header> User have all projects access</DropdownItem>
                                            </div>
                                        )}
                                        <hr style={{ margin: '0px 0px 0px 0px' }} />
                                        <DropdownItem header>List of Projects Access</DropdownItem>
                                        {this.state.selectedProjectOptions?.length > 0 ? (
                                            this.state.selectedProjectOptions.map((item, index) => (
                                                <div key={'key' + index}>
                                                    <hr style={{ margin: '0px 0px 0px 0px' }} />
                                                    <DropdownItem key={'key' + index} style={{ padding: '10px 0px 10px 15px' }}>
                                                        <div
                                                            style={{
                                                                marginLeft: '3%',
                                                                float: 'left',
                                                                width: '80%',
                                                                whiteSpace: 'normal',
                                                                wordBreak: 'break-all'
                                                            }}
                                                        >
                                                            {item?.value}
                                                        </div>
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                            size={'1x'}
                                                            color={colorStyled.SECONDARY.darker}
                                                            title={'Click to unregister this user from this Project'}
                                                            style={{ float: 'right', marginRight: '3%' }}
                                                            onClick={() => this.deleteProjectFromUser(item, user)}
                                                        />
                                                    </DropdownItem>
                                                </div>
                                            ))
                                        ) : (
                                            <div style={{ padding: '10px 0px 10px 0px' }}>
                                                <hr style={{ margin: '0px 0px 0px 0px' }} />
                                                <DropdownItem
                                                    style={{
                                                        width: '80%',
                                                        whiteSpace: 'normal',
                                                        wordBreak: 'break-all'
                                                    }}
                                                    header
                                                >
                                                    User does not have any projects access
                                                </DropdownItem>
                                            </div>
                                        )}
                                    </Scrollbars>
                                </DropdownMenu>
                            </Dropdown>
                        </>
                    )}
                </td>
                <td>
                    {user.role === 'System Admin' ? (
                        ''
                    ) : (
                        <Button
                            style={{ borderRadius: '4px 4px 4px 4px', marginLeft: '35%', backgroundColor: '#ee6c4d', border: 'none' }}
                            onClick={() => {
                                this.deleteUser(user);
                            }}
                        >
                            <Icon icon={faTrash} color={'black'} />
                        </Button>
                    )}
                </td>
            </>
        );
    };

    render() {
        return (
            <>
                <AlertPopUp
                    bodyText={this.state.popUpMessage}
                    isOpen={this.state.isPopUpOpen}
                    onClose={() => {
                        this.setState(prevState => ({ isPopUpOpen: !prevState.isPopUpOpen }));
                    }}
                    isConfirm={this.callBackFromAlertBox}
                />
                <tr>{this.extractRow()}</tr>
            </>
        );
    }
}

DashboardItem.propTypes = {
    projects: PropTypes.array.isRequired,
    userData: PropTypes.object.isRequired,
    roleOptions: PropTypes.array.isRequired,
    callback: PropTypes.func.isRequired,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default compose(connect(mapStateToProps))(DashboardItem);

const CustomDropdownItem = styled(DropdownItem)`
    &&& {
        padding-left: 0;
        padding-right: 0;
        margin-left: 0;
        margin-right: 0;
        text-align: center;
    }
`;
