import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, NavLink as RouterNavLink, withRouter } from 'react-router-dom';
import ROUTES from '../constants/routes';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faUnlockAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { reverse } from 'named-urls';
import { Button, Navbar } from 'reactstrap';
import Logo from './Logo';

export default class OntologyIndexCards extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        console.log(this.props.inputData);
        return (
            <div>
                <StyledCard className="pl-1 pr-1" onDragStart={this.preventDraggingOfItem}>
                    <StyledCardHeader>
                        <StyledLink
                            to={reverse(ROUTES.VIEW_ONTOLOGY, { ontologyId: this.props.inputData.uuid })}
                            className="p-0 noSelect"
                            onDragStart={this.preventDraggingOfItem}
                        >
                            <div style={{ display: 'flex', paddingRight: '5px' }}>
                                <div>
                                    <Icon className="mr-1" icon={faUnlockAlt} />
                                </div>
                                <div> {this.props.inputData.name} </div>
                                <div>
                                    <Icon className="ml-1" icon={faCheck} />
                                </div>
                            </div>
                        </StyledLink>
                    </StyledCardHeader>

                    <StyledCardBody>
                        {this.props.inputData.description ? this.props.inputData.description : 'No description available'}
                    </StyledCardBody>
                </StyledCard>
            </div>
        );
    }
}

OntologyIndexCards.propTypes = {
    inputData: PropTypes.object.isRequired
};

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

const StyledLink = styled(Link)`
    padding: 10px;
    color: white;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }

    :hover {
        color: #ffffff;
    }
`;

const StyledCardHeader = styled.div`
    border-radius: 10px 10px 0 0;
    border: 1px solid black;
    padding: 5px;
    color: white;
    background: #4388cc;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;

const StyledCardBody = styled.div`
    padding: 5px;
    border: 1px solid black;
    border-top: none;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;
