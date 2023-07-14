import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import ScreenWrapper from 'components/ScreenWrapper';
import {Input} from 'components/Input';
import {Button} from 'components/Button';
import useUser from 'hooks/useUser';
import {useFormik} from 'formik';
import {getFormikFieldProps} from 'utils';
import {RadioButton} from 'react-native-paper';
import {COLORS} from 'constant/Data';

const registrationData = [
  {
    id: 1,
    name: 'phoneNumber',
    label: 'Phone Number',
    placeholder: '+234...',
    inputMode: 'tel',
  },
  {
    id: 2,
    name: 'firstName',
    label: 'First name',
    placeholder: 'Enter first name',
    inputMode: 'text',
  },
  {
    id: 3,
    name: 'lastName',
    label: 'Last name',
    placeholder: 'Enter last name',
    inputMode: 'text',
  },
  {
    id: 4,
    name: 'password',
    label: 'Password',
    placeholder: 'must be 8 characters',
    inputMode: 'text',
  },
  {
    id: 5,
    name: 'confirmPassword',
    label: 'Confirm password',
    placeholder: 'Repeat password',
    inputMode: 'text',
  },
];

export default function RegisterDrivers() {
  const {user} = useUser();
  const formik = useFormik({
    initialValues: {
      phoneNumber: '09036899428',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      gender: 'male',

      // location: {
      //   state: 'Abuja',
      // },
    },
  });
  const genderData = [
    {
      value: 'male',
      status: formik.values.gender === 'male' ? 'checked' : 'unchecked',
      handleChange: () => formik.setFieldValue('gender', 'male'),
    },
    {
      value: 'female',
      status: formik.values.gender === 'female' ? 'checked' : 'unchecked',
      handleChange: () => formik.setFieldValue('gender', 'female'),
    },
    {
      value: 'other',
      status: formik.values.gender === 'other' ? 'checked' : 'unchecked',
      handleChange: () => formik.setFieldValue('gender', 'other'),
    },
  ];
  return (
    <ScreenWrapper>
      <View className="h-screen w-screen px-4">
        <View className="w-[90%] mx-4">
          <View></View>
          <Text>{`${user?.firstName} ${user?.lastName}`}</Text>
        </View>

        <ScrollView className="h-96a  w-full">
          <View className="w-full mt-9 h-[60%] flex justify-start">
            {registrationData?.map((v, i) => {
              // <View>
              return i !== 3 && i !== 4 ? (
                <Input
                  label={v.label}
                  placeholder={v.placeholder}
                  inputMode={v.inputMode}
                  keyboardType="number-pad"
                  {...getFormikFieldProps(formik, `${v.name}`)}
                />
              ) : (
                <Input
                  label={v.label}
                  placeholder={v.placeholder}
                  inputMode="text"
                  {...getFormikFieldProps(formik, `${v.name}`)}
                  // </View>
                />
              );
            })}
            <View className="flex flex-row justify-evenly items-center">
              {genderData.map(v => (
                <View className="w-13 flex flex-row items-center">
                  <RadioButton
                    uncheckedColor={COLORS.primary}
                    color={COLORS.primary}
                    value={v.value}
                    status={v.status}
                    onPress={v.handleChange}
                  />
                  <Text className="text-black text-base capitalize">
                    {v.value}
                  </Text>
                </View>
              ))}
            </View>

            <View className="mt-6">
              <Button
                name="Continue"
                // onSubmit={formik.handleSubmit}
                // loading={loginResult.isLoading}
                // disabled={loginResult.isLoading}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
