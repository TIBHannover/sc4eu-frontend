import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './reducers/auth';
import ResourceRelationModelReducer from './reducers/resourceRelationModel';

export default history =>
    combineReducers({
        router: history ? connectRouter(history) : null,
        auth,
        ResourceRelationModelReducer
    });
