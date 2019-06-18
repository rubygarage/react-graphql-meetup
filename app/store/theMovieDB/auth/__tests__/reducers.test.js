import reducer, { initialState } from '../access.reducers';
import t from '../access.actionTypes';

describe('Authentication reducer', () => {
  // ACCESS_REQUEST
  it('ACCESS_REQUEST', () => {
    const action = {
      type: t.ACCESS_REQUEST,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  // ACCESS_SUCCESS
  it('ACCESS_SUCCESS', () => {
    const stateBefore = {
      isLoading: true,
      session_id: null,
      error: null,
    };

    const action = {
      type: t.ACCESS_SUCCESS,
      payload: {
        session_id: 'session _id key',
      },
    };

    expect(reducer(stateBefore, action)).toEqual({
      ...stateBefore,
      isLoading: false,
      session_id: action.payload.session_id,
    });
  });

  // ACCESS_FAILURE
  it('ACCESS_FAILURE', () => {
    const stateBefore = {
      isLoading: true,
      session_id: null,
      error: null,
    };

    const action = {
      type: t.ACCESS_FAILURE,
      payload: {
        message: 'error message',
      },
    };

    expect(reducer(stateBefore, action)).toEqual({
      ...stateBefore,
      isLoading: false,
      error: action.payload.message,
    });
  });

  // ACCESS_REMOVE
  it('ACCESS_REMOVE', () => {
    const action = {
      type: t.ACCESS_REMOVE,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
    });
  });
});
