import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ROUTES from '../constants/routes';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faBook, faDownload, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
import { reverse } from 'named-urls';
import { Button } from 'reactstrap';
import { deleteOntology, getOntologyById, userIsAllowdToUploadOntology } from '../network/ontologyIndexing';
import { MODE_OF_OPERATIONS, SELECTED_ONTOLOGY_SESSION } from '../constants/globalConstants';
import { PRIMARY, SECONDARY } from '../styledComponents/styledComponents';
import ClampLines from 'react-clamp-lines';
import { faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons/faFile';
import { getWidocoDocumentation } from '../network/GetOntologyData';
import { URL_GET_HTML_FILE_WIDOCO } from '../constants/services';
import Cookies from 'js-cookie';

export default class OntologyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

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

    getOntologyFileForDocumentation = async () => {
        try {
            this.setState({ isLoading: true });
            const res = await getOntologyById(this.props.inputData.uuid);
            const file = new File([res.ontology_data], this.props.inputData.name, { type: 'text/turtle' });
            const widocoRes = await getWidocoDocumentation(file);
            if (widocoRes === true) {
                setTimeout(() => {
                    window.open(URL_GET_HTML_FILE_WIDOCO, '_blank');
                    this.setState({ isLoading: false });
                }, 2000);
            } else {
                this.setState({ isLoading: false });
                alert('Something went wrong, please try again after some time');
            }
        } catch (error) {
            this.setState({ isLoading: false });
            alert(error);
        }
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
        Cookies.set(MODE_OF_OPERATIONS, 'hybrid');
    };

    render() {
        return (
            <div>
                {this.state.isLoading && (
                    <div className="text-center text-primary">
                        <h2 className="h5">
                            <span>
                                <Icon icon={faSpinner} spin style={{ marginRight: '5px' }} />
                            </span>
                            Loading Document
                        </h2>
                    </div>
                )}
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
                        <StyledButton
                            color="white"
                            size="sm"
                            title="Ontology Documentation"
                            onClick={this.getOntologyFileForDocumentation}
                            style={{
                                float: 'right',
                                padding: '0px',
                                marginLeft: 'auto',
                                marginRight: '10px'
                            }}
                        >
                            <Icon icon={faBook} />
                        </StyledButton>
                        <StyledLink
                            to={{
                                pathname: reverse(ROUTES.VIEW_ONTOLOGY),
                                search: `?ontologyId=${this.props.inputData.uuid}`,
                                ontologyVersion: this.props.ontologyVersion
                            }}
                            onClick={this.onclick}
                            className="p-0 noSelect"
                            onDragStart={this.preventDraggingOfItem}
                        >
                            {this.props.inputData.lookup_type === 'online' ? (
                                <Icon style={{ float: 'left', marginRight: '8px', marginTop: '4px' }} icon={faGithub} />
                            ) : this.props.inputData.lookup_type === 'online-gitlab' ? (
                                <Icon style={{ float: 'left', marginRight: '10px', marginTop: '4px' }} icon={faGitlab} />
                            ) : (
                                <Icon style={{ float: 'left', marginRight: '10px', marginTop: '4px' }} icon={faFile} />
                            )}
                            <div style={{ fontWeight: '500' }}> {this.props.inputData.name} </div>
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
