import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Label } from 'reactstrap';
import { MIN_WIDTH_FOR_MONITOR } from '../styledComponents/styledComponents';
import ClampLines from 'react-clamp-lines';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import ProjectPermissionModal from './Modals/ProjectPermissionModal';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fontStyled } from '../styledComponents/styledFont';
import { colorStyled } from '../styledComponents/styledColor';

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
        return (
            <div>
                <StyledCard className="pl-1" onDragStart={this.preventDraggingOfItem}>
                    <StyledCardHeader>
                        <StyledLabel style={{ width: '90%' }} className="pl-1 pr-1 pt-sm-0 pb-sm-0 mt-1 mb-1">
                            <div style={{ display: 'flex', paddingRight: '5px' }}>
                                <div style={{ overflowWrap: 'break-word', fontWeight: '500' }}> {this.props.inputData.name} </div>
                            </div>
                        </StyledLabel>
                        <StyledIcon
                            icon={faEnvelope}
                            hidden={!this.props.user}
                            color={colorStyled.SECONDARY.darker}
                            onClick={() => {
                                this.setState({ showEmailModal: true });
                            }}
                        />
                        <ProjectPermissionModal
                            toggle={() => {
                                this.setState({ showEmailModal: !this.state.showEmailModal });
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
                </StyledCard>
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

export default compose(connect(mapStateToProps))(ProjectIndexCards);

const StyledCard = styled.div`
    margin: 5px;
    padding: 0 !important;

    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;

const StyledLabel = styled(Label)`
    padding: 10px;
    font-size: ${fontStyled.fontSize.NormalText};
    color: black;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }

    // :hover {
    //     color: white;
    // }

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

const StyledCardHeader = styled.div`
    border-radius: 10px 10px 0 0;
    border: 1px solid ${colorStyled.PRIMARY.dark};
    padding: 2px;
    color: ${colorStyled.CONTAINER_BACKGROUND_COLOR};
    background: ${colorStyled.PRIMARY.light};
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }

    // :hover {
    //     background: ${colorStyled.SECONDARY.dark}; //00b4cc
    // }
`;

const StyledCardBody = styled.div`
    padding: 5px;
    border: 1px solid ${colorStyled.PRIMARY.dark};
    font-size: ${fontStyled.fontSize.NormalText};
    border-top: none;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

const StyledIcon = styled(Icon)`
    font-size: ${fontStyled.fontSize.NormalText};
    float: right;
    margin-top: 7px;
    margin-right: 5px;
    cursor: pointer;

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;
