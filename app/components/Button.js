import React from 'react';
import {ActivityIndicator, TouchableOpacity, Text} from 'react-native';

export const Button = ({onSubmit, name, loading, disabled}) => (
  <TouchableOpacity
    className="bg-primary rounded-lg py-4"
    onPress={onSubmit}
    disabled={disabled}>
    {loading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text className="text-center text-white font-bold text-base">{name}</Text>
    )}
  </TouchableOpacity>
);
