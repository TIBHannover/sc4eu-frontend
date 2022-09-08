import React, { useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import 'react-modern-drawer/dist/index.css';
import {
    faHome,
    faBook,
    faQuestion,
    faAlignJustify,
    faBrain,
    faProjectDiagram,
    faFile,
    faStamp,
    faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import ROUTES from 'constants/routes';
import { NavLink } from 'react-router-dom';
import { reverse } from 'named-urls';
import { SELECTED_ONTOLOGY_SESSION, SELECTED_PROJECT_LIST_TAB_SESSION, SELECTED_PROJECT_SESSION } from '../constants/globalConstants';
import { PRIMARY, SECONDARY } from '../styledComponents/styledComponents';

const StyledText = styled.span`
    margin-left: 20px;
`;
const StyledLink = styled(NavLink)`
    width: 100%;
    height: 50px;
    display: inline-block;
    border-radius: 4px;
    padding: 10px;
    border: 1px;
    background: transparent;
    color: black;
    text-decoration: none;
    text-decoration: none !important;
    font-size: 16px;
    :hover {
        background-color: ${SECONDARY.dark};
        color: white;
        text-color: black;
        padding: 11px;
    }
`;

const StyledHr = styled.hr`
    margin: 0rem;
    color: black;
    height: 0.02rem;
`;

const SideBar = () => {
    const selectedProjectSession = JSON.parse(sessionStorage.getItem(SELECTED_PROJECT_SESSION));
    const selectedOntologySession = JSON.parse(sessionStorage.getItem(SELECTED_ONTOLOGY_SESSION));
    const [isActiveTab, setIsActiveTab] = useState('hybrid');

    const selectModeOfOperation = val => {
        setIsActiveTab(val);
    };
    const onClickProjectTab = () => {
        sessionStorage.setItem(SELECTED_PROJECT_LIST_TAB_SESSION, 'true');
        setIsActiveTab('');
    };
    const onClickOntologyTab = () => {
        sessionStorage.setItem(SELECTED_PROJECT_LIST_TAB_SESSION, 'false');
        setIsActiveTab('');
    };

    return (
        <div style={{ background: PRIMARY.light }}>
            <StyledLink exact activeStyle={{ backgroundColor: SECONDARY.dark, color: '#ffffff' }} to={ROUTES.HOME} size="lg">
                <Icon icon={faHome} />
                <StyledText>Home</StyledText>
            </StyledLink>
            <StyledHr />
            <StyledText style={{ fontSize: '14px' }}>Management & Visualization</StyledText>
            <StyledLink activeStyle={{ backgroundColor: SECONDARY.dark, color: '#ffffff' }} to={ROUTES.ONTOLOGY} onClick={onClickProjectTab}>
                <Icon icon={faFile} />
                <StyledText>Projects</StyledText>
            </StyledLink>
            {selectedProjectSession ? (
                <div>
                    <StyledLink
                        to={{
                            pathname: reverse(ROUTES.ONTOLOGY),
                            project: selectedProjectSession
                        }}
                        onClick={onClickOntologyTab}
                        style={{
                            backgroundColor: selectedProjectSession ? SECONDARY.dark : null,
                            color: selectedProjectSession ? 'white' : null,
                            marginTop: '5px',
                            marginBottom: '5px'
                        }}
                        size="lg"
                        title="Open Manu"
                    >
                        <Icon icon={faHome} />
                        <StyledText>Ontologies</StyledText>
                    </StyledLink>
                    {selectedOntologySession ? (
                        <div style={{ marginLeft: '30px' }}>
                            <StyledLink
                                to={{
                                    pathname: reverse(ROUTES.VIEW_ONTOLOGY, {
                                        ontologyId: selectedOntologySession.uuid
                                    }),
                                    project: selectedProjectSession,
                                    modeOfOperations: 'hybrid',
                                    ontologyName: selectedOntologySession.name
                                }}
                                onClick={() => selectModeOfOperation('hybrid')}
                                style={{
                                    backgroundColor: isActiveTab === 'hybrid' ? SECONDARY.dark : null,
                                    color: isActiveTab === 'hybrid' ? 'white' : null
                                }}
                            >
                                <Icon icon={faBrain} />
                                <StyledText>Hybrid</StyledText>
                            </StyledLink>
                            <StyledLink
                                to={{
                                    pathname: reverse(ROUTES.VIEW_ONTOLOGY, {
                                        ontologyId: selectedOntologySession.uuid
                                    }),
                                    modeOfOperations: 'graph'
                                }}
                                onClick={() => selectModeOfOperation('graph')}
                                style={{
                                    backgroundColor: isActiveTab === 'graph' ? SECONDARY.dark : null,
                                    color: isActiveTab === 'graph' ? 'white' : null
                                }}
                            >
                                <Icon icon={faProjectDiagram} />
                                <StyledText>Graph</StyledText>
                            </StyledLink>
                            <StyledLink
                                to={{
                                    pathname: reverse(ROUTES.VIEW_ONTOLOGY, {
                                        ontologyId: selectedOntologySession.uuid
                                    }),
                                    modeOfOperations: 'text'
                                }}
                                onClick={() => selectModeOfOperation('text')}
                                style={{
                                    backgroundColor: isActiveTab === 'text' ? SECONDARY.dark : null,
                                    color: isActiveTab === 'text' ? 'white' : null
                                }}
                            >
                                <Icon icon={faAlignJustify} />
                                <StyledText>Text</StyledText>
                            </StyledLink>
                        </div>
                    ) : null}
                </div>
            ) : null}
            <StyledHr />
            <StyledText>Editing & Documentation</StyledText>
            <StyledLink activeStyle={{ backgroundColor: SECONDARY.dark, color: '#ffffff' }} to={ROUTES.WEBPROTEGE}>
                <Icon icon={faHome} />
                <StyledText>WebProtege</StyledText>
            </StyledLink>
            <StyledLink activeStyle={{ backgroundColor: SECONDARY.dark, color: '#ffffff' }} to={ROUTES.Documentations}>
                <Icon icon={faBook} />
                <StyledText>Documentation</StyledText>
            </StyledLink>
            <StyledHr />
            <StyledText>General & About</StyledText>
            <StyledLink activeStyle={{ backgroundColor: SECONDARY.dark, color: '#ffffff' }} to={ROUTES.Dataprotections}>
                <Icon icon={faShieldAlt} />
                <StyledText>Data Policy</StyledText>
            </StyledLink>
            <StyledLink activeStyle={{ backgroundColor: SECONDARY.dark, color: '#ffffff' }} to={ROUTES.Imprint}>
                <Icon icon={faStamp} />
                <StyledText>Imprint</StyledText>
            </StyledLink>
            <StyledLink activeStyle={{ backgroundColor: SECONDARY.dark, color: '#ffffff' }} to={ROUTES.FAQ}>
                <Icon icon={faQuestion} />
                <StyledText>FAQ</StyledText>
            </StyledLink>
        </div>
    );
};

export default SideBar;
