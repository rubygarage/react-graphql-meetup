import { connect } from 'react-redux';
import { isLoggedIn } from '../../../store/login/selectors';

import PrivateRouteComponent from './component';

const mapStateToProps = state => ({
  isLoggedIn: isLoggedIn(state),
});

export default connect(mapStateToProps)(PrivateRouteComponent);
