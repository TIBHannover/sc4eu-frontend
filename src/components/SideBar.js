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
import { CLEAR_SESSION } from '../constants/globalConstants';

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
    font-size: 20px;
    :hover {
        background-color: #90c8ac;
        color: black;
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
    const selectedOntologyIdSession = sessionStorage.getItem('selectedOntologyIdSession');
    const selectedOntologyNameSession = sessionStorage.getItem('selectedOntologyNameSession');
    const selectedProjectSession = JSON.parse(sessionStorage.getItem('selectedProjectSession'));
    const [isActiveTab, setIsActiveTab] = useState('hybrid');

    const handleClick = () => {};

    const selectModeOfOperation = val => {
        setIsActiveTab(val);
    };

    const onclickBackToProjectList = () => {
        CLEAR_SESSION();
        if (selectedProjectSession) {
            sessionStorage.setItem('selectedProject', JSON.stringify(false));
        }
    };

    return (
        <div style={{ background: '#5f7c9d' }}>
            <StyledLink exact activeStyle={{ backgroundColor: '#90c8ac' }} to={ROUTES.HOME} onClick={handleClick} size="lg">
                <Icon icon={faHome} />
                <StyledText>Home</StyledText>
            </StyledLink>
            <StyledHr />
            <StyledText>Management & Visualization</StyledText>
            <StyledLink
                activeStyle={{ backgroundColor: '#90c8ac' }}
                style={{ backgroundColor: selectedProjectSession ? '#90c8ac' : null, color: selectedProjectSession ? 'black' : '' }}
                to={ROUTES.ONTOLOGY}
                onClick={onclickBackToProjectList}
            >
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
                        style={{
                            backgroundColor: selectedProjectSession ? '#90c8ac' : null,
                            color: selectedProjectSession ? 'black' : '',
                            marginTop: '5px',
                            marginBottom: '5px'
                        }}
                        size="lg"
                        title="Open Manu"
                    >
                        <Icon icon={faHome} />
                        <StyledText>Ontologies</StyledText>
                    </StyledLink>
                    {selectedOntologyIdSession ? (
                        <div style={{ marginLeft: '30px' }}>
                            <StyledLink
                                to={{
                                    pathname: reverse(ROUTES.VIEW_ONTOLOGY, {
                                        ontologyId: selectedOntologyIdSession
                                    }),
                                    project: selectedProjectSession,
                                    modeOfOperations: 'hybrid',
                                    ontologyName: selectedOntologyNameSession
                                }}
                                onClick={() => selectModeOfOperation('hybrid')}
                                style={{
                                    backgroundColor: isActiveTab === 'hybrid' ? '#90c8ac' : null,
                                    color: isActiveTab === 'hybrid' ? 'black' : ''
                                }}
                            >
                                <Icon icon={faBrain} />
                                <StyledText>Hybrid</StyledText>
                            </StyledLink>
                            <StyledLink
                                to={{
                                    pathname: reverse(ROUTES.VIEW_ONTOLOGY, {
                                        ontologyId: selectedOntologyIdSession
                                    }),
                                    modeOfOperations: 'graph'
                                }}
                                onClick={() => selectModeOfOperation('graph')}
                                style={{
                                    backgroundColor: isActiveTab === 'graph' ? '#90c8ac' : null,
                                    color: isActiveTab === 'graph' ? 'black' : ''
                                }}
                            >
                                <Icon icon={faProjectDiagram} />
                                <StyledText>Graph</StyledText>
                            </StyledLink>
                            <StyledLink
                                to={{
                                    pathname: reverse(ROUTES.VIEW_ONTOLOGY, {
                                        ontologyId: selectedOntologyIdSession
                                    }),
                                    modeOfOperations: 'text'
                                }}
                                onClick={() => selectModeOfOperation('text')}
                                style={{
                                    backgroundColor: isActiveTab === 'text' ? '#90c8ac' : null,
                                    color: isActiveTab === 'text' ? 'black' : ''
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
            <StyledLink activeStyle={{ backgroundColor: '#90c8ac' }} to={ROUTES.WEBPROTEGE} onClick={handleClick}>
                <Icon icon={faHome} />
                <StyledText>WebProtege</StyledText>
            </StyledLink>
            <StyledLink activeStyle={{ backgroundColor: '#90c8ac' }} to={ROUTES.Documentations} onClick={handleClick}>
                <Icon icon={faBook} />
                <StyledText>Documentation</StyledText>
            </StyledLink>
            <StyledHr />
            <StyledText>General & About</StyledText>
            <StyledLink activeStyle={{ backgroundColor: '#90c8ac' }} to={ROUTES.Dataprotections} onClick={handleClick}>
                <Icon icon={faShieldAlt} />
                <StyledText>Data Policy</StyledText>
            </StyledLink>
            <StyledLink activeStyle={{ backgroundColor: '#90c8ac' }} to={ROUTES.Imprint} onClick={handleClick}>
                <Icon icon={faStamp} />
                <StyledText>Imprint</StyledText>
            </StyledLink>
            <StyledLink activeStyle={{ backgroundColor: '#90c8ac' }} to={ROUTES.FAQ} onClick={handleClick}>
                <Icon icon={faQuestion} />
                <StyledText>FAQ</StyledText>
            </StyledLink>
        </div>
    );
};

export default SideBar;
