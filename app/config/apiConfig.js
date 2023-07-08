import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://taxity-staging-api.onrender.com/api/v1/agent/',
  timeout: 1000,
  prepareHeaders: (headers, {getState}) => {
    const token = getState().app.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
  },
  //   timeout: 2000
});

const extendedBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
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
