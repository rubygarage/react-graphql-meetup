export const getFavorite = state => {
  const favorite = state.favoriteList.data;
  const entities = state.data.movies;
  const results = Object.assign([], entities).filter(item => favorite.results.includes(item.id));

  return (
    favorite.results && {
      ...favorite,
      results,
    }
  );
};

export const getAddToFavoriteError = state => state.addToFavorite.error;
