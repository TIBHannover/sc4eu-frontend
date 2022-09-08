import React, { Component } from 'react';

import { Button } from 'reactstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import UploadOntologyModal from './UploadOntologyModal';
// import { preInitializeOntologyUpload } from '../network/ontologyIndexing';
import { SECONDARY } from '../styledComponents/styledComponents';

export default class OntologyIndexInteractions extends Component {
    constructor(props) {
        super(props);
        this.state = { showUploadModal: false };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    ontologyUploadComplete(param) {
        if (param.result === true) {
            this.setState({ showUploadModal: false });
            this.props.reloadAfterUpdate();
        }
    }

    render() {
        return (
            <div className="pl-1 pr-1 pb-2">
                <h1 style={{ textAlign: 'center', margin: '10px 0px 10px 0px' }}>Select Ontology</h1>
                <hr className="mt-0 mb-2" />
                <Button
                    style={{ backgroundColor: SECONDARY.dark, margin: '10px 0px 0px 10px' }}
                    active={true}
                    onClick={() => {
                        console.log('Upload Button Triggered');
                        this.setState({ showUploadModal: true });
                    }}
                >
                    Add New Ontology
                </Button>
                <UploadOntologyModal
                    project_id={this.props.project_id}
                    showDialog={this.state.showUploadModal}
                    toggle={() => {
                        this.setState({ showUploadModal: !this.state.showUploadModal });
                    }}
                    callback={param => {
                        this.ontologyUploadComplete(param);
                    }}
                />
            </div>
        );
    }
}

OntologyIndexInteractions.propTypes = {
    reloadAfterUpdate: PropTypes.func.isRequired,
    project_id: PropTypes.string.isRequired
};

const StyledButton = styled(Button)`
    margin-right: 10px;
    background-color: ${props => (props.activeFeature ? '#006500' : 'red')};
`;
