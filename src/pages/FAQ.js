import React, { Component } from 'react';
import { Collapse, Button, Container, Table } from 'reactstrap';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { MAX_WIDTH } from '../styledComponents/styledComponents';
import styled from 'styled-components';
import { colorStyled } from '../styledComponents/styledColor';
import { fontStyled } from '../styledComponents/styledFont';

export default class Faq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseUserRole: false,
            collapseIssueManagement: false,
            collapseWebProtege: false
        };
    }

    componentDidMount() {
    }

    toggleUserRole = () => {
        this.setState(prevState => ({ collapseUserRole: !prevState.collapseUserRole }));
    };

    toggleIssueManagement = () => {
        this.setState(prevState => ({ collapseIssueManagement: !prevState.collapseIssueManagement }));
    };

    toggleWebProtege = () => {
        this.setState(prevState => ({ collapseWebProtege: !prevState.collapseWebProtege }));
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
                name: 'Public User',
                role: '· Read permission on all public content\n\n· Write ontologies in public Projects'
            },
            {
                name: 'Member',
                role: '· Has read and write permission in his projects '
            }
        ];
        return (
            <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                <FaqContainer>
                    <FaqButton className="btn" onClick={this.toggleUserRole}>
                        <Icon icon={!this.state.collapseUserRole ? faCaretRight : faCaretDown}
                              style={{ marginRight: '5px' }} />
                        Definition of User Roles
                    </FaqButton>
                    <Collapse isOpen={this.state.collapseUserRole}>
                        {items.map((item, id) => (
                            <RoleCard key={id}>
                                <RoleName>{item.name}</RoleName>
                                <RoleText>{item.role}</RoleText>
                            </RoleCard>
                        ))}{' '}
                    </Collapse>
                    <FaqButton className="btn" onClick={this.toggleIssueManagement}>
                        <Icon icon={!this.state.collapseIssueManagement ? faCaretRight : faCaretDown}
                              style={{ marginRight: '5px' }} />
                        Issue Management
                    </FaqButton>
                    <Collapse isOpen={this.state.collapseIssueManagement}>
                        <StyledText>
                            <span>
                                If you face any problems with our portal, face any issues with our running system or if you have any further
                                questions, please get in contact with us via our issue management system that you will find here :
                            </span>
                            <a
                                style={{ color: colorStyled.SECONDARY.link }}
                                target="_blank"
                                href="https://gitlab.com/TIBHannover/sc3-project/sc3-issue-management/-/issues"
                                rel="noreferrer"
                            >
                                SC4EU Issue Management
                            </a>
                        </StyledText>
                    </Collapse>
                    <FaqButton className="btn" onClick={this.toggleWebProtege}>
                        <Icon icon={!this.state.collapseWebProtege ? faCaretRight : faCaretDown}
                              style={{ marginRight: '5px' }} />
                        WebProtege
                    </FaqButton>
                    <Collapse isOpen={this.state.collapseWebProtege}>
                        <StyledText>
                            <span>
                                WebProtege is a well-known tool for collaborative creation and modification of ontologies. So far, SC4EU Ontology
                                Curation Curation Portal ({' '}
                            </span>
                            <a style={{ color: colorStyled.SECONDARY.link }} target="_blank"
                               href="https://service.tib.eu/sc3/" rel="noreferrer">
                                SC4EU Ontology Curation Portal
                            </a>
                            <span>) and WebProtege (</span>
                            <a
                                style={{ color: colorStyled.SECONDARY.link }}
                                target="_blank"
                                href="https://service.tib.eu/sc3/webprotege"
                                rel="noreferrer"
                            >
                                WebProtege
                            </a>
                            <span>
                                ) are only loosely coupled. Both have their own authentication solutions and data management systems. It is therefore
                                not yet possible to access WebProtege content directly from the Visualization tab. A workaround is to first work
                                collaboratively Web-protege. Then download the ontology from WebProtege and from there into the visualization tool. A
                                more integrated solution is coming.
                            </span>
                        </StyledText>
                    </Collapse>
                </FaqContainer>
            </div>
        );
    }
}

const StyledText = styled.p`
    color: ${colorStyled.TEXTCOLOR};
    text-align: justify;
    margin-top: 2%;
    font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};

    @media (max-width: ${MAX_WIDTH}) {
        font-size: ${fontStyled.fontSize.MobileViewNormalText};
    }
`;

const FaqButton = styled(Button)`
    width: 100%;
    margin-top: 16px;
    text-align: left;
    background: ${colorStyled.SECONDARY.dark};
    padding: 12px 16px;
    min-height: 48px;
    font-size: 16px;

    display: flex;
    align-items: center;

    @media (max-width: ${MAX_WIDTH}) {
        font-size: 14px;
        padding: 14px;
    }
`;

const FaqContainer = styled(Container)`
    background-color: #ffffff;
    border-radius: 10px;
    padding: 16px;
    height: auto;

    @media (max-width: ${MAX_WIDTH}) {
        padding: 12px;
    }
`;

const RoleCard = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
`;

const RoleName = styled.div`
    font-weight: 600;
    margin-bottom: 6px;
`;

const RoleText = styled.div`
    white-space: pre-line;
`;
