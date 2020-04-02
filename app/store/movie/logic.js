import { createLogic } from 'redux-logic';
import { normalize } from 'normalizr';
import gql from 'graphql-tag';

import { schemaMovie } from '../schema';
import { movieFailure } from './actions';
import { addEntities } from '../data/actions';
import * as t from './actionTypes';
import handleErrors from '../../helpers/handleErrors';

const MOVIE = gql`
  query movie($id: ID!) {
    movie(id: $id) {
      id
      title
      overview
      budget
      revenue
      originalLanguage
      runtime
      poster {
        filePath
      }
      images {
        filePath
      }
      credit {
        cast {
          id
          name
          character
          profilePath
        }
        crew {
          id
          name
          department
          profilePath
        }
      }
    }
  }
`;

export const movieLogic = createLogic({
  type: t.MOVIE_REQUEST,

  async process({ apiClient, getState, action }, dispatch, done) {
    try {
      const {
        data: { movie },
      } = await apiClient.query({
        query: MOVIE,
        variables: {
          id: action.payload.movieId,
        },
      });

      const { entities } = normalize(movie, schemaMovie);
      dispatch(addEntities(entities));
    } catch (error) {
      const handledError = handleErrors(error);
      dispatch(movieFailure(handledError))
    }

    done();
  },
});
