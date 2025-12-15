import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserViewDetails from 'components/UserViewDetails';
import { getUserProfile } from '../network/UserProfileCalls';
import AlertPopUp from '../components/ReusableComponents/AlertPopUp';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null,
            isPopUpOpen: false,
            popError: ''
        };
    }

    componentDidMount() {
        getUserProfile({ user: this.props.match.params.userId }).then(data => {
            let json = null;
            if (data?.body) {
                json = JSON.parse(data.body);
                this.setState({ loading: false, data: json });
            } else {
                this.setState({ isPopUpOpen: true, loading: false, popError: data?.error });
            }
        });
    }

    PopUpCallback = confirmed => {
        if (confirmed) {
            this.setState({ isPopUpOpen: false });
            this.props.history.push('/');
        }
    };

    handlePopUpClose = () => {
        this.setState({ isPopUpOpen: false });
        this.props.history.push('/');
    };

    render() {
        return (
            <Container>
                {this.state.loading && (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100vh'
                        }}
                    >
                        <h2 className="h5" style={{ textAlign: 'center' }}>
                            <span>
                                <Icon icon={faSpinner} spin />
                            </span>{' '}
                            Loading
                        </h2>
                    </div>
                )}

                {!this.state.loading &&
                    (this.state.data !== null ? (
                        <UserViewDetails info={this.state.data} mode="read-only" />
                    ) : (
                        <AlertPopUp
                            bodyText={this.state.popError}
                            isOpen={this.state.isPopUpOpen}
                            onClose={this.handlePopUpClose}
                            isConfirm={confirmed => this.PopUpCallback(confirmed)}
                        />
                    ))}
            </Container>
        );
    }
}

UserProfile.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            userId: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile));
