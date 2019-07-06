import { createLogic } from 'redux-logic';
import { getSessionId } from '../login/selectors';
import { getAccountId } from '../profile/selectors';

import { createdListsSuccess, createdListsFailure, deleteListSuccess, deleteListFailure } from './actions';
import * as t from './actionTypes';

export const myListsLogic = createLogic({
  type: t.CREATED_LISTS_REQUEST,

  process({ apiClient, getState, action }, dispatch, done) {
    const page = action.payload.page;
    const sessionId = getSessionId(getState());
    const accountId = getAccountId(getState());
    apiClient
      .get(`account/${accountId}/lists?session_id=${sessionId}&page=${page}&language=en-US`)
      .then(response => dispatch(createdListsSuccess(response.data)))
      .catch(error => dispatch(createdListsFailure(error)))
      .then(() => done());
  },
});

export const deleteListLogic = createLogic({
  type: t.DELETE_LIST_REQUEST,

  process({ apiClient, getState, action }, dispatch, done) {
    const listId = action.payload.listId;
    const sessionId = getSessionId(getState());
    apiClient
      .delete(`list/${listId}?session_id=${sessionId}`)
      .then(response => response.data)
      .catch(error => dispatch(deleteListFailure(error)))
      .then(() => done());
  },
});
