import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogicMiddleware } from 'redux-logic';

import apiClient from '../apiClient/client';
import rootLogic from './logic';
import rootReducer from './rootReducer';

const logicMiddleware = createLogicMiddleware(rootLogic, {
  apiClient,
});

const middlewares = applyMiddleware(logicMiddleware);
const enhancers = compose(middlewares);

export default createStore(rootReducer, composeWithDevTools(enhancers));
