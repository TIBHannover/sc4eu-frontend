import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Button, Card, CardBody, Collapse, Container, Input, Table } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faBook, faChevronCircleDown, faChevronCircleRight, faSpinner } from '@fortawesome/free-solid-svg-icons';

import styled, { keyframes } from 'styled-components';
import Tippy from '@tippyjs/react';
import { connect } from 'react-redux';
import { PRIMARY, SECONDARY } from '../../styledComponents/styledComponents';
import { getAllCommits, getBranchFromUrl, getLicense, getRawUrlforCommit } from '../../network/GithubAPICalls';
import { getGitlabBranchFromUrl, getGitlabCommits, getRawUrlForGitlabCommit, getGitlabLicense } from '../../network/GitlabAPICalls';
import ShowOntologyComparisonModal from './ShowOntologyComparisonModal';
import { getOntologyComparison, getWidocoDocumentation } from '../../network/GetOntologyData';
import { getOntologyById } from '../../network/ontologyIndexing';
import { URL_GET_HTML_FILE_WIDOCO } from '../../constants/services';

class RightSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: this.props.initialState,
            minHeight: 200,
            title: props.title,
            initialRendering: true,
            collapse: true,
            collapseComparison: true,
            collapseMetaInfo: true,
            isEditing: { description: false, title: false, version: false, iri: false },
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
            gitCollapse: true,
            isLoadingForWidoco: false
        };
    }

    componentDidMount = async () => {
        document.body.style.overflowX = 'hidden';
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

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.expanded !== this.state.expanded) {
            this.setState({ initialRendering: false });
        }
        // check required height TODO
        this.props.heightUpdateEvent();
    };

    componentWillUnmount() {
        document.body.style.overflowX = 'auto';
    }

    getTheCommits = async gitHubURL => {
        const commits = await getAllCommits(gitHubURL);
        return commits;
    };

    getTheGitlabCommits = async gitlabURL => {
        const commits = await getGitlabCommits(gitlabURL);
        return commits;
    };
    collapseSidebar = () => {
        this.props.updateEvent(!this.state.expanded);
        this.setState({ expanded: !this.state.expanded });
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
                        <Button
                            onClick={() => this.toggleMetaInformation()}
                            style={{
                                marginTop: '5px',
                                width: '100%',
                                textAlign: 'left',
                                fontWeight: 'bold',
                                backgroundColor: SECONDARY.dark
                            }}
                        >
                            <Icon icon={this.state.collapseMetaInfo ? faChevronCircleRight : faChevronCircleDown} style={{ marginRight: '5px' }} />
                            Meta Information
                        </Button>
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
                        <Button
                            onClick={() => this.toggle()}
                            style={{
                                marginTop: '5px',
                                width: '100%',
                                textAlign: 'left',
                                fontWeight: 'bold',
                                backgroundColor: SECONDARY.dark
                            }}
                        >
                            <Icon icon={this.state.collapse ? faChevronCircleRight : faChevronCircleDown} style={{ marginRight: '5px' }} />
                            Ontology Prefixes
                        </Button>
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
                    const itemPerLan = metaDescriptionsItem[language] + ' @' + language;
                    const itemValueInLang = metaDescriptionsItem[language];
                    return (
                        <tr style={{ fontSize: '12px' }} key={'description_title_' + itemKey + keyIndex++}>
                            <td style={{ paddingRight: '5px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                                <div style={{ float: 'left' }}>
                                    <b>{itemKey}:</b>
                                </div>
                            </td>
                            <td suppressContentEditableWarning={true} contentEditable={this.state.isEditing[itemKey]}>
                                {!this.state.isEditing[itemKey] ? itemPerLan : <Input defaultValue={itemValueInLang} />}
                            </td>
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
                        <td suppressContentEditableWarning={true} contentEditable={this.state.isEditing[itemKey]}>
                            {!this.state.isEditing[itemKey] ? obj[itemKey] : <Input defaultValue={obj[itemKey]} />}
                        </td>
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
                                    maxWidth: '94%',
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
            alert('Please selected the two commits to compare');
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
                    this.setState({ isLoadingForWidoco: false });
                    alert('Something went wrong, please try again after some time');
                }
            } catch (error) {
                this.setState({ isLoadingForWidoco: false });
                alert(error);
            }
        } else {
            alert('Something went wrong, Please Try again after some times');
        }
    };

    render() {
        let comparisonButton;
        if (this.state.openOntology.lookup_type === 'online' || this.state.openOntology.lookup_type === 'online-gitlab') {
            comparisonButton = (
                <div className="root" style={{ padding: '0 10px', width: this.props.width - 5 }}>
                    <Button
                        onClick={() => this.toggleComparison()}
                        style={{
                            marginTop: '5px',
                            width: '100%',
                            textAlign: 'left',
                            fontWeight: 'bold',
                            backgroundColor: SECONDARY.dark
                        }}
                    >
                        <Icon icon={this.state.collapseComparison ? faChevronCircleRight : faChevronCircleDown} style={{ marginRight: '5px' }} />
                        Ontology Comparison
                    </Button>
                    <Collapse isOpen={!this.state.collapseComparison}>
                        <div style={{ marginTop: '5px' }}>
                            <span style={{ fontSize: '15px', fontWeight: 600 }}>Please choose two commits to compare </span>{' '}
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
                        <Button style={{ backgroundColor: SECONDARY.dark, marginTop: '5px' }} onClick={this.showComparison}>
                            Show Comparison
                        </Button>
                        {this.state.isLoading ? (
                            <div className="text-center text-primary mt-4 mb-4">
                                {/*using a manual fixed scale value for the spinner scale! */}

                                <h2 className="h5">
                                    <span>
                                        <Icon icon={faSpinner} spin />
                                    </span>{' '}
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
            <ContentContainer
                id="RightSidebarContainer"
                expanded={this.state.expanded}
                width={this.props.width}
                initialRendering={this.state.initialRendering}
                style={{ width: this.props.width, position: 'absolute', height: this.props.height + 'px', marginTop: '55px' }}
            >
                <Container
                    className="pr-md-5 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 clearfix"
                    style={{
                        borderRadius: '10px',
                        borderBottomRightRadius: '0',
                        borderBottomLeftRadius: '0',
                        height: '50px',
                        marginLeft: '5px',
                        color: 'white',
                        backgroundColor: PRIMARY.dark,
                        marginTop: '10px'
                    }}
                >
                    <h4 style={{ width: this.props.width - 10, textAlign: 'center' }}>{this.state.title}</h4>
                </Container>
                <ButtonContainer
                    size="sm"
                    className="btn-primary"
                    expanded={this.state.expanded}
                    initialRendering={this.state.initialRendering}
                    duration={500}
                    style={{
                        margin: '0 0',
                        flexGrow: '1',
                        display: 'flex',
                        alignSelf: 'center',
                        width: '30px',
                        height: '30px',
                        borderRadius: '30px',
                        padding: 0,
                        border: 'solid 1px',
                        borderColor: '#525252',
                        backgroundColor: SECONDARY.dark,
                        float: 'left',
                        position: 'relative',
                        top: '-15px',
                        left: '-8px',
                        zIndex: 100
                    }}
                    onClick={this.collapseSidebar}
                >
                    <Icon icon={faAngleLeft} rotation={180} className="align-self-center" style={{ marginLeft: '7px', fontSize: '28px' }} />
                </ButtonContainer>
                <Container
                    className="pr-md-5 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 clearfix"
                    style={{
                        borderRadius: '10px',
                        borderTopRightRadius: '0',
                        borderTopLeftRadius: '0',
                        marginLeft: '5px',
                        color: 'black',
                        backgroundColor: '#ffffff',
                        marginTop: '-1px',
                        height: this.props.height + 'px',
                        position: 'absolute'
                        // zIndex: -500
                    }}
                >
                    <div style={{ width: this.props.width - 5, marginTop: '20px', marginLeft: '15px', display: 'inline-block' }}>
                        <span style={{ fontSize: '20px', fontWeight: 600 }}>Project Name: </span>
                        <span>{this.state.openProject.name}</span>
                    </div>
                    <div style={{ marginTop: '20px', marginLeft: '15px', display: 'inline-block', marginBottom: '10px' }}>
                        <span style={{ fontSize: '20px', fontWeight: 600 }}>Ontology Name: </span>
                        <span>{this.state.openOntology.name}</span>
                    </div>
                    {this.state.openOntology.lookup_type === 'online' || this.state.openOntology.lookup_type === 'online-gitlab' ? (
                        <div style={{ padding: '0 10px', width: this.props.width - 5, marginTop: '10px' }}>
                            <Button
                                onClick={() => this.toggleGitCollapse()}
                                style={{
                                    marginTop: '5px',
                                    width: '100%',
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    backgroundColor: SECONDARY.dark
                                }}
                            >
                                <Icon icon={this.state.gitCollapse ? faChevronCircleRight : faChevronCircleDown} style={{ marginRight: '5px' }} />
                                {this.state.openOntology.lookup_type === 'online' ? 'Github' : 'Gitlab'}
                            </Button>
                            <Collapse isOpen={!this.state.gitCollapse}>
                                <Table bordered style={{ marginTop: '10px' }}>
                                    <tbody>
                                        <tr>
                                            <th style={{ width: '20px' }}>URL</th>
                                            <td style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{this.state.openOntology.lookup_path}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ width: '20px' }}>License</th>
                                            <td style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                                <a href={this.state.licenseURL ? this.state.licenseURL : null} target="_blank" rel="noreferrer">
                                                    {this.state.licenceInfo}
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ width: '20px' }}>Branch</th>
                                            <td style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{this.state.ontologyVersion}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Collapse>
                        </div>
                    ) : (
                        <div />
                    )}

                    <div style={{ width: this.props.width - 5 }}>{this.renderMetaInformation()}</div>
                    {comparisonButton}
                    <div style={{ padding: '0 10px', width: this.props.width - 5 }}>
                        <Button
                            title="Ontology Documentation"
                            onClick={this.getOntologyFileForDocumentation}
                            style={{
                                marginTop: '5px',
                                width: '100%',
                                textAlign: 'left',
                                fontWeight: 'bold',
                                backgroundColor: SECONDARY.dark
                            }}
                        >
                            <Icon icon={faBook} style={{ marginRight: '8px' }} />
                            Widoco Documentation
                        </Button>
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
                </Container>
            </ContentContainer>
        );
    }
}

