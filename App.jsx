/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import Home from 'pages/welcome/Home';

import {Provider} from 'react-redux';
import CustomRouter from './app/routes';
import {persistor, store} from './app/store';
import FlashMessage from 'react-native-flash-message';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Home />} persistor={persistor}>
        <CustomRouter />
      </PersistGate>
      <FlashMessage position="top" hideStatusBar={true} />
    </Provider>
  );
}

export default App;
