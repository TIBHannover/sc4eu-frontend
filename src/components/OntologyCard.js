import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ROUTES from '../constants/routes';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { reverse } from 'named-urls';
import { Button } from 'reactstrap';
import { deleteOntology, getOntologyById, userIsAllowdToUploadOntology } from '../network/ontologyIndexing';
import { SELECTED_ONTOLOGY_SESSION } from '../constants/globalConstants';
import { PRIMARY, SECONDARY } from '../styledComponents/styledComponents';
import ClampLines from 'react-clamp-lines';

export default class OntologyCard extends Component {
    componentDidMount() {
        window.localStorage.clear();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    getOntologiesForDownloads = () => {
        getOntologyById(this.props.inputData.uuid).then(res => {
            try {
                const blob = new Blob([res.ontology_data]);
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                // this.props.inputData.name  is name of the file and .ttl is the formate of the file
                link.download = this.props.inputData.name + '.ttl';
                link.href = url;
                link.click();
            } catch (error) {
                console.log('something went wrong');
            }
        });
    };

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
                        <StyledButton
                            color="white"
                            size="sm"
                            title="Delete Ontology"
                            onClick={this.deleteOntology}
                            style={{ float: 'right', padding: '0px', marginLeft: 'auto', marginRight: '10px' }}
                        >
                            <Icon icon={faTrash} />
                        </StyledButton>
                        <StyledButton
                            color="white"
                            size="sm"
                            title="download ontology"
                            onClick={this.getOntologiesForDownloads}
                            style={{
                                float: 'right',
                                padding: '0px',
                                marginLeft: 'auto',
                                marginRight: '10px'
                            }}
                        >
                            <Icon icon={faDownload} />
                        </StyledButton>
                        <StyledLink
                            to={{
                                pathname: reverse(ROUTES.VIEW_ONTOLOGY, {
                                    ontologyId: this.props.inputData.uuid
                                }),
                                ontologyVersion: this.props.ontologyVersion,
                                modeOfOperations: 'graph'
                            }}
                            onClick={this.onclick}
                            className="p-0 noSelect"
                            onDragStart={this.preventDraggingOfItem}
                        >
                            <div> {this.props.inputData.name} </div>
                        </StyledLink>
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

OntologyCard.propTypes = {
    inputData: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
    ontologyVersion: PropTypes.string.isRequired
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

const StyledButton = styled(Button)`
    :hover {
        color: white;
    }
`;