RightSideBar.propTypes = {
    title: PropTypes.string,
    updateEvent: PropTypes.func.isRequired,
    initialState: PropTypes.bool.isRequired,
    heightUpdateEvent: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    metaInformation: PropTypes.object,
    selectedProject: PropTypes.object.isRequired,
    selectedOntology: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        metaInformation: state.ResourceRelationModelReducer.metaInformation,
        selectedProject: state.ResourceRelationModelReducer.project,
        selectedOntology: state.ResourceRelationModelReducer.ontology
    };
};

export default connect(mapStateToProps)(RightSideBar);

const expandButtonAnimation = ({ expanded, initialRendering }) => {
    if (!initialRendering) {
        return keyframes`
  from {
    transform: rotate(${expanded ? -180 : 0}deg);
  }
  to {
    transform: rotate(${expanded ? 0 : 180}deg);
   
  }
`;
    }
    if (initialRendering) {
        return keyframes``;
    }
};

const ButtonContainer = styled.div`
    animation-name: ${expandButtonAnimation};
    animation-duration: 1000ms;
    cursor: pointer;
    transform: rotate(${props => (props.expanded ? 0 : 180)}deg);
`;

const expandContentContainerAnimation = ({ expanded, width, initialRendering }) => {
    if (initialRendering) {
        return keyframes``;
    } else {
        return keyframes`
  from {
    right: ${expanded ? -(width - 10) : 8}px;
  }
  to {
    right: ${expanded ? 8 : -(width - 10)}px;
   
  }
`;
    }
};

const ContentContainer = styled.aside`
    animation-name: ${expandContentContainerAnimation};
    animation-duration: 400ms;
    right: ${props => (props.expanded ? 8 : -(props.width - 10))}px;
`;
