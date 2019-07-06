import * as t from './actionTypes';

export const initialState = {
  isLoading: false,
  data: {
    page: 1,
    results: [],
    totalPages: 0,
  },
  error: null,
};

export const createdListsReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.CREATED_LISTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case t.CREATED_LISTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          page: action.payload.page,
          results: action.payload.results,
          totalPages: action.payload.total_pages,
        },
      };
    case t.CREATED_LISTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export const deleteListInitialState = {
  isLoading: false,
  data: {
    message: '',
  },
  error: null,
};

export const deleteListReducer = (state = deleteListInitialState, action) => {
  switch (action.type) {
    case t.DELETE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case t.DELETE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          message: action.payload.message,
        },
      };
    case t.DELETE_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
};
