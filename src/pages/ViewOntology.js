import React, { Component } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner, faAlignJustify, faDownload, faBrain, faProjectDiagram, faHatWizard } from '@fortawesome/free-solid-svg-icons';
import { getOntologyBy } from '../network/GetOntologyData';
import { initializeResourceRelationModel } from 'redux/actions/rrm_actions';
import { Button } from 'reactstrap';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OntologyViewRoot from '../components/ontologyView/OntologyViewRoot';
import OntologyViewAsTTL from '../components/ontologyView/OntologyViewAsTTL';
import PlayGroundUI from '../components/PlayGround/PlayGroundUi';
import GraphVisUi from '../components/GraphVis/GraphVisUi';

import { faGalacticRepublic } from '@fortawesome/free-brands-svg-icons/faGalacticRepublic';
import DonatelloGraph from '../GraphVisLib/implementation/Renderes/gizmoRenderer/DonatelloGraph';

class ViewOntology extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            ontologyFileContent: undefined,
            error: false,
            errorMsg: '',
            modeOfOperation: 'hybrid'
            // Additional states
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
        // console.log('fetching ontologies from backend');
        // console.log(this.props.match.params.ontologyId);
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
    selectModeOfOperation = val => {
        this.setState({
            modeOfOperation: val
        });
    };

    render() {
        // console.log(this.state);
        return (
            <div style={{ height: '100%' }}>
                {this.state.isLoading === false && (
                    <div style={{ display: 'flex', paddingTop: '5px', paddingLeft: '5px' }}>
                        <Tippy content="View hybrid modes of operations">
                            <span>
                                <Button
                                    color={this.state.modeOfOperation === 'hybrid' ? 'primary' : 'secondary'}
                                    size="sm"
                                    className="mr-1"
                                    onClick={() => this.selectModeOfOperation('hybrid')}
                                >
                                    <Icon icon={faBrain} />
                                </Button>
                            </span>
                        </Tippy>
                        {/*TEXT VIEW*/}
                        <Tippy content="View ontology as TTL file">
                            <span>
                                <Button
                                    color={this.state.modeOfOperation === 'text' ? 'primary' : 'secondary'}
                                    size="sm"
                                    className="mr-1"
                                    onClick={() => this.selectModeOfOperation('text')}
                                >
                                    <Icon icon={faAlignJustify} />
                                </Button>
                            </span>
                        </Tippy>

                        {/*Protege View*/}
                        {/*<Tippy content="Widget-based representation not available">
                            <span>
                                <Button
                                    disabled={true}
                                    color={this.state.modeOfOperation === 'protege' ? 'primary' : 'secondary'}
                                    size="sm"
                                    className="mr-1"
                                    onClick={() => this.selectModeOfOperation('protege')}
                                >
                                    <Icon icon={faHatWizard} />
                                </Button>
                            </span>
                        </Tippy>*/}

                        {/*Graph View*/}
                        <Tippy content="Graph Visualization">
                            <span>
                                <Button
                                    color={this.state.modeOfOperation === 'graph' ? 'primary' : 'secondary'}
                                    size="sm"
                                    className="mr-1"
                                    onClick={() => this.selectModeOfOperation('graph')}
                                >
                                    <Icon icon={faProjectDiagram} />
                                </Button>
                            </span>
                        </Tippy>

                        {/*PlayGround View*/}
                        {/*  <Tippy content="PlayGround (Temporary)">
                            <span>
                                <Button
                                    color={this.state.modeOfOperation === 'playground' ? 'primary' : 'secondary'}
                                    size="sm"
                                    className="mr-1"
                                    onClick={() => this.selectModeOfOperation('playground')}
                                >
                                    <Icon style={{ fontSize: '1.3em', verticalAlign: '-0.175em' }} icon={faGalacticRepublic} />
                                </Button>
                            </span>
                        </Tippy>*/}

                        {/*DOWNLOAD BUTTON */}
                        <Tippy content="Download ontology as TTL file (not implemented yet)">
                            <span style={{ position: 'absolute', right: '5px' }}>
                                <Button size="sm" disabled={true}>
                                    <Icon icon={faDownload} />
                                </Button>
                            </span>
                        </Tippy>

                        {/*<h1*/}
                        {/*    className="noSelect pl-3 pr-3"*/}
                        {/*    style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', textAlign: 'center', height: '45px' }}*/}
                        {/*    title={this.headerValue}*/}
                        {/*>*/}
                        {/*    {this.headerValue}*/}
                        {/*</h1>*/}
                    </div>
                )}

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
                    {this.state.isLoading === false && this.state.error === false && this.state.modeOfOperation === 'hybrid' && (
                        <OntologyViewRoot
                            project={this.props.location.project}
                            ontologyName={this.props.location.ontologyName}
                            leftSideExpanded={this.leftSideExpanded}
                            rightSideExpanded={this.rightSideExpanded}
                            toggleLeftSideExpanded={this.setLeftSideExpanded}
                            toggleRightSideExpanded={this.setRightSideExpanded}
                        />
                    )}
                    {this.state.isLoading === false && this.state.error === false && this.state.modeOfOperation === 'text' && <OntologyViewAsTTL />}
                    {this.state.isLoading === false && this.state.error === false && this.state.modeOfOperation === 'graph' && (
                        <GraphVisUi DonatelloGraph={this.DonatelloGraph} visualizationTabIsActive={this.state.modeOfOperation === 'graph'} />
                    )}
                    {this.state.isLoading === false && this.state.error === false && this.state.modeOfOperation === 'playground' && <PlayGroundUI />}
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
