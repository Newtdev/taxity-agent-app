import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from 'components/ScreenWrapper';
import {Input} from 'components/Input';
import {Button} from 'components/Button';
import {useFormik} from 'formik';
import {getFormikFieldProps} from 'utils';
import {RadioButton} from 'react-native-paper';
import {COLORS} from 'constant/Data';
import * as Yup from 'yup';
import SelectDropdown from 'react-native-select-dropdown';
import SelectInput from 'components/SelectInput';

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

  {
    id: 6,
    name: 'meta.carBrand',
    label: 'Car brand',
    placeholder: 'Enter your car brand name',
    inputMode: 'text',
  },
  {
    id: 7,
    name: 'meta.carModel',
    label: 'Car Modal',
    placeholder: 'Enter your car model',
    inputMode: 'text',
  },
  {
    id: 8,
    name: 'meta.carColor',
    label: 'Car color',
    placeholder: 'Enter your car color',
    inputMode: 'text',
  },
  {
    id: 9,
    name: 'meta.carPlateNumber',
    label: 'Car plate number',
    placeholder: 'Enter your car plate number',
    inputMode: 'text',
  },
  {
    id: 10,
    name: 'location.state',
    label: 'State',
    placeholder: 'Enter State',
    inputMode: 'text',
  },
  {
    id: 11,
    name: 'meta.accounNumber',
    label: 'Account number',
    placeholder: 'Enter account name',
  },
];

// FORM VALIATION
const validateDriversRegistration = [
  Yup.object({
    firstName: Yup.string().label('First name').required(),
    lastName: Yup.string().label('Last name').required(),
    phoneNumber: Yup.string()
      .label('phone number')
      .length(11, 'invalid')
      .required(),
    password: Yup.string().label('Password').min(8).required(),
    confirmPassword: Yup.string()
      .label('confirm Password')
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required(),
  }),
  Yup.object({
    avatar: Yup.string().notRequired(),
    id: Yup.string().notRequired(),
    accountStatus: Yup.object({
      status: Yup.string().notRequired(),
      reason: Yup.string().notRequired(),
    }),
  }),
];

const states = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
];
const StepOne = ({formik, step}) => {
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
  if (step !== 0) {
    return null;
  }
  return (
    <View className="w-full h-[5rem] ">
      {registrationData.slice(0, 5)?.map((v, i) => (
        <View key={i}>
          {i !== 3 && i !== 4 ? (
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
          )}
        </View>
      ))}
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
            <Text className="text-black text-base capitalize">{v.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const StepTwo = ({formik, step}) => {
  if (step !== 1) {
    return null;
  }
  return (
    <View className="w-full h-[5rem] ">
      {registrationData.slice(5, 9)?.map((v, i) => (
        <View key={i}>
          <Input
            label={v.label}
            placeholder={v.placeholder}
            inputMode={v.inputMode}
            keyboardType="number-pad"
            {...getFormikFieldProps(formik, `${v.name}`)}
          />
        </View>
      ))}

      <SelectInput
        data={states}
        onSelect={(selectedItem, index) => {
          formik.setFieldValue('location.state', selectedItem);
        }}
        defaultValue="Abuja"
        label="Select state"
      />
    </View>
  );
};

const StepThree = ({formik, step}) => {
  if (step !== 2) {
    return null;
  }
  return (
    <View className="w-full h-[7rem]">
      {registrationData.slice(10, 11)?.map((v, i) => (
        <View key={i}>
          <Input
            label={v.label}
            placeholder={v.placeholder}
            inputMode={v.inputMode}
            keyboardType="number-pad"
            {...getFormikFieldProps(formik, `${v.name}`)}
          />
        </View>
      ))}
      <SelectInput
        data={states}
        onSelect={(selectedItem, index) => {
          formik.setFieldValue('location.state', selectedItem);
        }}
        defaultValue="Abuja"
        label="Select bank"
      />
    </View>
  );
};

async function submitDrivers() {
  console.log('hellow');
}
export default function RegisterDrivers({navigation}) {
  const [step, setStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      phoneNumber: '09036899428',
      firstName: 'Thomas',
      lastName: 'Ejembi',
      password: 'EJEMBIthomas61@',
      confirmPassword: 'EJEMBIthomas61@',
      gender: 'male',

      location: {
        state: 'Abuja',
      },
      meta: {
        bankName: 'New Driver',
        accountNumber: '2390363916',
        driverLicenseNumber: '4390365819',
        carBrand: 'Toyota',
        carModel: 'Corola',
        carColor: 'Black',
        carPlateNumber: 'ABJ-AM-999C',
      },
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: validateDriversRegistration[step],
    onSubmit: values => {
      switch (step) {
        case 0:
          setStep(prevStep => prevStep + 1);
          break;

        case 1:
          setStep(prevStep => prevStep + 1);
          break;
        default:
          submitDrivers();
      }
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScreenWrapper backBtn={true} navigation={navigation}>
        <View style={styles.inner}>
          <ScrollView
            className="h-[100%] w-full"
            showsVerticalScrollIndicator={false}>
            <StepOne formik={formik} step={step} />
            <StepTwo formik={formik} step={step} />
            <StepThree formik={formik} step={step} />
          </ScrollView>
          <View className="mt-5 flex justify-evenly">
            <Button
              name={step === 3 ? 'Next' : 'Submit'}
              onSubmit={formik.handleSubmit}
            />
            {step > 0 ? (
              <TouchableOpacity
                className="bg-white border border-primary rounded-lg py-4 mt-3"
                onPress={() => setStep(prevState => prevState - 1)}>
                <Text className="text-center text-primary font-bold text-base">
                  Back
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
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
