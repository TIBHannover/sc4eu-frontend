import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import React, { createRef, Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
import { preInitializeOntologyUpload, uploadOntology } from '../network/ontologyIndexing';

const AnimationContainer = styled(CSSTransition)`
    &.fadeIn-enter {
        opacity: 0;
    }

    &.fadeIn-enter.fadeIn-enter-active {
        opacity: 1;
        transition: 1s opacity;
    }
`;

export default class UploadOntology extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasContent: false,
            ontologyFileContent: null,
            ontologyName: '',
            ontologyDescription: '',
            waitingForResult: false,
            preInitResult: {},
            errorInitialization: false
        };

        this.finishRef = createRef();
    }

    resetStateObject = () => {
        this.setState({
            hasContent: false,
            ontologyFileContent: null,
            ontologyName: '',
            ontologyDescription: '',
            waitingForResult: false,
            preInitResult: {},
            errorInitialization: false
        });
    };

    handleOnChangeName = event => {
        this.setState({ ontologyName: event.target.value });
    };
    handleOnChangeDesc = event => {
        this.setState({ ontologyDescription: event.target.value });
    };

    handlePreview = async e => {
        console.log('ON CHANGE TRIGGERED');

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
                const pre_result = await preInitializeOntologyUpload({ ontologyData: reader.result });
                // const pre_result = await preInitializeOntologyUpload({ ontologyData: 'hello' });

                console.log(pre_result);

                // using the name and description we can fill in the values; also we need to make sure the values are not null

                this.setState({
                    ontologyFileContent: reader.result,
                    hasContent: true,
                    ontologyName: pre_result.title,
                    ontologyDescription: pre_result.description,
                    preInitResult: pre_result,
                    waitingForResult: false
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
        console.log('Executing Upload to backend!');
        const objToSent = {
            name: this.state.ontologyName,
            description: this.state.ontologyDescription,
            lookup_type: 'local',
            access_type: 'public',
            lookup_path: 'internal',
            ontology_content: this.state.ontologyFileContent
        };
        console.log(objToSent);

        // await networkCall
        uploadOntology(objToSent).then(res => {
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
                    {' '}
                    {readAble}: {value}
                </div>
            );
        });

        return (
            <div>
                <h2> Statistics </h2> {res} <hr />
            </div>
        );
    };

    render() {
        return (
            <Modal
                style={{ width: '80%', maxWidth: '80%' }}
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
                <ModalBody id="ontologyUploadModalBody">
                    <div>
                        {!this.state.errorInitialization && (
                            <Input type="file" name="file" onChange={this.handlePreview} disabled={this.state.waitingForResult} />
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
                                Validation Warning: <div> {ReactHtmlParser(this.state.preInitResult.validationErrors)}</div>
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
                        {!this.state.hasContent && !this.state.waitingForResult && !this.state.errorInitialization && (
                            <div> Upload an ontology file</div>
                        )}
                        {this.state.waitingForResult && !this.state.errorInitialization && <div> LOADING...</div>}
                        {this.state.errorInitialization && <div> Could not establish connection to ontology service.</div>}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div id="ontologyUploadModalFooter" className="d-flex" autofocus={true}>
                        {/*{this.state.hasContent && (*/}
                        {/*    <div style={{ position: 'absolute', left: '10px' }}>*/}
                        {/*        <div>Errors: 0</div>*/}
                        {/*        <div>Warning: 0</div>*/}
                        {/*    </div>*/}
                        {/*)}*/}

                        <Button
                            id="finishButton"
                            innerRef={this.finishRef}
                            disabled={
                                !this.state.hasContent ||
                                this.state.waitingForResult ||
                                this.state.errorInitialization ||
                                this.state.preInitResult.parserError
                            }
                            onClick={() => {
                                this.executeUpload();
                            }}
                            autofocus={true}
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
    callback: PropTypes.func.isRequired
};
