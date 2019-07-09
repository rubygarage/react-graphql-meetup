import React, { Component } from 'react';
import { connect } from 'react-redux';
import { movieRequest } from '../../store/theMovieDB/movie/actions';

import {
  getMovieById,
  getGenresById,
  getCastById,
  getCrewById,
} from '../../store/theMovieDB/movie/selectors';

import MovieComponent from './component';

class MovieContainer extends Component {
  componentDidMount() {
    const {
      setMovie,
      match: {
        params: { id },
      },
    } = this.props;
    setMovie({ movieId: id });
  }

  render() {
    return <MovieComponent {...this.props} />;
  }
}

const mapStateToProps = (
  state,
  {
    match: {
      params: { id },
    },
  },
) => ({
  movie: getMovieById(state, id),
  genres: getGenresById(state, id),
  cast: getCastById(state, id),
  crew: getCrewById(state, id),
});

const mapDispatchToProps = {
  setMovie: movieRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieContainer);
