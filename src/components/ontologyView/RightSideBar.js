import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse, Table } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faChevronCircleDown, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { MIN_WIDTH_FOR_MONITOR } from '../../styledComponents/styledComponents';
import { getBranchFromUrl, getLicense } from '../../network/GithubAPICalls';
import { getGitlabBranchFromUrl, getGitlabLicense } from '../../network/GitlabAPICalls';
import { colorStyled } from '../../styledComponents/styledColor';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { fontStyled } from '../../styledComponents/styledFont';

class RightSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    toggleGitCollapse = () => {
        this.setState({ gitCollapse: !this.state.gitCollapse });
    };

    render() {
        return (
            <>
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
                            <HeadingSpan>{this.props.selectedProject.name}</HeadingSpan>
                        </div>
                        <div style={{ marginTop: '10px', marginLeft: '15px', marginBottom: '10px' }}>
                            <HeadingSpan style={{ fontWeight: 600 }}>Ontology Name: </HeadingSpan>
                            <HeadingSpan>{this.props.selectedOntology.name}</HeadingSpan>
                        </div>
                        {this.props.selectedOntology.lookup_type === 'online' || this.props.selectedOntology.lookup_type === 'online-gitlab' ? (
                            <div style={{ padding: '0 10px', marginTop: '10px' }}>
                                <StyledButton onClick={() => this.toggleGitCollapse()}>
                                    <StyledIcon icon={this.state.gitCollapse ? faChevronCircleRight : faChevronCircleDown} />
                                    {this.props.selectedOntology.lookup_type === 'online' ? 'Github' : 'Gitlab'}
                                </StyledButton>
                                <Collapse isOpen={!this.state.gitCollapse}>
                                    <Table bordered style={{ marginTop: '10px' }}>
                                        <tbody>
                                            <tr>
                                                <th style={{ width: '20px' }}>
                                                    <HeadingSpan>URL</HeadingSpan>
                                                </th>
                                                <td style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                                    <HeadingSpan>{this.props.selectedOntology.lookup_path}</HeadingSpan>
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

const StyledScrollbarDiv = styled.div`
    height: calc(100% - 65px);
    margin-top: -15px;
`;
