import React from 'react';
import PropTypes from 'prop-types';
import { formatMoney, formatTime } from '../../helpers/format';

import MovieCarousel from './MovieCarousel';
import MovieTitle from './MovieTitle';
import MovieOverview from './MovieOverview';
import MovieLabel from './MovieLabel';
import MovieGenres from './MovieGenres';
import MovieDetails from './MovieDetails';

const MovieComponent = ({ movie, genres, cast, crew }) => (
  <>
    {movie && genres && cast && crew && (
      <>
        <MovieCarousel backdrops={movie.backdrops} title={movie.title} />
        <MovieTitle movie={movie} />
        <MovieOverview title="overview" overview={movie.overview} />
        <MovieLabel title="Original Language" text={movie.language} />
        <MovieLabel title="Runtime" text={formatTime(movie.runtime)} />
        <MovieLabel title="Budget" text={`$${formatMoney(movie.budget)}`} />
        <MovieLabel title="Revenue" text={`$${formatMoney(movie.revenue)}`} />
        <MovieGenres title="Genres" genres={genres} />
        <MovieDetails movieDetails={cast} title="Casts" />
        <MovieDetails movieDetails={crew} title="Crew" />
      </>
    )}
  </>
);

MovieComponent.propTypes = {
  movie: PropTypes.object.isRequired,
  genres: PropTypes.array.isRequired,
  cast: PropTypes.array.isRequired,
  crew: PropTypes.array.isRequired,
};

export default MovieComponent;
