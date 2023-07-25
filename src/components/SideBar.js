import React, { useState } from 'react';
import 'react-modern-drawer/dist/index.css';
import styled from 'styled-components';
import ROUTES from 'constants/routes';
import { NavLink } from 'react-router-dom';
import { reverse } from 'named-urls';
import { MODE_OF_OPERATIONS } from '../constants/globalConstants';
import { MAX_WIDTH } from '../styledComponents/styledComponents';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { fontStyled } from '../styledComponents/styledFont';
import { colorStyled } from '../styledComponents/styledColor';
import List from '@mui/material/List';
import { ListItem } from '@mui/material';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import MetaDataModal from './Modals/metaData';

import {
    HomeOutlined,
    LiveHelpOutlined,
    LibraryBooksOutlined,
    PrivacyTipOutlined,
    ApprovalOutlined,
    FormatAlignJustifyOutlined,
    AccountTreeOutlined,
    HubOutlined,
    LegendToggleOutlined,
    BorderColorOutlined,
    MenuBookOutlined,
    CollectionsOutlined,
    DiscountOutlined
} from '@mui/icons-material';

const StyledText = styled.span`
    margin-left: 20px;
    white-space: nowrap;

    @media (max-width: ${MAX_WIDTH}) {
        margin-left: 20px;
    }
`;
const StyledLink = styled(NavLink)`
    width: 100%;
    height: 40px;
    display: inline-block;
    border-radius: 4px;
    padding: 7px 10px 7px 11px;
    border: 1px;
    background: transparent;
    color: black;
    text-decoration: none;
    text-decoration: none !important;
    font-size: 15px;
    :hover {
        background-color: ${colorStyled.PRIMARY.light};
        color: black;
    }

    @media (max-width: ${MAX_WIDTH}) {
        height: 30px;
         padding: 3px 10px 10px 5px;
        font-size: font-size:  ${colorStyled.PRIMARY.light};
    }
`;

