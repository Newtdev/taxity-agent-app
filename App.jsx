/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import Home from 'pages/welcome/Home';

import {Provider} from 'react-redux';
import CustomRouter from './app/routes';
import {persistor, store} from './app/store';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';

function App() {
  const [isOffline, setIsOffline] = useState(false);
  const offlineText = "You're offline";
  const onlineText = "You're online";

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      let offline = !(state.isConnected && state.isInternetReachable);

      setIsOffline(offline);
    });

    return () => unsubscribe();
  }, []);

  showMessage({
    message: isOffline ? offlineText : onlineText,
    type: isOffline ? 'danger' : 'success',
  });
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
