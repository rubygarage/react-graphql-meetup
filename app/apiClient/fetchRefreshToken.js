import Cookies from 'js-cookie';
import fetch from 'isomorphic-unfetch';
import { isEmpty } from 'lodash';

export const fetchRefreshToken = (uri, mutateOptions, options) => {
  const shallowOptions = { ...options };
  return fetch(uri, mutateOptions)
    .then(response => response.json())
    .then(({ data, errors }) => {
      if (isEmpty(errors)) {
        const { refreshToken: { access } } = data;

        Cookies.set('access', access, { path: '/' });

        shallowOptions.headers.Authorization = `Bearer ${access}`;
        return fetch(uri, shallowOptions);
      }
      
      Cookies.remove('access', { path: '/' });
    });
};
