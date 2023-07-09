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

    // fetchAllDrivers: builder.query({
    //   query: () => ({
    //     url: API_ROUTE.fetchDrivers,
    //     method: method.GET,
    //   }),
    // }),

    getAllDrivers: builder.query({
      query: params => ({
        url: `${API_ROUTE.fetchDrivers}?search=${params?.debouncedValue}&page=${params?.listPage}&limit=${params?.limit}`,
        method: method.GET,
      }),
    }),
  }),
});

export const {useLoginMutation, useGetAllDriversQuery} = Api;
