import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, FormGroup, Input } from 'reactstrap';
import styled from 'styled-components';
import { getAllCommits, getRawUrlforCommit } from '../../network/GithubAPICalls';
import { getGitlabCommits, getRawUrlForGitlabCommit } from '../../network/GitlabAPICalls';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { fontStyled } from '../../styledComponents/styledFont';
import { colorStyled } from '../../styledComponents/styledColor';
import { MIN_WIDTH_FOR_MONITOR } from '../../styledComponents/styledComponents';
import { getOntologyComparison } from '../../network/GetOntologyData';
import parse from 'html-react-parser';

const ModalFooter = styled.div`
    height: 60px;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    border-top: 1px solid #ccc;
`;

const CloseButton = styled(Button)`
    float: right;
    font-weight: bold;
`;

class OntoComparisonModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstSelectedCommit: '',
            secondSelectedCommit: '',
            allCommits: '',
            compareResults: '',
            isLoading: false
        };
    }

    componentDidMount = async () => {
        const theOntology = this.props.selectedOntology;
        const ontologyCommits = [];

        if (theOntology.lookup_type === 'online') {
            try {
                const results = await this.getTheCommits(theOntology.lookup_path);
                results.data.forEach(item => {
                    const raw_url = getRawUrlforCommit(theOntology.lookup_path, item.sha);
                    ontologyCommits.push({ label: item.commit.committer.date, value: item.sha, url: item.url, raw_url: raw_url });
                });
            } catch (error) {
                console.error('Error fetching online commits:', error);
            }
        } else if (theOntology.lookup_type === 'online-gitlab') {
            try {
                const result = await this.getTheGitlabCommits(theOntology.lookup_path);
                result.forEach(item => {
                    const raw_url = getRawUrlForGitlabCommit(theOntology.lookup_path, item.id);
                    ontologyCommits.push({ label: item.committed_date, value: item.id, url: item.web_url, raw_url: raw_url });
                });
            } catch (error) {
                console.error('Error fetching online-gitlab commits:', error);
            }
        }
        this.setState({
            allCommits: ontologyCommits
        });
    };

    getTheCommits = async gitHubURL => {
        const commits = await getAllCommits(gitHubURL);
        return commits;
    };

    getTheGitlabCommits = async gitlabURL => {
        const commits = await getGitlabCommits(gitlabURL);
        return commits;
    };

    handleFirstCommitChange = event => {
        this.setState({ firstSelectedCommit: event.target.value });
    };

    handleSecondCommitChange = event => {
        this.setState({ secondSelectedCommit: event.target.value });
    };

    showComparison = async () => {
        this.setState({ isLoading: true });
        if (this.state.firstSelectedCommit === '' || this.state.secondSelectedCommit === '') {
            this.setState(prevState => ({
                isPopUpOpen: !prevState.isPopUpOpen,
                popUpMessage: 'Please selected the two commits to compare',
                isLoading: false
            }));
            return;
        }
        const index_first = this.state.allCommits.findIndex(item => item.value === this.state.firstSelectedCommit);
        const index_second = this.state.allCommits.findIndex(item => item.value === this.state.secondSelectedCommit);
        let url_first;
        let url_second;
        if (index_first !== -1 && index_second !== -1) {
            url_first = this.state.allCommits[index_first].raw_url;
            url_second = this.state.allCommits[index_second].raw_url;
            getOntologyComparison(url_first, url_second).then(data => {
                this.setState({ compareResults: data, isLoading: false });
            });
        }
    };

    render() {
        return (
            <div>
                <Modal open={this.props.isModalOpen} onClose={this.props.toggle} aria-labelledby="modal-title" aria-describedby="modal-description">
                    <Box
                        sx={{
                            position: 'absolute',
                            padding: 0,
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '70%',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            paddingLeft: 4,
                            paddingRight: 4,
                            borderRadius: 3,
                            textAlign: 'center',
                            maxHeight: '90%', // Add maximum height
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div
                            style={{
                                height: '60px',
                                color: '#000000',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottom: '1px solid #ccc'
                            }}
                        >
                            <h3>Ontology Comparison</h3>
                        </div>
                        <div className="root" style={{ padding: '0 10px', height: 'calc(100% - 120px)', overflow: 'auto' }}>
                            {this.state.isLoading || !this.state.allCommits ? (
                                <div className="text-center text-primary mt-4 mb-4">
                                    {/*using a manual fixed scale value for the spinner scale! */}
                                    <h2 className="h5">
                                        <span>
                                            <Icon icon={faSpinner} spin />
                                        </span>{' '}
                                        Loading Comparison
                                    </h2>
                                </div>
                            ) : (
                                <>
                                    <div style={{ marginTop: '5px' }}>
                                        <HeadingSpan style={{ fontWeight: 600 }}>Please choose two commits to compare </HeadingSpan>
                                    </div>
                                    <div style={{ marginTop: '5px' }}>
                                        <FormGroup>
                                            <Input
                                                type="select"
                                                name="select"
                                                label={'choose commit'}
                                                id="exampleSelect"
                                                defaultValue={''}
                                                onChange={this.handleFirstCommitChange}
                                            >
                                                <option style={{ display: 'none' }}>Select 1st Commit</option>
                                                {this.state.allCommits.map(item => (
                                                    <option key={item.value + 'first'} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </Input>
                                        </FormGroup>
                                    </div>
                                    <FormGroup style={{ margin: '3% 0 2% 0' }}>
                                        <Input
                                            type="select"
                                            name="select"
                                            label={'choose commit'}
                                            defaultValue={''}
                                            onChange={this.handleSecondCommitChange}
                                        >
                                            <option style={{ display: 'none' }}>Select 2nd Commit</option>
                                            {this.state.allCommits.map(item => (
                                                <option key={item.value + 'second'} value={item.value}>
                                                    {item.label}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                    <ShowComparisonButton onClick={this.showComparison}> Show Comparison </ShowComparisonButton>
                                    <div style={{ height: 'calc(100% - 150px)', overflow: 'auto' }}>
                                        {parse(this.state.compareResults.toString())}
                                    </div>
                                </>
                            )}
                        </div>
                        <ModalFooter>
                            <div style={{ textAlign: 'right' }}>
                                <CloseButton onClick={this.props.toggle}>Close</CloseButton>
                            </div>
                        </ModalFooter>
                    </Box>
                </Modal>
            </div>
        );
    }
}

OntoComparisonModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    selectedProject: PropTypes.object.isRequired,
    selectedOntology: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        selectedProject: state.ResourceRelationModelReducer.project,
        selectedOntology: state.ResourceRelationModelReducer.ontology
    };
};

export default connect(mapStateToProps)(OntoComparisonModal);

const ShowComparisonButton = styled(Button)`
    margin: 5px;
    font-size: ${fontStyled.fontSize.NormalText};
    background-color: ${colorStyled.SECONDARY.dark};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

const HeadingSpan = styled.span`
    font-size: 16px;

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: 12px;
    }
`;
