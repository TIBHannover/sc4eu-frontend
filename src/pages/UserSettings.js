import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import UserViewDetails from 'components/UserViewDetails';
import { getUserSettings } from '../network/UserProfileCalls';

class UserSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null
        };
    }

    componentDidMount = () => {
        // request information of that user

        getUserSettings().then(data => {
            console.log('data', data);
            let input = data;
            if (data.body) {
                input = JSON.parse(data.body);
            }
            this.setState({ loading: false, data: input });
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

                {!this.state.loading && <UserViewDetails info={this.state.data} mode="read-write" />}
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

UserSettings.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
