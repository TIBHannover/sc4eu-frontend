import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getAllOntologies, getOntologyGitData } from '../network/ontologyIndexing';
import OntologyIndexInteractions from '../components/OntologyIndexInteractions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkFileUpdated } from '../network/GithubAPICalls';
import { checkGitlabFileUpdated } from '../network/GitlabAPICalls';
import styled from 'styled-components';
import { MAX_WIDTH, MIN_WIDTH_FOR_MONITOR } from '../styledComponents/styledComponents';
import { colorStyled } from '../styledComponents/styledColor';

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
                    let lastCommit;
                    let commitStatus;
                    switch (singleOntology.lookup_type) {
                        case 'online':
                            lastCommit = await getOntologyGitData(singleOntology.uuid);
                            commitStatus = await checkFileUpdated(singleOntology.lookup_path, lastCommit);
                            break;
                        case 'online-gitlab':
                            const lastFetchedFileSha = await getOntologyGitData(singleOntology.uuid);
                            commitStatus = await checkGitlabFileUpdated(singleOntology.lookup_path, lastFetchedFileSha);
                            break;
                        default:
                            break;
                    }
                    if (commitStatus?.status === 'latest') {
                        singleOntology.commitStatus = 'latest';
                        singleOntology.gitBranch = commitStatus.branch;
                    } else if (commitStatus?.status === 'behind') {
                        singleOntology.commitStatus = `${commitStatus.commitsBehind} commits behind`;
                        singleOntology.gitBranch = commitStatus.branch;
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
            <>
                <StyledInfo>This page is not available in mobile version if you want to open this page please use desktop site.</StyledInfo>
                <StyledContainer>
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
                        <div style={{ height: '100%' }}>
                            <OntologyIndexInteractions
                                project_id={this.state.selectedProject.uuid}
                                project_name={this.state.selectedProject.name}
                                access_type={this.state.selectedProject.access_type}
                                reloadAfterUpdate={() => {
                                    this.reloadAfterUpdate();
                                }}
                                listOfOntology={this.state.ontologyList}
                            />
                        </div>
                    )}
                </StyledContainer>
            </>
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

const StyledContainer = styled(Container)`
    height: 95%;
    width: 70%;
    background-color: ${colorStyled.CONTAINER_BACKGROUND_COLOR};
    padding: 0.5% 0px 0px 0px;

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        width: 100%;
    }

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
