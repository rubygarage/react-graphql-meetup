import * as t from './actionTypes';

export const initialState = {
  isLoading: false,
  data: {
    page: 1,
    results: [],
    totalPages: 0,
    totalResults: 0,
  },
  error: null,
};

export const createWatchlistListReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.WATCHLIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case t.WATCHLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          page: action.payload.page,
          results: action.payload.results,
          totalPages: action.payload.totalPages,
        },
      };
    case t.WATCHLIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export const addWatchlistInitialState = {
  isLoading: false,
  error: null,
};

export const addToWatchlistReducer = (state = addWatchlistInitialState, action) => {
  switch (action.type) {
    case t.ADD_TO_WATCHLIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case t.ADD_TO_WATCHLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case t.ADD_TO_WATCHLIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
