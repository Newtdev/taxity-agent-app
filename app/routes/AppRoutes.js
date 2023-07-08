import React from 'react';

import {APP_ROUTE} from 'constant/Routes';
import {History, Profile} from 'pages';
import {View} from 'react-native';
import RegisterDrivers from 'pages/RegisterDrivers';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppNavigation} from 'Navigation';

const Tab = createBottomTabNavigator();

// ...

export default function AppRoute() {
  return (
    <Tab.Navigator
      // sceneContainerStyle={{ backgroundColor: 'red' }}
      tabS
      initialRouteName={APP_ROUTE.history}
      screenOptions={{
        tabBarStyle: {position: 'absolute'},
        headerShown: false,
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => (
        <View className="w-[95%] my-2 mx-auto rounded-full py-4 bg-primary">
          <AppNavigation {...props} />
        </View>
      )}>
      <Tab.Screen name={APP_ROUTE.history} component={History} />
      <Tab.Screen name={APP_ROUTE.registration} component={RegisterDrivers} />
      <Tab.Screen name={APP_ROUTE.profile} component={Profile} />
    </Tab.Navigator>
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
