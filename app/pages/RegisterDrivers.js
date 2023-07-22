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
import SelectInput from 'components/SelectInput';
import {useRegisterDriverMutation} from 'api';
import FullPageLoader from 'components/FullPageLoader';
import {showMessage} from 'react-native-flash-message';
import StepIndicator from 'react-native-step-indicator';

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
    name: 'meta.accountNumber',
    label: 'Account number',
    placeholder: 'Enter account name',
  },
];

const banks = [
  'Access Bank Plc',
  'Citibank Nigeria',
  'Coronation Merchant Bank',
  'Ecobank Nigeria Plc',
  'FBNQuest Merchant Bank',
  'Fidelity Bank Plc',
  'First Bank of Nigeria',
  'First City Monument Bank',
  'FSDH Merchant Bank',
  'Globus Bank',
  'Guaranty Trust Bank Plc',
  'Heritage Banking Company ',
  'Jaiz Bank Plc',
  'Keystone Bank',
  'Nova Merchant Bank',
  'Polaris Bank',
  'Providus Bank',
  'Rand Merchant Bank',
  'Stanbic IBTC Bank Plc',
  'Standard Chartered',
  'Sterling Bank Plc',
  'SunTrust Bank Nigeria ',
  'TAJBank',
  'Titan Trust Bank',
  'Union Bank of Nigeria Plc',
  'United Bank for Africa Plc',
  'Unity Bank Plc',
  'Wema Bank Plc',
  'Zenith Bank Plc',
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
    meta: Yup.object({
      carBrand: Yup.string().label('Car brand').required(),
      carModel: Yup.string().label('Car model').required(),
      carColor: Yup.string().label('Car color').required(),
      carPlateNumber: Yup.string()
        .label('Car plate number')

        .required(),
    }),
    location: Yup.object({
      state: Yup.string().label('State').required(),
    }),
  }),
  Yup.object({
    meta: Yup.object({
      accountNumber: Yup.string()
        .length(10)

        .label('Account Number')
        .required(),
      bankName: Yup.string().label('Bank Name').required(),
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
      id: 1,
      value: 'male',
      status: formik.values.gender === 'male' ? 'checked' : 'unchecked',
      handleChange: () => formik.setFieldValue('gender', 'male'),
    },
    {
      id: 2,
      value: 'female',
      status: formik.values.gender === 'female' ? 'checked' : 'unchecked',
      handleChange: () => formik.setFieldValue('gender', 'female'),
    },
    {
      id: 3,
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
        <View key={i + 1}>
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
          <View key={v.id} className="w-13 flex flex-row items-center">
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
      {registrationData?.slice(5, 9)?.map((v, i) => (
        <View key={i + 1}>
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
    <View className="w-full h-[7rem] mt-6">
      {registrationData.slice(10, 11)?.map((v, i) => (
        <View key={i + 1}>
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
        data={banks}
        onSelect={(selectedItem, index) => {
          formik.setFieldValue('location.state', selectedItem);
        }}
        defaultValue="Abuja"
        label="Select bank"
      />
    </View>
  );
};

const labels = ['Profile', 'Car info', 'Bank details'];

export default function RegisterDrivers({navigation}) {
  const [step, setStep] = useState(0);
  const [registerDrivers, registerDriverResult] = useRegisterDriverMutation();

  async function submitDrivers(values) {
    try {
      const response = await registerDrivers(values).unwrap();
      console.log('response', response);
    } catch (error) {
      console.log(error?.data?.message);
      showMessage({
        message: error?.data?.message,
        description: error?.data?.message,
        type: 'danger',
      });
    }
  }
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
        // driverLicenseNumber: '4390365819',
        carBrand: 'Toyota',
        carModel: 'Corola',
        carColor: 'Black',
        carPlateNumber: 'ABJ-AM-999C',
      },
      kyc: {
        meansOfIdentification: 'driver_license',
        identificationNumber: '4390365819',
        identificationImage:
          'data:image/jpeg;base64,/9j/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIAcwBzAMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APf6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKM0ZoAKKKKACiiigAooooAKKKKAC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',
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
          submitDrivers(values);
      }
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScreenWrapper backBtn={true} navigation={navigation}>
        {registerDriverResult.isLoading ? <FullPageLoader /> : null}
        <View style={styles.inner}>
          <View className="mb-3">
            <StepIndicator
              customStyles={customStyles}
              currentPosition={step + 1}
              labels={labels}
              stepCount={3}
            />
          </View>
          <ScrollView
            className="h-[100%]  w-full"
            showsVerticalScrollIndicator={false}>
            <StepOne formik={formik} step={step} />
            <StepTwo formik={formik} step={step} />
            <StepThree formik={formik} step={step} />
          </ScrollView>
          <View className="mt-5 flex justify-evenly">
            <Button
              name={step < 2 ? 'Next' : 'Submit'}
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

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#002928',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#002928',
  stepStrokeUnFinishedColor: '#002928',
  separatorFinishedColor: '#002928',
  separatorUnFinishedColor: '#002928',
  stepIndicatorFinishedColor: '#002928',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#002928',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#002928',
  labelColor: '#002928',
  labelSize: 13,
  currentStepLabelColor: '#002928',
};

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
