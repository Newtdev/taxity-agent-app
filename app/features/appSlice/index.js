/* eslint-disable no-undef */
import {createSlice} from '@reduxjs/toolkit';
import {ApiRoute} from 'api';

// import {setItem} from 'helpers/utils';

// const rememberDetails = createReducer(action.REMEMBER);
// console.log(rememberDetails);
export const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: null,
    token: null,
    refreshToken: null,
    userDetails: {},
  },
  reducers: {
    setCredentials: (state, action) => {
      console.log(action);
      //   state.systemAdmin = action.payload.user;
      //   state.token.accessToken = action.payload?.token;
      //   state.token.refreshToken = action.payload?.token?.refreshToken;
      // state.systemAdmin.role = action.payload?.systemAdmin.role;
    },

    logOut: (state, action) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
  extraReducers: builder => {
    // builder.addCase(rememberDetails, (state, action) => {
    //   state.userDetails = action.payload;
    // });
    builder.addMatcher(
      ApiRoute.endpoints.login.matchFulfilled,
      (state, action) => {
        state.token = action.payload?.token?.accessToken;
        state.refreshToken = action.payload?.token?.refreshToken;
        console.log(action.payload.agent);
        state.user = action.payload?.agent;
      },
    );
  },
});

export const {setCredentials, logOut} = appSlice.actions;

export default appSlice.reducer;

export const selectCurrentLoginToken = state => state.app?.token;

export const selectCurrentLoginUser = state => state.app?.user;
export const loginDetails = state => state.app.userDetails;
