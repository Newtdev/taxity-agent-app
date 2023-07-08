import ScreenWrapper from 'components/ScreenWrapper';
import React from 'react';
import {Text, View} from 'react-native';
import Logo from 'assets/img/Logo.svg';

export default function Home() {
  return (
    <ScreenWrapper>
      <View className="h-screen w-screen bg-primary flex flex-col justify-center items-center">
        <Logo />
        <Text className="font-bold text-3xl text-center text-white">
          Merchants
        </Text>
      </View>
    </ScreenWrapper>
  );
}
