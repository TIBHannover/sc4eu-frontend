import React, { Component } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { deleteUser, getUserProjects, getUserRole, unregisterUserFromProject, updateUserRole } from '../network/UserProfileCalls';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { SECONDARY } from '../styledComponents/styledComponents';
import { addUserToProject } from '../network/UserProfileCalls';
import { Scrollbars } from 'react-custom-scrollbars-2';

class DashboardItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleValue: null,
            selectedProjectOptions: [],
            dropdownOpen: false,
            userProjectDropDown: false
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

    deleteUser = item => {
        const user = this.props.userData;
        const isConfirmed = window.confirm('Are you sure you want to delete ' + user.display_name);
        if (isConfirmed) {
            if (user.role === 'System Admin') {
                alert('Not allowed to delete System Admin');
                return;
            } else {
                //Delete User
                deleteUser(user.uuid).then(() => {
                    this.props.callback();
                });
            }
        }
    };

    toggle = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    };

    userProjectToggle = () => {
        this.setState({ userProjectDropDown: !this.state.userProjectDropDown });
    };

    deleteProjectFromUser = async (project, user) => {
        const isConfirmed = window.confirm(`Are you sure you want to Delete?`);
        if (!isConfirmed) {
            return;
        }
        unregisterUserFromProject(project.projectUUID, user.uuid).then(res => {
            if (res) {
                if (res.result === true) {
                    this.getProjectsForUser();
                } else {
                    alert('Something went wrong, Please try again');
                }
            }
        });
    };

    addNewProjectFromUser = async (user, project) => {
        const isConfirmed = window.confirm(`Are you sure you want to Add "${project.value}" project ?`);
        if (!isConfirmed) {
            return;
        }
        addUserToProject(project.projectUUID, user.uuid).then(res => {
            if (res.result === true) {
                this.getProjectsForUser();
            } else {
                console.warn(res);
            }
        });
    };

    updateUserRole = async (user, roleSelected) => {
        this.setState({ roleValue: roleSelected });
        const newRole = {
            user_id: user.uuid,
            role_id: roleSelected.roleId
        };
        const isConfirmed = window.confirm(`Are you sure you want to update role of "${user.display_name}" ?`);
        if (!isConfirmed) {
            return;
        }
        updateUserRole(newRole).then(response => {
            if (response === 'true') {
                console.info('user role updated successfully');
            } else {
                console.warn(response);
            }
        });
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
                                    <DropdownItem header>Select and change the role</DropdownItem>
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
                                                    color={SECONDARY.darker}
                                                    title={'Click to add new project to this user'}
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
                                                            color={SECONDARY.darker}
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
                                                            color={SECONDARY.darker}
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
        return <tr>{this.extractRow()}</tr>;
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
