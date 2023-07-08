import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import ScreenWrapper from 'components/ScreenWrapper';
import Icon, {Icons} from 'components/Icon';
import {COLORS} from 'constant/Data';
import Star from 'assets/img/Star.svg';
import {Input} from 'components/Input';

function getFormikFieldProps(formik, name) {
  const fieldProps = formik.getFieldProps(name);
  return {
    id: name,
    name,
    value: fieldProps?.value || '',
    onChangeText: formik.handleChange(`${name}`),
    onBlur: formik.handleBlur(`${name}`),
    error: !!formik.errors[name] && !!formik.touched[name],
    errorMessage: formik.errors[name],
  };
}

/***
 * export function getTextFieldFormikProps(formik, key) {
  const fieldProps = formik.getFieldProps(key);
  return {
    id: key,
    name: key,
    value: fieldProps?.value || '',
    onChangeText: formik.handleChange(`${key}`),
    onBlur: formik.handleBlur(`${key}`),
    error: !!formik.touched[key] && !!formik.errors[key],
    helperText: !!formik.touched && formik.errors[key],
    errorMsg: formik.errors[key],
    // ...fieldProps,
  };
}
 * 
 * 
 * 
 * 
 */

// YUP VALIDATION

const authValidation = Yup.object({
  phone: Yup.number().label('Phone').max(11).min(10).required(),
  password: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Oops!, password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    )
    .label('Password')
    .required(),
});

export default function Login() {
  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: authValidation,
    onSubmit: values => console.log(values),
  });
  const [save, setSave] = useState(false);

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <View className="h-screen w-screen px-4">
          <View className="p-6">
            <Star width={50} height={50} className="ml-auto" />
          </View>
          <View className="h-20 flex flex-col justify-end ">
            <Text className="text-primary text-4xl font-bold ">Log in</Text>
          </View>
          <View className="w-full mt-9 h-72  flex justify-between">
            <Input
              label="Phone"
              placeholder="+234..."
              inputMode="tel"
              keyboardType="number-pad"
              {...getFormikFieldProps(formik, 'phone')}
            />

            <Input
              label="Password"
              placeholder="Password"
              inputMode="tel"
              keyboardType="phone-pad"
              {...getFormikFieldProps(formik, 'password')}
            />
            <TouchableOpacity
              onPress={() => setSave(prevState => !prevState)}
              className="flex flex-row">
              <Icon
                type={Icons.Ionicons}
                name={
                  save ? 'checkmark-circle-sharp' : 'checkmark-circle-outline'
                }
                size={20}
                className="mr-2"
                color={save ? COLORS.primary : COLORS.gray}
              />
              <Text className="text-primary text-sm">Remember me</Text>
            </TouchableOpacity>
            <View className="mt-4">
              <TouchableOpacity
                className="bg-primary rounded-lg py-4"
                onPress={formik.handleSubmit}>
                <Text className="text-center text-white font-bold text-base">
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
