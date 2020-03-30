import React from 'react';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';
import Dashboard from './Dashboard';

const HomeComponent = ({ isLoggedIn }) => <>{isLoggedIn ? <Dashboard /> : <LoginForm />}</>;

HomeComponent.propTypes = {
  isLoggedIn: PropTypes.string.isRequired,
};

export default HomeComponent;
