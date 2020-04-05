import { createLogic } from 'redux-logic';
import { normalize } from 'normalizr';
import gql from 'graphql-tag';
import { profile } from '../schema';

import { profileSuccess, profileFailure } from './actions';
import { addEntities } from '../data/actions';
import * as t from './actionTypes';
import handleErrors from '../../helpers/handleErrors';

const PROFILE = gql`
  {
    me {
      id
      email
      userProfile {
        id
        fullName
      }
    }
  }
`;

export default createLogic({
  type: t.PROFILE_REQUEST,

  async process({ apiClient }, dispatch, done) {
    try {
      const { data: { me } } = await apiClient.query({
        query: PROFILE,
        fetchPolicy: 'network-only'
      });

      const { entities, result } = normalize(me, profile);

      dispatch(addEntities(entities));
      dispatch(profileSuccess({ id: result }));
    } catch (error) {
      const handledError = handleErrors(error);
      dispatch(profileFailure(handledError));
    }

    done();
  },
});
