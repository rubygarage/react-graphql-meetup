import React from 'react';
import configureStore from 'redux-mock-store';

import HomeContainer from '../container';

describe('<HomeContainer />', () => {
  // const mockStore = configureStore();
  const sessionId = 'some session id';
  const state = {
    reducers: {
      login: {
        sessionId,
      },
    },
  };
  const props = {
    isLogged: sessionId,
  };

  const store = configureStore()(state);
  const container = shallow(<HomeContainer store={store} {...props} />);
  const instance = container.instance();

  it('Should be called', () => {
    expect(instance.props.isLogged).toEqual(sessionId);
  });
});
