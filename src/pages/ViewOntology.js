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
import { MAX_WIDTH } from '../styledComponents/styledComponents';
import { redux_alreadyLoadedOntology } from '../redux/actions/rrm_actions';
import styled from 'styled-components';
import { colorStyled } from '../styledComponents/styledColor';

class ViewOntology extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            ontologyFileContent: undefined,
            error: false,
            errorMsg: '',
            ontologyID: '',
            modeOfOperations: 'hybrid'
        };

        this.DonatelloGraph = new DonatelloGraph();
        this.headerValue = 'This is the View of the Ontology Data ';
        this.leftSideExpanded = true;
        this.rightSideExpanded = true;
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(this.props.location.search);
        const response = Object.fromEntries(urlParams);

        // Update state and ensure ontologyID is set before fetching
        this.setState(
            {
                ontologyID: response.ontologyId
            },
            async () => {
                const loadedOntology = this.props.redux_getAlreadyLoadedOntology?.id;

                // Check if we need to fetch new data
                if (loadedOntology !== this.state.ontologyID) {
                    try {
                        await this.props.redux_alreadyLoadedOntology({ id: this.state.ontologyID });
                        await this.getOntologyFromBackend();
                    } catch (error) {
                        console.error('Error during ontology initialization:', error);
                    }
                } else {
                    this.setState({
                        isLoading: false,
                        ontologyFileContent: 'not exported'
                    });
                }
            }
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const urlParams = new URLSearchParams(this.props.location.search);
        const response = Object.fromEntries(urlParams);
        const newVisualizationMode = response.view || 'hybrid';
        if (this.state.modeOfOperations !== newVisualizationMode) {
            this.setState({ modeOfOperations: newVisualizationMode });
        }
    }

    /** Functions forwarded to view Root for handling state Updates **/
    setLeftSideExpanded = val => {
        this.leftSideExpanded = val;
    };
    setRightSideExpanded = val => {
        this.rightSideExpanded = val;
    };

    getOntologyFromBackend = async () => {
        try {
            // Set loading state at the start
            this.setState({
                isLoading: true,
                error: false,
                errorMsg: ''
            });

            // Validate ontologyID
            if (!this.state.ontologyID) {
                throw new Error('No ontology ID provided');
            }

            // Fetch ontology data
            const response = await getOntologyBy(this.state.ontologyID);
            console.log('Ontology response:', response);

            // Validate response
            if (!response) {
                throw new Error('No response received from server');
            }

            if (!response.ontology_data) {
                throw new Error('Ontology data is missing in the response');
            }

            // Process the data
            const parsedModel = response.ontology_data;

            // Update Redux store
            await this.props.initializeResourceRelationModel(parsedModel);

            // Update component state
            this.setState({
                isLoading: false,
                ontologyFileContent: 'not exported',
                error: false,
                errorMsg: ''
            });
        } catch (error) {
            console.error('Failed to fetch ontology:', error);

            // Set error state
            this.setState({
                isLoading: false,
                error: true,
                errorMsg: error.message || 'Could not find this ontology',
                ontologyFileContent: undefined
            });
        }
    };

    render() {
        //const modeOfOperations = Cookies.get(MODE_OF_OPERATIONS) || 'hybrid';
        return (
            <>
                <StyledInfo>This page is not available in mobile version if you want to open this page please use desktop site.</StyledInfo>
                <StyledRootDiv>
                    <div style={{ height: '100%', backgroundColor: colorStyled.PRIMARY.lighter }}>
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
                        {this.state.isLoading === false && this.state.error === false && this.state.modeOfOperations === 'hybrid' && (
                            <OntologyViewRoot
                                leftSideExpanded={this.leftSideExpanded}
                                rightSideExpanded={this.rightSideExpanded}
                                toggleLeftSideExpanded={this.setLeftSideExpanded}
                                toggleRightSideExpanded={this.setRightSideExpanded}
                            />
                        )}
                        {this.state.isLoading === false && this.state.error === false && this.state.modeOfOperations === 'text' && (
                            <OntologyViewAsTTL />
                        )}
                        {this.state.isLoading === false && this.state.error === false && this.state.modeOfOperations === 'graph' && (
                            <GraphVisUi DonatelloGraph={this.DonatelloGraph} visualizationTabIsActive={this.state.modeOfOperations === 'graph'} />
                        )}
                    </div>
                </StyledRootDiv>
            </>
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
    redux_getAlreadyLoadedOntology: PropTypes.object,
    redux_alreadyLoadedOntology: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    initializeResourceRelationModel: payload => dispatch(initializeResourceRelationModel(payload)),
    redux_alreadyLoadedOntology: data => dispatch(redux_alreadyLoadedOntology(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewOntology);

const StyledRootDiv = styled.div`
    height: 100%;

    @media (max-width: ${MAX_WIDTH}) {
        display: none;
    }
`;

const StyledInfo = styled.h5`
    display: none;

    @media (max-width: ${MAX_WIDTH}) {
        display: block;
        width: 100%;
        padding-top: 20px;
        padding-left: 10%;
        padding-right: 10%;
        text-align: justify;
        text-align-last: center;
        color: ${colorStyled.TEXTCOLOR};
    }
`;
