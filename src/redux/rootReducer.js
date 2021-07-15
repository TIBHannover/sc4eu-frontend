import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './reducers/auth';
import ResourceRelationModelReducer from './reducers/resourceRelationModel';
import globalUIReducer from './reducers/globaUI';

export default history =>
    combineReducers({
        router: history ? connectRouter(history) : null,
        auth,
        ResourceRelationModelReducer,
        globalUIReducer
    });
