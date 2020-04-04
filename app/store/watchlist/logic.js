import { createLogic } from 'redux-logic';
import { normalize } from 'normalizr';
import gql from 'graphql-tag';

import { movies } from '../schema';
import { getAccountId } from '../profile/selectors';

import {
  watchlistRequest,
  watchlistSuccess,
  watchlistFailure,
  addToWatchlistSuccess,
  addToWatchlistFailure,
} from './actions';
import { addEntities } from '../data/actions';
import { movieRequest } from '../movie/actions';
import * as t from './actionTypes';
import handleErrors from '../../helpers/handleErrors';

const WATCHLIST = gql`
  query watchlistMoviesList {
    me {
      id
      watchlistMoviesList {
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
  }
`;

const ADD_TO_WATCHLIST = gql`
  mutation userAddWatchlistMovie($movieId: ID!, $userAccountId: ID!) {
    userAddWatchlistMovie(input: { movieId: $movieId, userAccountId: $userAccountId }) {
      id
    }
  }
`;

export const watchlistLogic = createLogic({
  type: t.WATCHLIST_REQUEST,

  async process({ apiClient, action }, dispatch, done) {
    const { page } = action.payload;

    try {
      const {
        data: {
          me: {
            watchlistMoviesList: { nodes, totalPageCount },
          },
        },
      } = await apiClient.query({
        query: WATCHLIST,
      });

      const { entities, result } = normalize(nodes, [movies]);

      dispatch(addEntities(entities));
      dispatch(
        watchlistSuccess({
          page,
          results: result,
          totalPages: totalPageCount,
        }),
      );
    } catch (error) {
      const handledError = handleErrors(error);
      dispatch(watchlistFailure(handledError));
    }

    done();
  },
});

export const addToWatchlistLogic = createLogic({
  type: t.ADD_TO_WATCHLIST_REQUEST,

  async process({ apiClient, getState, action }, dispatch, done) {
    const accountId = getAccountId(getState());

    try {
      const { data } = await apiClient.mutate({
        mutation: ADD_TO_WATCHLIST,
        variables: { movieId: action.payload.movieId, userAccountId: accountId },
      });

      dispatch(addToWatchlistSuccess());
      dispatch(watchlistRequest({ page: 1 }));
      dispatch(movieRequest({ movieId }));
    } catch (error) {
      const handledError = handleErrors(error);
      dispatch(addToWatchlistFailure(handledError));
    }

    done();
  },
});
