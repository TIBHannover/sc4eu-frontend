import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ROUTES from '../constants/routes';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faUnlockAlt, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { reverse } from 'named-urls';
import { Button } from 'reactstrap';
import { deleteOntology, userIsAllowdToUploadOntology } from '../network/ontologyIndexing';
import { redux_OntologyTabIsVisible } from '../redux/actions/rrm_actions';
import { connect } from 'react-redux';

class OntologyIndexCards extends Component {
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
        this.props.getSelectedOntology({ isOntologyVisible: true, ontologyId: this.props.inputData.uuid });
        this.props.redux_OntologyTabIsVisible({ OntologyTabIsVisible: true, ontologyViewOptionIsVisible: true });
    };

    render() {
        return (
            <div>
                <div>
                    <StyledCard className="pl-1 pr-1" onDragStart={this.preventDraggingOfItem}>
                        <StyledCardHeader>
                            <StyledLink className="p-0 noSelect" onDragStart={this.preventDraggingOfItem} onClick={this.onclick}>
                                <div style={{ display: 'flex', paddingRight: '5px' }}>
                                    <> {this.props.inputData.name} </>
                                    <div>
                                        <Icon className="ml-1" icon={faCheck} />
                                    </div>
                                    <Button
                                        color="white"
                                        size="sm"
                                        title="Delete Ontology"
                                        onClick={this.deleteOntology}
                                        style={{ float: 'right', padding: '0px', paddingLeft: '5px', marginLeft: 'auto' }}
                                    >
                                        <Icon icon={faTrash} color={'white'} />
                                    </Button>
                                </div>
                            </StyledLink>
                            {/*<ViewOntology ontologyId={this.props.inputData.uuid} />*/}
                        </StyledCardHeader>

                        <StyledCardBody>
                            {this.props.inputData.description ? this.props.inputData.description : 'No description available'}
                        </StyledCardBody>
                    </StyledCard>
                </div>
            </div>
        );
    }
}

OntologyIndexCards.propTypes = {
    project: PropTypes.object.isRequired,
    inputData: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
    getSelectedOntology: PropTypes.func.isRequired,
    redux_OntologyTabIsVisible: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    redux_OntologyTabIsVisible: data => dispatch(redux_OntologyTabIsVisible(data))
});

export default connect(null, mapDispatchToProps)(OntologyIndexCards);

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
