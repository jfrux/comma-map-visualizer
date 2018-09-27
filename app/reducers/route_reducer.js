import * as types from '../actions/types';

const initialState = {

}

const routeReducer = (state = initialState, action) => {
  switch (action.type) {
      case types.FILTER:
          return action.filter;
      default:
          return state;
  }
};

export default routeReducer