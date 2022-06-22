import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../Layout/Footer';
import { Collapse, Button } from 'reactstrap';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

class Faq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseUserRole: false
        };
    }

    componentWillMount() {}

    componentDidMount() {}

    toggleUserRole = () => {
        this.setState({ collapseUserRole: !this.state.collapseUserRole });
    };

    render() {
        const items = [
            {
                name: 'System Admin',
                role:
                    '· Read and write permission  on all ontologies\n' +
                    '\n' +
                    '· Can create/remove Projects\n' +
                    '\n' +
                    '· Add/remove all other users to projects\n' +
                    '\n' +
                    '· Can grant to another user Project Admin rights\n' +
                    '\n' +
                    '· Mark ontologies Public, or Not-Public'
            },
            {
                name: 'Project Admin',
                role:
                    '· Read and write permission  on project content\n' +
                    '\n' +
                    '· Can add and remove *Users to his projects\n' +
                    '\n' +
                    '· Mark ontologies Public, or Not-Public'
            },
            {
                name: 'Key User',
                role: '· Read permission on all project ontologies'
            },
            {
                name: 'Public User',
                role: '· Read permission on all public content'
            },
            {
                name: 'Member',
                role: '· Has read and write permission in his projects '
            }
        ];
        return (
            <div style={{ width: '100%', height: '85%', overflowY: 'scroll' }}>
                <div className="container">
                    <Button
                        style={{ width: '100% ', height: '45px', marginTop: '60px', textAlign: 'start', background: '#007bff' }}
                        className="btn"
                        onClick={this.toggleUserRole}
                    >
                        <Icon icon={!this.state.collapseUserRole ? faCaretRight : faCaretDown} style={{ marginRight: '5px' }} />
                        Definition of User Roles
                    </Button>
                    <Collapse isOpen={this.state.collapseUserRole}>
                        <table style={{ marginTop: '20px' }} className="table table-bordered ">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody style={{ whiteSpace: 'pre' }}>
                                {items?.map(item => (
                                    <tr key={item.id}>
                                        <td style={{ fontWeight: 600 }}>{item.name}</td>
                                        <td>{item.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Collapse>
                </div>
                <Footer />
            </div>
        );
    }
}

Faq.propTypes = {};

export default Faq;
