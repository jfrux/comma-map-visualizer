import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState) => {
  // Create Store
  const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));

  // Start Root Sagas
  sagaMiddleware.run(rootSagas)

  return store;
};

export default { configureStore };
