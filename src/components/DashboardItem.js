import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { components, default as ReactSelect } from 'react-select';
import { deleteUser, getUserProjects, getUserRole, updateUserProjects, updateUserRole } from '../network/UserProfileCalls';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const Option = props => {
    return (
        <div>
            <components.Option {...props}>
                <input key={props.label} type="checkbox" checked={props.isSelected} onChange={() => null} /> <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

Option.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired
};

const RoleOption = props => {
    return (
        <div>
            <components.RoleOption {...props}>
                <label>{props.label}</label>
            </components.RoleOption>
        </div>
    );
};

RoleOption.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired
};

class DashboardItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: undefined,
            userDeleted: false,
            roleValue: null,
            shouldEdit: false,
            selectedProjectOptions: []
        };
    }

    componentDidMount = () => {
        console.log('componentDidMount');
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

    editUser = item => {
        const projects_id = [];
        this.state.selectedProjectOptions.forEach(project => {
            projects_id.push(project.projectUUID);
        });

        if (this.state.shouldEdit) {
            const newRole = {
                user_id: item.uuid,
                role_id: this.state.roleValue.roleId
            };

            const newProjects = {
                user_id: item.uuid,
                projects_id: projects_id
            };

            updateUserRole(newRole).then(() => {
                updateUserProjects(newProjects).then(response => {
                    const result = JSON.parse(response.body);
                    if (result.success) {
                        console.info('Projects updated successfully');
                    } else {
                        console.warn(result.error);
                    }
                    this.props.callback();
                });
            });
        }
        this.setState({ shouldEdit: !this.state.shouldEdit, editThisUser: item.uuid });
    };

    handleProjectChange = projectSelected => {
        this.setState({
            selectedProjectOptions: projectSelected
        });
    };

    handleRoleChange = roleSelected => {
        if (this.props.user.userId === this.props.userData.uuid) {
            alert('A Project Admin can not change its own role');
            return;
        }
        this.setState({ roleValue: roleSelected });
    };

    extractRow = () => {
        const user = this.props.userData;
        let counter = 0;
        return (
            <>
                <td>{user.uuid}</td>
                <td>{user.email_address}</td>
                <td>{user.display_name}</td>
                <td>{user.auth_type}</td>
                <td>{user.email_valid === false ? 'false' : 'true'}</td>
                <td>
                    {user.role === 'System Admin' ? (
                        user.role
                    ) : (
                        <ReactSelect
                            key={'td_role_' + user.uuid}
                            value={this.state.roleValue}
                            isDisabled={!this.state.shouldEdit}
                            onChange={value => this.handleRoleChange(value)}
                            options={this.props.roleOptions}
                            components={{
                                RoleOption
                            }}
                        />
                    )}
                </td>
                <td>
                    {user.role === 'System Admin' ? (
                        'All projects Access'
                    ) : (
                        <ReactSelect
                            key={'rs_projects_' + user.uuid + counter++}
                            value={this.state.selectedProjectOptions}
                            isMulti
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            isDisabled={!(this.state.shouldEdit && this.state.editThisUser === user.uuid)}
                            placeholder={'Select projects'}
                            size="lg"
                            components={{
                                Option
                            }}
                            onChange={value => this.handleProjectChange(value)}
                            options={this.props.projects}
                            allowSelectAll={true}
                            //value={this.state.selectedProjectOptions}
                        />
                    )}
                </td>
                <td>
                    {user.role === 'System Admin' ? (
                        ''
                    ) : (
                        <div className="btn-group">
                            <Button
                                style={{ backgroundColor: '#0057B8', marginRight: '10px', borderRadius: '4px 4px 4px 4px' }}
                                onClick={() => {
                                    this.editUser(user);
                                }}
                            >
                                {this.state.shouldEdit && this.state.editThisUser === user['uuid'] ? 'Save' : <Icon icon={faPen} color="black" />}
                            </Button>

                            <Button
                                className="btn btn-danger"
                                style={{ borderRadius: '4px 4px 4px 4px' }}
                                onClick={() => {
                                    this.deleteUser(user);
                                }}
                            >
                                <Icon icon={faTrash} color={'black'} />
                            </Button>
                        </div>
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
