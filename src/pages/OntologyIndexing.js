import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { getAllOntologies } from '../network/ontologyIndexing';
import OntologyIndexInteractions from '../components/OntologyIndexInteractions';
import PropTypes from 'prop-types';
import { SELECTED_PROJECT_SESSION } from '../constants/globalConstants';
import { PRIMARY } from '../styledComponents/styledComponents';

export default class OntologyIndexing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            selectedProject: false, //Maybe get the uuid for the Default Project here.
            results: null,
            onlineOntologies: null,
            localOntologies: null
        };
    }

    componentDidMount() {
        const selectedProjectSession = JSON.parse(sessionStorage.getItem(SELECTED_PROJECT_SESSION));
        if (selectedProjectSession) {
            this.setState({ selectedProject: selectedProjectSession });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.selectedProject !== this.state.selectedProject) {
            this.getOntologiesFromBackend();
        }
    }

    getOntologiesFromBackend = () => {
        // TODO : this component will need a connection to the redux state for the users;
        // TODO: check if the current user is allowed to view ontologies for this project
        getAllOntologies(this.state.selectedProject.uuid).then(res => {
            //There is a chance that the project do not have any ontologies.
            if (res.ontologyIndex === 'Undefined') {
                res = false;
            }
            const localOnt = [];
            const onlineOnt = [];
            console.log('==================');
            res.forEach(re => {
                console.log(re.lookup_type);
                if (re.lookup_type === 'online') {
                    onlineOnt.push(re);
                } else {
                    localOnt.push(re);
                }
            });
            this.setState({ isLoading: false, localOntologies: localOnt, onlineOntologies: onlineOnt });
        });
    };

    reloadAfterUpdate = () => {
        this.setState({ isLoading: false });
        this.getOntologiesFromBackend();
    };

    // reloadAfterDelete = () => {
    //     this.setState({ isLoading: false });
    //     this.getOntologiesFromBackend();
    // };

    render() {
        return (
            <div style={{ height: '100vh', backgroundColor: PRIMARY.lighter }}>
                <Container
                    style={{
                        borderTop: 'none',
                        overflow: 'auto',
                        position: 'relative',
                        backgroundColor: '#ffffff'
                    }}
                >
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
                            <OntologyIndexInteractions
                                project_id={this.state.selectedProject.uuid}
                                reloadAfterUpdate={() => {
                                    this.reloadAfterUpdate();
                                }}
                                localOntologiesFromBackend={this.state.localOntologies}
                                onlineOntologiesFromBackend={this.state.onlineOntologies}
                            />
                        </div>
                    )}
                </Container>
            </div>
        );
    }
}

OntologyIndexing.propTypes = {
    location: PropTypes.object.isRequired
};
