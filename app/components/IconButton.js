import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon, {Icons} from './Icon';

export const IconButton = ({password, iconName, size, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} className="mr-2">
      {password ? (
        <Icon type={Icons.Ionicons} name={iconName} size={size} />
      ) : null}
    </TouchableOpacity>
  );
};
