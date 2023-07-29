// import {rootReducer} from './reducer';
import {configureStore} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';
import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appSlice} from 'features/appSlice';
import {apiSlice} from 'api';
// import {AuthApiSlice} from 'apis/authApiSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['userInfo', appSlice],
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [appSlice.name]: appSlice.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      apiSlice.middleware,
    ),
  devTools: true,
});

export const persistor = persistStore(store);
