import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import { Collapse, Button, Container, Table } from 'reactstrap';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { PRIMARY, SECONDARY, TEXTCOLOR } from '../styledComponents/styledComponents';

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
            <div style={{ width: '100%', height: '100%', overflow: 'auto', backgroundColor: PRIMARY.lighter }}>
                <Container
                    style={{
                        // border: '1px solid black',
                        borderTop: 'none',
                        overflow: 'auto',
                        position: 'relative',
                        backgroundColor: '#ffffff',
                        borderRadius: '10px 10px 10px 10px ',
                        height: '90%'
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
                        <Table style={{ marginTop: '20px' }} bordered responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody style={{ whiteSpace: 'pre' }}>
                                {items?.map((item, id) => (
                                    <tr key={id}>
                                        <td style={{ fontWeight: 600, color: TEXTCOLOR }}>{item.name}</td>
                                        <td style={{ color: TEXTCOLOR }}>{item.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
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
                        <p style={{ marginTop: '30px', color: TEXTCOLOR }}>
                            If you face any problems with our portal, face any issues with our running system or if you have any further questions,
                            please get in contact with us via our issue management system that you will find here :&nbsp;
                            <a
                                style={{ color: SECONDARY.link }}
                                target="_blank"
                                href="https://gitlab.com/TIBHannover/sc3-project/sc3-issue-management/-/issues"
                                rel="noreferrer"
                            >
                                SC3 Issue Management
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
                        <p style={{ marginTop: '30px', color: TEXTCOLOR }}>
                            WebProtege is a well-known tool for collaborative creation and modification of ontologies. So far, SC3 Platform
                            Visualization ( &nbsp;
                            <a style={{ color: SECONDARY.link }} target="_blank" href="https://service.tib.eu/sc3/" rel="noreferrer">
                                SC3 Portal
                            </a>
                            &nbsp;) and WebProtege (&nbsp;
                            <a style={{ color: SECONDARY.link }} target="_blank" href="https://service.tib.eu/sc3/webprotege" rel="noreferrer">
                                WebProtege
                            </a>
                            &nbsp;) are only loosely coupled. Both have their own authentication solutions and data management systems. It is
                            therefore not yet possible to access WebProtege content directly from the Visualization tab. A workaround is to first work
                            collaboratively Web-protege. Then download the ontology from WebProtege and from there into the and from there into the
                            visualization tool. A more integrated solution is coming.
                        </p>
                    </Collapse>
                </Container>
                <Footer />
            </div>
        );
    }
}
