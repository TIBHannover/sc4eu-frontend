import React, { useState } from 'react';
import 'react-modern-drawer/dist/index.css';
import { useTheme } from '@mui/material';
import ROUTES from 'constants/routes';
import { reverse } from 'named-urls';
import { MODE_OF_OPERATIONS } from '../constants/globalConstants';
import { StyledBadge } from '../styledComponents/styledComponents';
import Cookies from 'js-cookie';
import { connect, useSelector } from 'react-redux';
import { fontStyled } from '../styledComponents/styledFont';
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
    HandshakeOutlined,
    StackedBarChartOutlined
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
import { StyledLink, StyledText, StyledSideBarButton } from '../styledComponents/styledComponents';

const SideBar = ({ isOpen, onNavigate, user }) => {
    const modeOfOperations = Cookies.get(MODE_OF_OPERATIONS);
    const cookieMentionedCommentsCount = Number(Cookies.get('mentionedCommentsCount') || 0);
    const { data: fetchedDiscussion = [] } = useGetDiscussion({ enabled: user !== 0 });
    let allTermsDiscussion = fetchedDiscussion || [];
    const mentionedCommentsLength = getMentionedCommentsLength(allTermsDiscussion, user.displayName);

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

    const theme = useTheme();
    const ActiveStyle = {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.text.primary
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
                    <StyledLink title="Open Home" exact activeStyle={ActiveStyle} to={ROUTES.HOME} size="lg" onClick={onNavigate}>
                        <HomeOutlined color="action" />
                        <StyledText>Home</StyledText>
                    </StyledLink>
                    <StyledLink title="Open Projects List" activeStyle={ActiveStyle} to={ROUTES.PROJECT} onClick={onNavigate}>
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
                                onClick={onNavigate}
                            >
                                <HubOutlined color="action" />
                                <StyledText>Ontologies</StyledText>
                            </StyledLink>
                            <Divider />
                            {selectedOntology ? (
                                <>
                                    <div
                                        style={{
                                            marginLeft: isOpen ? '25px' : '0px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            transition: '0.6s'
                                        }}
                                    >
                                        <p
                                            style={{
                                                display: isOpen ? 'block' : 'none',
                                                marginLeft: isOpen ? '-25px' : '0px',
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
                                            onClick={() => {
                                                selectModeOfOperation('hybrid');
                                                onNavigate();
                                            }}
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
                                            onClick={() => {
                                                selectModeOfOperation('graph');
                                                onNavigate();
                                            }}
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
                                            onClick={() => {
                                                selectModeOfOperation('text');
                                                onNavigate();
                                            }}
                                            activeStyle={isActiveTab === 'text' ? ActiveStyle : {}}
                                        >
                                            <FormatAlignJustifyOutlined color="action" />
                                            <StyledText>Text</StyledText>
                                        </StyledLink>
                                        <StyledSideBarButton
                                            title="metaData"
                                            onClick={() => {
                                                setMetaDataModalOpen(true);
                                                onNavigate();
                                            }}
                                        >
                                            <DiscountOutlined color="action" />
                                            <StyledText>Meta Data</StyledText>
                                        </StyledSideBarButton>
                                        {isMetaDataModalOpen && (
                                            <MetaDataModal
                                                toggle={() => {
                                                    setMetaDataModalOpen(false);
                                                }}
                                                isModalOpen={isMetaDataModalOpen}
                                            />
                                        )}
                                        <StyledSideBarButton title="widoco documentation" onClick={getOntologyFileForDocumentation}>
                                            <ArticleOutlined color="action" />
                                            <StyledText>Onto Document</StyledText>
                                        </StyledSideBarButton>
                                        {isLoadingForWidoco && (
                                            <div className="text-center text-primary" style={{ marginTop: '10px' }}>
                                                <h6 className="h6">
                                                    <span>
                                                        <Icon icon={faSpinner} spin style={{ marginRight: '5px' }} />
                                                    </span>{' '}
                                                    Loading Document
                                                </h6>
                                            </div>
                                        )}
                                        {selectedOntology.lookup_type === 'online' || selectedOntology.lookup_type === 'online-gitlab' ? (
                                            <>
                                                <StyledSideBarButton
                                                    title="Ontology Git commit Comparison"
                                                    onClick={() => setIsOntoComparisonModalOpen(true)}
                                                >
                                                    <DifferenceOutlined color="action" />
                                                    <StyledText>Version Compare</StyledText>
                                                </StyledSideBarButton>
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
                            marginLeft: '0px',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: '0.6s'
                        }}
                    >
                        <p
                            style={{
                                display: isOpen ? 'block' : 'none',
                                marginLeft: isOpen ? '-25px' : '0px',
                                paddingTop: '5px',
                                marginBottom: '1px',
                                fontSize: '13px',
                                textAlign: 'center'
                            }}
                        >
                            Tools
                        </p>
                        <StyledLink title="Open WebProtege" activeStyle={ActiveStyle} to={ROUTES.WEBPROTEGE} onClick={onNavigate}>
                            <BorderColorOutlined color="action" />
                            <StyledText>WebProtege</StyledText>
                        </StyledLink>

                        <StyledLink
                            title="Open Vocabulary Development Support"
                            activeStyle={ActiveStyle}
                            to={ROUTES.VOCABULARY_SUPPORT}
                            onClick={onNavigate}
                        >
                            <NoteAddOutlined color="action" />
                            <StyledText>Vocabulary Dev</StyledText>
                            <Tooltip title={`You have ${mentionedCommentsLength - cookieMentionedCommentsCount} new mentions`}>
                                <StyledBadge
                                    style={{ marginLeft: 10, marginBottom: 20 }}
                                    badgeContent={mentionedCommentsLength - cookieMentionedCommentsCount}
                                    invisible={user.displayName === undefined || mentionedCommentsLength - cookieMentionedCommentsCount < 0}
                                    customVariant="orange"
                                />
                            </Tooltip>
                        </StyledLink>

                        <StyledLink title="Open Annotator" activeStyle={ActiveStyle} to={ROUTES.ANNOTATOR} onClick={onNavigate}>
                            <BorderAllOutlined color="action" />
                            <StyledText>Annotator</StyledText>
                        </StyledLink>
                        <StyledLink title="Open Annotator" activeStyle={ActiveStyle} to={ROUTES.MPC} onClick={onNavigate}>
                            <StackedBarChartOutlined color="action" />
                            <StyledText>MPC</StyledText>
                        </StyledLink>
                        <StyledLink
                            title="Open Eurostat Visualisation"
                            activeStyle={ActiveStyle}
                            to={ROUTES.EUROSTAT}
                            onClick={() => {
                                selectModeOfOperation('eurostat');
                                onNavigate();
                            }}
                        >
                            <AnalyticsOutlined color="action" />
                            <StyledText>Eurostat</StyledText>
                        </StyledLink>
                        {(isActiveTab === 'eurostat' || isActiveTab === 'bullwhip') && (
                            <div
                                style={{
                                    marginLeft: isOpen ? '10px' : '0px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: '0.6s'
                                }}
                            >
                                <p
                                    style={{
                                        display: isOpen ? 'block' : 'none',
                                        marginLeft: isOpen ? '-5px' : '0px',
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
                                    onClick={() => {
                                        selectModeOfOperation('eurostat');
                                        onNavigate();
                                    }}
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
                                    onClick={() => {
                                        selectModeOfOperation('bullwhip');
                                        onNavigate();
                                    }}
                                    activeStyle={isActiveTab === 'bullwhip' ? ActiveStyle : {}}
                                >
                                    <BarChartOutlined color="action" />
                                    <StyledText>Bullwhip Effect</StyledText>
                                </StyledLink>
                            </div>
                        )}
                    </div>
                    <Divider />
                    <StyledLink title="Open Documentation" activeStyle={ActiveStyle} to={ROUTES.Documentations} onClick={onNavigate}>
                        <LibraryBooksOutlined color="action" />
                        <StyledText>About Portal</StyledText>
                    </StyledLink>
                    <StyledLink title="Open FAQ" activeStyle={ActiveStyle} to={ROUTES.FAQ} onClick={onNavigate}>
                        <LiveHelpOutlined color="action" />
                        <StyledText>FAQ</StyledText>
                    </StyledLink>
                    <StyledLink title="Open Training" activeStyle={ActiveStyle} to={ROUTES.TRAINING} onClick={onNavigate}>
                        <MenuBookOutlined color="action" />
                        <StyledText>Training</StyledText>
                    </StyledLink>
                    <Divider />
                    <StyledLink title="Open Data Policy" activeStyle={ActiveStyle} to={ROUTES.Dataprotections} onClick={onNavigate}>
                        <PrivacyTipOutlined color="action" />
                        <StyledText>Data Policy</StyledText>
                    </StyledLink>
                    <StyledLink title="Open Imprint" activeStyle={ActiveStyle} to={ROUTES.Imprint} onClick={onNavigate}>
                        <ApprovalOutlined color="action" />
                        <StyledText>Imprint</StyledText>
                    </StyledLink>
                    <StyledLink title="Open Partners" activeStyle={ActiveStyle} to={ROUTES.PARTNERS} onClick={onNavigate}>
                        <HandshakeOutlined color="action" />
                        <StyledText>Partners</StyledText>
                    </StyledLink>
                </div>
            </ListItem>
        </List>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default compose(connect(mapStateToProps))(SideBar);

SideBar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        displayName: PropTypes.string
    }),
    onNavigate: PropTypes.func
};
