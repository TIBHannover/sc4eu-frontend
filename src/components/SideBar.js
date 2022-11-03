import React, { useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import 'react-modern-drawer/dist/index.css';
import {
    faAlignJustify,
    faBook,
    faBrain,
    faFile,
    faHome,
    faProjectDiagram,
    faQuestion,
    faShieldAlt,
    faStamp
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import ROUTES from 'constants/routes';
import { NavLink } from 'react-router-dom';
import { reverse } from 'named-urls';
import { SELECTED_ONTOLOGY_SESSION, SELECTED_PROJECT_SESSION } from '../constants/globalConstants';
import { PRIMARY, SECONDARY } from '../styledComponents/styledComponents';
import WebProtege from '../assets/images/webprotege.png';
import ontology from '../assets/images/Ontology.png';

const StyledText = styled.span`
    margin-left: 20px;
`;
const StyledLink = styled(NavLink)`
    width: 100%;
    height: 50px;
    display: inline-block;
    border-radius: 4px;
    padding: 15px;
    border: 1px;
    background: transparent;
    color: black;
    text-decoration: none;
    text-decoration: none !important;
    font-size: 16px;
    :hover {
        background-color: ${SECONDARY.dark};
        color: white;
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

    const ActiveStyle = {
        backgroundColor: SECONDARY.dark,
        color: 'white'
    };

    const IconStyle = {
        height: '17px',
        width: '17px'
    };

    return (
        <div style={{ background: PRIMARY.light }}>
            <StyledLink title="Open Home" exact activeStyle={ActiveStyle} to={ROUTES.HOME} size="lg">
                <Icon icon={faHome} style={IconStyle} />
                <StyledText>Home</StyledText>
            </StyledLink>
            <StyledHr />
            <div style={{ textAlign: 'center', fontSize: '14px' }}>
                <span>Management & Visualization</span>
            </div>
            <StyledLink title="Open Projects List" activeStyle={ActiveStyle} to={ROUTES.PROJECT}>
                <Icon icon={faFile} style={IconStyle} />
                <StyledText>Projects</StyledText>
            </StyledLink>
            {selectedProjectSession ? (
                <div>
                    <StyledLink
                        to={{
                            pathname: reverse(ROUTES.ONTOLOGY),
                            project: selectedProjectSession
                        }}
                        activeStyle={ActiveStyle}
                        title="Open Ontology List"
                    >
                        <img src={ontology} alt="ontology icon" style={IconStyle} />
                        <StyledText>Ontologies</StyledText>
                    </StyledLink>
                    {selectedOntologySession ? (
                        <div style={{ marginLeft: '30px' }}>
                            <StyledLink
                                title="Open Hybrid View"
                                to={{
                                    pathname: reverse(ROUTES.VIEW_ONTOLOGY, {
                                        ontologyId: selectedOntologySession.uuid
                                    }),
                                    project: selectedProjectSession,
                                    modeOfOperations: 'hybrid',
                                    ontologyName: selectedOntologySession.name
                                }}
                                onClick={() => selectModeOfOperation('hybrid')}
                                activeStyle={isActiveTab === 'hybrid' ? ActiveStyle : ''}
                            >
                                <Icon icon={faBrain} style={IconStyle} />
                                <StyledText>Hybrid</StyledText>
                            </StyledLink>
                            <StyledLink
                                title="Open Graph View"
                                to={{
                                    pathname: reverse(ROUTES.VIEW_ONTOLOGY, {
                                        ontologyId: selectedOntologySession.uuid
                                    }),
                                    modeOfOperations: 'graph'
                                }}
                                onClick={() => selectModeOfOperation('graph')}
                                activeStyle={isActiveTab === 'graph' ? ActiveStyle : ''}
                            >
                                <Icon icon={faProjectDiagram} style={IconStyle} />
                                <StyledText>Graph</StyledText>
                            </StyledLink>
                            <StyledLink
                                title="Open Text View"
                                to={{
                                    pathname: reverse(ROUTES.VIEW_ONTOLOGY, {
                                        ontologyId: selectedOntologySession.uuid
                                    }),
                                    modeOfOperations: 'text'
                                }}
                                onClick={() => selectModeOfOperation('text')}
                                activeStyle={isActiveTab === 'text' ? ActiveStyle : ''}
                            >
                                <Icon icon={faAlignJustify} style={IconStyle} />
                                <StyledText>Text</StyledText>
                            </StyledLink>
                        </div>
                    ) : null}
                </div>
            ) : null}
            <StyledHr />
            <div style={{ textAlign: 'center', fontSize: '14px' }}>
                <span>Editing & Documentation</span>
            </div>
            <StyledLink title="Open WebProtege" activeStyle={ActiveStyle} to={ROUTES.WEBPROTEGE}>
                <img src={WebProtege} alt="WebProtege icon" style={IconStyle} />
                <StyledText>WebProtege</StyledText>
            </StyledLink>
            <StyledLink title="Open Documentation" activeStyle={ActiveStyle} to={ROUTES.Documentations}>
                <Icon icon={faBook} style={IconStyle} />
                <StyledText>Documentation</StyledText>
            </StyledLink>
            <StyledLink title="Open FAQ" activeStyle={ActiveStyle} to={ROUTES.FAQ}>
                <Icon icon={faQuestion} style={IconStyle} />
                <StyledText>FAQ</StyledText>
            </StyledLink>
            <StyledHr />
            <div style={{ textAlign: 'center', fontSize: '14px' }}>
                <span>General & About</span>
            </div>
            <StyledLink title="Open Data Policy" activeStyle={ActiveStyle} to={ROUTES.Dataprotections}>
                <Icon icon={faShieldAlt} style={IconStyle} />
                <StyledText>Data Policy</StyledText>
            </StyledLink>
            <StyledLink title="Open Imprint" activeStyle={ActiveStyle} to={ROUTES.Imprint}>
                <Icon icon={faStamp} style={IconStyle} />
                <StyledText>Imprint</StyledText>
            </StyledLink>
        </div>
    );
};

export default SideBar;
