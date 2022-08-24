import React from 'react';

// import component 👇
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

//import styles 👇
import 'react-modern-drawer/dist/index.css';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button } from 'reactstrap';

const StyledText = styled.text`
    margin-left: 20px;
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
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleDrawer = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div style={{ background: '#5f7c9d' }}>
            <StyledButton size="lg" title="Go Home">
                <Icon icon={faHome} />
                <StyledText>Home</StyledText>
            </StyledButton>
            <StyledHr />
            <StyledText>Management & Visualization</StyledText>
            <StyledButton size="lg" title="Open Manu">
                <Icon icon={faHome} />
                <StyledText>Projects</StyledText>
            </StyledButton>
            <div style={{ marginLeft: '30px' }}>
                <StyledButton size="lg" title="Open Manu">
                    <Icon icon={faHome} />
                    <StyledText>Ontologies</StyledText>
                </StyledButton>
                <div style={{ marginLeft: '30px' }}>
                    <StyledButton size="lg" title="Open Manu">
                        <Icon icon={faHome} />
                        <StyledText>Hybrid</StyledText>
                    </StyledButton>
                    <StyledButton size="lg" title="Open Manu">
                        <Icon icon={faHome} />
                        <StyledText>Graph</StyledText>
                    </StyledButton>
                    <StyledButton size="lg" title="Open Manu">
                        <Icon icon={faHome} />
                        <StyledText>Text</StyledText>
                    </StyledButton>
                </div>
            </div>
            <StyledHr />
            <StyledText>Editing & Documentation</StyledText>
            <StyledButton size="lg" title="Open Manu">
                <Icon icon={faHome} />
                <StyledText>WebProtege</StyledText>
            </StyledButton>

            <StyledButton size="lg" title="Open Manu">
                <Icon icon={faHome} onClick={toggleDrawer} />
                <StyledText>Documentation</StyledText>
            </StyledButton>

            <StyledHr />
            <StyledText>General & About</StyledText>
            <StyledButton size="lg" title="Open Manu">
                <Icon icon={faHome} />
                <StyledText>Data Policy</StyledText>
            </StyledButton>

            <StyledButton size="lg" title="Open Manu">
                <Icon icon={faHome} />
                <StyledText>Imprint</StyledText>
            </StyledButton>

            <StyledButton size="lg" title="Open Manu">
                <Icon icon={faHome} />
                <StyledText>FAQ</StyledText>
            </StyledButton>
        </div>
    );
};

export default SideBar;
