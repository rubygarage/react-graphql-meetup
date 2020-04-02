export const getMovieById = (state, id) => {
  const movie = state.data.movie;
  return movie && movie[id];
};

export const getCastById = (state, id) => {
  const movie = state.data.movie[id];
  const cast = state.data.cast;
  return movie && movie.credit && movie.credit.cast && movie.credit.cast.map(item => cast[item]);
};

export const getCrewById = (state, id) => {
  const movie = state.data.movie[id];
  const crew = state.data.crew;
  return movie && movie.credit && movie.credit.crew && movie.credit.crew.map(item => crew[item]);
};
