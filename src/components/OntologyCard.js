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
import { MODE_OF_OPERATIONS } from '../constants/globalConstants';
import { MIN_WIDTH_FOR_MONITOR } from '../styledComponents/styledComponents';
import ClampLines from 'react-clamp-lines';
import { faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons/faFile';
import Cookies from 'js-cookie';
import { redux_addOntology, redux_removeOntology } from '../redux/actions/rrm_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fontStyled } from '../styledComponents/styledFont';
import { colorStyled } from '../styledComponents/styledColor';
import AlertPopUp from './ReusableComponents/AlertPopUp';

class OntologyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPopUpOpen: false,
            popUpMessage: '',
            isAuthorized: false
        };
    }
    componentDidMount() {}

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

    // Function to open the alert popup box asking the user if they want to delete the project
    deleteOntology = async event => {
        //delete Ontology...
        event.preventDefault();
        this.setState({ isPopUpOpen: !this.state.isPopUpOpen, popUpMessage: 'Are you sure you want to Delete this ontology ?', isAuthorized: true });
    };

    onclick = async () => {
        console.log('Ontology data:', this.props.inputData);
        await this.props.redux_removeOntology();
        await this.props.redux_addOntology(this.props.inputData);
        Cookies.set(MODE_OF_OPERATIONS, 'hybrid');
    };

    // Callback function for the alert popup box to handle the user's confirmation
    PopUpCallbackToDeleteOntology = async confirmed => {
        if (confirmed && this.state.isAuthorized) {
            try {
                const allows = await userIsAllowdToUploadOntology();
                if (allows.result === true) {
                    deleteOntology(this.props.inputData.uuid).then(res => {
                        if (res.success === true) {
                            this.props.callback(res.result);
                        }
                    });
                } else {
                    this.setState({
                        isPopUpOpen: !this.state.isPopUpOpen,
                        popUpMessage: 'You are not authorized to delete this ontology',
                        isAuthorized: false
                    });
                }
            } catch (rejectedValue) {
                console.log(rejectedValue);
            }
        }
    };

    render() {
        const { isPopUpOpen, popUpMessage } = this.state;
        return (
            <div>
                <StyledCard className="pl-1 pr-1" onDragStart={this.preventDraggingOfItem}>
                    <AlertPopUp
                        bodyText={popUpMessage}
                        isOpen={isPopUpOpen}
                        onClose={() => this.setState({ isPopUpOpen: false })}
                        isConfirm={confirmed => this.PopUpCallbackToDeleteOntology(confirmed)}
                    />
                    <StyledCardHeader>
                        {this.props.currentUser !== 0 && this.props.currentUser !== null && (
                            <StyledButton
                                color="white"
                                title="Delete Ontology"
                                onClick={this.deleteOntology}
                                style={{ float: 'right', padding: '0px', marginLeft: 'auto', marginRight: '10px' }}
                            >
                                <StyledIcon icon={faTrash} />
                            </StyledButton>
                        )}
                        <StyledButton
                            color="white"
                            title="download ontology"
                            onClick={this.getOntologiesForDownloads}
                            style={{
                                float: 'right',
                                padding: '0px',
                                marginLeft: 'auto',
                                marginRight: '10px'
                            }}
                        >
                            <StyledIcon icon={faDownload} />
                        </StyledButton>
                        <StyledLink
                            to={{
                                pathname: reverse(ROUTES.VIEW_ONTOLOGY),
                                search: `?view=hybrid&ontologyId=${this.props.inputData.uuid}`,
                                ontologyVersion: this.props.ontologyVersion
                            }}
                            onMouseDown={this.onclick}
                            className="p-0 noSelect"
                            onDragStart={this.preventDraggingOfItem}
                        >
                            {this.props.inputData.lookup_type === 'online' ? (
                                <StyledIcon style={{ float: 'left', marginRight: '8px', marginTop: '4px' }} icon={faGithub} />
                            ) : this.props.inputData.lookup_type === 'online-gitlab' ? (
                                <StyledIcon style={{ float: 'left', marginRight: '10px', marginTop: '4px' }} icon={faGitlab} />
                            ) : (
                                <StyledIcon style={{ float: 'left', marginRight: '10px', marginTop: '4px' }} icon={faFile} />
                            )}
                            <div style={{ fontWeight: '500', textDecoration: 'underline' }}>
                                <span>{this.props.inputData.name}</span>
                            </div>
                        </StyledLink>
                    </StyledCardHeader>

                    <StyledCardBody>
                        {this.props.inputData.lookup_type === 'online' || this.props.inputData.lookup_type === 'online-gitlab' ? (
                            <div style={{ marginBottom: '0.5%' }}>
                                <span style={{ fontWeight: '500' }}>Git Branch:</span>
                                <span style={{ marginLeft: '5px' }}>{this.props.inputData.gitBranch}</span>
                                <span style={{ fontWeight: '500', marginLeft: '8px' }}>Version: </span>
                                <span> {this.props.inputData.commitStatus}</span>
                            </div>
                        ) : (
                            <></>
                        )}
                        <span style={{ fontWeight: '500', display: 'block', float: 'left', marginRight: '5px' }}>Description:</span>
                        <span style={{ display: 'block' }}>
                            <ClampLines
                                text={this.props.inputData.description ? this.props.inputData.description : 'No description available'}
                                id="custom"
                                lines={2}
                                moreText="Read More"
                                lessText="Show less"
                                className="custom-class"
                            />
                        </span>
                    </StyledCardBody>
                </StyledCard>
            </div>
        );
    }
}

OntologyCard.propTypes = {
    currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
    inputData: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
    ontologyVersion: PropTypes.string.isRequired,
    redux_addOntology: PropTypes.func.isRequired,
    redux_removeOntology: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    redux_removeOntology: () => dispatch(redux_removeOntology()),
    redux_addOntology: data => dispatch(redux_addOntology(data))
});

export default withRouter(connect(null, mapDispatchToProps)(OntologyCard));

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
        color: ${colorStyled.CONTAINER_BACKGROUND_COLOR};
    }
`;

const StyledCardHeader = styled.div`
    border-radius: 10px 10px 0 0;
    border: 1px solid ${colorStyled.PRIMARY.dark};
    padding: 5px;
    color: black;
    background: ${colorStyled.PRIMARY.light};
    font-size: ${fontStyled.fontSize.NormalText};
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
    :hover {
        background: ${colorStyled.SECONDARY.dark};
    }
    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

const StyledCardBody = styled.div`
    padding: 5px;
    border: 1px solid ${colorStyled.PRIMARY.dark};
    border-top: none;
    font-size: ${fontStyled.fontSize.NormalText};
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

const StyledButton = styled(Button)`
    :hover {
        color: ${colorStyled.CONTAINER_BACKGROUND_COLOR};
    }
`;

const StyledIcon = styled(Icon)`
    font-size: ${fontStyled.fontSize.NormalText};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;
