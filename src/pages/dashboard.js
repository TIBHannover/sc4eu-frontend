import React, { Component } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { requestDashboard } from '../network/loginCalls';
import { getAllRoles } from '../network/UserProfileCalls';
import DashboardItem from '../components/DashboardItem';
import { getAllProjects } from '../network/projectIndexing';
import { Table } from 'reactstrap';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: undefined,
            userRoles: [],
            ontologies: [],
            projects: []
        };
    }

    componentDidMount = async () => {
        this.getBackendData();
    };

    getBackendData = () => {
        // request dashboard content from Users
        requestDashboard().then(userFromBackend => {
            this.setState({ loading: false, users: userFromBackend });
        });

        //request user roles
        getAllRoles().then(roles => {
            const roleLabels = [];
            roles.forEach(role => {
                roleLabels.push({ value: role.role, label: role.role, roleId: role.role_id });
            });
            this.setState({ userRoles: roleLabels });
        });

        //request ontologies
        // getAllOntologies().then(ontologiesFromBackend => {
        //     const ontologyLabels = [];
        //     console.log(ontologiesFromBackend);
        //     ontologiesFromBackend.forEach(ontology => {
        //         ontologyLabels.push({ value: ontology.name, label: ontology.name });
        //     });
        //     this.setState({ ontologies: ontologyLabels });
        // });

        //request projects
        getAllProjects().then(getProjectsFromBackend => {
            const projectsLabels = [];

            getProjectsFromBackend.forEach(project => {
                projectsLabels.push({ value: project.name, label: project.name, projectUUID: project.uuid });
            });
            this.setState({ projects: projectsLabels });
        });
    };

    dashBoardRowItem = () => {
        return this.state.users.map(rowItem => {
            return (
                <DashboardItem
                    key={'row_item' + rowItem['uuid']}
                    userData={rowItem}
                    roleOptions={this.state.userRoles}
                    projects={this.state.projects}
                    callback={this.getBackendData}
                />
            );
        });
    };

    renderDashboard = () => {
        if (this.state.users) {
            if (this.state.users.error) {
                return <h1>{this.state.users.error}</h1>;
            } else {
                return (
                    <div>
                        <h1 style={{ textAlign: 'center', fontStyle: 'normal', padding: '20px 0px 20px 0px' }}>USER INFORMATION </h1>
                        <div style={{ textAlign: 'center', fontStyle: 'normal' }}>
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th>UUID</th>
                                        <th>Email</th>
                                        <th>Name</th>
                                        <th>Auth Type</th>
                                        <th>Verified User</th>
                                        <th>Role</th>
                                        <th>User Project</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>{this.dashBoardRowItem()}</tbody>
                            </Table>
                        </div>
                    </div>
                );
            }
        }
    };

    render() {
        return (
            <div style={{ height: '100%', width: '100%', overflow: 'auto' }}>
                {this.state.loading && (
                    <div>
                        <h2 className="h5" style={{ textAlign: 'center', fontStyle: 'normal' }}>
                            <span>
                                <Icon icon={faSpinner} spin />
                            </span>{' '}
                            Loading
                        </h2>
                    </div>
                )}
                <div style={{ marginLeft: '10%', marginRight: '10%' }}>{!this.state.loading && this.renderDashboard()}</div>
            </div>
        );
    }
}
