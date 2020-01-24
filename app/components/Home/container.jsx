import { connect } from 'react-redux';
import { getSessionId } from '../../store/login/selectors';

import HomeContainer from './component';

const mapStateToProps = state => ({
  sessionId: getSessionId(state),
});

export default connect(mapStateToProps)(HomeContainer);
