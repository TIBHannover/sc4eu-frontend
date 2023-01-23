import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Button, Label } from 'reactstrap';
import { PRIMARY, SECONDARY } from '../styledComponents/styledComponents';
import { withRouter } from 'react-router';
import ClampLines from 'react-clamp-lines';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ProjectIndexCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditProjectModal: false
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        return (
            <div>
                <StyledCard className="pl-1" onDragStart={this.preventDraggingOfItem}>
                    <StyledCardHeader>
                        <StyledLabel className="pl-1 pr-1 pt-sm-0 pb-sm-0 mt-1 mb-1">
                            <div style={{ display: 'flex', paddingRight: '5px' }}>
                                <div style={{ overflowWrap: 'break-word', fontWeight: '500' }}> {this.props.inputData.name} </div>
                            </div>
                        </StyledLabel>
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            size={'lg'}
                            color={SECONDARY.darker}
                            style={{ float: 'right', marginTop: '5px', marginRight: '5px' }}
                            onClick={() => alert('under construction')}
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
    history: PropTypes.object.isRequired
};

export default withRouter(ProjectIndexCards);

const StyledButton = styled(Button)`
    :hover {
        color: white;
    }
`;

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
`;

const StyledCardHeader = styled.div`
    border-radius: 10px 10px 0 0;
    border: 1px solid ${PRIMARY.dark};
    padding: 2px;
    color: white;
    background: ${PRIMARY.light};
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }

    // :hover {
    //     background: ${SECONDARY.dark}; //00b4cc
    // }
`;

const StyledCardBody = styled.div`
    padding: 5px;
    border: 1px solid ${PRIMARY.dark};
    border-top: none;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;
