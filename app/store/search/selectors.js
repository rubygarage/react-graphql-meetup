export const getSearchQuery = state => state.search.data.query;
export const getSearch = state => {
  const search = state.search.data;
  const entities = state.data.movies;
  const results = Object.assign([], entities).filter(item => search.results.includes(item.id));

  return (
    search.results && {
      ...search,
      results,
    }
  );
};
