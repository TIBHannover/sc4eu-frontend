import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { fontStyled } from '../../styledComponents/styledFont';
import PropTypes from 'prop-types';

class ScreenCaptureModal extends Component {
    DownloadCapturedImage = () => {
        const link = document.createElement('a');
        link.download = 'screenshot.png';
        link.href = this.props.screenCapture;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modelOpen} style={{ maxHeight: '70vh', maxWidth: '100vh', fontFamily: fontStyled.fontFamily }}>
                    <ModalHeader toggle={this.props.toggle} autoFocus={false}>
                        ScreenShot Preview
                    </ModalHeader>
                    <ModalBody>
                        <div style={{ maxHeight: '75vh', maxWidth: '100vh', overflow: 'auto' }}>
                            {this.props.screenCapture && <img src={this.props.screenCapture} alt="screen capture" />}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.DownloadCapturedImage}>Save</Button>
                        <Button onClick={this.props.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

ScreenCaptureModal.propTypes = {
    modelOpen: PropTypes.bool.isRequired,
    screenCapture: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired
};

export default ScreenCaptureModal;
