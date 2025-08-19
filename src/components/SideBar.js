import React, { useState } from 'react';
import 'react-modern-drawer/dist/index.css';
import styled from 'styled-components';
import ROUTES from 'constants/routes';
import { NavLink } from 'react-router-dom';
import { reverse } from 'named-urls';
import { MODE_OF_OPERATIONS } from '../constants/globalConstants';
import { MAX_WIDTH, StyledBadge } from '../styledComponents/styledComponents';
import Cookies from 'js-cookie';
import { connect, useSelector } from 'react-redux';
import { fontStyled } from '../styledComponents/styledFont';
import { colorStyled } from '../styledComponents/styledColor';
import List from '@mui/material/List';
import { ListItem, Tooltip } from '@mui/material';
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
    DiscountOutlined,
    ArticleOutlined,
    DifferenceOutlined,
    NoteAddOutlined,
    AnalyticsOutlined,
    BarChartOutlined,
    TimelineOutlined,
    BorderAllOutlined,
    HandshakeOutlined
} from '@mui/icons-material';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { getOntologyById } from '../network/ontologyIndexing';
import { getWidocoDocumentation } from '../network/GetOntologyData';
import { URL_GET_HTML_FILE_WIDOCO } from '../constants/services';
import AlertPopUp from './ReusableComponents/AlertPopUp';
import MaterialUIPopUp from './ReusableComponents/MaterialUIPopUp';
import ChangesTimeline from './ondet/ChangesTimeline';
import { useGetDiscussion } from './VocabularySupport/hooks/useGetDiscussion';
import { getMentionedCommentsLength } from './VocabularySupport/utils/Discussions';
import { compose } from 'redux';

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
    font-size: 14px;

    :hover {
        background-color: ${colorStyled.PRIMARY.light};
        color: black;
    }

    @media (max-width: ${MAX_WIDTH}) {
        height: 30px;
        padding: 3px 10px 10px 5px;
        font-size: font-size: ${colorStyled.PRIMARY.light};
    }
`;

const StyledButton = styled.button`
    width: 100%;
    height: 40px;
    display: inline-block;
    padding: 7px 100px 7px 11px;
    background: transparent;
    color: black;
    border-radius: 4px;
    border: none;
    font-size: 14px;

    :hover {
        background-color: ${colorStyled.PRIMARY.light};
    }
