import React, { Component } from 'react';
import UploadOntologyModal from './UploadOntologyModal';
import OntologyIndexCards from './OntologyIndexCards';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ROUTES from 'constants/routes';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { UncontrolledTooltip } from 'reactstrap';
import { connect } from 'react-redux';
import { fontStyled } from '../styledComponents/styledFont';
import { withTheme } from '@emotion/react';
import { StyledSubHeadingDiv, StyledInfoSpan, StyledButtonProjectAndOntologyUpload, StyledContentDiv } from 'styledComponents/styledComponents';

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
        const { theme } = this.props;
        return (
            <div style={{ height: '100%', fontFamily: fontStyled.fontFamily }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link title="Projects List" to={ROUTES.PROJECT} style={{ marginLeft: '1%', color: theme.palette.primary.main }}>
                        <Icon icon={faAngleLeft} style={{ marginRight: '5px' }} />
                        <span>Back</span>
                    </Link>
                    <h4 style={{ padding: '10px', margin: '0 auto', color: theme.palette.secondary.main }}>
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
                    <StyledButtonProjectAndOntologyUpload
                        disabled={this.state.canNotUploadOntology}
                        title={'Please login to upload ontology'}
                        active={true}
                        onClick={() => {
                            this.setState({ showUploadModal: true });
                        }}
                    >
                        Upload Ontology
                    </StyledButtonProjectAndOntologyUpload>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(OntologyIndexInteractions));