const SideBar = props => {
    const modeOfOperations = Cookies.get(MODE_OF_OPERATIONS);
    const selectedProject = useSelector(state => state.ResourceRelationModelReducer.project);
    const selectedOntology = useSelector(state => state.ResourceRelationModelReducer.ontology);
    const [isActiveTab, setIsActiveTab] = useState(modeOfOperations ? modeOfOperations : 'hybrid');
    const [isMetaDataModalOpen, setMetaDataModalOpen] = useState(false);

    const selectModeOfOperation = val => {
        Cookies.set(MODE_OF_OPERATIONS, val);
        setIsActiveTab(val);
    };

    const ActiveStyle = {
        backgroundColor: `${colorStyled.PRIMARY.light}`,
        color: 'black'
    };

    return (
        <List style={{ fontFamily: fontStyled.fontFamily }}>
            <ListItem>
                <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <StyledLink title="Open Home" exact activeStyle={ActiveStyle} to={ROUTES.HOME} size="lg">
                        <HomeOutlined color="action" />
                        <StyledText>Home</StyledText>
                    </StyledLink>
                    <StyledLink title="Open Projects List" activeStyle={ActiveStyle} to={ROUTES.PROJECT}>
                        <CollectionsOutlined color="action" />
                        <StyledText>Projects</StyledText>
                    </StyledLink>
                    {selectedProject ? (
                        <div>
                            <StyledLink
                                to={{
                                    pathname: reverse(ROUTES.ONTOLOGY),
                                    project: selectedProject
                                }}
                                activeStyle={ActiveStyle}
                                title="Open Ontology List"
                            >
                                <HubOutlined color="action" />
                                <StyledText>Ontologies</StyledText>
                            </StyledLink>
                            <Divider />
                            {selectedOntology ? (
                                <>
                                    <div
                                        style={{
                                            marginLeft: props.isOpen ? '30px' : '0px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            transition: '0.6s'
                                        }}
                                    >
                                        <p
                                            style={{
                                                display: props.isOpen ? 'block' : 'none',
                                                marginLeft: props.isOpen ? '-30px' : '0px',
                                                paddingTop: '5px',
                                                fontSize: '13px',
                                                textAlign: 'center'
                                            }}
                                        >
                                            Visualization
                                        </p>
                                        <StyledLink
                                            title="Open Hybrid View"
                                            to={{
                                                pathname: reverse(ROUTES.VIEW_ONTOLOGY),
                                                search: `?ontologyId=${selectedOntology.uuid}`
                                            }}
                                            onClick={() => selectModeOfOperation('hybrid')}
                                            activeStyle={isActiveTab === 'hybrid' ? ActiveStyle : {}}
                                        >
                                            <LegendToggleOutlined color="action" />
                                            <StyledText>Hybrid</StyledText>
                                        </StyledLink>
                                        <StyledLink
                                            title="Open Graph View"
                                            to={{
                                                pathname: reverse(ROUTES.VIEW_ONTOLOGY),
                                                search: `?ontologyId=${selectedOntology.uuid}`
                                            }}
                                            onClick={() => selectModeOfOperation('graph')}
                                            activeStyle={isActiveTab === 'graph' ? ActiveStyle : {}}
                                        >
                                            <AccountTreeOutlined color="action" />
                                            <StyledText>Graph</StyledText>
                                        </StyledLink>
                                        <StyledLink
                                            title="Open Text View"
                                            to={{
                                                pathname: reverse(ROUTES.VIEW_ONTOLOGY),
                                                search: `?ontologyId=${selectedOntology.uuid}`
                                            }}
                                            onClick={() => selectModeOfOperation('text')}
                                            activeStyle={isActiveTab === 'text' ? ActiveStyle : {}}
                                        >
                                            <FormatAlignJustifyOutlined color="action" />
                                            <StyledText>Text</StyledText>
                                        </StyledLink>
                                        <StyledLink to="#" title="Open Text View" onClick={() => setMetaDataModalOpen(true)}>
                                            <DiscountOutlined color="action" />
                                            <StyledText>Meta Data</StyledText>
                                        </StyledLink>
                                        {isMetaDataModalOpen && (
                                            <MetaDataModal
                                                toggle={() => {
                                                    setMetaDataModalOpen(false);
                                                }}
                                                isModalOpen={isMetaDataModalOpen}
                                            />
                                        )}
                                    </div>
                                </>
                            ) : null}
                        </div>
                    ) : null}
                    <Divider />
                    <StyledLink title="Open WebProtege" activeStyle={ActiveStyle} to={ROUTES.WEBPROTEGE}>
                        <BorderColorOutlined color="action" />
                        <StyledText>WebProtege</StyledText>
                    </StyledLink>
                    <Divider />
                    <StyledLink title="Open Documentation" activeStyle={ActiveStyle} to={ROUTES.Documentations}>
                        <LibraryBooksOutlined color="action" />
                        <StyledText>Documentation</StyledText>
                    </StyledLink>
                    <StyledLink title="Open FAQ" activeStyle={ActiveStyle} to={ROUTES.FAQ}>
                        <LiveHelpOutlined color="action" />
                        <StyledText>FAQ</StyledText>
                    </StyledLink>
                    <StyledLink title="Open Training" activeStyle={ActiveStyle} to={ROUTES.TRAINING}>
                        <MenuBookOutlined color="action" />
                        <StyledText>Training</StyledText>
                    </StyledLink>
                    <Divider />
                    <StyledLink title="Open Data Policy" activeStyle={ActiveStyle} to={ROUTES.Dataprotections}>
                        <PrivacyTipOutlined color="action" />
                        <StyledText>Data Policy</StyledText>
                    </StyledLink>
                    <StyledLink title="Open Imprint" activeStyle={ActiveStyle} to={ROUTES.Imprint}>
                        <ApprovalOutlined color="action" />
                        <StyledText>Imprint</StyledText>
                    </StyledLink>
                </div>
            </ListItem>
        </List>
    );
};

SideBar.propTypes = {
    isOpen: PropTypes.bool.isRequired
};

export default SideBar;
