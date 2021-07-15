import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { requestDashboard } from '../network/loginCalls';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userWithAdminRoleExists: 'unknown',
            loading: true,
            data: undefined
        };

        this.parameterOrder = [];
    }

    componentDidMount = async () => {
        // request dashboard content from backend
        requestDashboard().then(data => {
            this.setState({ loading: false, data: data });
        });
    };

    extractHeaderInformation = input => {
        const parameterOrder = ['uuid', 'display_name', 'auth_type', 'email_valid'];
        // try to use predefined order
        const keys = Object.keys(input);
        console.log(keys);

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
        console.log(correctParamOrder);
        console.log(missedParams);

        const orderdArray = [].concat(correctParamOrder, missedParams);

        this.parameterOrder = orderdArray;
        return orderdArray.map((item, index) => {
            return <th key={'key_header' + index}>{item}</th>;
        });
    };

    extractBodyInformation = data => {
        return data.map((item, index) => {
            return <tr key={'row_item' + index}>{this.extractRow(data[index])}</tr>;
        });
    };

    extractRow = itemData => {
        return this.parameterOrder.map((selector, index) => {
            let res = itemData[selector];
            if (typeof res === 'boolean') {
                if (res) {
                    res = 'True';
                } else {
                    res = 'False';
                }
            }

            return <td key={'td_' + index}>{res}</td>;
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
                <tbody>{this.extractBodyInformation(data)}</tbody>
            </table>
        );
    };

    renderDashboard = () => {
        if (this.state.data) {
            if (this.state.data.error) {
                return <h1>{this.state.data.error}</h1>;
            } else {
                return (
                    <div>
                        <h1>USER INFORMATION </h1>
                        {this.renderUserInformation(this.state.data)}
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

                {!this.state.loading && <div>{this.renderDashboard()} </div>}
            </Container>
        );
    }
}
