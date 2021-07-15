import React, { Component } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner, faAlignJustify, faDownload, faBrain } from '@fortawesome/free-solid-svg-icons';
import { getOntologyBy } from '../network/GetOntologyData';
import { initializeResourceRelationModel } from 'redux/actions/rrm_actions';
import { Button } from 'reactstrap';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OntologyViewRoot from '../components/ontologyView/OntologyViewRoot';
import OntologyViewAsTTL from '../components/ontologyView/OntologyViewAsTTL';

class ViewOntology extends Component {
    constructor(props) {
        super(props);

        this.state = { isLoading: true, ontologyFileContent: undefined, error: false, errorMsg: '', hybridModeActive: true, textModeActive: false };
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

    selectHybridMode = () => {
        this.setState({ hybridModeActive: true, textModeActive: false });
    };
    selectTextMode = () => {
        this.setState({ hybridModeActive: false, textModeActive: true });
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
                                    color={this.state.hybridModeActive ? 'primary' : 'secondary'}
                                    size="sm"
                                    className="mr-1"
                                    onClick={this.selectHybridMode}
                                >
                                    <Icon icon={faBrain} />
                                </Button>
                            </span>
                        </Tippy>

                        <Tippy content="View ontology as TTL file">
                            <span>
                                <Button
                                    color={this.state.textModeActive ? 'primary' : 'secondary'}
                                    size="sm"
                                    className="mr-1"
                                    onClick={this.selectTextMode}
                                >
                                    <Icon icon={faAlignJustify} />
                                </Button>
                            </span>
                        </Tippy>
                        <Tippy content="Download ontology as TTL file">
                            <span style={{ position: 'absolute', right: '5px' }}>
                                <Button size="sm">
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
                    {this.state.isLoading === false && this.state.error === false && this.state.hybridModeActive === true && <OntologyViewRoot />}
                    {this.state.isLoading === false && this.state.error === false && this.state.textModeActive === true && <OntologyViewAsTTL />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        rrModel: state.resourceRelationModelReducer
    };
};

ViewOntology.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewOntology);
