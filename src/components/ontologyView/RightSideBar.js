import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Button, Collapse, Input, Table } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faChevronCircleDown, faChevronCircleRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { MIN_WIDTH_FOR_MONITOR } from '../../styledComponents/styledComponents';
import { getAllCommits, getBranchFromUrl, getLicense, getRawUrlforCommit } from '../../network/GithubAPICalls';
import { getGitlabBranchFromUrl, getGitlabCommits, getRawUrlForGitlabCommit, getGitlabLicense } from '../../network/GitlabAPICalls';
import ShowOntologyComparisonModal from './ShowOntologyComparisonModal';
import { getOntologyComparison } from '../../network/GetOntologyData';
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
                        {comparisonButton}
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
    font-size: 12px;

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: 12px;
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
