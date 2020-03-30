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
import handleErrors from '../../helpers/handleErrors';

const USER_SIGN_IN = gql`
  mutation userSignIn($email: String!, $password: String!) {
    userSignIn(input: { email: $email, password: $password }) {
      access
      csrf
      refresh
    }
  }
`;

const USER_SIGN_OUT = gql`
  mutation userSignOut {
    userSignOut {
      completed
    }
  }
`

export const createSessionLogic = createLogic({
  type: t.CREATE_SESSION_REQUEST,

  async process({ apiClient, action }, dispatch, done) {
    const { email, password } = action.payload.values;

    try {
      const { data: { userSignIn: { access, refresh } } } = await apiClient.mutate({
        mutation: USER_SIGN_IN,
        variables: { email, password },
      });
      
      Cookies.set('access', access);
      Cookies.set('refresh', refresh);
      
      dispatch(createSessionSuccess(access));
      action.payload.actions.setSubmitting(false);
    } catch (error) {
      const handledError = handleErrors(error);

      dispatch(createSessionFailure(handledError));
      action.payload.actions.setSubmitting(false);
    }

    done();
  },
});

export const deleteSessionLogic = createLogic({
  type: t.DELETE_SESSION_REQUEST,

  async process({ apiClient }, dispatch, done) {
    try {
      await apiClient.mutate({
        mutation: USER_SIGN_OUT,
      });

      Cookies.set('access', '');
      Cookies.set('refresh', '');

      dispatch(deleteSessionSuccess(''));
    } catch (error) {
      const handledError = handleErrors(error);
      dispatch(deleteSessionFailure(handledError));
    }
  },
});
