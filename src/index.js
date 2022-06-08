import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'fast-text-encoding/text';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore, { history } from './store';
import rootReducer from './redux/rootReducer';
import { CookiesProvider } from 'react-cookie';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ReactPiwik from 'react-piwik';

// To connect Matomo Use React library react-piwik

const piwik = new ReactPiwik({
    url: 'https://support.tib.eu/piwik/',
    siteId: 40
});

ReactPiwik.push(['trackEvent', 'trackPageView']);

const store = configureStore();
const render = () => {
    ReactDOM.render(
        <DndProvider backend={HTML5Backend}>
            <CookiesProvider>
                <Provider store={store}>
                    <App history={piwik.connectToHistory(history)} />
                </Provider>
            </CookiesProvider>
        </DndProvider>,
        document.getElementById('root')
    );
};

render();
unregister();

// Hot reloading components and reducers
if (module.hot) {
    module.hot.accept('./App', () => {
        render();
    });

    module.hot.accept('./redux/rootReducer', () => {
        store.replaceReducer(rootReducer(history));
    });
}
