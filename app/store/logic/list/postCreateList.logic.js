import { createLogic } from 'redux-logic';

import {
  CREATE_LIST_REQUEST,
  CREATE_LIST_SUCCESS,
  CREATE_LIST_FAILURE,
} from '../../constants/list.constants';

const getCreateList = createLogic({
  type: CREATE_LIST_REQUEST,

  process({ action, apiClient, apiKey }, dispatch, done) {
    apiClient
      .post(
        `list?api_key=${apiKey}&session_id=${action.payload.session_id}`,
        action.payload.payload,
      )
      .then(response => dispatch({ type: CREATE_LIST_SUCCESS, payload: response }))
      .catch(error => dispatch({ type: CREATE_LIST_FAILURE, payload: error, error: true }))
      .then(() => done());
  },
});

export default getCreateList;
