import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
import routeReducer from './route_reducer';



const rootReducer = combineReducers({
    filter,
    routes: routeReducer,
    routing
});

export default rootReducer;
