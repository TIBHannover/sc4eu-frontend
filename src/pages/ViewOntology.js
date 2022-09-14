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

class ViewOntology extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            ontologyFileContent: undefined,
            error: false,
            errorMsg: '',
            modeOfOperation: 'hybrid'
        };

        this.DonatelloGraph = new DonatelloGraph();
        this.headerValue = 'This is the View of the Ontology Data ';
        this.leftSideExpanded = true;
        this.rightSideExpanded = true;
    }

    componentDidMount() {
        // on mount we fetch all Ontologies
        this.getOntologyFromBackend();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.ui_tab_selectorChanges !== this.props.ui_tab_selectorChanges) {
            this.setState({ modeOfOperation: 'hybrid' });
        }
    }

    /** Functions forwarded to view Root for handling state Updates **/
    setLeftSideExpanded = val => {
        this.leftSideExpanded = val;
    };
    setRightSideExpanded = val => {
        this.rightSideExpanded = val;
    };

    getOntologyFromBackend = () => {
        // TODO: refactor>? getOntologyByID -> getJSONMOdel For ontology ID
        getOntologyBy(this.props.match.params.ontologyId).then(res => {
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
        return (
            <div style={{ height: '100vh', backgroundColor: PRIMARY.lighter }}>
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
                    {this.state.isLoading === false && this.state.error === false && this.props.location.modeOfOperations === 'hybrid' && (
                        <div>
                            <OntologyViewRoot
                                leftSideExpanded={this.leftSideExpanded}
                                rightSideExpanded={this.rightSideExpanded}
                                toggleLeftSideExpanded={this.setLeftSideExpanded}
                                toggleRightSideExpanded={this.setRightSideExpanded}
                            />
                        </div>
                    )}
                    {this.state.isLoading === false && this.state.error === false && this.props.location.modeOfOperations === 'text' && (
                        <OntologyViewAsTTL />
                    )}
                    {this.state.isLoading === false && this.state.error === false && this.props.location.modeOfOperations === 'graph' && (
                        <GraphVisUi
                            DonatelloGraph={this.DonatelloGraph}
                            visualizationTabIsActive={this.props.location.modeOfOperations === 'graph'}
                        />
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
        ui_tab_selectorChanges: state.globalUIReducer.ui_tab_selectorChanges
    };
};

ViewOntology.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            ontologyId: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    location: PropTypes.object.isRequired,
    initializeResourceRelationModel: PropTypes.func.isRequired,
    ui_tab_selectorChanges: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => ({
    initializeResourceRelationModel: payload => dispatch(initializeResourceRelationModel(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewOntology);
