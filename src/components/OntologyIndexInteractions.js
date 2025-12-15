import React, { Component } from 'react';
import { Button } from 'reactstrap';
import UploadOntologyModal from './UploadOntologyModal';
import { MIN_WIDTH_FOR_MONITOR } from '../styledComponents/styledComponents';
import OntologyIndexCards from './OntologyIndexCards';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ROUTES from 'constants/routes';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { UncontrolledTooltip } from 'reactstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { colorStyled } from '../styledComponents/styledColor';
import { fontStyled } from '../styledComponents/styledFont';

class OntologyIndexInteractions extends Component {
    constructor(props) {
        super(props);
        this.state = { showUploadModal: false, activeTab: '1', canNotUploadOntology: true };
    }

    componentDidMount() {
        if (this.props.user && this.props.user !== 0) {
            this.setState({ canNotUploadOntology: false });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user !== this.props.user && this.props.user && this.props.user !== 0) {
            this.setState({ canNotUploadOntology: false });
        }
    }

    ontologyUploadComplete(param) {
        if (param.result === true) {
            this.setState({ showUploadModal: false });
            this.props.reloadAfterUpdate();
        }
    }

    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    };

    render() {
        const projectName = this.props.project_name.length > 50 ? this.props.project_name.substring(0, 50) + ' ...' : this.props.project_name;
        return (
            <div style={{ height: '100%', fontFamily: fontStyled.fontFamily }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link title="Projects List" to={ROUTES.PROJECT} style={{ marginLeft: '1%' }}>
                        <Icon icon={faAngleLeft} style={{ marginRight: '5px' }} />
                        <span>Back</span>
                    </Link>
                    <h4 style={{ padding: '10px', margin: '0 auto', color: colorStyled.SECONDARY.dark }}>
                        <u id="tootlipTarget">{projectName}</u> Project
                    </h4>
                    <UncontrolledTooltip style={{ maxWidth: '100%' }} target="tootlipTarget">
                        <u>{this.props.project_name}</u>
                    </UncontrolledTooltip>
                </div>
                <StyledSubHeadingDiv>
                    <StyledInfoSpan style={{ margin: '15px 15px 15px 15px', float: 'left' }}>
                        Click on one of the ontology below to view
                    </StyledInfoSpan>
                    <StyledButtonToUploadOntology
                        disabled={this.state.canNotUploadOntology}
                        title={'Please login to upload ontology'}
                        active={true}
                        onClick={() => {
                            this.setState({ showUploadModal: true });
                        }}
                    >
                        Upload Ontology
                    </StyledButtonToUploadOntology>
                    <hr className="mt-0 mb-2 ml-2 mr-2" />
                    <UploadOntologyModal
                        project_id={this.props.project_id}
                        access_type={this.props.access_type}
                        showDialog={this.state.showUploadModal}
                        toggle={() => {
                            this.setState(prevState => ({ showUploadModal: !prevState.showUploadModal }));
                        }}
                        callback={param => {
                            this.ontologyUploadComplete(param);
                        }}
                    />
                </StyledSubHeadingDiv>
                <StyledContentDiv>
                    {this.props.listOfOntology ? (
                        <OntologyIndexCards
                            ontologies={this.props.listOfOntology}
                            currentUser={this.props.user}
                            project_name={this.props.project_name}
                            reloadAfterUpdate={() => {
                                this.props.reloadAfterUpdate();
                            }}
                        />
                    ) : (
                        <div> No ontologies found in this project </div>
                    )}
                </StyledContentDiv>
            </div>
        );
    }
}

OntologyIndexInteractions.propTypes = {
    reloadAfterUpdate: PropTypes.func.isRequired,
    project_id: PropTypes.string.isRequired,
    project_name: PropTypes.string.isRequired,
    access_type: PropTypes.string.isRequired,
    listOfOntology: PropTypes.array.isRequired,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OntologyIndexInteractions);

const StyledHeadingDiv = styled.div`
    display: flex;
    height: 60px; /* Absolute height for all screen sizes */
    justify-content: center;
    text-align: center;
    align-items: center;
    background-color: ${colorStyled.PRIMARY.dark};
    border-radius: 10px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
`;

const StyledSubHeadingDiv = styled.div`
    height: 70px; /* Absolute height for all screen sizes */
`;

const StyledContentDiv = styled.div`
    height: calc(100% - 10px); /* Percentage height for different screen sizes */
`;

const StyledButtonToUploadOntology = styled(Button)`
    float: right;
    margin: 10px 15px 15px 0px;
    background-color: ${colorStyled.SECONDARY.dark};
    margin-left: 1%;
    font-size: ${fontStyled.fontSize.NormalText};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

const StyledInfoSpan = styled.span`
    font-size: ${fontStyled.fontSize.NormalText};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;
