import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer/root';
import {createLogger} from 'redux-logger';
import rootSaga from './saga/root';
const middleware = getDefaultMiddleware({});
if (process.env.NODE_ENV === `development`) {
  const logger = createLogger();
  middleware.push(logger);
}

const makeStore = () => {
  const sagaMiddleWare = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...middleware, sagaMiddleWare],
  });
  sagaMiddleWare.run(rootSaga);
  return store;
};

export default () => {
  const store = makeStore();
  return {store};
};
