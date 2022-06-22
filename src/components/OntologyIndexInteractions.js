import React, { Component } from 'react';

import { Button } from 'reactstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import UploadOntologyModal from './UploadOntologyModal';
// import { preInitializeOntologyUpload } from '../network/ontologyIndexing';

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
                <StyledButton
                    active={true}
                    onClick={() => {
                        console.log('Upload Button Triggered');
                        this.setState({ showUploadModal: true });
                    }}
                >
                    Upload
                </StyledButton>
                <StyledButton disabled={true}> Filter </StyledButton>
                <StyledButton disabled={true}> Search </StyledButton>
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
