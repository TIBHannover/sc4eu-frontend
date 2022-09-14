import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import { Collapse, Button, Container } from 'reactstrap';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { PRIMARY, SECONDARY } from '../styledComponents/styledComponents';

export default class Faq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseUserRole: false,
            collapseIssueManagement: false,
            collapseWebProtege: false
        };
    }

    componentDidMount() {}

    toggleUserRole = () => {
        this.setState({ collapseUserRole: !this.state.collapseUserRole });
    };

    toggleIssueManagement = () => {
        this.setState({ collapseIssueManagement: !this.state.collapseIssueManagement });
    };

    toggleWebProtege = () => {
        this.setState({ collapseWebProtege: !this.state.collapseWebProtege });
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
            <div style={{ width: '100%', height: '100%', overflowY: 'auto', backgroundColor: PRIMARY.lighter }}>
                <Container
                    style={{
                        // border: '1px solid black',
                        borderTop: 'none',
                        overflow: 'auto',
                        position: 'relative',
                        backgroundColor: '#ffffff',
                        borderRadius: '10px 10px 10px 10px ',
                        height: '100%'
                    }}
                >
                    <Button
                        style={{ width: '100% ', height: '45px', marginTop: '60px', textAlign: 'start', background: SECONDARY.dark }}
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
                    <Button
                        style={{ width: '100% ', height: '45px', marginTop: '20px', textAlign: 'start', background: SECONDARY.dark }}
                        className="btn"
                        onClick={this.toggleIssueManagement}
                    >
                        <Icon icon={!this.state.collapseIssueManagement ? faCaretRight : faCaretDown} style={{ marginRight: '5px' }} />
                        Issue Management
                    </Button>
                    <Collapse isOpen={this.state.collapseIssueManagement}>
                        <p style={{ marginTop: '30px' }}>
                            If you face any problems with our portal, face any issues with our running system or if you have any further questions,
                            please get in contact with us via our issue management system that you will find here:
                            <a href="https://gitlab.com/TIBHannover/sc3-project/sc3-issue-management/-/issues">
                                https://gitlab.com/TIBHannover/sc3-project/sc3-issue-management/-/issues
                            </a>
                        </p>
                    </Collapse>
                    <Button
                        style={{ width: '100% ', height: '45px', marginTop: '20px', textAlign: 'start', background: SECONDARY.dark }}
                        className="btn"
                        onClick={this.toggleWebProtege}
                    >
                        <Icon icon={!this.state.collapseWebProtege ? faCaretRight : faCaretDown} style={{ marginRight: '5px' }} />
                        WebProtege
                    </Button>
                    <Collapse isOpen={this.state.collapseWebProtege}>
                        <p style={{ marginTop: '30px' }}>
                            WebProtege is a well-known tool for collaborative creation and modification of ontologies. So far, SC3 Platform
                            Visualization <a href="https://service.tib.eu/sc3/ontology"> ( https://service.tib.eu/sc3/ontology ) </a>
                            and WebProtege <a href="https://service.tib.eu/sc3/webprotege"> ( https://service.tib.eu/sc3/webprotege ) </a> are only
                            loosely coupled. Both have their own authentication solutions and data management systems. It is therefore not yet
                            possible to access WebProtege content directly from the Visualization tab. A workaround is to first work collaboratively
                            Web-protege. Then download the ontology from WebProtege and from there into the and from there into the visualization
                            tool. A more integrated solution is coming.
                        </p>
                    </Collapse>
                </Container>
                <Footer />
            </div>
        );
    }
}
