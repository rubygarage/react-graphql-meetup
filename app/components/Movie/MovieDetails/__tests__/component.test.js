import React from 'react';

import MovieItemComponent from '../component';

describe('<MovieItemComponent />', () => {
  let component;
  let props;

  it('Render property - movieDetails with data', () => {
    // props = {
    //   movieDetails: [{ id: 1 }, { id: 2 }, { id: 3 }],
    // };
    // component = shallow(<MovieItemComponent {...props} />);
    // expect(component).toMatchSnapshot();
  });

  it('Render property - movieDetails without data', () => {
    // props = {
    //   movieDetails: [],
    // };
    // component = shallow(<MovieItemComponent {...props} />);
    // expect(component).toMatchSnapshot();
  });
});
