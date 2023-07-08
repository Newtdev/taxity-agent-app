import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from 'pages';

// import {Route} from 'constant/Route';
// import {Login, Onboarding, SignUp, Welcome} from 'screens';
// import {useSelector} from 'react-redux';
// import {showOnboarding} from 'features/authSlice';

const {Navigator, Screen} = createNativeStackNavigator();

function AuthRoute() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Onboarding" component={Login} />
    </Navigator>
  );
}

export default AuthRoute;
