import Cookies from 'js-cookie';
import * as t from './actionTypes';

export const loginInitialState = {
  isLoading: false,
  isLoggedIn: Cookies.get('access') && Cookies.get('refresh'),
  error: null,
};

export const loginReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case t.CREATE_SESSION_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case t.CREATE_SESSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
      };
    case t.CREATE_SESSION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case t.DELETE_SESSION_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case t.DELETE_SESSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
      };
    case t.DELETE_SESSION_FAILURE:
      return {
        ...state,
        isLoading: false,
        logoutError: action.payload,
      };
    default:
      return state;
  }
};
