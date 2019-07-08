import { createLogic } from 'redux-logic';
import { getSessionId } from '../login/selectors';
import { getAccountId } from '../profile/selectors';

import {
  favoriteSuccess,
  favoriteFailure,
  addToFvoriteSuccess,
  addToFvoriteFailure,
} from './actions';
import * as t from './actionTypes';

export const favoriteLogic = createLogic({
  type: t.FAVORITE_REQUEST,

  process({ apiClient, getState, action }, dispatch, done) {
    const accountId = getAccountId(getState());
    const sessionId = getSessionId(getState());
    const page = action.payload.page;
    apiClient
      .get(`account/${accountId}/favorite/movies?session_id=${sessionId}&page=${page}`)
      .then(response => {
        console.log(response.data);
        dispatch(favoriteSuccess(response.data));
      })
      .catch(error => dispatch(favoriteFailure(error)))
      .then(() => done());
  },
});

export const addToFavoriteLogic = createLogic({
  type: t.ADD_TO_FAVORITE_REQUEST,

  process({ apiClient, getState, action }, dispatch, done) {
    const accountId = getAccountId(getState());
    const sessionId = getSessionId(getState());
    const movieId = action.payload.movieId;
    const favorite = action.payload.favorite;
    console.log('movieId ', movieId, 'favorite ', favorite);
    apiClient
      .post(`account/${accountId}/favorite?session_id=${sessionId}`, {
        media_type: 'movie',
        media_id: movieId,
        favorite,
      })
      .then(response => dispatch(addToFvoriteSuccess(response.data)))
      .catch(error => dispatch(addToFvoriteFailure(error)))
      .then(() => done());
  },
});