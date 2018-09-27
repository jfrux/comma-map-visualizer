import { combineReducers } from 'redux';
import * as types from '../actions/types';
import routeReducer from './route_reducer';



const rootReducer = combineReducers({
    // filter,
    routes: routeReducer
});

export default rootReducer;
