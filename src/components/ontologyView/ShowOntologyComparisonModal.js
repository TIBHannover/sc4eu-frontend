import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { fontStyled } from '../../styledComponents/styledFont';
import { withTheme } from '@emotion/react';
class ShowOntologyComparisonModal extends Component {
    render() {
        const { theme } = this.props;
        return (
            <Modal
                style={{ width: '70%', maxWidth: '80%', height: '100%', maxHeight: '50%', fontFamily: fontStyled.fontFamily }}
                isOpen={this.props.showDialog}
                toggle={this.props.toggle}
                autoFocus={false}
            >
                <ModalHeader autoFocus={false}>Ontology Comparison</ModalHeader>
                <ModalBody id="createProjectBody" style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
                    {parse(this.props.comparisonContent.toString())}
                </ModalBody>
                <ModalFooter>
                    <Button
                        id="finishButton"
                        style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText }}
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

export default compose(connect(mapStateToProps))(withTheme(ShowOntologyComparisonModal));
