import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSessionRequest as createSessionRequestAction } from '../../../store/login/actions';
import { loginError } from '../../../store/login/selectors';

import LoginFormComponent from './component';

class LoginFormContainer extends Component {
  onSubmit = (values, actions) => {
    const { createSessionRequest } = this.props;
    actions.setSubmitting(true);
    createSessionRequest({ values, actions });
  };

  render() {
    console.log(this.props)
    return <LoginFormComponent {...this.props} onSubmit={this.onSubmit} />;
  }
}

const mapStateToProps = state => ({
  loginError: loginError(state),
});

const mapDispatchToProps = {
  createSessionRequest: createSessionRequestAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginFormContainer);
