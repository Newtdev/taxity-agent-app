import {View, Text, SafeAreaView} from 'react-native';

import React from 'react';
import {IconButton} from 'react-native-paper';
import {COLORS} from 'constant/Data';

export default function ScreenWrapper({children, backBtn, navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      {backBtn ? (
        <View className="h-10 w-10 flex justify-center items-center mt-3 ml-3 border border-gray rounded-lg p-2">
          <IconButton
            icon="chevron-left"
            size={24}
            iconColor={COLORS.primary}
            onPress={() => navigation.goBack()}
          />
        </View>
      ) : null}
      {children}
    </SafeAreaView>
  );
}
