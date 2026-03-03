import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor, history } from './store';
import rootReducer from './redux/rootReducer';
import { CookiesProvider } from 'react-cookie';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ReactPiwik from 'react-piwik';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { register } from './service-worker';
// To connect Matomo Use React library react-piwik

const piwik = new ReactPiwik({
    url: 'https://support.tib.eu/piwik/',
    siteId: 40
});

let category = 'Default Category'; // Provide a default value
let action = 'Default Action'; // Provide a default value

ReactPiwik.push(['trackPageView']);
ReactPiwik.push(['trackEvent', category, action]);

const piwikHistory = piwik.connectToHistory(history);

const queryClient = new QueryClient();

const render = () => {
    ReactDOM.render(
        <DndProvider backend={HTML5Backend}>
            <CookiesProvider>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <QueryClientProvider client={queryClient}>
                            <ThemeProvider theme={theme}>
                                <App history={piwikHistory} />
                            </ThemeProvider>
                            <ReactQueryDevtools />
                        </QueryClientProvider>
                    </PersistGate>
                </Provider>
            </CookiesProvider>
        </DndProvider>,
        document.getElementById('root')
    );
};

render();
register();

// Hot reloading components and reducers
if (module.hot) {
    module.hot.accept('./App', () => {
        render();
    });

    module.hot.accept('./redux/rootReducer', () => {
        store.replaceReducer(rootReducer(history));
    });
}
