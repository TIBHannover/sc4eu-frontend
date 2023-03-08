import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { getAllOntologies, getGitData } from '../network/ontologyIndexing';
import OntologyIndexInteractions from '../components/OntologyIndexInteractions';
import PropTypes from 'prop-types';
import { PRIMARY } from '../styledComponents/styledComponents';
import { connect } from 'react-redux';
import { checkFileUpdated } from '../network/GithubAPICalls';

class OntologyIndexing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            selectedProject: false, //Maybe get the uuid for the Default Project here.
            ontologyList: []
        };
    }

    componentDidMount() {
        const selectedProject = this.props.selectedProject;
        if (selectedProject) {
            this.setState({ selectedProject: selectedProject });
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
                console.log('test');
                this.setState({ isLoading: false, ontologyList: false });
                return;
            } else {
                this.setState({ isLoading: false, ontologyList: res });
                this.setState({ isLoading: false, ontologyList: res }, async () => {
                    await this.getCommitHistory();
                });
            }
        });
    };

    getCommitHistory = async () => {
        const { ontologyList } = this.state;
        if (ontologyList.length > 0) {
            const updatedOntologies = await Promise.all(
                ontologyList.map(async singleOntology => {
                    if (singleOntology.lookup_type === 'online') {
                        try {
                            const lastCommit = await getGitData(singleOntology.uuid);
                            const commitStatus = await checkFileUpdated(singleOntology.lookup_path, lastCommit);
                            if (commitStatus?.status === 'latest') {
                                singleOntology.commitStatus = 'latest';
                                singleOntology.gitBranch = commitStatus.branch;
                            } else if (commitStatus?.status === 'behind') {
                                singleOntology.commitStatus = `${commitStatus.commitsBehind} commits behind`;
                                singleOntology.gitBranch = commitStatus.branch;
                            } else {
                                console.log('An error occurred while checking the URL.');
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    }
                    return singleOntology;
                })
            );
            this.setState({ ontologyList: updatedOntologies });
        }
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
            <div style={{ height: '80%', backgroundColor: PRIMARY.lighter }}>
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
                                    <Icon icon={faSpinner} spin style={{ marginRight: '5px' }} />
                                </span>
                                Loading
                            </h2>
                        </div>
                    ) : (
                        <div>
                            <OntologyIndexInteractions
                                project_id={this.state.selectedProject.uuid}
                                project_name={this.state.selectedProject.name}
                                reloadAfterUpdate={() => {
                                    this.reloadAfterUpdate();
                                }}
                                listOfOntology={this.state.ontologyList}
                            />
                        </div>
                    )}
                </Container>
            </div>
        );
    }
}

OntologyIndexing.propTypes = {
    location: PropTypes.object.isRequired,
    selectedProject: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    selectedProject: state.ResourceRelationModelReducer.project
});

export default connect(mapStateToProps, null)(OntologyIndexing);
