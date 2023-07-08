import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from 'constant/Data';

export default function FullPageLoader() {
  return (
    <Modal visible={true} animationType="fade" transparent={true}>
      <View className="flex-1 items-center justify-center bg-[#000000cf]">
        <View className="p-6 bg-white rounded-2xl">
          <ActivityIndicator color={COLORS.primary} size="large" />
          <Text className=" text-sm mt-2">Please wait</Text>
        </View>
      </View>
    </Modal>
  );
}
