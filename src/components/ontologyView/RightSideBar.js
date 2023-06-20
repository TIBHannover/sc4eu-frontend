import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Button, Card, CardBody, Collapse, Input, Table } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faBook, faChevronCircleDown, faChevronCircleRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Tippy from '@tippyjs/react';
import { connect } from 'react-redux';
import { MIN_WIDTH_FOR_MONITOR } from '../../styledComponents/styledComponents';
import { getAllCommits, getBranchFromUrl, getLicense, getRawUrlforCommit } from '../../network/GithubAPICalls';
import { getGitlabBranchFromUrl, getGitlabCommits, getRawUrlForGitlabCommit, getGitlabLicense } from '../../network/GitlabAPICalls';
import ShowOntologyComparisonModal from './ShowOntologyComparisonModal';
import { getOntologyComparison, getWidocoDocumentation } from '../../network/GetOntologyData';
import { getOntologyById } from '../../network/ontologyIndexing';
import { URL_GET_HTML_FILE_WIDOCO } from '../../constants/services';
import { colorStyled } from '../../styledComponents/styledColor';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { fontStyled } from '../../styledComponents/styledFont';
import AlertPopUp from '../ReusableComponents/AlertPopUp';

class RightSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
            collapseComparison: true,
            collapseMetaInfo: false,
            openOntology: '',
            openProject: '',
            ontologyVersion: '',
            firstSelectedCommit: '',
            secondSelectedCommit: '',
            allCommits: '',
            showCompareModal: false,
            compareResults: '',
            isLoading: false,
            licenceInfo: 'No Licence Available',
            licenseURL: null,
            gitCollapse: false,
            isLoadingForWidoco: false,
            isPopUpOpen: false,
            popUpMessage: ''
        };
    }

    componentDidMount = async () => {
        const theProject = this.props.selectedProject;
        const theOntology = this.props.selectedOntology;
        let version = 'internal';
        const ontologyCommits = [];
        let license = null;
        if (theOntology.lookup_type === 'online') {
            version = getBranchFromUrl(theOntology.lookup_path);
            this.getTheCommits(theOntology.lookup_path).then(results => {
                results.data.forEach(item => {
                    const raw_url = getRawUrlforCommit(theOntology.lookup_path, item.sha);
                    ontologyCommits.push({ label: item.commit.committer.date, value: item.sha, url: item.url, raw_url: raw_url });
                });
            });

            license = await getLicense(theOntology.lookup_path).then(lic => {
                license = lic;
                return lic;
            });
        } else if (theOntology.lookup_type === 'online-gitlab') {
            version = getGitlabBranchFromUrl(theOntology.lookup_path);
            this.getTheGitlabCommits(theOntology.lookup_path).then(result => {
                result.forEach(item => {
                    const raw_url = getRawUrlForGitlabCommit(theOntology.lookup_path, item.id);
                    ontologyCommits.push({ label: item.committed_date, value: item.id, url: item.web_url, raw_url: raw_url });
                });
            });
            license = await getGitlabLicense(theOntology.lookup_path).then(lic => {
                license = lic;
                return lic;
            });
        }
        let licenseName = 'No Licence Available';
        let licenseURL = '';
        if (license && theOntology.lookup_type === 'online') {
            licenseName = license.data.license.name;
            licenseURL = license.data.html_url;
        } else if (license && theOntology.lookup_type === 'online-gitlab') {
            if (license.license) {
                licenseName = license.license.name;
                licenseURL = license.license_url;
            } else {
                licenseName = 'No Licence Available';
            }
        }

        this.setState({
            openProject: theProject,
            openOntology: theOntology,
            ontologyVersion: version,
            allCommits: ontologyCommits,
            licenceInfo: licenseName,
            licenseURL: licenseURL
        });
    };

    getTheCommits = async gitHubURL => {
        const commits = await getAllCommits(gitHubURL);
        return commits;
    };

    getTheGitlabCommits = async gitlabURL => {
        const commits = await getGitlabCommits(gitlabURL);
        return commits;
    };

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    };

    toggleComparison = () => {
        this.setState({ collapseComparison: !this.state.collapseComparison });
    };

    toggleGitCollapse = () => {
        this.setState({ gitCollapse: !this.state.gitCollapse });
    };

    toggleMetaInformation = () => {
        this.setState({ collapseMetaInfo: !this.state.collapseMetaInfo });
    };

    renderMetaInformation = () => {
        const metaInformation = this.props.metaInformation;

        return Object.keys(metaInformation).map(key => {
            if (key === 'metaDescriptions') {
                return (
                    <div key={'metaInformation_' + key} className="root" style={{ padding: '0 10px' }}>
                        <StyledButton onClick={() => this.toggleMetaInformation()}>
                            <StyledIcon icon={this.state.collapseMetaInfo ? faChevronCircleRight : faChevronCircleDown} />
                            Meta Information
                        </StyledButton>
                        <Collapse isOpen={!this.state.collapseMetaInfo}>
                            <Card style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, marginLeft: '1%', width: '98%' }}>
                                <CardBody style={{ padding: '5px', width: '100%', overflow: 'hidden' }}>
                                    <table style={{ width: '100%' }}>
                                        <tbody>{this.renderMetaDescription(metaInformation[key])}</tbody>
                                    </table>
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>
                );
            } else if (key === 'prefixList') {
                return (
                    <div key={'prefixList' + key} className="root" style={{ padding: '0 10px' }}>
                        <StyledButton onClick={() => this.toggle()}>
                            <StyledIcon icon={this.state.collapse ? faChevronCircleRight : faChevronCircleDown} />
                            Ontology Prefixes
                        </StyledButton>
                        <Collapse isOpen={!this.state.collapse}>
                            <Card style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, marginLeft: '1%', width: '98%' }}>
                                <CardBody style={{ padding: '0 5px', paddingBottom: '5px', width: '100%', overflow: 'hidden' }}>
                                    <table id="simple-board" style={{ backgroundColor: 'solid black', width: '100%' }}>
                                        <tbody key={'prefixTable_' + key} style={{}}>
                                            <tr key={'prefixRow_' + key}>
                                                <td>
                                                    <b>Prefix</b>
                                                </td>
                                                <td style={{ paddingLeft: '10px' }}>
                                                    <b>IRI</b>
                                                </td>
                                            </tr>
                                            {this.renderPrefixList(metaInformation[key])}
                                        </tbody>
                                    </table>
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>
                );
            } else {
                return <>No Meta Information Available</>;
            }
        });
    };

    renderMetaDescription = obj => {
        let keyIndex = 0;
        return Object.keys(obj).map(itemKey => {
            const metaDescriptionsItem = obj[itemKey];
            if (itemKey === 'description' || itemKey === 'title') {
                return Object.keys(metaDescriptionsItem).map(language => {
                    const itemValueInLang = metaDescriptionsItem[language];

                    return (
                        <tr style={{ fontSize: '12px' }} key={'description_title_' + itemKey + keyIndex++}>
                            <td style={{ paddingRight: '5px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                                <div style={{ float: 'left' }}>
                                    <b>{itemKey}:</b>
                                </div>
                            </td>
                            <td>{itemValueInLang}</td>
                        </tr>
                    );
                });
            } else if (itemKey === 'iri' || itemKey === 'version') {
                return (
                    <tr style={{ fontSize: '12px' }} key={'iri_version_' + itemKey + keyIndex++}>
                        <td style={{ paddingRight: '5px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                            <div style={{ float: 'left' }}>
                                <b>{itemKey}:</b>
                            </div>
                        </td>
                        <td>{obj[itemKey]}</td>
                    </tr>
                );
            }
            return <tr key={itemKey + keyIndex + '_ERROR'}>{/*<td>ERROR HERE</td>*/}</tr>;
        });
    };

    renderPrefixList = obj => {
        if (obj.hasOwnProperty('shortToLong')) {
            const shortToLongValues = obj['shortToLong'];
            return Object.keys(shortToLongValues).map(shortKey => {
                // const shortToLong = shortKey + ':' + prefixList[shortKey];
                return (
                    <tr key={'prefix_' + shortKey} style={{ borderBottom: '1px solid', width: '100%', fontSize: '12px' }}>
                        <td style={{ textAlign: 'left' }}>{shortKey}:</td>
                        <Tippy content={shortToLongValues[shortKey]}>
                            <td
                                style={{
                                    maxWidth: '65%',
                                    whiteSpace: 'nowrap',
                                    display: 'block',
                                    paddingLeft: '10px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                {shortToLongValues[shortKey]}
                            </td>
                        </Tippy>
                    </tr>
                );
            });
        } else {
            return <div>No Prefix List provided :(</div>;
        }
    };

    handleFirstCommitChange = event => {
        this.setState({ firstSelectedCommit: event.target.value });
    };

    handleSecondCommitChange = event => {
        this.setState({ secondSelectedCommit: event.target.value });
    };

    showComparison = async () => {
        this.setState({ isLoading: true });
        if (this.state.firstSelectedCommit === '' || this.state.secondSelectedCommit === '') {
            // PopUp open to show the alert message
            this.setState({
                isPopUpOpen: !this.state.isPopUpOpen,
                popUpMessage: 'Please selected the two commits to compare',
                isLoading: false
            });
            return;
        }
        const index_first = this.state.allCommits.findIndex(item => item.value === this.state.firstSelectedCommit);
        const index_second = this.state.allCommits.findIndex(item => item.value === this.state.secondSelectedCommit);
        let url_first;
        let url_second;
        if (index_first !== -1 && index_second !== -1) {
            url_first = this.state.allCommits[index_first].raw_url;
            url_second = this.state.allCommits[index_second].raw_url;
            getOntologyComparison(url_first, url_second).then(data => {
                this.setState({ compareResults: data, showCompareModal: true, isLoading: false });
            });
        }
    };

    getOntologyFileForDocumentation = async () => {
        if (this.props.selectedOntology) {
            try {
                this.setState({ isLoadingForWidoco: true });
                const res = await getOntologyById(this.props.selectedOntology.uuid);
                const file = new File([res.ontology_data], this.props.selectedOntology.name, { type: 'text/turtle' });
                const widocoRes = await getWidocoDocumentation(file);
                if (widocoRes === true) {
                    setTimeout(() => {
                        window.open(URL_GET_HTML_FILE_WIDOCO, '_blank');
                        this.setState({ isLoadingForWidoco: false });
                    }, 2000);
                } else {
                    // PopUp open to show the alert message
                    this.setState({
                        isPopUpOpen: !this.state.isPopUpOpen,
                        popUpMessage: 'Something went wrong, please try again after some time',
                        isLoadingForWidoco: false
                    });
                }
            } catch (error) {
                // PopUp open to show the alert message
                this.setState({
                    isPopUpOpen: !this.state.isPopUpOpen,
                    popUpMessage: error,
                    isLoadingForWidoco: false
                });
            }
        } else {
            // PopUp open to show the alert message
            this.setState({
                isPopUpOpen: !this.state.isPopUpOpen,
                popUpMessage: 'Something went wrong, Please Try again after some times'
            });
        }
    };

    render() {
        let comparisonButton;
        if (this.state.openOntology.lookup_type === 'online' || this.state.openOntology.lookup_type === 'online-gitlab') {
            comparisonButton = (
                <div className="root" style={{ padding: '0 10px' }}>
                    <StyledButton onClick={() => this.toggleComparison()}>
                        <StyledIcon icon={this.state.collapseComparison ? faChevronCircleRight : faChevronCircleDown} />
                        Ontology Comparison
                    </StyledButton>
                    <Collapse isOpen={!this.state.collapseComparison}>
                        <div style={{ marginTop: '5px' }}>
                            <HeadingSpan style={{ fontWeight: 600 }}>Please choose two commits to compare </HeadingSpan>
                        </div>
                        <div style={{ marginTop: '5px' }}>
                            <FormGroup>
                                <Input
                                    type="select"
                                    name="select"
                                    label={'choose commit'}
                                    id="exampleSelect"
                                    defaultValue={''}
                                    onChange={this.handleFirstCommitChange}
                                >
                                    <option style={{ display: 'none' }}>Select 1st Commit</option>
                                    {this.state.allCommits.map(item => (
                                        <option key={item.value + 'first'} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </div>
                        <FormGroup style={{ margin: '3% 0 2% 0' }}>
                            <Input type="select" name="select" label={'choose commit'} defaultValue={''} onChange={this.handleSecondCommitChange}>
                                <option style={{ display: 'none' }}>Select 2nd Commit</option>
                                {this.state.allCommits.map(item => (
                                    <option key={item.value + 'second'} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                        <ShowComparisonButton onClick={this.showComparison}> Show Comparison </ShowComparisonButton>
                        {this.state.isLoading ? (
                            <div className="text-center text-primary mt-4 mb-4">
                                {/*using a manual fixed scale value for the spinner scale! */}
                                <h2 className="h5">
                                    <span>
                                        <Icon icon={faSpinner} spin />
                                    </span>
                                    Loading Comparison
                                </h2>
                            </div>
                        ) : (
                            <ShowOntologyComparisonModal
                                showDialog={this.state.showCompareModal}
                                toggle={() => {
                                    this.setState({ showCreateProjectModal: !this.state.showCompareModal });
                                }}
                                callback={() => {
                                    this.setState({ showCompareModal: false });
                                }}
                                comparisonContent={this.state.compareResults}
                            />
                        )}
                    </Collapse>
                </div>
            );
        } else {
            comparisonButton = <div />;
        }
        return (
            <>
                <AlertPopUp
                    bodyText={this.state.popUpMessage}
                    isOpen={this.state.isPopUpOpen}
                    onClose={() => {
                        this.setState({ isPopUpOpen: !this.state.isPopUpOpen });
                    }}
                    isConfirm={() => {
                        this.setState({ isPopUpOpen: !this.state.isPopUpOpen });
                    }}
                />
                <StyledHeadingDiv>
                    <h4 style={{ width: '100%', margin: '0 auto' }}>Metadata</h4>
                </StyledHeadingDiv>
                <OpenCloseButton onClick={this.props.toggleSidebar}>
                    <Icon
                        icon={this.props.isSidebarOpen ? faAngleRight : faAngleLeft}
                        className="align-self-center"
                        style={{ marginLeft: '5px', fontSize: '26px' }}
                    />
                </OpenCloseButton>
                <StyledScrollbarDiv>
                    <Scrollbars>
                        <div style={{ marginLeft: '15px' }}>
                            <HeadingSpan style={{ fontWeight: 600 }}>Project Name: </HeadingSpan>
                            <HeadingSpan>{this.state.openProject.name}</HeadingSpan>
                        </div>
                        <div style={{ marginTop: '10px', marginLeft: '15px', marginBottom: '10px' }}>
                            <HeadingSpan style={{ fontWeight: 600 }}>Ontology Name: </HeadingSpan>
                            <HeadingSpan>{this.state.openOntology.name}</HeadingSpan>
                        </div>
                        {this.state.openOntology.lookup_type === 'online' || this.state.openOntology.lookup_type === 'online-gitlab' ? (
                            <div style={{ padding: '0 10px', marginTop: '10px' }}>
                                <StyledButton onClick={() => this.toggleGitCollapse()}>
                                    <StyledIcon icon={this.state.gitCollapse ? faChevronCircleRight : faChevronCircleDown} />
                                    {this.state.openOntology.lookup_type === 'online' ? 'Github' : 'Gitlab'}
                                </StyledButton>
                                <Collapse isOpen={!this.state.gitCollapse}>
                                    <Table bordered style={{ marginTop: '10px' }}>
                                        <tbody>
                                            <tr>
                                                <th style={{ width: '20px' }}>
                                                    <HeadingSpan>URL</HeadingSpan>
                                                </th>
                                                <td style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                                    <HeadingSpan>{this.state.openOntology.lookup_path}</HeadingSpan>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th style={{ width: '20px' }}>
                                                    <HeadingSpan>License</HeadingSpan>
                                                </th>
                                                <td style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                                    <a href={this.state.licenseURL ? this.state.licenseURL : null} target="_blank" rel="noreferrer">
                                                        <HeadingSpan>{this.state.licenceInfo}</HeadingSpan>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th style={{ width: '20px' }}>
                                                    <HeadingSpan>Branch</HeadingSpan>
                                                </th>
                                                <td style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                                    <HeadingSpan>{this.state.ontologyVersion}</HeadingSpan>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Collapse>
                            </div>
                        ) : (
                            <div />
                        )}
                        <div>{this.renderMetaInformation()}</div>
                        {comparisonButton}
                        <div style={{ padding: '0 10px' }}>
                            <StyledButton title="Ontology Documentation" onClick={this.getOntologyFileForDocumentation}>
                                <StyledIcon icon={faBook} style={{ marginRight: '8px' }} />
                                Widoco Documentation
                            </StyledButton>
                            {this.state.isLoadingForWidoco && (
                                <div className="text-center text-primary" style={{ marginTop: '10px' }}>
                                    <h2 className="h5">
                                        <span>
                                            <Icon icon={faSpinner} spin style={{ marginRight: '5px' }} />
                                        </span>
                                        Loading Document
                                    </h2>
                                </div>
                            )}
                        </div>
                    </Scrollbars>
                </StyledScrollbarDiv>
            </>
        );
    }
}

RightSideBar.propTypes = {
    metaInformation: PropTypes.object,
    selectedProject: PropTypes.object.isRequired,
    selectedOntology: PropTypes.object.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        metaInformation: state.ResourceRelationModelReducer.metaInformation,
        selectedProject: state.ResourceRelationModelReducer.project,
        selectedOntology: state.ResourceRelationModelReducer.ontology
    };
};

export default connect(mapStateToProps)(RightSideBar);

const StyledHeadingDiv = styled.div`
    border-radius: 10px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    color: ${colorStyled.CONTAINER_BACKGROUND_COLOR};
    background-color: ${colorStyled.PRIMARY.dark};
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const OpenCloseButton = styled(Button)`
    display: flex;
    width: 28px;
    border-radius: 30px;
    padding: 0;
    background-color: ${colorStyled.SECONDARY.dark};
    position: relative;
    top: -15px;
    left: -20px;
`;

const HeadingSpan = styled.span`
    font-size: ${fontStyled.fontSize.NormalText};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

const StyledIcon = styled(Icon)`
    font-size: ${fontStyled.fontSize.NormalText};
    margin-right: 5px;

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

const StyledButton = styled(Button)`
    margin-top: 5px;
    width: 100%;
    text-align: left;
    font-weight: bold;
    font-size: ${fontStyled.fontSize.NormalText};
    background-color: ${colorStyled.SECONDARY.dark};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

const ShowComparisonButton = styled(Button)`
    margin-top: 5px;
    font-size: ${fontStyled.fontSize.NormalText};
    background-color: ${colorStyled.SECONDARY.dark};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

const StyledScrollbarDiv = styled.div`
    height: calc(100% - 65px);
    margin-top: -15px;
`;
