/* eslint-disable no-undef */
import {createReducer, createSlice} from '@reduxjs/toolkit';
import {Api} from 'api';

// import {setItem} from 'helpers/utils';
import {rememberDetails} from 'pages/welcome/Login';

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

    logOut: state => {
      //   state.systemAdmin.role = null;
      //   state.systemAdmin.firstName = '';
      //   state.systemAdmin.lastName = '';
      //   state.token.accessToken = null;
      //   localStorage.removeItem(KEYS.USER_INFO);
    },
  },
  extraReducers: builder => {
    builder.addCase(rememberDetails, (state, action) => {
      state.userDetails = action.payload;
    });
    builder.addMatcher(Api.endpoints.login.matchFulfilled, (state, action) => {
      state.token = action.payload?.token?.accessToken;
      state.refreshToken = action.payload?.token?.refreshToken;
      state.user = action.payload?.agent;
    });
  },
});

export const {setCredentials, logOut} = appSlice.actions;

export default appSlice.reducer;

export const selectCurrentLoginToken = state => state.app?.token;

export const selectCurrentLoginUser = state => state.app?.user;
export const loginDetails = state => state.app.userDetails;
