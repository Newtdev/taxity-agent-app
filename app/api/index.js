import {apiSlice} from 'config/apiConfig';
import {RTKTAG} from 'constant/Data';
import {API_ROUTE, method} from 'constant/Routes';
import {InvalidateTag, providesTagList} from 'utils';

export const Api = apiSlice.injectEndpoints({
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
      query: values => ({
        url: `${API_ROUTE.createDrivers}/${values?.id}`,
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
} = Api;
