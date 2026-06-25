import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ClampLines from 'react-clamp-lines';
import ProjectPermissionModal from './Modals/ProjectPermissionModal';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTheme } from '@emotion/react';
import { StyledProjectCard, StyledCardHeader, StyledLabel, StyledIcon, StyledCardBody } from 'styledComponents/styledComponents';
class ProjectIndexCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEmailModal: false
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    emailSent = () => {
        this.setState({ showEmailModal: false });
    };

    render() {
        const { theme } = this.props;
        return (
            <div>
                <StyledProjectCard className="pl-1" onDragStart={this.preventDraggingOfItem}>
                    <StyledCardHeader>
                        <StyledLabel style={{ width: '90%' }} className="pl-1 pr-1 pt-sm-0 pb-sm-0 mt-1 mb-1">
                            <div style={{ display: 'flex', paddingRight: '5px' }}>
                                <div style={{ overflowWrap: 'break-word', fontWeight: '500' }}> {this.props.inputData.name} </div>
                            </div>
                        </StyledLabel>
                        <StyledIcon
                            icon={faEnvelope}
                            hidden={!this.props.user}
                            color={theme.palette.text.primary}
                            onClick={() => {
                                this.setState({ showEmailModal: true });
                            }}
                        />
                        <ProjectPermissionModal
                            toggle={() => {
                                this.setState(prevState => ({ showEmailModal: !prevState.showEmailModal }));
                            }}
                            showDialog={this.state.showEmailModal}
                            projectDetails={this.props.inputData}
                            callback={() => {
                                this.emailSent();
                            }}
                            userEmail={this.props.user ? this.props.user.userEmail : 'terminology-service@tib.eu'}
                            userName={this.props.user ? this.props.user.displayName : 'terminology-service@tib.eu'}
                            title={`Get Access to ${this.props.inputData.name} Project`}
                        />
                    </StyledCardHeader>
                    <StyledCardBody>
                        <ClampLines
                            text={this.props.inputData.description ? this.props.inputData.description : 'No description available'}
                            id="custom"
                            lines={2}
                            moreText="Read More"
                            lessText="Show less"
                            className="custom-class"
                        />
                    </StyledCardBody>
                </StyledProjectCard>
            </div>
        );
    }
}

ProjectIndexCards.propTypes = {
    inputData: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default compose(connect(mapStateToProps))(withTheme(ProjectIndexCards));
