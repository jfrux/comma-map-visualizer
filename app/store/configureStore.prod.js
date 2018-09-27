import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSagas from '../sagas';

const sagaMiddleware = createSagaMiddleware()

const configureStore = (initialState) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Saga Middleware
  middleware.push(sagaMiddleware);

  // Create Store
  const store = createStore(rootReducer);

  // Start Root Sagas
  sagaMiddleware.run(rootSagas)

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      () => store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
};

export default { configureStore };
