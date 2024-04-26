import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { Component, createRef } from 'react';
import parse from 'html-react-parser';
import { preInitializeOntologyUpload, uploadOntology, userIsAllowdToUploadOntology } from '../network/ontologyIndexing';
import { getGitHubFileContent, getLatestCommit } from '../network/GithubAPICalls';
import { getGitlabFileContent, getGitlabLatestCommit } from '../network/GitlabAPICalls';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { fontStyled } from '../styledComponents/styledFont';
import { colorStyled } from '../styledComponents/styledColor';

export default class UploadOntology extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasContent: false,
            ontologyFileContent: null,
            ontologyName: '',
            ontologyDescription: '',
            project_id: '',
            waitingForResult: false,
            preInitResult: {},
            errorInitialization: false,
            allows_upload: false,
            lookup_type: null,
            lookup_path: null,
            githubURL: null,
            gitlabURL: null,
            uploadSource: '',
            ontology_git_data: null,
            showWarning: ''
        };

        this.finishRef = createRef();
    }

    componentDidUpdate = async prevProps => {
        if (prevProps.showDialog === false && this.props.showDialog === true) {
            // check if user is allowed to do uploads
            if (this.props.access_type === 'Public') {
                this.setState({ allows_upload: true });
            } else {
                const allows = await userIsAllowdToUploadOntology();
                this.setState({ allows_upload: allows.result });
            }
        }
    };

    resetStateObject = () => {
        this.setState({
            hasContent: false,
            ontologyFileContent: null,
            ontologyName: '',
            ontologyDescription: '',
            waitingForResult: false,
            preInitResult: {},
            errorInitialization: false,
            showWarning: ''
        });
    };

    handleOnChangeName = event => {
        this.setState({ ontologyName: event.target.value });
    };
    handleOnChangeDesc = event => {
        this.setState({ ontologyDescription: event.target.value });
    };

    handlePreview = async e => {
        e.preventDefault();

        const file = e.target.files[0];
        const reader = new FileReader();

        if (e.target.files.length === 0) {
            return;
        }
        // reset state when new data is entered
        this.setState({
            ontologyFileContent: '',
            hasContent: false,
            waitingForResult: true
        });

        reader.onloadend = async e => {
            // console.log(reader.result);

            // throw this into the pit

            // we send the content to the simple flask proxy and await some result

            //a) is parse-able
            //b) is valid
            //c) ontologyName and Description

            // create network request to owl-api
            try {
                const pre_result_asString = await preInitializeOntologyUpload({ ontologyData: reader.result });
                // const pre_result = await preInitializeOntologyUpload({ ontologyData: 'hello' });
                const pre_result = JSON.parse(pre_result_asString);

                // using the name and description we can fill in the values; also we need to make sure the values are not null

                this.setState({
                    ontologyFileContent: reader.result,
                    hasContent: true,
                    ontologyName: pre_result.title,
                    ontologyDescription: pre_result.description,
                    preInitResult: pre_result,
                    waitingForResult: false,
                    lookup_type: 'local',
                    lookup_path: 'internal',
                    ontology_git_data: 'none'
                });
            } catch (e) {
                this.setState({
                    hasContent: false,
                    ontologyFileContent: null,
                    ontologyName: '',
                    ontologyDescription: '',
                    waitingForResult: false,
                    preInitResult: {},
                    errorInitialization: true
                });
            }
        };

        reader.readAsText(file);
    };

    executeUpload = () => {
        if (!this.state.ontologyName && !this.state.ontologyDescription) {
            this.setState({ showWarning: 'Please provide name and description for the ontology' });
            return;
        }
        if (!this.state.ontologyName) {
            this.setState({ showWarning: 'Please provide name for the ontology' });
            return;
        }
        if (!this.state.ontologyDescription) {
            this.setState({ showWarning: 'Please provide description for the ontology' });
            return;
        }

        const objToSent = {
            name: this.state.ontologyName,
            description: this.state.ontologyDescription,
            lookup_type: this.state.lookup_type,
            access_type: 'public',
            lookup_path: this.state.lookup_path,
            ontology_content: this.state.ontologyFileContent,
            project_id: this.props.project_id,
            ontology_git_data: this.state.ontology_git_data
        };
        // await networkCall
        uploadOntology(objToSent).then(res => {
            if (res.result === false) {
                this.setState({ showWarning: res.message });
            }
            this.props.callback(res);
        });
    };

    renderStats = () => {
        //TODO make that more fancy
        const res = this.state.preInitResult.stats.head.vars.map((item, key) => {
            const value = this.state.preInitResult.stats.results.bindings[0][item].value;
            const readAble = item.replace('_', ' ');
            return (
                <div key={'Stats_' + key}>
                    {readAble}: {value}
                </div>
            );
        });

        return (
            <div>
                <h2> Statistics </h2> {res}
                <hr />
            </div>
        );
    };
    handleUrlChange = event => {
        this.setState({ githubURL: event.target.value });
    };
    handleUrlChange2 = event => {
        this.setState({ gitlabURL: event.target.value });
    };
    handleGitHubUrl = async () => {
        //const allCommits = await getAllCommits(this.state.githubURL);
        //const releasesTags = await getReleaseTags(this.state.githubURL);
        const gitHubFileContent = await getGitHubFileContent(this.state.githubURL);
        const git_commit_sha = await getLatestCommit(this.state.githubURL);

        try {
            const pre_result_asString = await preInitializeOntologyUpload({ ontologyData: gitHubFileContent });
            const pre_result = JSON.parse(pre_result_asString);

            this.setState({
                ontologyFileContent: gitHubFileContent,
                hasContent: true,
                ontologyName: pre_result.title,
                ontologyDescription: pre_result.description,
                preInitResult: pre_result,
                waitingForResult: false,
                lookup_type: 'online',
                lookup_path: this.state.githubURL,
                ontology_git_data: git_commit_sha
            });
        } catch (e) {
            this.setState({
                hasContent: false,
                ontologyFileContent: null,
                ontologyName: '',
                ontologyDescription: '',
                waitingForResult: false,
                preInitResult: {},
                errorInitialization: true
            });
        }
    };
    handleGitlabUrl = async () => {
        //const allCommits = await getAllCommits(this.state.githubURL);
        //const releasesTags = await getReleaseTags(this.state.githubURL);
        const gitlabFileContent = await getGitlabFileContent(this.state.gitlabURL);
        const gitlab_commit_sha = await getGitlabLatestCommit(this.state.gitlabURL);

        try {
            const pre_result_asString = await preInitializeOntologyUpload({ ontologyData: gitlabFileContent });
            const pre_result = JSON.parse(pre_result_asString);

            this.setState({
                ontologyFileContent: gitlabFileContent,
                hasContent: true,
                ontologyName: pre_result.title,
                ontologyDescription: pre_result.description,
                preInitResult: pre_result,
                waitingForResult: false,
                lookup_type: 'online-gitlab',
                lookup_path: this.state.gitlabURL,
                ontology_git_data: gitlab_commit_sha
            });
        } catch (e) {
            this.setState({
                hasContent: false,
                ontologyFileContent: null,
                ontologyName: '',
                ontologyDescription: '',
                waitingForResult: false,
                preInitResult: {},
                errorInitialization: true
            });
        }
    };

    render() {
        return (
            <Modal
                style={{ width: '70%', maxWidth: '80%', fontFamily: fontStyled.fontFamily }}
                isOpen={this.props.showDialog}
                toggle={this.props.toggle}
                autoFocus={false}
                onOpened={() => {
                    this.resetStateObject();
                }}
            >
                <ModalHeader toggle={this.props.toggle} autoFocus={false}>
                    Upload Ontology File
                </ModalHeader>
                {this.state.showWarning ? <span className="text-center text-danger">{this.state.showWarning}</span> : <></>}
                <ModalBody id="ontologyUploadModalBody">
                    {this.state.allows_upload ? (
                        <div style={{ marginLeft: '20px' }}>
                            {!this.state.errorInitialization && (
                                <div>
                                    <Form>
                                        <FormGroup tag="fieldset" row>
                                            <Col sm={10}>
                                                <h5>Select Ontology Upload Source</h5>
                                                <FormGroup check>
                                                    <Label check style={{ display: 'flex' }}>
                                                        <Input
                                                            type="radio"
                                                            value="github"
                                                            name="UploadSource"
                                                            checked={this.state.uploadSource === 'github'}
                                                            onChange={e => this.setState({ uploadSource: e.target.value })}
                                                        />
                                                        <Icon icon={faGithub} style={{ marginRight: '0.5%', marginTop: '0.4%' }} />
                                                        <span>Upload ontology from Github</span>
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label check style={{ display: 'flex' }}>
                                                        <Input
                                                            type="radio"
                                                            value="gitlab"
                                                            name="UploadSource"
                                                            checked={this.state.uploadSource === 'gitlab'}
                                                            onChange={e => this.setState({ uploadSource: e.target.value })}
                                                        />
                                                        <Icon icon={faGitlab} style={{ marginRight: '0.5%', marginTop: '0.4%' }} />
                                                        <span>Upload ontology from Gitlab</span>
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label check style={{ display: 'flex' }}>
                                                        <Input
                                                            type="radio"
                                                            value="localFile"
                                                            name="UploadSource"
                                                            checked={this.state.uploadSource === 'localFile'}
                                                            onChange={e => this.setState({ uploadSource: e.target.value })}
                                                        />
                                                        <Icon icon={faFile} style={{ marginRight: '0.8%', marginTop: '0.4%' }} />
                                                        <span>Upload ontology from local file</span>
                                                    </Label>
                                                </FormGroup>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                    <div>
                                        {this.state.uploadSource === 'localFile' ? (
                                            <>
                                                <div>Please lookup the ontology file you want to upload. Supported formats (ttl, owl)</div>
                                                <br />
                                                <Label for="fileSystem">File System </Label>
                                                <Input
                                                    id="fileSystem"
                                                    type="file"
                                                    name="file"
                                                    style={{ border: 'lightgray 1px solid', width: '50%' }}
                                                    onChange={this.handlePreview}
                                                    disabled={this.state.waitingForResult}
                                                />
                                            </>
                                        ) : this.state.uploadSource === 'github' ? (
                                            <>
                                                <div>Please enter github raw file url for the ontology file. Supported formats (ttl, owl)</div>
                                                <br />
                                                <Label for="exampleUrl" style={{ flexDirection: 'column' }}>
                                                    GitHub
                                                </Label>
                                                <div style={{ display: 'flex' }}>
                                                    <Input
                                                        id="exampleUrl"
                                                        type="url"
                                                        name="url"
                                                        placeholder="e.g., https://raw.githubusercontent.com/tibonto/dr/master/DigitalReference.ttl"
                                                        onChange={this.handleUrlChange}
                                                        style={{
                                                            border: 'lightgray 1px solid',
                                                            width: '50%',
                                                            flexDirection: 'column'
                                                        }}
                                                    />
                                                    <Button
                                                        style={{ backgroundColor: colorStyled.SECONDARY.dark, marginLeft: '1%' }}
                                                        onClick={this.handleGitHubUrl}
                                                    >
                                                        Upload
                                                    </Button>
                                                </div>
                                            </>
                                        ) : this.state.uploadSource === 'gitlab' ? (
                                            <>
                                                <div>Please enter gitlab raw file url for the ontology file. Supported formats (ttl, owl)</div>
                                                <br />
                                                <Label for="exampleUrl" style={{ flexDirection: 'column' }}>
                                                    Gitlab
                                                </Label>
                                                <div style={{ display: 'flex' }}>
                                                    <Input
                                                        id="exampleUrl"
                                                        type="url"
                                                        name="url"
                                                        placeholder="e.g., https://gitlab.com/tib-ts/ontology/-/blob/main/advanceExample.ttl"
                                                        onChange={this.handleUrlChange2}
                                                        style={{
                                                            border: 'lightgray 1px solid',
                                                            width: '50%'
                                                        }}
                                                    />
                                                    <Button
                                                        style={{ backgroundColor: colorStyled.SECONDARY.dark, marginLeft: '1%' }}
                                                        onClick={this.handleGitlabUrl}
                                                    >
                                                        Upload
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            <div />
                                        )}
                                    </div>
                                </div>
                            )}
                            {/*parser not successful*/}
                            {!this.state.waitingForResult && this.state.preInitResult.parser === 'failed' && (
                                <div>
                                    Parser error: <div> {this.state.preInitResult.parserError}</div>
                                </div>
                            )}
                            {!this.state.waitingForResult && this.state.preInitResult.imports === 'failed' && (
                                <div>
                                    Import Warning: <div> {this.state.preInitResult.importErrors}</div>
                                </div>
                            )}
                            {!this.state.waitingForResult && this.state.preInitResult.validation === 'failed' && (
                                <div>
                                    Validation Warning: <div> {parse(this.state.preInitResult.validationErrors.toString())}</div>
                                </div>
                            )}
                            {this.state.hasContent && this.state.preInitResult.stats && this.renderStats()}
                            {this.state.hasContent && !this.state.waitingForResult && !this.state.waitingForResult && (
                                <div>
                                    <FormGroup>
                                        <Label for="ontologyName">Name</Label>
                                        <Input
                                            type="text"
                                            name="ontologyName"
                                            id="ontologyName"
                                            placeholder="Ontology Name"
                                            value={this.state.ontologyName}
                                            onChange={this.handleOnChangeName}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="ontologyDescription">Description</Label>
                                        <Input
                                            type="text"
                                            name="ontologyDescription"
                                            id="ontologyDescription"
                                            placeholder="Ontology Description"
                                            value={this.state.ontologyDescription}
                                            onChange={this.handleOnChangeDesc}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleText">Content</Label>
                                        <Input type="textarea" readOnly name="text" id="ontologyContent" value={this.state.ontologyFileContent} />
                                    </FormGroup>
                                </div>
                            )}
                            {this.state.waitingForResult && !this.state.errorInitialization && <div> LOADING...</div>}
                            {this.state.errorInitialization && <div> Could not establish connection to ontology service.</div>}
                        </div>
                    ) : (
                        <h2>
                            Sorry, you are not allowed to upload ontologies yet!
                            <br /> Only System Admin, Project Admin and Member are allowed to do so in the current implementation.
                        </h2>
                    )}
                </ModalBody>
                <ModalFooter>
                    <div id="ontologyUploadModalFooter" className="d-flex" autoFocus={true}>
                        {/*{this.state.hasContent && (*/}
                        {/*    <div style={{ position: 'absolute', left: '10px' }}>*/}
                        {/*        <div>Errors: 0</div>*/}
                        {/*        <div>Warning: 0</div>*/}
                        {/*    </div>*/}
                        {/*)}*/}

                        <Button
                            id="finishButton"
                            innerRef={this.finishRef}
                            style={{ backgroundColor: colorStyled.SECONDARY.dark }}
                            hidden={
                                !this.state.hasContent ||
                                this.state.waitingForResult ||
                                this.state.errorInitialization ||
                                this.state.preInitResult.parserError
                            }
                            onClick={() => {
                                this.executeUpload();
                            }}
                            autoFocus={true}
                        >
                            Finish
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
        );
    }
}

UploadOntology.propTypes = {
    showDialog: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    callback: PropTypes.func.isRequired,
    project_id: PropTypes.string.isRequired,
    access_type: PropTypes.string.isRequired
};
