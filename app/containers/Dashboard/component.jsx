import React from 'react';

import Search from '../Search';
import MovieList from '../MovieList';
import Pagination from '../Pagination';

const DashboardComponent = ({ onSearch, movies, page, currentPage, totalPages }) => (
  <>
    <Search onSearch={onSearch} />
    <MovieList movies={movies} />
    <Pagination currentPage={currentPage} page={page} totalPages={totalPages * 10} />
  </>
);

export default DashboardComponent;
