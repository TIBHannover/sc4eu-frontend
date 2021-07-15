import React, { Component } from 'react';
import { Col, Container, FormGroup, Input, Label, Button } from 'reactstrap';
// import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyledGravatar } from '../styledComponents/styledComponents';
import { updateUserSettings } from '../network/UserProfileCalls';
import { redux_updateUserSettings } from '../redux/actions/auth';

class UserViewDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    componentDidMount = () => {
        // request information of that user
    };

    componentDidUpdate(prevProps, prevState, snapshot) {}

    createEditableEntryFor = (label, selector, obj) => {
        // create a line for user to edit with a save button too;
        return (
            <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                    {label}
                </Label>
                <Col sm={10} style={{ display: 'flex' }}>
                    <Input
                        placeholder={'placeholder for ' + label}
                        value={this.state[selector] !== undefined ? this.state[selector] : obj[selector]}
                        onChange={e => {
                            if (this.state[selector] === undefined) {
                                const newState = {};

                                if (e.target.value.length === 0) {
                                    newState[selector] = '';
                                } else {
                                    newState[selector] = obj[selector];
                                }
                                this.setState(newState);
                            } else {
                                const newState = {};
                                newState[selector] = e.target.value;
                                if (e.target.value.length === 0) {
                                    newState[selector] = '';
                                }
                                this.setState(newState);
                            }
                        }}
                    />
                    <Button
                        onClick={() => {
                            const newState = {};
                            newState[selector] = obj[selector];
                            this.setState(newState);
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        onClick={() => {
                            obj[selector] = this.state[selector];
                            const newState = {};
                            newState[selector] = obj[selector];
                            updateUserSettings(newState);
                            // okay for now
                            this.props.redux_updateUserSettings({ user: { displayName: obj[selector] } });
                            this.setState(newState);
                        }}
                    >
                        Save
                    </Button>
                </Col>
            </FormGroup>
        );
    };

    createTable = user => {
        const editableUserName = this.createEditableEntryFor('Display Name', 'name', user);
        return <div>{editableUserName}</div>;
    };

    render() {
        return (
            <Container>
                {!this.props.info.error && (
                    <>
                        <div style={{ padding: '10px', display: 'flex' }}>
                            <StyledGravatar className="rounded-circle" md5={this.props.info.user.gravatarId} size={80} id="TooltipExample" />
                            <h1 style={{ paddingLeft: '20px', paddingTop: '15px' }}>{this.props.info.user.name}</h1>
                        </div>
                        <hr />
                        {this.props.mode === 'read-write' && <div>{this.createTable(this.props.info.user)}</div>}
                    </>
                )}
                {this.props.info.error && <h1>{this.props.info.error}</h1>}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => ({
    redux_updateUserSettings: data => dispatch(redux_updateUserSettings(data))
});

UserViewDetails.propTypes = {
    info: PropTypes.object.isRequired,
    mode: PropTypes.string,
    redux_updateUserSettings: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserViewDetails);
