import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faChevronCircleDown, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, CardBody, Collapse, Table } from 'reactstrap';
import styled from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { fontStyled } from '../../styledComponents/styledFont';
import { MIN_WIDTH_FOR_MONITOR, SMALL_SCREEN_WIDTH } from '../../styledComponents/styledComponents';
import { colorStyled } from '../../styledComponents/styledColor';
import Tippy from '@tippyjs/react';
import { getBranchFromUrl, getLicense } from '../../network/GithubAPICalls';
import { getGitlabBranchFromUrl, getGitlabLicense } from '../../network/GitlabAPICalls';

const ModalFooter = styled.div`
    height: 60px;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    border-top: 1px solid #ccc;
`;

const CloseButton = styled(Button)`
    float: right;
    font-weight: bold;
`;

class MetaDataModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            collapseComparison: false,
            collapseMetaInfo: false,
            ontologyVersion: '',
            licenceInfo: 'No Licence Available',
            licenseURL: null,
            gitCollapse: false
        };
    }

    componentDidMount = async () => {
        const theOntology = this.props.selectedOntology;
        let version = 'internal';
        let license = null;
        if (theOntology.lookup_type === 'online') {
            version = getBranchFromUrl(theOntology.lookup_path);
            license = await getLicense(theOntology.lookup_path).then(lic => {
                license = lic;
                return lic;
            });
        } else if (theOntology.lookup_type === 'online-gitlab') {
            version = getGitlabBranchFromUrl(theOntology.lookup_path);
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
            ontologyVersion: version,
            licenceInfo: licenseName,
            licenseURL: licenseURL
        });
    };

    toggle = () => {
        this.setState(prevState => ({
            collapse: !prevState.collapse
        }));
    };

    toggleMetaInformation = () => {
        this.setState(prevState => ({
            collapseMetaInfo: !prevState.collapseMetaInfo
        }));
    };

    toggleGitCollapse = () => {
        this.setState(prevState => ({
            gitCollapse: !prevState.gitCollapse
        }));
    };

    renderMetaDescription = obj => {
        let keyIndex = 0;
        return Object.keys(obj).map(itemKey => {
            const metaDescriptionsItem = obj[itemKey];
            if (itemKey === 'description' || itemKey === 'title') {
                return Object.keys(metaDescriptionsItem).map(language => {
                    const itemValueInLang = metaDescriptionsItem[language];

                    return (
                        <tr key={'description_title_' + itemKey + keyIndex++}>
                            <th style={{ textAlign: 'left' }}>{itemKey}:</th>
                            <td style={{ textAlign: 'left', wordBreak: 'break-word' }}>{itemValueInLang}</td>
                        </tr>
                    );
                });
            } else if (itemKey === 'iri' || itemKey === 'version') {
                return (
                    <tr key={'iri_version_' + itemKey + keyIndex++}>
                        <th style={{ textAlign: 'left' }}>{itemKey}</th>
                        <td style={{ textAlign: 'left', wordBreak: 'break-word' }}>{obj[itemKey]}</td>
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
                    <tr key={'prefix_' + shortKey}>
                        <td style={{ textAlign: 'left', wordBreak: 'break-word' }}>{shortKey}:</td>
                        <Tippy content={shortToLongValues[shortKey]}>
                            <td
                                style={{
                                    justifyContent: 'start',
                                    display: 'flex',
                                    overflow: 'hidden',
                                    wordBreak: 'break-word'
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
                            <Card>
                                <CardBody>
                                    <Table striped>
                                        <tbody>{this.renderMetaDescription(metaInformation[key])}</tbody>
                                    </Table>
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
                            <Card>
                                <CardBody style={{ padding: '0 5px' }}>
                                    <Table striped id="simple-board">
                                        <thead key={'prefixTable_' + key}>
                                            <tr key={'prefixRow_' + key}>
                                                <th style={{ textAlign: 'left' }}>Prefix</th>
                                                <th style={{ textAlign: 'left' }}>IRI</th>
                                            </tr>
                                        </thead>
                                        <tbody> {this.renderPrefixList(metaInformation[key])}</tbody>
                                    </Table>
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

    render() {
        return (
            <div>
                <Modal open={this.props.isModalOpen} onClose={this.props.toggle} aria-labelledby="modal-title" aria-describedby="modal-description">
                    <Box
                        sx={{
                            position: 'absolute',
                            padding: 0,
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '90%',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            paddingLeft: 4,
                            paddingRight: 4,
                            borderRadius: 3,
                            textAlign: 'center',
                            maxHeight: '90%', // Add maximum height
                            display: 'flex',
                            flexDirection: 'column',

                            '@media (min-width: ${SMALL_SCREEN_WIDTH})': {
                                width: '100%'
                            }
                        }}
                    >
                        <div
                            style={{
                                height: '60px',
                                color: '#000000',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottom: '1px solid #ccc'
                            }}
                        >
                            <h3>Metadata Information</h3>
                        </div>
                        <div style={{ height: 'calc(100% - 120px)', overflow: 'auto' }}>
                            <div>
                                <div style={{ textAlign: 'left', marginLeft: '15px', margin: '15px' }}>
                                    <HeadingSpan style={{ fontWeight: 600 }}>Project Name: </HeadingSpan>
                                    <HeadingSpan>{this.props.selectedProject.name}</HeadingSpan>
                                </div>
                                <div style={{ textAlign: 'left', marginLeft: '15px', margin: '15px' }}>
                                    <HeadingSpan style={{ fontWeight: 600 }}>Ontology Name: </HeadingSpan>
                                    <HeadingSpan>{this.props.selectedOntology.name}</HeadingSpan>
                                </div>
                            </div>
                            <div>{this.renderMetaInformation()}</div>
                            <div>
                                {this.props.selectedOntology.lookup_type === 'online' ||
                                this.props.selectedOntology.lookup_type === 'online-gitlab' ? (
                                    <div style={{ padding: '0 10px' }}>
                                        <StyledButton onClick={() => this.toggleGitCollapse()}>
                                            <StyledIcon icon={this.state.gitCollapse ? faChevronCircleRight : faChevronCircleDown} />
                                            {this.props.selectedOntology.lookup_type === 'online' ? 'Github' : 'Gitlab'}
                                        </StyledButton>
                                        <Collapse isOpen={!this.state.gitCollapse}>
                                            <Table striped>
                                                <tbody>
                                                    <tr>
                                                        <th style={{ textAlign: 'left' }}>URL</th>
                                                        <td style={{ textAlign: 'left', wordBreak: 'break-word' }}>
                                                            {this.props.selectedOntology.lookup_path}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ textAlign: 'left' }}>License</th>
                                                        <td style={{ textAlign: 'left', wordBreak: 'break-word' }}>
                                                            <a
                                                                href={this.state.licenseURL ? this.state.licenseURL : null}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                {this.state.licenceInfo}
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ textAlign: 'left' }}>Branch</th>
                                                        <td style={{ textAlign: 'left', wordBreak: 'break-word' }}>{this.state.ontologyVersion}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Collapse>
                                    </div>
                                ) : (
                                    <div />
                                )}
                            </div>
                        </div>
                        <ModalFooter>
                            <div style={{ textAlign: 'right' }}>
                                <CloseButton onClick={this.props.toggle}>Close</CloseButton>
                            </div>
                        </ModalFooter>
                    </Box>
                </Modal>
            </div>
        );
    }
}

MetaDataModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    selectedOntology: PropTypes.object.isRequired,
    metaInformation: PropTypes.object,
    selectedProject: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        metaInformation: state.ResourceRelationModelReducer.metaInformation,
        selectedOntology: state.ResourceRelationModelReducer.ontology,
        selectedProject: state.ResourceRelationModelReducer.project
    };
};

export default connect(mapStateToProps)(MetaDataModal);

const HeadingSpan = styled.span`
    font-size: 16px;
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
    height: 40px;
    width: 100%;
    text-align: left;
    font-weight: bold;
    font-size: ${fontStyled.fontSize.NormalText};
    background-color: ${colorStyled.SECONDARY.dark};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;
