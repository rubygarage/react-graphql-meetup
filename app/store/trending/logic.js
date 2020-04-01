import { createLogic } from 'redux-logic';
import gql from 'graphql-tag';
import { normalize } from 'normalizr';
import { movies } from '../schema';

import { trendingSuccess, trendingFailure } from './actions';
import { addEntities } from '../data/actions';
import * as t from './actionTypes';
import handleErrors from '../../helpers/handleErrors';

const TRENDING_MOVIES = gql`
  {
    trendingMovies {
      id
      title
      overview
      poster {
        filePath
      }
    }
  }
`;

export default createLogic({
  type: t.TRENDING_REQUEST,

  async process({ apiClient, action }, dispatch, done) {

    const { page } = action.payload;

    try {
      const { data: { trendingMovies } } = await apiClient.query({
        query: TRENDING_MOVIES,
      });

      const { entities, result } = normalize(trendingMovies, [movies]);

      dispatch(addEntities(entities));
      dispatch(
        trendingSuccess({
          page,
          total_pages: 1,
          results: result,
        }),
      );
    } catch (error) {
      const handledError = handleErrors(error);
      dispatch(trendingFailure(handledError));
    }

    done();
  },
});
