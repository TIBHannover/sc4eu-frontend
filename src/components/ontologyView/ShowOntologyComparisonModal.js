import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import { colorStyled } from '../../styledComponents/styledColor';
import { fontStyled } from '../../styledComponents/styledFont';

class ShowOntologyComparisonModal extends Component {
    render() {
        return (
            <Modal
                style={{ width: '100%', maxWidth: '80%', height: '100%', maxHeight: '50%', fontFamily: fontStyled.fontFamily }}
                isOpen={this.props.showDialog}
                toggle={this.props.toggle}
                autoFocus={false}
            >
                <ModalHeader autoFocus={false}>Ontology Comparison</ModalHeader>
                <ModalBody id="createProjectBody" style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
                    {ReactHtmlParser(this.props.comparisonContent)}
                </ModalBody>
                <ModalFooter>
                    <Button
                        id="finishButton"
                        style={{ background: colorStyled.SECONDARY.dark }}
                        onClick={() => {
                            this.props.callback();
                        }}
                        autoFocus={true}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

ShowOntologyComparisonModal.propTypes = {
    showDialog: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    callback: PropTypes.func.isRequired,
    comparisonContent: PropTypes.string.isRequired
};

const mapStateToProps = state => ({});

export default compose(connect(mapStateToProps))(ShowOntologyComparisonModal);
