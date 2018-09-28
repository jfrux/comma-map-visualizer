import * as types from '../actions/action_types';

const initialState = {
  prevTripId: null,
  currentTripId: null,
  fetchingList: false,
  fetching: false,
  list: {},
  refreshingMap: false,
  refreshingTripLine: false,
  hasTripLines: false
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_LIST:
      return {
        ...state,
        fetchingList: true,
        prevTripId: null,
        currentTripId: null
      };
    case types.FETCH_LIST_SUCCESS:
      return {
        ...state,
        fetchingList: false,
        list: action.payload
      };
    case types.FETCH_LIST_ERROR:
      return {
        ...state,
        fetchingList: false,
        currentTripId: (state.prevTripId !== null ? state.prevTripId : null)
      };
    case types.SELECT_TRIP:
      return {
        ...state,
        fetching: true,
        currentTripId: action.payload.tripId
      };
    case types.FETCH_POINTS:
      return {
        ...state,
        fetching: true,
        prevTripId: state.currentTripId,
        currentTripId: action.payload.tripId
      };
    case types.FETCH_POINTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        ...action.payload
      };
    case types.FETCH_POINTS_ERROR:
      return {
        ...state,
        fetching: false,
        currentTripId: (state.prevTripId !== null ? state.prevTripId : null)
      };

    case types.DRAW_TRIP_LINE:
      return {
        ...state,
        refreshingMap: true,
        refreshingTripLine: true,
        hasTripLines: false
      };

    case types.DRAW_TRIP_LINE_SUCCESS:
      return {
        ...state,
        refreshingMap: false,
        refreshingTripLine: false,
        hasTripLines: true
      };

    case types.DRAW_TRIP_LINE_ERROR:
      return {
        ...state,
        refreshingMap: false,
        refreshingTripLine: false,
        hasTripLines: false
      };

      //PLAYBACK
      case 'START':
        return {
          ...state, 
          active: true, 
          reset: false
        };
      case 'STOP':
        return {
          ...state, 
          active: false
        };
      case 'RESET':
        return {
          ...state, 
          startTime: new Date(),
          active: false, 
          reset: true, 
          currentTime: 0
        };
      case 'INCREMENT':
        return {
          ...state, 
          currentTime: new Date() - state.startTime
        };
    default:
    return state;
  }
};

export default appReducer;