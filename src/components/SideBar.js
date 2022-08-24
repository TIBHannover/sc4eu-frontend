import React from 'react';

// import component 👇
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

//import styles 👇
import 'react-modern-drawer/dist/index.css';
import { faHome, faBook, faQuestion, faAlignJustify, faBrain, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import ROUTES from 'constants/routes';
import { NavLink } from 'react-router-dom';

const StyledText = styled.text`
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

const StyledButton = styled(Button)`
    width: 100%;
    height: 50px;
    text-align: left;
    text-color: black;
    font-size: 20px;
    color: black;
    background-color: transparent;
    border: none;
    :hover {
        background-color: #90c8ac;
        color: black;
        text-color: black;
    }
`;

const SideBar = () => {
    return (
        <div style={{ background: '#5f7c9d' }}>
            <StyledLink exact activeStyle={{ backgroundColor: '#90c8ac' }} to={ROUTES.HOME} size="lg" activeClassName="active">
                <Icon icon={faHome} />
                <StyledText>Home</StyledText>
            </StyledLink>
            <StyledHr />
            <StyledText>Management & Visualization</StyledText>
            <StyledLink activeStyle={{ backgroundColor: '#90c8ac' }} to={ROUTES.ONTOLOGY}>
                <Icon icon={faHome} />
                <StyledText>Projects</StyledText>
            </StyledLink>
            <div style={{ marginLeft: '30px' }}>
                <StyledLink to={''} size="lg" title="Open Manu">
                    <Icon icon={faHome} />
                    <StyledText>Ontologies</StyledText>
                </StyledLink>
                <div style={{ marginLeft: '30px' }}>
                    <StyledButton size="lg" title="Open Manu">
                        <Icon icon={faBrain} />
                        <StyledText>Hybrid</StyledText>
                    </StyledButton>
                    <StyledButton size="lg" title="Open Manu">
                        <Icon icon={faProjectDiagram} />
                        <StyledText>Graph</StyledText>
                    </StyledButton>
                    <StyledButton size="lg" title="Open Manu">
                        <Icon icon={faAlignJustify} />
                        <StyledText>Text</StyledText>
                    </StyledButton>
                </div>
            </div>
            <StyledHr />
            <StyledText>Editing & Documentation</StyledText>
            <StyledLink activeStyle={{ backgroundColor: '#90c8ac' }} to={ROUTES.WEBPROTEGE}>
                <Icon icon={faHome} />
                <StyledText>WebProtege</StyledText>
            </StyledLink>
            <StyledLink activeStyle={{ backgroundColor: '#90c8ac' }} to={ROUTES.Documentations}>
                <Icon icon={faBook} />
                <StyledText>Documentation</StyledText>
            </StyledLink>
            <StyledHr />
            <StyledText>General & About</StyledText>

            <StyledLink activeStyle={{ backgroundColor: '#90c8ac' }} to={ROUTES.Dataprotections}>
                <Icon icon={faHome} />
                <StyledText>Data Policy</StyledText>
            </StyledLink>

            <StyledLink activeStyle={{ backgroundColor: '#90c8ac' }} to={ROUTES.Imprint}>
                <Icon icon={faHome} />
                <StyledText>Imprint</StyledText>
            </StyledLink>

            <StyledLink activeStyle={{ backgroundColor: '#90c8ac' }} to={ROUTES.FAQ}>
                <Icon icon={faQuestion} />
                <StyledText>FAQ</StyledText>
            </StyledLink>
        </div>
    );
};

export default SideBar;
