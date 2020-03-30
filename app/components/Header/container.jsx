import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { notification } from 'antd';

import { profileRequest as profileRequestAction } from '../../store/profile/actions';
import { getProfile } from '../../store/profile/selectors';
import { logoutError } from '../../store/login/selectors';

import HeaderComponent from './component';

class HeaderContainer extends Component {
  componentDidMount() {
    const { profileRequest } = this.props;
    profileRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logoutError !== this.props.logoutError && nextProps.logoutError) {
      notification.open({
        message: 'Error',
        description: nextProps.logoutError,
      });
    }
  }

  render() {
    return <HeaderComponent {...this.props} />;
  }
}

HeaderComponent.defaultProps = {
  profile: {},
};

HeaderContainer.propTypes = {
  profileRequest: PropTypes.func.isRequired,
  profile: PropTypes.object,
};

const mapStateToProps = state => ({
  profile: getProfile(state),
  logoutError: logoutError(state),
});

const mapDispatchToProps = {
  profileRequest: profileRequestAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
