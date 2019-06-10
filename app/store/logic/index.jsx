import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
import { createLogic } from 'redux-logic';
import { themoviedb, apiKey } from '../../etc/config.json';

import { MOVIE_REQUEST, MOVIE_SUCCESS, MOVIE_FAILURE } from '../constants/movie.constants';

const url = `${themoviedb}/discover/movie`;

const loginLogic = createLogic({
  // declarative built-in functionality wraps your code
  type: MOVIE_REQUEST, // only apply this logic to this type
  // cancelType: CANCEL_FETCH_POLLS, // cancel on this type
  // latest: true, // only take latest

  process({ getState, action }, dispatch, done) {
    axios
      .get(`${url}?page=${action.payload}&api_key=${apiKey}`, { adapter: jsonpAdapter })
      .then(response => response)
      .then(response => dispatch({ type: MOVIE_SUCCESS, payload: response.data }))
      .catch(error => dispatch({ type: MOVIE_FAILURE, payload: error, error: true }))
      .then(() => done());
  },
});

export default [loginLogic];

// const url = `${themoviedb}/discover/movie`;

// const getMovieAPI = page =>
//   axios
//     .get(`${url}?page=${page}&api_key=${apiKey}`, { adapter: jsonpAdapter })
//     .then(response => response)
//     .catch(error => Promise.reject(error));

// export default getMovieAPI;
