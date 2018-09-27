import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import * as types from '../actions/action_types';
import * as actionCreators from '../actions';

// User selected a trip, which is now going to dispatch FETCH_POINTS
function* selectTrip(action) {
  yield put(actionCreators.fetchPoints(action.payload.tripId));
}

// Will be fired on FETCH_TRIP actions
function* fetchList(action) {
  try {
    const res = yield call(fetch, '/trips/index.json', { method: 'GET' });
    const json = yield call([res, res.json]);
    yield put(actionCreators.fetchList_SUCCESS(json));
  } catch (e) {
    yield put(actionCreators.fetchList_ERROR(e));
  }
}

// Will be fired on FETCH_TRIP actions
function* fetchPoints(action) {
  try {
    const res = yield call(fetch, `/trips/${action.payload.tripId}.json`, { method: 'GET' });
    const json = yield call([res, res.json]);
    yield put(actionCreators.fetchPoints_SUCCESS(json));
  } catch (e) {
    yield put(actionCreators.fetchPoints_ERROR(e));
  }
}

/*
  Listens for FETCH_TRIP action, and then dispatches fetch.
  Will only take the latest, and cancel the others.
*/
function* fetchWatcher() {
  return all(
    yield takeLatest(types.SELECT_TRIP, selectTrip),
    yield takeLatest(types.FETCH_POINTS, fetchPoints),
    yield takeEvery(types.FETCH_LIST, fetchList)
  )
}

export default fetchWatcher;