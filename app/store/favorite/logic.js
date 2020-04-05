import { createLogic } from 'redux-logic';
import { normalize } from 'normalizr';
import gql from 'graphql-tag';

import { movies } from '../schema';
import { getAccountId } from '../profile/selectors';

import {
  favoriteRequest,
  favoriteSuccess,
  favoriteFailure,
  addToFavoriteSuccess,
  addToFavoriteFailure,
} from './actions';
import { addEntities } from '../data/actions';
import { movieRequest } from '../movie/actions';
import * as t from './actionTypes';
import handleErrors from '../../helpers/handleErrors';

const FAVORITES = gql`
  query favoriteMoviesList {
    me {
      id
      favoriteMoviesList {
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

const ADD_TO_FAVORITE = gql`
  mutation userAddFavoriteMovie($movieId: ID!, $userAccountId: ID!) {
    userAddFavoriteMovie(input: { movieId: $movieId, userAccountId: $userAccountId }) {
      id
    }
  }
`;

export const favoriteLogic = createLogic({
  type: t.FAVORITE_REQUEST,

  async process({ apiClient, getState, action }, dispatch, done) {
    const { page } = action.payload;

    try {
      const {
        data: {
          me: {
            favoriteMoviesList: { nodes, totalPageCount },
          },
        },
      } = await apiClient.query({
        query: FAVORITES,
      });

      const { entities, result } = normalize(nodes, [movies]);

      dispatch(addEntities(entities));
      dispatch(
        favoriteSuccess({
          page,
          results: result,
          totalPages: totalPageCount,
        }),
      );
    } catch (error) {
      const handledError = handleErrors(error);
      dispatch(favoriteFailure(handledError));
    }

    done();
  },
});

export const addToFavoriteLogic = createLogic({
  type: t.ADD_TO_FAVORITE_REQUEST,

  async process({ apiClient, getState, action }, dispatch, done) {
    const accountId = getAccountId(getState());
    const { movieId } = action.payload;

    try {
      const { data } = await apiClient.mutate({
        mutation: ADD_TO_FAVORITE,
        variables: { movieId, userAccountId: accountId },
      });

      dispatch(addToFavoriteSuccess());
      dispatch(favoriteRequest({ page: 1 }));
      dispatch(movieRequest({ movieId }));
    } catch (error) {
      const handledError = handleErrors(error);
      dispatch(addToFavoriteFailure(handledError));
    }

    done();

    // const accountId = getAccountId(getState());
    // const sessionId = getSessionId(getState());
    // const { movieId, favorite } = action.payload;
    // apiClient
    //   .post(`account/${accountId}/favorite?session_id=${sessionId}`, {
    //     media_type: 'movie',
    //     media_id: movieId,
    //     favorite,
    //   })
    //   .then(response => {
    //     dispatch(addToFavoriteSuccess(response.data));
    //     dispatch(favoriteRequest({ page: 1 }));
    //     dispatch(movieRequest({ movieId }));
    //   })
    //   .catch(error => dispatch(addToFavoriteFailure(error)))
    //   .then(() => done());
  },
});
