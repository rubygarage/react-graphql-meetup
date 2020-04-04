import Cookies from 'js-cookie';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { customFetch } from './customFetch';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql',
  fetch: customFetch,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const access = Cookies.get('access');
  const refresh = Cookies.get('refresh');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'Authorization': access ? `Bearer ${access}` : '',
      // 'X-Refresh-Token': refresh
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
