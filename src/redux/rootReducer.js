import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './reducers/auth';
import ResourceRelationModelReducer from './reducers/resourceRelationModel';
import globalUIReducer from './reducers/globaUI';

const createRootReducer = history =>
    combineReducers({
        router: history ? connectRouter(history) : undefined,
        auth: authReducer,
        ResourceRelationModelReducer,
        globalUIReducer
    });

export default createRootReducer;
