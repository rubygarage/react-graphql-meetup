import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const PrivateRouteComponent = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        (isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        ))
      }
    />
  );
};

PrivateRouteComponent.propTypes = {
  isLoggedIn: PropTypes.string.isRequired,
};

export default PrivateRouteComponent;
