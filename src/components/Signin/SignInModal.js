import { Modal } from 'reactstrap';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleAuthDialog } from '../../redux/actions/auth';
import { TransitionGroup } from 'react-transition-group';
import LoginViaEmail from './LoginViaEmail';
import { AnimationContainer } from 'styledComponents/styledComponents';
import { withTheme } from '@emotion/react';
class SignInModal extends Component {
    render() {
        const { theme } = this.props;
        return (
            <>
                <Modal isOpen={this.props.dialogIsOpen} toggle={this.props.toggleAuthDialog}>
                    <div style={{ backgroundColor: theme.palette.background.paper}}>
                        <TransitionGroup exit={false}>
                            {this.props.action === 'signin' && (
                                <AnimationContainer key={1} classNames="fadeIn" timeout={{ enter: 700, exit: 0 }}>
                                    <LoginViaEmail callback={this.props.callback} />
                                </AnimationContainer>
                            )}
                        </TransitionGroup>
                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    dialogIsOpen: state.auth.dialogIsOpen,
    action: state.auth.action
});

const mapDispatchToProps = dispatch => ({
    toggleAuthDialog: () => dispatch(toggleAuthDialog())
});

SignInModal.propTypes = {
    action: PropTypes.string.isRequired,
    dialogIsOpen: PropTypes.bool.isRequired,
    toggleAuthDialog: PropTypes.func.isRequired,
    callback: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SignInModal));
