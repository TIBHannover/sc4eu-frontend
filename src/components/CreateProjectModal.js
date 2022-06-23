import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { userIsAllowdToUploadOntology } from '../network/ontologyIndexing';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProject } from '../network/projectIndexing';

class CreateProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            projectDescription: '',
            allowedToCreateProjects: false
        };
    }

    componentDidMount() {
        // TODO Check the user if allowed to Create
    }

    componentDidUpdate = async prevProps => {
        if (prevProps.showDialog === false && this.props.showDialog === true) {
            // check if user is allowed to do uploads
            const allows = await userIsAllowdToUploadOntology();
            this.setState({ allowedToCreateProjects: allows.result });
        }
    };

    handleOnChangeName = event => {
        this.setState({ projectName: event.target.value });
    };
    handleOnChangeDesc = event => {
        this.setState({ projectDescription: event.target.value });
    };

    resetStateObject = () => {
        this.setState({
            projectName: '',
            projectDescription: ''
        });
    };
    createProject = () => {
        if (!this.state.allowedToCreateProjects) {
            this.props.toggle();
            return;
        }
        console.log('Creating New Project');

        if (!this.state.projectName && !this.state.projectDescription) {
            alert('Please provide name and description for the project');
            return;
        }
        if (!this.state.projectName) {
            alert('Please provide name for the project');
            return;
        }
        if (!this.state.projectDescription) {
            alert('Please provide description for the project');
            return;
        }

        console.log(this.props.user.displayName);

        const objToSent = {
            name: this.state.projectName,
            description: this.state.projectDescription,
            //Get currently Logged in User Name
            createdBy: this.props.user.displayName,
            creationDate: new Date().toLocaleString()
        };

        createProject(objToSent).then(res => {
            this.props.callback(res);
        });
        //this.props.callback({ result: true });
    };

    render() {
        return (
            <Modal
                style={{ width: '80%', maxWidth: '50%' }}
                isOpen={this.props.showDialog}
                toggle={this.props.toggle}
                autoFocus={false}
                onOpened={() => {
                    this.resetStateObject();
                }}
            >
                <ModalHeader toggle={this.props.toggle} autoFocus={false}>
                    Create New Project
                </ModalHeader>
                <ModalBody id="createProjectBody">
                    {this.state.allowedToCreateProjects ? (
                        <div>
                            <FormGroup>
                                <Label for="projectName">Name</Label>
                                <Input
                                    type="text"
                                    name="projectName"
                                    id="projectNameName"
                                    placeholder="Project Name"
                                    value={this.state.projectName}
                                    onChange={this.handleOnChangeName}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="projectDescription">Description</Label>
                                <Input
                                    type="textarea"
                                    name="projectDescription"
                                    id="projectDescription"
                                    width="100%"
                                    placeholder="Project Description"
                                    value={this.state.projectDescription}
                                    onChange={this.handleOnChangeDesc}
                                />
                            </FormGroup>
                        </div>
                    ) : (
                        <p>
                            Sorry, you are not allowed to create projects
                            <br /> Only System Admin, Project Admin and Member are allowed to create projects
                        </p>
                    )}
                </ModalBody>
                <ModalFooter>
                    {' '}
                    <Button
                        id="finishButton"
                        onClick={() => {
                            this.createProject();
                        }}
                        autoFocus={true}
                    >
                        Finish
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

CreateProject.propTypes = {
    showDialog: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    callback: PropTypes.func.isRequired,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default compose(connect(mapStateToProps), withRouter)(CreateProject);
