import React, { Component } from 'react';
import { Button } from 'reactstrap';
import UploadOntologyModal from './UploadOntologyModal';
import { SECONDARY } from '../styledComponents/styledComponents';
import OntologyIndexCards from './OntologyIndexCards';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ROUTES from 'constants/routes';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { UncontrolledTooltip } from 'reactstrap';

export default class OntologyIndexInteractions extends Component {
    constructor(props) {
        super(props);
        this.state = { showUploadModal: false, activeTab: '1' };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    ontologyUploadComplete(param) {
        if (param.result === true) {
            this.setState({ showUploadModal: false });
            this.props.reloadAfterUpdate();
        }
    }

    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    };

    render() {
        const projectName = this.props.project_name.length > 10 ? this.props.project_name.substring(0, 10) + ' ...' : this.props.project_name;
        return (
            <div>
                <div className="pl-1 pr-1 pb-2">
                    <div className="container" style={{ display: 'flex', justifyContent: 'center', textAlign: 'left' }}>
                        <Link title="Projects List" to={ROUTES.PROJECT} style={{ marginTop: '20px' }}>
                            <Icon icon={faAngleLeft} style={{ marginRight: '5px' }} />
                            <span>Projects</span>
                        </Link>
                        <h2 style={{ padding: '10px', margin: '0 auto' }}>
                            Select Ontology from <u id="tootlipTarget">{projectName}</u> Project
                        </h2>
                        <UncontrolledTooltip style={{ maxWidth: '100%' }} target="tootlipTarget">
                            <u>{this.props.project_name}</u>
                        </UncontrolledTooltip>
                    </div>
                    <hr className="mt-0 mb-2" />
                    <Button
                        style={{ backgroundColor: SECONDARY.dark, margin: '10px 5px 10px 5px' }}
                        active={true}
                        onClick={() => {
                            this.setState({ showUploadModal: true });
                        }}
                    >
                        Upload Ontology
                    </Button>
                    <hr className="mt-0 mb-2" />
                    <UploadOntologyModal
                        project_id={this.props.project_id}
                        access_type={this.props.access_type}
                        showDialog={this.state.showUploadModal}
                        toggle={() => {
                            this.setState({ showUploadModal: !this.state.showUploadModal });
                        }}
                        callback={param => {
                            this.ontologyUploadComplete(param);
                        }}
                    />
                </div>
                <div>
                    <div>
                        {this.props.listOfOntology ? (
                            <OntologyIndexCards
                                ontologies={this.props.listOfOntology}
                                reloadAfterUpdate={() => {
                                    this.props.reloadAfterUpdate();
                                }}
                            />
                        ) : (
                            <div> No ontologies found in this project </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

OntologyIndexInteractions.propTypes = {
    reloadAfterUpdate: PropTypes.func.isRequired,
    project_id: PropTypes.string.isRequired,
    project_name: PropTypes.string.isRequired,
    access_type: PropTypes.string.isRequired,
    listOfOntology: PropTypes.array.isRequired
};
