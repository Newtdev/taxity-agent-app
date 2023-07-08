import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import ScreenWrapper from 'components/ScreenWrapper';
import Icon, {Icons} from 'components/Icon';
import {action, COLORS} from 'constant/Data';
import Star from 'assets/img/Star.svg';
import {Input} from 'components/Input';
import {useLoginMutation} from 'api';
import {Button} from 'components/Button';
import {showMessage} from 'react-native-flash-message';
import {createAction} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {loginDetails} from 'features/appSlice';

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
  phoneNumber: Yup.string().label('Phone').required(),
  password: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Oops!, password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    )
    .label('Password')
    .required(),
});

// CREATE ACTION CREATOR TO SAVE USER DETAILS
export const rememberDetails = createAction(action.REMEMBER);

export default function Login() {
  const [save, setSave] = useState(false);
  const [login, loginResult] = useLoginMutation();
  const dispatch = useDispatch();
  //   const {password, phoneNumber} = useSelector(loginDetails);

  //   console.log(loginResult);
  async function loginRequest(values) {
    try {
      const result = await login(values).unwrap();
      //   formik.resetForm();
      //   console.log(result);
    } catch (error) {
      showMessage({
        message: 'Something went wrong!',
        description: error?.data?.message,
        type: 'danger',
      });
    }
  }

  const formik = useFormik({
    initialValues: {
      phoneNumber: '09036899321',
      password: 'Test@1234',
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: authValidation,
    onSubmit: values => loginRequest(values),
  });

  return (
    <ScreenWrapper>
      <ScrollView>
        <View className="h-screen w-screen px-4">
          <View className="p-6">
            <Star width={50} height={50} className="ml-auto" />
          </View>
          <View className="h-16 flex flex-col justify-end">
            <Text className="text-primary text-4xl font-bold ">Log in</Text>
          </View>
          <View className="w-full mt-9 h-[60%] flex justify-start ">
            <Input
              label="Phone Number"
              placeholder="+234..."
              inputMode="tel"
              keyboardType="number-pad"
              {...getFormikFieldProps(formik, 'phoneNumber')}
            />

            <Input
              label="Password"
              placeholder="Password"
              inputMode="text"
              {...getFormikFieldProps(formik, 'password')}
            />
            <TouchableOpacity
              onPress={() => {
                setSave(prevState => !prevState);
                dispatch(rememberDetails(formik.values));
              }}
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
              <Button
                name="Login"
                onSubmit={formik.handleSubmit}
                loading={loginResult.isLoading}
                disabled={loginResult.isLoading}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
