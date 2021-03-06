import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { notification } from 'antd';

import { addToFavoriteRequest as addToFavoriteRequestAction } from '../../../../store/favorite/actions';
import { getAddToFavoriteError } from '../../../../store/favorite/selectors';

import FavoriteIconComponent from './component';

class FavoriteIconContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.error !== this.props.error && nextProps.error) {
      notification.open({
        message: 'Error',
        description: nextProps.error,
      });
    }
  }

  handleFavorite = () => {
    const { addToFavoriteRequest, favorite, movieId } = this.props;
    addToFavoriteRequest({ movieId, favorite: !favorite });
  };

  render() {
    return <FavoriteIconComponent {...this.props} handleFavorite={this.handleFavorite} />;
  }
}

FavoriteIconContainer.propTypes = {
  addToFavoriteRequest: PropTypes.func.isRequired,
  movieId: PropTypes.number.isRequired,
  favorite: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  error: getAddToFavoriteError(state),
});

const mapDispatchToProps = {
  addToFavoriteRequest: addToFavoriteRequestAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteIconContainer);
