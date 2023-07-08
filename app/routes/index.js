import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthRoute from './AuthRoutes';
import AppRoute from './AppRoutes';
import useAuth from 'hooks/useAuth';

// import useAuthUser from 'hooks/useAuthUser';

export default function CustomRouter({theme}) {
  const {token} = useAuth();

  return (
    <NavigationContainer>
      {!token ? <AuthRoute /> : <AppRoute />}
    </NavigationContainer>
  );
}
