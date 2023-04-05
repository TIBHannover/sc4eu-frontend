import React, { Component } from 'react';
import { Button } from 'reactstrap';
import UploadOntologyModal from './UploadOntologyModal';
import { PRIMARY, SECONDARY } from '../styledComponents/styledComponents';
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
                <div>
                    <div
                        style={{
                            display: 'flex',
                            height: '6%',
                            justifyContent: 'center',
                            textAlign: 'left',
                            backgroundColor: PRIMARY.dark,
                            borderRadius: '10px',
                            borderBottomRightRadius: '0',
                            borderBottomLeftRadius: '0'
                        }}
                    >
                        <Link title="Projects List" to={ROUTES.PROJECT} style={{ marginTop: '15px', color: 'white', marginLeft: '1%' }}>
                            <Icon icon={faAngleLeft} style={{ marginRight: '5px' }} />
                            <span>Projects</span>
                        </Link>
                        <h4 style={{ padding: '10px', margin: '0 auto', color: 'white' }}>
                            Select Ontology from <u id="tootlipTarget">{projectName}</u> Project
                        </h4>
                        <UncontrolledTooltip style={{ maxWidth: '100%' }} target="tootlipTarget">
                            <u>{this.props.project_name}</u>
                        </UncontrolledTooltip>
                    </div>
                    <hr className="mt-0 mb-2" />
                    <Button
                        style={{ backgroundColor: SECONDARY.dark, margin: '10px 5px 10px 5px', marginLeft: '1%' }}
                        active={true}
                        onClick={() => {
                            this.setState({ showUploadModal: true });
                        }}
                    >
                        Upload Ontology
                    </Button>
                    <hr className="mt-0 mb-2 ml-2 mr-2" />
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
                <div className="mt-0 mb-0 ml-1 mr-1">
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
