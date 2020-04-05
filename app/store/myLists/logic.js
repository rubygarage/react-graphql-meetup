import { createLogic } from 'redux-logic';
import { normalize } from 'normalizr';
import gql from 'graphql-tag';

import { movies, lists } from '../schema';
import { getSessionId } from '../login/selectors';

import { addEntities } from '../data/actions';
import {
  createdListsRequest,
  createdListsSuccess,
  createdListsFailure,
  createListSuccess,
  createListFailure,
  detailsListRequest,
  detailsListSuccess,
  detailsListFailure,
  deleteListSuccess,
  deleteListFailure,
  addMovieListSuccess,
  addMovieListFailure,
  removeMovieListSuccess,
  removeMovieListFailure,
} from './actions';
import * as t from './actionTypes';
import handleErrors from '../../helpers/handleErrors';

const LISTS = gql`
  query lists {
    me {
      id
      lists {
        currentPage
        totalPageCount
        nodes {
          id
          name
          description
        }
      }
    }
  }
`;

const LIST_DETAILS = gql`
  query list($id: ID!) {
    list(id: $id) {
      id
      name
      description
      items {
        id
        title
        overview
        poster {
          filePath
        }
      }
    }
  }
`;

const ADD_LIST = gql`
  mutation userCreateList($name: String!, $description: String) {
    userCreateList(input: { name: $name, description: $description }) {
      id
    }
  }
`;

const REMOVE_LIST = gql`
  mutation userDeleteList($id: ID!) {
    userDeleteList(input: { id: $id }) {
      deletedListId
    }
  }
`;

const ADD_MOVIE_TO_LIST = gql`
  mutation userListAddItem($listId: ID!, $movieId: ID!) {
    userListAddItem(input: { listId: $listId, movieId: $movieId }) {
      id
    }
  }
`;

const REMOVE_MOVIE_FROM_LIST = gql`
  mutation userListRemoveItem($listId: ID!, $movieId: ID!) {
    userListRemoveItem(input: { listId: $listId, movieId: $movieId }) {
      deletedListItemId
    }
  }
`;

export const myListsLogic = createLogic({
  type: t.CREATED_LISTS_REQUEST,

  async process({ apiClient, action }, dispatch, done) {
    const { page } = action.payload;

    try {
      const {
        data: {
          me: {
            lists: { nodes, totalPageCount },
          },
        },
      } = await apiClient.query({
        query: LISTS,
        fetchPolicy: 'network-only'
      });

      const { entities, result } = normalize(nodes, [lists]);

      dispatch(addEntities(entities));
      dispatch(
        createdListsSuccess({
          page,
          results: result,
          totalPages: totalPageCount,
        }),
      );
    } catch (error) {
      const handledError = handleErrors(error);
      dispatch(createdListsFailure(handledError));
    }

    done();
  },
});

export const detailsListLogic = createLogic({
  type: t.DETAILS_LIST_REQUEST,

  async process({ apiClient, action }, dispatch, done) {
    const { listId } = action.payload;

    try {
      const {
        data: {
          list,
        },
      } = await apiClient.query({
        query: LIST_DETAILS,
        variables: { id: listId },
        fetchPolicy: 'network-only'
      });

      const { entities, result } = normalize(list.items, [movies]);

      dispatch(addEntities(entities));
      dispatch(
        detailsListSuccess({
          ...list,
          items: result,
        }),
      );
    } catch (error) {
      const handledError = handleErrors(error);
      dispatch(detailsListFailure(handledError));
    }

    done();
  },
});

export const createListLogic = createLogic({
  type: t.CREATE_LIST_REQUEST,

  async process({ apiClient, getState, action }, dispatch, done) {
    const { name, description } = action.payload.values;

    try {
      const {
        data: {
          userCreateList: {
            id,
          },
        },
      } = await apiClient.mutate({
        mutation: ADD_LIST,
        variables: { name, description }
      });

      dispatch(createListSuccess());
      dispatch(createdListsRequest({ page: 1 }));
      action.payload.actions.setSubmitting(false);
      action.payload.hideModal();
    } catch (error) {
      const handledError = handleErrors(error);
      dispatch(createListFailure(handledError));
    }

    done();
  },
});

export const deleteListLogic = createLogic({
  type: t.DELETE_LIST_REQUEST,

  async process({ apiClient, getState, action }, dispatch, done) {
    const { listId } = action.payload;

    try {
      const {
        data: {
          userDeleteList: {
            deletedListId,
          },
        },
      } = await apiClient.mutate({
        mutation: REMOVE_LIST,
        variables: { id: listId }
      });

      dispatch(deleteListSuccess());
      dispatch(createdListsRequest({ page: 1 }));
    } catch (error) {
      const handledError = handleErrors(error);
      dispatch(deleteListFailure(handledError));
    }

    done();
  },
});

export const addMovieListLogic = createLogic({
  type: t.ADD_MOVIE_LIST_REQUEST,

  async process({ apiClient, getState, action }, dispatch, done) {
    const { listId, movieId } = action.payload;

    try {
      const {
        data: {
          userListAddItem: {
            id,
          },
        },
      } = await apiClient.mutate({
        mutation: ADD_MOVIE_TO_LIST,
        variables: { listId, movieId }
      });

      dispatch(addMovieListSuccess());
    } catch (error) {
      const handledError = handleErrors(error);
      dispatch(addMovieListFailure(handledError));
    }

    done();
  },
});

export const removeMovieListLogic = createLogic({
  type: t.REMOVE_MOVIE_LIST_REQUEST,

  async process({ apiClient, getState, action }, dispatch, done) {
    const { listId, movieId } = action.payload;

    try {
      const {
        data: {
          userListRemoveItem: {
            deletedListItemId,
          },
        },
      } = await apiClient.mutate({
        mutation: REMOVE_MOVIE_FROM_LIST,
        variables: { listId, movieId }
      });

      dispatch(removeMovieListSuccess());
      dispatch(detailsListRequest({ listId }));
    } catch (error) {
      const handledError = handleErrors(error);
      dispatch(removeMovieListFailure(handledError));
    }

    done();
  },
});
