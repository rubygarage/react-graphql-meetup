export const getWatchlist = state => {
  const watchlist = state.watchlist.data;
  const entities = state.data.movies;
  const results = Object.assign([], entities).filter(item => watchlist.results.includes(item.id));

  return (
    watchlist.results && {
      ...watchlist,
      results,
    }
  );
};

export const getAddToWatchlistError = state => state.addToWatchlist.error;