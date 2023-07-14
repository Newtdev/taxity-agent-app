import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from 'components/ScreenWrapper';
import {Input} from 'components/Input';
import {Button} from 'components/Button';
import useUser from 'hooks/useUser';
import {useFormik} from 'formik';
import {getFormikFieldProps} from 'utils';
import {RadioButton} from 'react-native-paper';
import {COLORS} from 'constant/Data';
import * as Yup from 'yup';

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

const validateDriversRegistration = [
  Yup.object({
    firstName: Yup.string().label('First name').required(),
    lastName: Yup.string().label('Last name').required(),
    phoneNumber: Yup.string()
      .label('phone number')
      .length(11, 'invalid')
      .required(),
    password: Yup.string().label('Password').required(),
    confirmPassword: Yup.ref('password'),
  }),
  Yup.object({
    oldPassword: Yup.string().label('Old password').required(),
    avatar: Yup.string().notRequired(),
    id: Yup.string().notRequired(),
    accountStatus: Yup.object({
      status: Yup.string().notRequired(),
      reason: Yup.string().notRequired(),
    }),
  }),
];

export default function RegisterDrivers({navigation}) {
  const [step, setStep] = useState(0);

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
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: validateDriversRegistration[step],
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScreenWrapper backBtn={true} navigation={navigation}>
        <View style={styles.inner}>
          <ScrollView
            className="h-[100%] w-full"
            showsVerticalScrollIndicator={false}>
            <View className="w-full h-[5rem] ">
              {registrationData?.map((v, i) => {
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
                <Button name="Continue" />
              </View>
            </View>
          </ScrollView>
        </View>
        {/* </SafeAreaView> */}
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    flex: 1,
    justifyContent: 'flex-end',
  },
});

//  <KeyboardAvoidingView
//    behavior={Platform.OS === 'ios' ? 'padding' : null}
//    style={{flex: 1}}>
//    <SafeAreaView style={styles.container}>
//      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//        <View style={styles.inner}>
//          <View className="w-full flex justify-start">
//            {registrationData?.map((v, i) => {
//              // <View>
//              return i !== 3 && i !== 4 ? (
//                <Input
//                  label={v.label}
//                  placeholder={v.placeholder}
//                  inputMode={v.inputMode}
//                  keyboardType="number-pad"
//                  {...getFormikFieldProps(formik, `${v.name}`)}
//                />
//              ) : (
//                <Input
//                  label={v.label}
//                  placeholder={v.placeholder}
//                  inputMode="text"
//                  {...getFormikFieldProps(formik, `${v.name}`)}
//                  // </View>
//                />
//              );
//            })}
//            <View className="flex flex-row justify-evenly items-center">
//              {genderData.map(v => (
//                <View className="w-13 flex flex-row items-center">
//                  <RadioButton
//                    uncheckedColor={COLORS.primary}
//                    color={COLORS.primary}
//                    value={v.value}
//                    status={v.status}
//                    onPress={v.handleChange}
//                  />
//                  <Text className="text-black text-base capitalize">
//                    {v.value}
//                  </Text>
//                </View>
//              ))}
//            </View>

//            <View className="mt-6">
//              <Button
//                name="Continue"
//                // onSubmit={formik.handleSubmit}
//                // loading={loginResult.isLoading}
//                // disabled={loginResult.isLoading}
//              />
//            </View>
//          </View>
//        </View>
//        {/* <View style={styles.inner}>
//         <Text style={styles.header}>Header</Text>
//         <TextInput placeholder="Username" style={styles.input} />
//         <TextInput placeholder="Password" style={styles.input} />
//         <TextInput placeholder="Confrim Password" style={styles.input} />
//         <View style={styles.btnContainer}>
//           <Button title="Submit" onPress={() => null} />
//         </View>
//         <View style={{flex: 1}} />
//       </View> */}
//      </TouchableWithoutFeedback>
//    </SafeAreaView>
//  </KeyboardAvoidingView>;
