import Cookies from 'js-cookie';
import fetch from 'isomorphic-unfetch';
import { isEmpty } from 'lodash';

import { fetchRefreshToken } from './fetchRefreshToken';

export const customFetch = (uri, options) => {
  const shallowOptions = { ...options };
  const accessToken = Cookies.get('access');
  
  const mutate = 'mutation { refreshToken { access, accessExpiresAt, csrf } }';
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Refresh-Token': Cookies.get('refresh') },
    body: JSON.stringify({ query: mutate })
  };

  return fetch(uri, shallowOptions)
    .then((response) => {
      const clonedResponse = response.clone();
      return response.json()
        .then((json) => {
          console.log(json, accessToken)
          if (json && !isEmpty(json.errors) && json.errors[0].message === 'Not authenticated' && accessToken) {
            return fetchRefreshToken(uri, opts, shallowOptions);
          }
          return clonedResponse;
        });
    });
};