`;

const SideBar = props => {
    const modeOfOperations = Cookies.get(MODE_OF_OPERATIONS);
    const cookieMentionedCommentsCount = Number(Cookies.get('mentionedCommentsCount') || 0);
    const { data: fetchedDiscussion = [] } = useGetDiscussion({ enabled: props.user !== 0 });
    let allTermsDiscussion = fetchedDiscussion || [];
    const mentionedCommentsLength = getMentionedCommentsLength(allTermsDiscussion, props.user.displayName);

    const selectedProject = useSelector(state => state.ResourceRelationModelReducer.project);
    const selectedOntology = useSelector(state => state.ResourceRelationModelReducer.ontology);
    const [isActiveTab, setIsActiveTab] = useState(modeOfOperations ? modeOfOperations : 'hybrid');
    const [isMetaDataModalOpen, setMetaDataModalOpen] = useState(false);
    const [isLoadingForWidoco, setIsLoadingForWidoco] = useState(false);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState('');
    const [isOntoComparisonModalOpen, setIsOntoComparisonModalOpen] = useState(false);

    const selectModeOfOperation = val => {
        Cookies.set(MODE_OF_OPERATIONS, val);
        setIsActiveTab(val);
    };

    const ActiveStyle = {
        backgroundColor: `${colorStyled.PRIMARY.light}`,
        color: 'black'
    };

    const getOntologyFileForDocumentation = async () => {
        if (selectedOntology) {
            try {
                setIsLoadingForWidoco(true);
                const res = await getOntologyById(selectedOntology.uuid);
                const file = new File([res.ontology_data], selectedOntology.name, { type: 'text/turtle' });
                const widocoRes = await getWidocoDocumentation(file);
                if (widocoRes === true) {
                    setTimeout(() => {
                        window.open(URL_GET_HTML_FILE_WIDOCO, '_blank');
                        setIsLoadingForWidoco(false);
                    }, 2000);
                } else {
                    // PopUp open to show the alert message
                    setIsPopUpOpen(!isPopUpOpen);
                    setPopUpMessage('Something went wrong, please try again after some time');
                    setIsLoadingForWidoco(false);
                }
            } catch (error) {
                // PopUp open to show the alert message
                setIsPopUpOpen(!isPopUpOpen);
                setPopUpMessage(error);
                setIsLoadingForWidoco(false);
            }
        } else {
            // PopUp open to show the alert message
            setPopUpMessage('Something went wrong, Please Try again after some times');
            setIsPopUpOpen(!isPopUpOpen);
        }
    };

    return (
        <List style={{ fontFamily: fontStyled.fontFamily }}>
            <AlertPopUp
                bodyText={popUpMessage}
                isOpen={isPopUpOpen}
                onClose={() => {
                    setIsPopUpOpen(!isPopUpOpen);
                }}
                isConfirm={() => {
                    setIsPopUpOpen(!isPopUpOpen);
                }}
            />
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
                                            marginLeft: props.isOpen ? '25px' : '0px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            transition: '0.6s'
                                        }}
                                    >
                                        <p
                                            style={{
                                                display: props.isOpen ? 'block' : 'none',
                                                marginLeft: props.isOpen ? '-25px' : '0px',
                                                paddingTop: '5px',
                                                marginBottom: '1px',
                                                fontSize: '13px',
                                                textAlign: 'center'
                                            }}
                                        >
                                            Visualizations
                                        </p>
                                        <StyledLink
                                            title="Open Hybrid View"
                                            to={{
                                                pathname: reverse(ROUTES.VIEW_ONTOLOGY),
                                                search: `?view=hybrid&ontologyId=${selectedOntology.uuid}`
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
                                                search: `?view=graph&ontologyId=${selectedOntology.uuid}`
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
                                                search: `?view=text&ontologyId=${selectedOntology.uuid}`
                                            }}
                                            onClick={() => selectModeOfOperation('text')}
                                            activeStyle={isActiveTab === 'text' ? ActiveStyle : {}}
                                        >
                                            <FormatAlignJustifyOutlined color="action" />
                                            <StyledText>Text</StyledText>
                                        </StyledLink>
                                        <StyledButton title="metaData" onClick={() => setMetaDataModalOpen(true)}>
                                            <DiscountOutlined color="action" />
                                            <StyledText>Meta Data</StyledText>
                                        </StyledButton>
                                        {isMetaDataModalOpen && (
                                            <MetaDataModal
                                                toggle={() => {
                                                    setMetaDataModalOpen(false);
                                                }}
                                                isModalOpen={isMetaDataModalOpen}
                                            />
                                        )}
                                        <StyledButton title="widoco documentation" onClick={getOntologyFileForDocumentation}>
                                            <ArticleOutlined color="action" />
                                            <StyledText>Onto Document</StyledText>
                                        </StyledButton>
                                        {isLoadingForWidoco && (
                                            <div className="text-center text-primary" style={{ marginTop: '10px' }}>
                                                <h6 className="h6">
                                                    <span>
                                                        <Icon icon={faSpinner} spin style={{ marginRight: '5px' }} />
                                                    </span>
                                                    Loading Document
                                                </h6>
                                            </div>
                                        )}
                                        {selectedOntology.lookup_type === 'online' || selectedOntology.lookup_type === 'online-gitlab' ? (
                                            <>
                                                <StyledButton
                                                    title="Ontology Git commit Comparison"
                                                    onClick={() => setIsOntoComparisonModalOpen(true)}
                                                >
                                                    <DifferenceOutlined color="action" />
                                                    <StyledText>Version Compare</StyledText>
                                                </StyledButton>
                                                {isOntoComparisonModalOpen && (
                                                    <MaterialUIPopUp
                                                        open={isOntoComparisonModalOpen}
                                                        onClose={() => {
                                                            setIsOntoComparisonModalOpen(false);
                                                        }}
                                                        title="Timeline"
                                                        message={<ChangesTimeline id={selectedOntology.lookup_path} />}
                                                    />
                                                )}
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <Divider />
                                </>
                            ) : null}
                        </div>
                    ) : null}
                    <div
                        style={{
                            marginLeft: props.isOpen ? '0px' : '0px',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: '0.6s'
                        }}
                    >
                        <p
                            style={{
                                display: props.isOpen ? 'block' : 'none',
                                marginLeft: props.isOpen ? '-25px' : '0px',
                                paddingTop: '5px',
                                marginBottom: '1px',
                                fontSize: '13px',
                                textAlign: 'center'
                            }}
                        >
                            Tools
                        </p>
                        <StyledLink title="Open WebProtege" activeStyle={ActiveStyle} to={ROUTES.WEBPROTEGE}>
                            <BorderColorOutlined color="action" />
                            <StyledText>WebProtege</StyledText>
                        </StyledLink>

                        <StyledLink title="Open Vocabulary Development Support" activeStyle={ActiveStyle} to={ROUTES.VOCABULARY_SUPPORT}>
                            <NoteAddOutlined color="action" />
                            <StyledText>Vocabulary Dev</StyledText>
                            <Tooltip title={`You have ${mentionedCommentsLength - cookieMentionedCommentsCount} new mentions`}>
                                <StyledBadge
                                    style={{ marginLeft: 10, marginBottom: 20 }}
                                    badgeContent={mentionedCommentsLength - cookieMentionedCommentsCount}
                                    invisible={props.user.displayName === undefined || mentionedCommentsLength - cookieMentionedCommentsCount < 0}
                                    customVariant="orange"
                                />
                            </Tooltip>
                        </StyledLink>

                        <StyledLink title="Open Annotator" activeStyle={ActiveStyle} to={ROUTES.ANNOTATOR}>
                            <BorderAllOutlined color="action" />
                            <StyledText>Annotator</StyledText>
                        </StyledLink>
                        <StyledLink
                            title="Open Eurostat Visualisation"
                            activeStyle={ActiveStyle}
                            to={ROUTES.EUROSTAT}
                            onClick={() => selectModeOfOperation('eurostat')}
                        >
                            <AnalyticsOutlined color="action" />
                            <StyledText>Eurostat</StyledText>
                        </StyledLink>
                        {(isActiveTab === 'eurostat' || isActiveTab === 'bullwhip') && (
                            <div
                                style={{
                                    marginLeft: props.isOpen ? '10px' : '0px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: '0.6s'
                                }}
                            >
                                <p
                                    style={{
                                        display: props.isOpen ? 'block' : 'none',
                                        marginLeft: props.isOpen ? '-5px' : '0px',
                                        paddingTop: '5px',
                                        marginBottom: '1px',
                                        fontSize: '13px',
                                        textAlign: 'center'
                                    }}
                                >
                                    Knowledge Graphs
                                </p>
                                <StyledLink
                                    title="Open EU trade view"
                                    to={{
                                        pathname: reverse(ROUTES.EUROSTAT)
                                    }}
                                    onClick={() => selectModeOfOperation('eurostat')}
                                    activeStyle={isActiveTab === 'eurostat' ? ActiveStyle : {}}
                                >
                                    <TimelineOutlined color="action" />
                                    <StyledText>EU trade</StyledText>
                                </StyledLink>
                                <StyledLink
                                    title="Open Bullwhip View"
                                    to={{
                                        pathname: reverse(ROUTES.EUROSTAT_BULLWHIP)
                                    }}
                                    onClick={() => selectModeOfOperation('bullwhip')}
                                    activeStyle={isActiveTab === 'bullwhip' ? ActiveStyle : {}}
                                >
                                    <BarChartOutlined color="action" />
                                    <StyledText>Bullwhip Effect</StyledText>
                                </StyledLink>
                            </div>
                        )}
                    </div>
                    <Divider />
                    <StyledLink title="Open Documentation" activeStyle={ActiveStyle} to={ROUTES.Documentations}>
                        <LibraryBooksOutlined color="action" />
                        <StyledText>About Portal</StyledText>
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
                    <StyledLink title="Open Partners" activeStyle={ActiveStyle} to={ROUTES.PARTNERS}>
                        <HandshakeOutlined color="action" />
                        <StyledText>Partners</StyledText>
                    </StyledLink>
                </div>
            </ListItem>
        </List>
    );
};

SideBar.propTypes = {
    isOpen: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default compose(connect(mapStateToProps))(SideBar);
