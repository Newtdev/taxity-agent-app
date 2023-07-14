import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {logOut} from 'features/appSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://taxity-api-staging.up.railway.app/api/v1/agent/',
  prepareHeaders: (headers, {getState}) => {
    const token = getState().app?.token || '';
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
  },
});

const extendedBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log('result...', result);
  if (result.error && result.error.status === 401) {
    api.dispatch(logOut());
    // try to get a new token
    console.log(args);
    const refreshResult = await baseQuery('/refreshToken', api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      //   api.dispatch(tokenReceived(refreshResult.data));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      //   api.dispatch(loggedOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'taxity-agent',
  baseQuery: extendedBaseQuery,
  endpoints: builder => ({}),
});

// console.log(apiSlice);
