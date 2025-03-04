import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/rootReducer';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import env from '@beam-australia/react-env';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // enable redux debug tools

const history = createBrowserHistory({ basename: env('PUBLIC_URL') });

const persistConfig = {
    key: 'root',
    storage,
    expires: 8 * 60 * 60 * 1000, // 8 hours in milliseconds
    blacklist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk, routerMiddleware(history))));
const persistor = persistStore(store);

// Export the store directly
export { store, persistor, history };
