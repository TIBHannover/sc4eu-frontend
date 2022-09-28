import React, { Component } from 'react';
import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import UploadOntologyModal from './UploadOntologyModal';
import { SECONDARY } from '../styledComponents/styledComponents';
import OntologyIndexCards from './OntologyIndexCards';
import classnames from 'classnames';
import PropTypes from 'prop-types';

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
        return (
            <div>
                <div className="pl-1 pr-1 pb-2">
                    <h1 style={{ textAlign: 'center', margin: '10px 0px 10px 0px' }}>Select Ontology</h1>
                    <hr className="mt-0 mb-2" />
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => {
                                    this.toggle('1');
                                }}
                            >
                                File System
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => {
                                    this.toggle('2');
                                }}
                            >
                                GitHub
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Button
                        style={{ backgroundColor: SECONDARY.dark, margin: '-40px 0px 0px 0px', float: 'right' }}
                        active={true}
                        onClick={() => {
                            console.log('Upload Button Triggered');
                            this.setState({ showUploadModal: true });
                        }}
                    >
                        Upload Ontology
                    </Button>
                    <UploadOntologyModal
                        project_id={this.props.project_id}
                        showDialog={this.state.showUploadModal}
                        onlineUpload={this.state.activeTab === '2'}
                        toggle={() => {
                            this.setState({ showUploadModal: !this.state.showUploadModal });
                        }}
                        callback={param => {
                            this.ontologyUploadComplete(param);
                        }}
                    />
                    {/*<hr className="mt-3 mb-2" />*/}
                </div>
                <div>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1" style={{ backgroundColor: 'none' }}>
                            {this.props.localOntologiesFromBackend ? (
                                <OntologyIndexCards
                                    ontologies={this.props.localOntologiesFromBackend}
                                    reloadAfterUpdate={() => {
                                        this.props.reloadAfterUpdate();
                                    }}
                                />
                            ) : (
                                <div> No ontologies found in this project </div>
                            )}
                        </TabPane>
                        <TabPane tabId="2">
                            {this.props.onlineOntologiesFromBackend.length > 0 ? (
                                <OntologyIndexCards
                                    ontologies={this.props.onlineOntologiesFromBackend}
                                    reloadAfterUpdate={() => {
                                        this.props.reloadAfterUpdate();
                                    }}
                                />
                            ) : (
                                <div> No online ontologies found in this project </div>
                            )}
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        );
    }
}

OntologyIndexInteractions.propTypes = {
    reloadAfterUpdate: PropTypes.func.isRequired,
    project_id: PropTypes.string.isRequired,
    localOntologiesFromBackend: PropTypes.array.isRequired,
    onlineOntologiesFromBackend: PropTypes.array.isRequired
};
