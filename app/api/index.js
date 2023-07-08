import {apiSlice} from 'config/apiConfig';
import {API_ROUTE, method} from 'constant/Routes';

export const Api = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: body => ({
        url: API_ROUTE.login,
        method: method.POST,
        body,
      }),
    }),

    fetchAllDrivers: builder.query({
      query: body => ({
        url: API_ROUTE.fetchDrivers,
      }),
    }),
  }),
});

export const {useLoginMutation, useFetchAllDriversQuery} = Api;
