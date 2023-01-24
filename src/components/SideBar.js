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
import { MAX_WIDTH, PRIMARY, SECONDARY } from '../styledComponents/styledComponents';
import WebProtege from '../assets/images/webprotege.png';
import ontology from '../assets/images/Ontology.png';

const StyledText = styled.span`
    margin-left: 20px;

    @media (max-width: ${MAX_WIDTH}) {
        margin-left: 5px;
    }
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

    @media (max-width: ${MAX_WIDTH}) {
        height: 30px;
        padding: 7px;
        font-size: 12px;
    }
`;

const StyledHr = styled.hr`
    margin: 0rem;
    color: black;
    height: 0.02rem;
`;

const StyledIcon = styled(Icon)`
    font-size: 17px;

    @media (max-width: ${MAX_WIDTH}) {
        font-size: 10px;
    }
`;

const StyledImage = styled.img`
    height: 17px;
    width: 17px;

    @media (max-width: ${MAX_WIDTH}) {
        height: 10px;
        width: 10px;
    }
`;

const StyledHeadingDiv = styled.div`
    text-align: center;
    font-size: 14px;

    @media (max-width: ${MAX_WIDTH}) {
        font-size: 10px;
    }
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

    return (
        <div style={{ background: PRIMARY.light }}>
            <StyledLink title="Open Home" exact activeStyle={ActiveStyle} to={ROUTES.HOME} size="lg">
                <StyledIcon icon={faHome} />
                <StyledText>Home</StyledText>
            </StyledLink>
            <StyledHr />
            <StyledHeadingDiv>
                <span>Management & Visualization</span>
            </StyledHeadingDiv>
            <StyledLink title="Open Projects List" activeStyle={ActiveStyle} to={ROUTES.PROJECT}>
                <StyledIcon icon={faFile} />
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
                        <StyledImage src={ontology} alt="ontology icon" />
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
                                activeStyle={isActiveTab === 'hybrid' ? ActiveStyle : {}}
                            >
                                <StyledIcon icon={faBrain} />
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
                                activeStyle={isActiveTab === 'graph' ? ActiveStyle : {}}
                            >
                                <StyledIcon icon={faProjectDiagram} />
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
                                activeStyle={isActiveTab === 'text' ? ActiveStyle : {}}
                            >
                                <StyledIcon icon={faAlignJustify} />
                                <StyledText>Text</StyledText>
                            </StyledLink>
                        </div>
                    ) : null}
                </div>
            ) : null}
            <StyledHr />
            <StyledHeadingDiv>
                <span>Editing & Documentation</span>
            </StyledHeadingDiv>
            <StyledLink title="Open WebProtege" activeStyle={ActiveStyle} to={ROUTES.WEBPROTEGE}>
                <StyledImage src={WebProtege} alt="WebProtege icon" />
                <StyledText>WebProtege</StyledText>
            </StyledLink>
            <StyledLink title="Open Documentation" activeStyle={ActiveStyle} to={ROUTES.Documentations}>
                <StyledIcon icon={faBook} />
                <StyledText>Documentation</StyledText>
            </StyledLink>
            <StyledLink title="Open FAQ" activeStyle={ActiveStyle} to={ROUTES.FAQ}>
                <StyledIcon icon={faQuestion} />
                <StyledText>FAQ</StyledText>
            </StyledLink>
            <StyledHr />
            <StyledHeadingDiv>
                <span>General & About</span>
            </StyledHeadingDiv>
            <StyledLink title="Open Data Policy" activeStyle={ActiveStyle} to={ROUTES.Dataprotections}>
                <StyledIcon icon={faShieldAlt} />
                <StyledText>Data Policy</StyledText>
            </StyledLink>
            <StyledLink title="Open Imprint" activeStyle={ActiveStyle} to={ROUTES.Imprint}>
                <StyledIcon icon={faStamp} />
                <StyledText>Imprint</StyledText>
            </StyledLink>
        </div>
    );
};

export default SideBar;
