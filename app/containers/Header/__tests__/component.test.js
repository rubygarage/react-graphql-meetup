import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ConnectedHeader, { Header } from '../component';

describe('<Header /> component', () => {
  const mockStore = configureStore();
  const initialState = {
    isLogged: true,
    removeSessionId: () => {},
  };
  const props = {
    removeSessionId: () => {},
  };
  let store;
  let component;

  beforeEach(() => {
    store = mockStore(initialState);
    component = shallow(<ConnectedHeader store={store} {...props} />);
  });

  // it('+++ render the connected(SMART) component', () => {
  //   expect(component.length).toEqual(1);
  // });

  // it('should exist', () => {
  //   // console.log(component.props().children);
  //   expect(component.props().removeSessionId).toEqual(initialState.removeSessionId);
  // });

  // it('should logout after click button', () => {
  //   // const btnLogout = component.find('button');
  //   // btnLogout.simulate('click');
  //   // component.update();
  //   // component.setState({ isLogged: false });
  //   // expect(btnLogout).toEqual(true);
  // });

  it('Render property', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
