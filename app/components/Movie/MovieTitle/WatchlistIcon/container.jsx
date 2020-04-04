import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notification } from 'antd';

import { addToWatchlistRequest as addToWatchlistRequestAction } from '../../../../store/watchlist/actions';
import { getAddToWatchlistError } from '../../../../store/watchlist/selectors';

import WatchlistIconComponent from './component';

class WatchlistIconContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.error !== this.props.error && nextProps.error) {
      notification.open({
        message: 'Error',
        description: nextProps.error,
      });
    }
  }

  handleWatchlist = () => {
    const { addToWatchlistRequest, watchlist, movieId } = this.props;
    addToWatchlistRequest({ movieId, watchlist: !watchlist });
  };

  render() {
    return <WatchlistIconComponent {...this.props} handleWatchlist={this.handleWatchlist} />;
  }
}

WatchlistIconContainer.propTypes = {
  addToWatchlistRequest: PropTypes.func.isRequired,
  movieId: PropTypes.number.isRequired,
  watchlist: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  error: getAddToWatchlistError(state),
});

const mapDispatchToProps = {
  addToWatchlistRequest: addToWatchlistRequestAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistIconContainer);
