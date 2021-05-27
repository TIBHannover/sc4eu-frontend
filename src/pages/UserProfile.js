import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserViewDetails from 'components/UserViewDetails';
import { getUserProfile } from '../network/UserProfileCalls';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null
        };
    }

    componentDidMount = () => {
        // request information of that user

        getUserProfile({ user: this.props.match.params.userId }).then(data => {
            const json = JSON.parse(data.body);
            this.setState({ loading: false, data: json });
        });
    };

    render() {
        return (
            <Container>
                {this.state.loading && (
                    <div>
                        <h2 className="h5">
                            <span>
                                <Icon icon={faSpinner} spin />
                            </span>{' '}
                            Loading
                        </h2>
                    </div>
                )}

                {!this.state.loading && <UserViewDetails info={this.state.data} mode="read-only" />}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => ({});

UserProfile.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            userId: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
