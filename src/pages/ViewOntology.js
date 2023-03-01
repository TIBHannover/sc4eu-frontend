import React, { Component } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getOntologyBy } from '../network/GetOntologyData';
import { initializeResourceRelationModel } from 'redux/actions/rrm_actions';
import 'tippy.js/dist/tippy.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OntologyViewRoot from '../components/ontologyView/OntologyViewRoot';
import OntologyViewAsTTL from '../components/ontologyView/OntologyViewAsTTL';
import GraphVisUi from '../components/GraphVis/GraphVisUi';
import DonatelloGraph from '../GraphVisLib/implementation/Renderes/gizmoRenderer/DonatelloGraph';
import { PRIMARY } from '../styledComponents/styledComponents';
import { MODE_OF_OPERATIONS } from '../constants/globalConstants';
import Cookies from 'js-cookie';
import { redux_alreadyLoadedOntology } from '../redux/actions/rrm_actions';

class ViewOntology extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            ontologyFileContent: undefined,
            error: false,
            errorMsg: '',
            ontologyID: ''
        };

        this.DonatelloGraph = new DonatelloGraph();
        this.headerValue = 'This is the View of the Ontology Data ';
        this.leftSideExpanded = true;
        this.rightSideExpanded = true;
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(this.props.location.search);
        const response = Object.fromEntries(urlParams);

        // Update the state with the ontologyID value from the query params
        this.setState({ ontologyID: response.ontologyId }, () => {
            // Fetch the ontology from the backend if it hasn't been loaded yet
            const loadedOntology = this.props.redux_getAlreadyLoadedOntology?.id;
            if (loadedOntology !== this.state.ontologyID) {
                this.props.redux_alreadyLoadedOntology({ id: this.state.ontologyID });
                this.getOntologyFromBackend();
            } else {
                this.setState({ isLoading: false, ontologyFileContent: 'not exported' });
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    /** Functions forwarded to view Root for handling state Updates **/
    setLeftSideExpanded = val => {
        this.leftSideExpanded = val;
    };
    setRightSideExpanded = val => {
        this.rightSideExpanded = val;
    };

    getOntologyFromBackend = () => {
        // TODO: refactor>? getOntologyByID -> getJSONMOdel For ontology ID
        getOntologyBy(this.state.ontologyID).then(res => {
            if (res.ontology_data) {
                // create json obj from the string
                const parsedModel = res.ontology_data;
                this.props.initializeResourceRelationModel(parsedModel);
                this.setState({ isLoading: false, ontologyFileContent: 'not exported' });
            } else {
                this.setState({ isLoading: false, error: true, errorMsg: 'Could not find this ontology' });
            }
        });
    };

    render() {
        const modeOfOperations = Cookies.get(MODE_OF_OPERATIONS);
        return (
            <div style={{ height: '90%', backgroundColor: PRIMARY.lighter }}>
                <div className="pl-1 pr-1">
                    {this.state.isLoading === true && (
                        <div className="text-center text-primary mt-4 mb-4">
                            {/*using a manual fixed scale value for the spinner scale! */}

                            <h2 className="h5">
                                <span>
                                    <Icon icon={faSpinner} spin />
                                </span>{' '}
                                Loading
                            </h2>
                        </div>
                    )}
                    {this.state.isLoading === false && this.state.error === true && <h1> {this.state.errorMsg}</h1>}
                    {this.state.isLoading === false && this.state.error === false && modeOfOperations === 'hybrid' && (
                        <div>
                            <OntologyViewRoot
                                leftSideExpanded={this.leftSideExpanded}
                                rightSideExpanded={this.rightSideExpanded}
                                toggleLeftSideExpanded={this.setLeftSideExpanded}
                                toggleRightSideExpanded={this.setRightSideExpanded}
                                ontologyVersion={this.props.location.ontologyVersion}
                            />
                        </div>
                    )}
                    {this.state.isLoading === false && this.state.error === false && modeOfOperations === 'text' && <OntologyViewAsTTL />}
                    {this.state.isLoading === false && this.state.error === false && modeOfOperations === 'graph' && (
                        <GraphVisUi DonatelloGraph={this.DonatelloGraph} visualizationTabIsActive={modeOfOperations === 'graph'} />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        rrModel: state.ResourceRelationModelReducer,
        ui_tab_selectorChanges: state.globalUIReducer.ui_tab_selectorChanges,
        redux_getAlreadyLoadedOntology: state.ResourceRelationModelReducer.ontologyID
    };
};

ViewOntology.propTypes = {
    location: PropTypes.object.isRequired,
    initializeResourceRelationModel: PropTypes.func.isRequired,
    ui_tab_selectorChanges: PropTypes.bool.isRequired,
    redux_getAlreadyLoadedOntology: PropTypes.func.isRequired,
    redux_alreadyLoadedOntology: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    initializeResourceRelationModel: payload => dispatch(initializeResourceRelationModel(payload)),
    redux_alreadyLoadedOntology: data => dispatch(redux_alreadyLoadedOntology(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewOntology);
