export const getMovieById = (state, id) => {
  const movie = state.data.movie;
  return movie && movie[id];
};

export const getGenresById = (state, id) => {
  const movie = state.data.movie[id];
  const genres = state.data.genres;
  return movie && movie.genres.map(item => genres[item]);
};

export const getCastById = (state, id) => {
  const movie = state.data.movie[id];
  const cast = state.data.cast;
  return movie && movie.cast.map(item => cast[item]);
};

export const getCrewById = (state, id) => {
  const movie = state.data.movie[id];
  const crew = state.data.crew;
  return movie && movie.crew.map(item => crew[item]);
};
