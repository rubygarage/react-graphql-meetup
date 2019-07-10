import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  createdListsRequest as createdListsRequestAction,
  addMovieListRequest as addMovieListRequestAction,
} from '../../../../../store/theMovieDB/myLists/actions';
import { getCreatedLists } from '../../../../../store/theMovieDB/myLists/selectors';

import PopoverContentComponent from './component';

class PopoverContentContainer extends Component {
  componentDidMount() {
    const { createdListsRequest } = this.props;
    createdListsRequest({ page: 1 });
  }

  addMovieToList = listId => {
    const { addMovieListRequest, movieId } = this.props;
    addMovieListRequest({ listId, movieId });
  };

  render() {
    return <PopoverContentComponent {...this.props} addMovieToList={this.addMovieToList} />;
  }
}

const mapStateToProps = state => ({
  myLists: getCreatedLists(state),
});

const mapDispatchToProps = {
  createdListsRequest: createdListsRequestAction,
  addMovieListRequest: addMovieListRequestAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopoverContentContainer);
