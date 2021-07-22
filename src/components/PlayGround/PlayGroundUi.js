import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import { playground_uploadFile } from 'network/playgroundCalls';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { initializeResourceRelationModel } from '../../redux/actions/rrm_actions';
import { changeVisualizationSelectionTab } from '../../redux/actions/globalUI_actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class PlayGroundUI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasUploadJSON: false,
            isLoadingJSON: false,
            hasUploadTTL: false,
            isLoadingTTL: false,
            dataToTransform: '',
            datatype: ''
        };

        this.clickOrigin = '';
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.hasUploadTTL || this.state.hasUploadJSON) {
            // chose based on datatype how to call the network;
            playground_uploadFile(this.state.datatype, this.state.dataToTransform)
                .then(res => {
                    // we receive a data model from the backend;
                    this.setState({
                        isLoadingJSON: false,
                        isLoadingTTL: false,
                        hasUploadTTL: false,
                        hasUploadJSON: false
                    });
                    if (!res.error) {
                        this.props.initializeResourceRelationModel(res.ontology_data);
                        this.props.changeVisualizationSelectionTab();
                    } else {
                        console.error(res);
                    }
                })
                .catch(error => {
                    this.setState({ isLoadingJSON: false, isLoadingTTL: false, hasUploadTTL: false, hasUploadJSON: false });
                    console.error(error);
                });
        }
    }

    handleTTLUpload = () => {
        this.clickOrigin = 'TTL';
        const fileInput = document.getElementById('fileInputDialog');
        fileInput.click();
    };
    handleJSONUpload = () => {
        this.clickOrigin = 'VOWLJSON';
        const fileInput = document.getElementById('fileInputDialog');
        fileInput.click();
    };

    handleFileUpload = event => {
        // handling file UPLOAD
        const file = event.target.files[0];
        if (this.clickOrigin === 'TTL' && !file.name.endsWith('.ttl')) {
            console.log('ERROR: not a ttl file');
            return;
        }

        if (this.clickOrigin === 'VOWLJSON' && !file.name.endsWith('.json')) {
            console.log('ERROR: not a JSON file');
            return;
        }

        const reader = new FileReader();
        if (event.target.files.length === 0) {
            return;
        }
        reader.onloadend = async e => {
            if (this.clickOrigin === 'VOWLJSON') {
                this.setState({ isLoadingJSON: true, hasUploadJSON: true, datatype: 'VOWLJSON', dataToTransform: reader.result });
            }
            if (this.clickOrigin === 'TTL') {
                this.setState({ isLoadingTTL: true, hasUploadTTL: true, datatype: 'TTL', dataToTransform: reader.result });
            }
        };

        reader.readAsText(file);
    };

    render() {
        return (
            <>
                <div style={{ height: '100%', overflow: 'auto', paddingRight: '20px' }}>PlayGround Root Component</div>
                <div style={{ padding: '5px' }}>
                    <Button
                        className="mr-1"
                        onClick={this.handleTTLUpload}
                        style={{
                            backgroundColor: this.state.hasUploadTTL ? 'green' : ''
                        }}
                    >
                        {this.state.isLoadingTTL && <Icon icon={faSpinner} spin />}
                        UPLOAD TTL
                    </Button>
                    <Button
                        onClick={this.handleJSONUpload}
                        style={{
                            backgroundColor: this.state.hasUploadJSON ? 'green' : ''
                        }}
                    >
                        {this.state.isLoadingJSON && <Icon icon={faSpinner} spin />}
                        UPLOAD VOWL JSON
                    </Button>
                    <Input id="fileInputDialog" type="file" name="file" onChange={this.handleFileUpload} style={{ display: 'none' }} />
                </div>
            </>
        );
    }
}

PlayGroundUI.propTypes = {
    initializeResourceRelationModel: PropTypes.func.isRequired,
    changeVisualizationSelectionTab: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => ({
    initializeResourceRelationModel: payload => dispatch(initializeResourceRelationModel(payload)),
    changeVisualizationSelectionTab: () => dispatch(changeVisualizationSelectionTab())
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayGroundUI);
