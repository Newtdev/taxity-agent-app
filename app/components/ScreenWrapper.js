import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';

export default function ScreenWrapper({children}) {
  return (
    <SafeAreaView>
      <View className="h-screen w-screen bg-white">{children}</View>
    </SafeAreaView>
  );
}
