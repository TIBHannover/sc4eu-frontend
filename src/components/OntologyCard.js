import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ROUTES from '../constants/routes';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { reverse } from 'named-urls';
import { Button } from 'reactstrap';
import { deleteOntology, userIsAllowdToUploadOntology } from '../network/ontologyIndexing';
import { SELECTED_ONTOLOGY_SESSION } from '../constants/globalConstants';
import { PRIMARY, SECONDARY } from '../styledComponents/styledComponents';

export default class OntologyIndexCards extends Component {
    componentDidMount() {
        window.localStorage.clear();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    deleteOntology = async event => {
        //delete Ontology...
        event.preventDefault();

        const isConfirmed = window.confirm('Are you sure you want to Delete this ontology?');
        if (!isConfirmed) {
            return;
        }

        try {
            const allows = await userIsAllowdToUploadOntology();
            if (allows.result === true) {
                console.log(this.props.inputData.uuid);

                deleteOntology(this.props.inputData.uuid).then(res => {
                    if (res.success === true) {
                        this.props.callback(res.result);
                    }
                });
            } else {
                alert('You are not authorized to delete this ontology');
            }
        } catch (rejectedValue) {
            console.log(rejectedValue);
        }
    };

    onclick = () => {
        sessionStorage.removeItem(SELECTED_ONTOLOGY_SESSION);
        sessionStorage.setItem(SELECTED_ONTOLOGY_SESSION, JSON.stringify(this.props.inputData));
    };

    render() {
        return (
            <div>
                <StyledCard className="pl-1 pr-1" onDragStart={this.preventDraggingOfItem}>
                    <StyledCardHeader>
                        <StyledLink
                            to={{
                                pathname: reverse(ROUTES.VIEW_ONTOLOGY, {
                                    ontologyId: this.props.inputData.uuid
                                }),
                                modeOfOperations: 'hybrid'
                            }}
                            onClick={this.onclick}
                            className="p-0 noSelect"
                            onDragStart={this.preventDraggingOfItem}
                        >
                            <div style={{ display: 'flex', paddingRight: '5px' }}>
                                <div> {this.props.inputData.name} </div>
                                <Button
                                    color="black"
                                    size="sm"
                                    title="Delete Ontology"
                                    onClick={this.deleteOntology}
                                    style={{ float: 'right', padding: '0px', paddingLeft: '5px', marginLeft: 'auto' }}
                                >
                                    <Icon icon={faTrash} color={'black'} />
                                </Button>
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
    inputData: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired
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
    color: black;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }

    :hover {
        color: white;
    }
`;

const StyledCardHeader = styled.div`
    border-radius: 10px 10px 0 0;
    border: 1px solid ${PRIMARY.dark};
    padding: 5px;
    color: black;
    background: ${PRIMARY.light};
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
    :hover {
        background: ${SECONDARY.dark};
    }
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
