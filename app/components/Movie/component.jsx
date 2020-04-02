import React from 'react';
import PropTypes from 'prop-types';
import { formatMoney, formatTime } from '../../helpers/format';

import MovieCarousel from './MovieCarousel';
import MovieTitle from './MovieTitle';
import MovieOverview from './MovieOverview';
import MovieLabel from './MovieLabel';
import MovieDetails from './MovieDetails';

const MovieComponent = ({ movie, cast, crew }) => (
  <>
    {movie && (
      <>
        <MovieCarousel poster={movie.poster} images={movie.images} title={movie.title} />
        <MovieTitle movie={movie} />
        <MovieOverview title="Overview" overview={movie.overview} />
        <MovieLabel title="Original Language" text={movie.originalLanguage} />
        <MovieLabel title="Runtime" text={formatTime(movie.runtime)} />
        <MovieLabel title="Budget" text={`$${formatMoney(movie.budget)}`} />
        <MovieLabel title="Revenue" text={`$${formatMoney(movie.revenue)}`} />
        <MovieDetails movieDetails={cast} title="Casts" />
        <MovieDetails movieDetails={crew} title="Crew" />
      </>
    )}
  </>
);

MovieComponent.defaultTypes = {
  movie: null,
  cast: [],
  crew: [],
};

MovieComponent.propTypes = {
  movie: PropTypes.object,
  cast: PropTypes.array,
  crew: PropTypes.array,
};

export default MovieComponent;
