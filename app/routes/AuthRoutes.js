import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text} from 'react-native';
import Login from '../pages/welcome/Login';
const {Navigator, Screen} = createNativeStackNavigator();

function AuthRoute() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="auth " component={Login} />
    </Navigator>
  );
}

export default AuthRoute;
