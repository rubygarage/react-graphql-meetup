import { createLogic } from 'redux-logic';
import { normalize } from 'normalizr';
import { movies } from '../../schema';
import { getSessionId } from '../login/selectors';
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

export const watchlistLogic = createLogic({
  type: t.WATCHLIST_REQUEST,

  process({ apiClient, getState, action }, dispatch, done) {
    const accountId = getAccountId(getState());
    const sessionId = getSessionId(getState());
    const page = action.payload.page;
    apiClient
      .get(`account/${accountId}/watchlist/movies?session_id=${sessionId}&page=${page}`)
      .then(response => {
        const normalizeData = normalize(response.data.results, [movies]);
        dispatch(addEntities(normalizeData.entities));
        dispatch(
          watchlistSuccess({
            ...response.data,
            results: normalizeData.result,
          }),
        );
      })
      .catch(error => dispatch(watchlistFailure(error)))
      .then(() => done());
  },
});

export const addToWatchlistLogic = createLogic({
  type: t.ADD_TO_WATCHLIST_REQUEST,

  process({ apiClient, getState, action }, dispatch, done) {
    const accountId = getAccountId(getState());
    const sessionId = getSessionId(getState());
    const movieId = action.payload.movieId;
    const watchlist = action.payload.watchlist;
    apiClient
      .post(`account/${accountId}/watchlist?session_id=${sessionId}`, {
        media_type: 'movie',
        media_id: movieId,
        watchlist,
      })
      .then(response => {
        dispatch(addToWatchlistSuccess(response.data));
        dispatch(watchlistRequest({ page: 1 }));
        dispatch(movieRequest({ movieId }));
      })
      .catch(error => dispatch(addToWatchlistFailure(error)))
      .then(() => done());
  },
});
