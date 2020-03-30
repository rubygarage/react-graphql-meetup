import { isEmpty, get, map } from 'lodash';

const handleErrors = (error) => {
  if (!isEmpty(error.graphQLErrors)) {
    return map(error.graphQLErrors, (graphQLError) => get(graphQLError, 'message'));
  }

  if (!isEmpty(error.networkError)) {
    return get(error, 'networkError.message');
  }

  return get(error, 'message');
};

export default handleErrors;
