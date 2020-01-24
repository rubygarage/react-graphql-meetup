import { connect } from 'react-redux';
import { deleteSessionRequest as deleteSessionRequestAction } from '../../../store/login/actions';

import DropdownMenuComponent from './component';

const mapDispatchToProps = {
  deleteSessionRequest: deleteSessionRequestAction,
};

export default connect(
  null,
  mapDispatchToProps,
)(DropdownMenuComponent);
