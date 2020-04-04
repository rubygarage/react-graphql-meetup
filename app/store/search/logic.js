import { createLogic } from 'redux-logic';
import { normalize } from 'normalizr';
import { movies } from '../schema';
import gql from 'graphql-tag';

import { searchSuccess, searchFailure } from './actions';
import { addEntities } from '../data/actions';
import * as t from './actionTypes';
import handleErrors from '../../helpers/handleErrors';

const SEARCH = gql`
  query moviesSearch($filter: String) {
    moviesSearch(filter: $filter) {
      currentPage
      totalPageCount
      nodes {
        id
        title
        overview
        poster {
          filePath
        }
      }
    }
  }
`;

export default createLogic({
  type: t.SEARCH_REQUEST,

  async process({ apiClient, action }, dispatch, done) {
    const { query, page } = action.payload;

    try {
      const { data: { moviesSearch: { nodes, totalPageCount } } } = await apiClient.query({
        query: SEARCH,
        variables: { filter: query }
      });

      const { entities, result } = normalize(nodes, [movies]);

      dispatch(addEntities(entities));
      dispatch(
        searchSuccess({
          query,
          page,
          results: result,
          totalPages: totalPageCount
        }),
      );
    } catch (error) {
      const handledError = handleErrors(error);
      dispatch(searchFailure(handledError));
    }

    done();
  },
});
