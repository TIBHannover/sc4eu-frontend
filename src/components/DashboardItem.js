import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { components, default as ReactSelect } from 'react-select';
import { deleteUser, updateUserRole } from '../network/UserProfileCalls';
import PropTypes from 'prop-types';

const Option = props => {
    return (
        <div>
            <components.Option {...props}>
                <input type="checkbox" checked={props.isSelected} onChange={() => null} /> <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

Option.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired
};

export default class DashboardItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: undefined,
            ontologies: [],
            userDeleted: false,
            roleValue: '',
            toggleEdit: false,
            optionSelected: null
        };
    }

    deleteUser = item => {
        const userInfo = this.getUser(item);
        const user_role = userInfo[5];
        const user_uuid = userInfo[0];
        console.log('Delete this user ', userInfo);

        const isConfirmed = window.confirm('Are you sure you want to delete ' + userInfo[1]);
        if (isConfirmed) {
            if (user_role === 'System Admin') {
                alert('Not allowed to delete System Admin');
                return;
            } else {
                //Delete User
                deleteUser(user_uuid).then(data => {
                    // TODO: return all users from the deleteUser, so we don't have to call reqeustDashboard.
                    this.props.callback();
                });
            }
        }
    };

    editUser = item => {
        if (this.state.toggleEdit) {
            //TODO UpdateUserRole in the database
            //TODO Update the list of ontologies this user is part of
            //TODO call the callback
            const foundIndex = this.props.roleOptions.findIndex(item => item.role === this.state.roleValue);

            const newRole = {
                user_id: item.uuid,
                user_role: this.props.roleOptions[foundIndex]
            };
            updateUserRole(newRole).then(() => {
                this.props.callback();
            });
        }
        this.setState({ toggleEdit: !this.state.toggleEdit, editThisUser: item.uuid, roleValue: 'Fawad' });
    };

    getUser = itemData => {
        return this.props.parameterOrder.map((selector, index) => {
            let res = itemData[selector];
            if (typeof res === 'boolean') {
                if (res) {
                    res = 'True';
                } else {
                    res = 'False';
                }
            }

            return res;
        });
    };

    handleChange = selected => {
        this.setState({
            optionSelected: selected
        });
    };

    handleRoleChange = event => {
        this.setState({ roleValue: event.target.value });
    };

    extractRow = itemData => {
        const row = this.props.parameterOrder.map((selector, index) => {
            let res = itemData[selector];
            if (typeof res === 'boolean') {
                if (res) {
                    res = 'True';
                } else {
                    res = 'False';
                }
            }

            if (selector === 'role' && res !== 'System Admin' && this.state.toggleEdit && this.state.editThisUser === itemData['uuid']) {
                return (
                    <td key={'td_' + index}>
                        <select //TODO change this with ReactSelect
                            defaultValue={res}
                            //value={this.state.roleValue}
                            onChange={event => {
                                this.handleRoleChange(event);
                            }}
                        >
                            {this.props.roleOptions.map(item => (
                                <option key={'option_' + item.role} value={item.role ?? ''}>
                                    {item.role}
                                </option>
                            ))}
                        </select>
                    </td>
                );
            }
            return <td key={'td_' + index}>{res}</td>;
        });
        return row;
    };

    extractRowItem = () => {
        const data = this.props.userData;
        return (
            <tr key={'row_item' + data['uuid']}>
                {this.extractRow(data)}
                {data['role'] === 'System Admin' ? (
                    <td />
                ) : (
                    <>
                        {
                            <td key={'td_' + data['uuid']}>
                                <span
                                    className="d-inline-block"
                                    data-toggle="popover"
                                    data-trigger="focus"
                                    data-content="Please select ontologies"
                                    width="100px"
                                >
                                    <ReactSelect
                                        key={'td_' + data['uuid']}
                                        defaultValue={this.state.optionSelected}
                                        options={this.props.ontologies}
                                        isMulti
                                        closeMenuOnSelect={false}
                                        hideSelectedOptions={false}
                                        isDisabled={!(this.state.toggleEdit && this.state.editThisUser === data['uuid'])}
                                        placeholder={'Select ontologies'}
                                        size="lg"
                                        components={{
                                            Option
                                        }}
                                        onChange={this.handleChange}
                                        allowSelectAll={true}
                                        //value={this.state.optionSelected}
                                    />
                                </span>
                            </td>
                        }
                        <td>
                            <Button
                                onClick={() => {
                                    this.editUser(data);
                                }}
                            >
                                {this.state.toggleEdit && this.state.editThisUser === data['uuid'] ? 'Save' : 'Edit'}
                            </Button>
                        </td>
                        <td>
                            <Button
                                onClick={() => {
                                    this.deleteUser(data);
                                }}
                            >
                                Delete
                            </Button>
                        </td>
                    </>
                )}
            </tr>
        );
    };

    render() {
        return this.extractRowItem();
    }
}

DashboardItem.propTypes = {
    ontologies: PropTypes.array.isRequired,
    userData: PropTypes.object.isRequired,
    roleOptions: PropTypes.array.isRequired,
    callback: PropTypes.func.isRequired,
    parameterOrder: PropTypes.array.isRequired
};
