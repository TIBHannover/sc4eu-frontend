import React, { Component, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes.config';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import { withCookies } from 'react-cookie';
import { detect } from 'detect-browser';
import { Alert } from 'reactstrap';
import DefaultLayout from 'Layout/DefaultLayout';
// import "./App.css";
import './assets/scss/CustomBootstrap.scss';

class App extends Component {
    constructor(props) {
        super(props);

        const browser = detect();

        this.state = {
            showBrowserWarning: false
        };

        if (browser && browser.name === 'ie') {
            this.state.showBrowserWarning = true;
        }
    }

    render() {
        // console.log(this.props.history);
        // return <div> Hello2 </div>;

        return (
            <ConnectedRouter history={this.props.history}>
                {/*<ScrollToTop>*/}
                <DefaultLayout>
                    {this.state.showBrowserWarning && (
                        <Alert color="danger" style={alertStyle} className="text-center">
                            <strong>Outdated browser</strong> You are using Internet Explorer which is not supported. Please upgrade your browser for
                            the best experience
                        </Alert>
                    )}
                    {/* Suspense is used for when the component is lazy loaded */}
                    <Suspense fallback={<div className="mt-5 mb-2 text-center">Loading...</div>}>
                        <Switch>{renderRoutes(routes)}</Switch>
                    </Suspense>
                </DefaultLayout>
            </ConnectedRouter>
        );
    }
}

App.propTypes = {
    history: PropTypes.object
};

export default withCookies(App);

// local scope styles

const alertStyle = {
    borderRadius: '0',
    marginTop: '-30px',
    marginBottom: '30px'
};
