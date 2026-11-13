import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './reducers/auth';
import ResourceRelationModelReducer from './reducers/resourceRelationModel';
import globalUIReducer from './reducers/globaUI';

const authPersistConfig = { key: 'auth', storage, whitelist: ['redirectRoute'] };

const createRootReducer = history =>
    combineReducers({
        router: history ? connectRouter(history) : undefined,
        auth: persistReducer(authPersistConfig, authReducer),
        ResourceRelationModelReducer,
        globalUIReducer
    });

export default createRootReducer;
