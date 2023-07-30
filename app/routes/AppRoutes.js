import React, {useEffect, useState} from 'react';

import {APP_ROUTE} from 'constant/Routes';
import {History, Profile} from 'pages';
import {Keyboard, Text, View} from 'react-native';
import RegisterDrivers from 'pages/RegisterDrivers';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppNavigation} from 'Navigation';
import Icon, {Icons} from 'components/Icon';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DriversDetails from 'pages/DriversDetails';
import EditDriversInfo from 'pages/EditDriversInfo';

const Tab = createBottomTabNavigator();
const {Navigator, Screen} = createNativeStackNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName={APP_ROUTE.history}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => (
        <View className="w-[95%] my-2 mx-auto rounded-full py-4 bg-primary">
          <AppNavigation {...props} />
        </View>
      )}
      screenOptions={{
        tabBarStyle: {position: 'absolute'},
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen name={APP_ROUTE.history} component={History} />
      <Tab.Screen name={APP_ROUTE.profile} component={Profile} />
    </Tab.Navigator>
  );
};

export default function AppRoute() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen
        name="Main"
        options={{tabBarHideOnKeyboard: true}}
        component={Main}
      />
      <Screen name={APP_ROUTE.registration} component={RegisterDrivers} />
      <Screen name={APP_ROUTE.drivers_details} component={DriversDetails} />
      <Screen name={APP_ROUTE.editDriverInfo} component={EditDriversInfo} />
    </Navigator>
  );
}

/**
 * Screen route:
 * navigation: {
 * addListener
 * canGoBack()
 * dispatch()
 * getId(),
 * getParent(),
 * getState(),
 * goBack(),
 * isFocused(),
 * jumpTo(),
 * navigate('/),
 * removeListener()
 * reset()
 * setOptions()
 * setParams()
 * route: {name:}
 * }

 *
 *
 *
 *
 */
