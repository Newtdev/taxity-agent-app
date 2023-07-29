import {RTKTAG} from 'constant/Data';
import {API_ROUTE, method} from 'constant/Routes';
import {InvalidateTag, providesTagList} from 'utils';

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
  tagTypes: [RTKTAG.CREATE_DRIVERS, RTKTAG.FETCH_LIST],
  endpoints: builder => ({}),
});

// console.log(apiSlice);

export const ApiRoute = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: body => ({
        url: API_ROUTE.login,
        method: method.POST,
        body,
      }),
    }),

    getAllDrivers: builder.query({
      query: params => ({
        url: `${API_ROUTE.fetchDrivers}?search=${params?.debouncedValue}&limit=${params.limit}`,
        method: method.GET,
      }),
      providesTags: result =>
        providesTagList(result?.drivers?.data, RTKTAG.CREATE_DRIVERS),
    }),

    getSingleDriver: builder.query({
      query: ({id}) => ({
        url: `${API_ROUTE.fetchDrivers}?${id}`,
        method: method.GET,
      }),
      providesTags: result =>
        providesTagList(result?.drivers?.data, RTKTAG.CREATE_DRIVERS),
    }),

    registerDriver: builder.mutation({
      query: values => ({
        url: API_ROUTE.createDrivers,
        method: method.POST,
        body: values,
      }),
      invalidatesTags: result =>
        InvalidateTag(result?.drivers?.data, RTKTAG.CREATE_DRIVERS),
    }),

    updateDriversInfo: builder.mutation({
      query: ({id, ...values}) => ({
        url: `${API_ROUTE.fetchDrivers}/${values?.id}`,
        method: method.PATCH,
        body: values,
      }),
      invalidatesTags: result =>
        InvalidateTag(result?.drivers?.data, RTKTAG.CREATE_DRIVERS),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAllDriversQuery,
  useRegisterDriverMutation,
  useGetSingleDriverQuery,
  useUpdateDriversInfoMutation,
} = ApiRoute;
