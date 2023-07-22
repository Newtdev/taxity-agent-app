import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {IconButton} from './IconButton';

export const Input = ({
  label,
  name,
  placeholder,
  type,
  keyboardType,
  onFocus = () => {},
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(true);
  const error = props.error;
  //   console.log(props.errorMessage);
  return (
    <View>
      <Text className="text-sm text-black mb-1">{label}</Text>
      <View
        className={`flex flex-row justify-between items-center border rounded-lg ${
          error ? 'border-red-500' : focus ? 'border-primary' : 'border-gray'
        }`}>
        <TextInput
          className="py-3 rounded-lg px-3 flex-1"
          id={`${name}`}
          placeholder={placeholder}
          inputMode={type}
          keyboardType={keyboardType || 'default'}
          onFocus={() => {
            onFocus();
            setFocus(() => true);
          }}
          onBlur={() => setFocus(() => false)}
          secureTextEntry={
            (name === 'password' || name === 'confirmPassword') && visible
          }
          {...props}
        />
        <IconButton
          password={name === 'password' || name === 'confirmPassword'}
          onPress={() => setVisible(prevState => !prevState)}
          iconName={visible ? 'eye-outline' : 'ios-eye-off-outline'}
          size={20}
        />
      </View>
      <Text className="text-xs text-red-500 mt-1">{props.errorMessage}</Text>
    </View>
  );
};
