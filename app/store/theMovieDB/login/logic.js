import { createLogic } from 'redux-logic';
import Cookies from 'js-cookie';
import gql from 'graphql-tag';

import {
  createSessionSuccess,
  createSessionFailure,
  deleteSessionSuccess,
  deleteSessionFailure,
} from './actions';
import * as t from './actionTypes';

const USER_SIGN_IN = gql`
  mutation userSignin($email: String!, $password: String!) {
    userSignin(input: { email: $email, password: $password }) {
      access
      csrf
      refresh
    }
  }
`;

export const createSessionLogic = createLogic({
  type: t.CREATE_SESSION_REQUEST,

  process({ apiClient, action }, dispatch, done) {
    apiClient.mutate({
      mutation: USER_SIGN_IN,
      variables: { email: 'ttt@test.com', password: 'password' },
    })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => done());

    // apiClient
    //   .get('authentication/token/new')
    //   .then(response1 =>
    //     apiClient.post('authentication/token/validate_with_login', {
    //       ...action.payload.values,
    //       request_token: response1.data.request_token,
    //     }),
    //   )
    //   .then(response2 =>
    //     apiClient.post('authentication/session/new', {
    //       request_token: response2.data.request_token,
    //     }),
    //   )
    //   .then(response3 => {
    //     const sessionId = response3.data.session_id;
    //     Cookies.set('sessionId', sessionId, { expires: 7 });
    //     dispatch(createSessionSuccess(sessionId));
    //     action.payload.actions.setSubmitting(false);
    //   })
    //   .catch(error => {
    //     dispatch(createSessionFailure(error));
    //     action.payload.actions.setSubmitting(false);
    //   })
    //   .then(() => done());
  },
});

export const deleteSessionLogic = createLogic({
  type: t.DELETE_SESSION_REQUEST,

  process({ apiClient }, dispatch, done) {
    apiClient
      .delete('authentication/session', {
        data: { session_id: Cookies.get('sessionId') },
      })
      .then(() => {
        Cookies.set('sessionId', '');
        Cookies.set('accountId', '');
        dispatch(deleteSessionSuccess(''));
      })
      .catch(error => dispatch(deleteSessionFailure(error)))
      .then(() => done());
  },
});
