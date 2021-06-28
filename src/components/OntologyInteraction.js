import React, { Component } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getOntologyBy } from '../network/GetOntologyData';
import { getJSON_ModelForOntology } from '../network/GetOntologyData';

import { initializeResourceRelationModel } from 'redux/actions/rrm_actions';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
class OntologyViewRoot extends Component {
    constructor(props) {
        super(props);

        this.state = { isLoading: true, ontologyFileContent: undefined };
        this.headerValue = 'This is the View of the Ontology Data ';
    }

    componentDidMount() {
        // on mount we fetch all Ontologies
        this.getOntologyFromBackend();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    getOntologyFromBackend = () => {
        // console.log('fetching ontologies from backend');
        // console.log(this.props.match.params.ontologyId);
        // TODO DEPRECATED
        getOntologyBy(this.props.match.params.ontologyId).then(res => {
            // console.log('we have the data!!!!!!', res);
            getJSON_ModelForOntology({ ontologyData: res.ontology_data }).then(jsModel => {
                console.log('>>> should call that redux function');
                // create json obj from the string
                const parsedModel = JSON.parse(jsModel);
                this.props.initializeResourceRelationModel(parsedModel);
                this.setState({ isLoading: false, ontologyFileContent: jsModel });
            });
        });
    };

    render() {
        // console.log(this.state);
        return (
            <div>
                <h1
                    className="noSelect pl-3 pr-3"
                    style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', textAlign: 'center' }}
                    title={this.headerValue}
                >
                    {this.headerValue}
                </h1>
                <div className="pl-1 pr-1">
                    {this.state.isLoading ? (
                        <div className="text-center text-primary mt-4 mb-4">
                            {/*using a manual fixed scale value for the spinner scale! */}

                            <h2 className="h5">
                                <span>
                                    <Icon icon={faSpinner} spin />
                                </span>{' '}
                                Loading
                            </h2>
                        </div>
                    ) : (
                        <div>
                            {' '}
                            <FormGroup>
                                <Label for="exampleText">Content</Label>
                                <Input type="textarea" readOnly name="text" id="ontologyContent" value={this.state.ontologyFileContent} />
                            </FormGroup>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        user: state.auth.user,
        rrModel: state.ResourceRelationModelReducer
    };
};

OntologyViewRoot.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            ontologyId: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    initializeResourceRelationModel: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    initializeResourceRelationModel: payload => dispatch(initializeResourceRelationModel(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(OntologyViewRoot);
