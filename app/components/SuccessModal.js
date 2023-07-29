import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Icon, {Icons} from './Icon';
import {COLORS} from 'constant/Data';
import {Button} from './Button';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTE} from 'constant/Routes';

export default function SuccessModal() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View className="h-full w-full  ">
        <View className="flex justify-center items-center h-[80%] ">
          <Text className="font-bold text-2xl text-primary mb-6">
            Registration Successful
          </Text>
          <Icon
            type={Icons.AntDesign}
            size={80}
            name="checkcircle"
            color={COLORS.green}
          />
        </View>
        <View className="w-full px-4 h-fit ">
          <Button
            name="Done"
            onSubmit={() => navigation.navigate(APP_ROUTE.history)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
