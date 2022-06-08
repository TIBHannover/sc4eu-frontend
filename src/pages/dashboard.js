import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { requestDashboard } from '../network/loginCalls';
import { getAllRoles } from '../network/UserProfileCalls';
import { getAllOntologies } from '../network/ontologyIndexing';
import DashboardItem from '../components/DashboardItem';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: undefined,
            userRoles: [],
            ontologies: []
        };
        this.parameterOrder = [];
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
            console.log('rolllllllllllllllles');
            console.log(roles);
            this.setState({ userRoles: roles });
        });

        //request ontologies
        getAllOntologies().then(ontologiesFromBackend => {
            const ontologyLabels = [];

            ontologiesFromBackend.forEach(ontology => {
                ontologyLabels.push({ value: ontology.name, label: ontology.name });
            });
            this.setState({ ontologies: ontologyLabels });
        });
    };

    extractHeaderInformation = input => {
        const parameterOrder = ['uuid', 'display_name', 'auth_type', 'email_valid'];
        // try to use predefined order
        const keys = Object.keys(input);

        const correctParamOrder = [];
        const missedParams = [];
        for (let i = 0; i < keys.length; i++) {
            const val = keys[i];
            const orderedIndex = parameterOrder.indexOf(val);
            if (orderedIndex !== -1) {
                correctParamOrder[orderedIndex] = val;
            } else {
                missedParams.push(val);
            }
        }

        const orderedArray = [].concat(correctParamOrder, missedParams);

        this.parameterOrder = orderedArray;
        return orderedArray.map((item, index) => {
            return <th key={'key_header' + index}>{item}</th>;
        });
    };

    dashBoardRowItem = () => {
        return this.state.users.map(rowItem => {
            return (
                <DashboardItem
                    key={'row_item' + rowItem['uuid']}
                    userData={rowItem}
                    roleOptions={this.state.userRoles}
                    ontologies={this.state.ontologies}
                    callback={this.getBackendData}
                    parameterOrder={this.parameterOrder}
                />
            );
        });
    };

    renderUserInformation = data => {
        // create a table
        // extract header information
        return (
            <table style={{ width: '100%' }}>
                <thead>
                    <tr>{this.extractHeaderInformation(data[0])}</tr>
                </thead>
                <tbody>{this.dashBoardRowItem()}</tbody>
            </table>
        );
    };

    renderDashboard = () => {
        if (this.state.users) {
            if (this.state.users.error) {
                return <h1>{this.state.users.error}</h1>;
            } else {
                return (
                    <div>
                        <h1>USER INFORMATION </h1>
                        {this.renderUserInformation(this.state.users)}
                    </div>
                );
            }
        }
    };

    render() {
        return (
            <Container>
                {this.state.loading && (
                    <div>
                        <h2 className="h5">
                            <span>
                                <Icon icon={faSpinner} spin />
                            </span>{' '}
                            Loading
                        </h2>
                    </div>
                )}
                {!this.state.loading && this.renderDashboard()}
            </Container>
        );
    }
}
