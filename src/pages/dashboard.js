import React, { Component } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { requestDashboard } from '../network/loginCalls';
import { getAllRoles } from '../network/UserProfileCalls';
import DashboardItem from '../components/DashboardItem';
import DashboardProjects from '../components/DashboardProjects';
import { getAllProjects } from '../network/projectIndexing';
import { Col, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: undefined,
            userRoles: [],
            ontologies: [],
            projects: [],
            activeTab: '1'
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

    renderUserDashboard = () => {
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
                                        {/*<th>UUID</th>*/}
                                        <th>Name</th>
                                        <th>Email</th>
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

    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
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
                <Nav tabs style={{ alignContent: 'center', fontStyle: 'normal' }}>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => {
                                this.toggle('1');
                            }}
                        >
                            Projects
                        </NavLink>
                    </NavItem>
                    <NavItem hidden={this.props.user && this.props.user.role.toLowerCase() !== 'System ADMIN'.toLowerCase()}>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => {
                                this.toggle('2');
                            }}
                        >
                            Users
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <DashboardProjects currentUser={this.props.user} />
                    </TabPane>
                    <TabPane tabId="2">
                        <div style={{ marginLeft: '1%', marginRight: '1%' }}>{!this.state.loading && this.renderUserDashboard()}</div>
                    </TabPane>
                </TabContent>

                {/*<div style={{ marginLeft: '1%', marginRight: '1%' }}>{!this.state.loading && this.renderDashboard()}</div>*/}
            </div>
        );
    }
}

Dashboard.propTypes = {
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default compose(connect(mapStateToProps))(Dashboard);
