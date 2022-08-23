import React from 'react';

// import component 👇
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

//import styles 👇
import 'react-modern-drawer/dist/index.css';
import { faHome, faBook, faQuestion, faAlignJustify, faBrain, faProjectDiagram, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import ROUTES from 'constants/routes';
import { Link } from 'react-router-dom';
import { redux_navigateOntologyView } from '../redux/actions/rrm_actions';
import { useDispatch, useSelector } from 'react-redux';

const StyledText = styled.text`
    margin-left: 20px;
`;
const StyledLink = styled(Link)`
    margin-left: 20px;
    color: black;
    width: 100vw;
    height: 100vh;
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
    color: black;
    background-color: transparent;
    border: none;
    :hover {
        background-color: #90c8ac;
    }
`;

const SideBar = () => {
    const modeOfOperations = useSelector(state => state.ResourceRelationModelReducer.modeOfOperation);
    const [isOntologyVisible, setIsOntologyVisible] = React.useState(false);
    const [isModeOfOperationVisible, setIsModeOfOperationVisible] = React.useState(false);

    const counter = useDispatch();

    const selectModeOfOperation = val => {
        counter(redux_navigateOntologyView(val));
    };

    return (
        <div style={{ background: '#5f7c9d' }}>
            <StyledButton size="lg" title="Go Home">
                <Icon icon={faHome} />
                <StyledLink to={ROUTES.HOME}>Home</StyledLink>
            </StyledButton>
            <StyledHr />
            <StyledText>Management & Visualization</StyledText>
            <StyledButton size="lg" title="Open Manu">
                <Icon icon={faHome} />
                <StyledLink to={ROUTES.VIEW_MANAGEMENT}>Projects</StyledLink>
            </StyledButton>
            {isOntologyVisible === false ? (
                <div style={{ marginLeft: '30px' }}>
                    <StyledButton size="lg" title="Open Manu">
                        <Icon icon={faHome} />
                        <StyledText>Ontologies</StyledText>
                    </StyledButton>
                    {isModeOfOperationVisible === false ? (
                        <div style={{ marginLeft: '30px' }}>
                            <StyledButton style={{ backgroundColor: modeOfOperations === 'hybrid' ? '#90c8ac' : null }} size="lg" title="Open Manu">
                                <Icon icon={faBrain} />
                                <StyledLink onClick={() => selectModeOfOperation('hybrid')}>Hybrid</StyledLink>
                            </StyledButton>
                            <StyledButton style={{ backgroundColor: modeOfOperations === 'graph' ? '#90c8ac' : null }} size="lg" title="Open Manu">
                                <Icon icon={faProjectDiagram} />
                                <StyledLink onClick={() => selectModeOfOperation('graph')}>Graph</StyledLink>
                            </StyledButton>
                            <StyledButton style={{ backgroundColor: modeOfOperations === 'text' ? '#90c8ac' : null }} size="lg" title="Open Manu">
                                <Icon icon={faAlignJustify} />
                                <StyledLink onClick={() => selectModeOfOperation('text')}>Text</StyledLink>
                            </StyledButton>
                        </div>
                    ) : null}
                </div>
            ) : null}
            <StyledHr />
            <StyledText>Editing & Documentation</StyledText>
            <StyledButton size="lg" title="Open Manu">
                <Icon icon={faHome} />
                <StyledLink to={ROUTES.WEBPROTEGE}>WebProtege</StyledLink>
            </StyledButton>

            <StyledButton size="lg" title="Open Manu">
                <Icon icon={faBook} />
                <StyledLink to={ROUTES.Documentations}>Documentation</StyledLink>
            </StyledButton>

            <StyledHr />
            <StyledText>General & About</StyledText>
            <StyledButton size="lg" title="Open Manu">
                <Icon icon={faHome} />
                <StyledLink to={ROUTES.Dataprotections}>Data Policy</StyledLink>
            </StyledButton>

            <StyledButton size="lg" title="Open Manu">
                <Icon icon={faHome} />
                <StyledLink to={ROUTES.Imprint}>Imprint</StyledLink>
            </StyledButton>

            <StyledButton size="lg" title="Open Manu">
                <Icon icon={faQuestion} />
                <StyledLink to={ROUTES.FAQ}>FAQ</StyledLink>
            </StyledButton>
        </div>
    );
};

export default SideBar;
