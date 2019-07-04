import { createLogic } from 'redux-logic';
import { normalize } from 'normalizr';
import { movies } from '../../schema';
import { getCookie } from '../../../helpers/cookie';

import { trendingSuccess, trendingFailure } from './actions';
import { addEntities } from '../data/actions';
import * as t from './actionTypes';

export default createLogic({
  type: t.TRENDING_REQUEST,

  process({ apiClient, action }, dispatch, done) {
    apiClient
      .get(`trending/movie/week?session_id=${getCookie('sessionId')}&page=${action.payload.page}`)
      .then(response => {
        const normalizeData = normalize(response.data.results, [movies]);
        dispatch(
          trendingSuccess({
            ...response.data,
            results: normalizeData.result,
          }),
        );
        dispatch(addEntities({ ...normalizeData.entities }));
        // return response;
      })
      .catch(error => dispatch(trendingFailure(error)))
      .then(() => done());
  },
});
