import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import ScreenWrapper from 'components/ScreenWrapper';
import {Input} from 'components/Input';
import {Button} from 'components/Button';
import {useFormik} from 'formik';
import {getFormikFieldProps} from 'utils';
import * as Yup from 'yup';
import {useUpdateDriversInfoMutation} from 'api';
import FullPageLoader from 'components/FullPageLoader';
import {showMessage} from 'react-native-flash-message';

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
];

// FORM VALIATION
const validateDriversRegistration = Yup.object({
  firstName: Yup.string().label('First name').required(),
  lastName: Yup.string().label('Last name').required(),
  phoneNumber: Yup.string().label('phone number').max(14, 'invalid').required(),
});

const StepOne = ({formik, step}) => {
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
    </View>
  );
};

export default function EditDriversInfo(props) {
  const driversData = props?.route?.params;

  const [updateDrivers, updateDriverResult] = useUpdateDriversInfoMutation();

  async function submitDrivers(values) {
    try {
      const response = await updateDrivers({
        ...values,
        id: driversData?.id,
      }).unwrap();
      console.log('response', response);
    } catch (error) {
      console.log(error?.data);
      showMessage({
        message: error?.data?.message,
        description: error?.data?.message,
        type: 'danger',
      });
    }
  }

  const formik = useFormik({
    initialValues: {
      phoneNumber: driversData?.phoneNumber,
      firstName: driversData?.firstName,
      lastName: driversData?.lastName,
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: validateDriversRegistration,
    onSubmit: values => {
      submitDrivers(values);
    },
  });

  useEffect(() => {
    if (props?.route?.params) {
      formik.setFieldValue({gender: props?.route?.params?.gender});
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.route?.params]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScreenWrapper backBtn={true} navigation={props.navigation}>
        {updateDriverResult.isLoading ? <FullPageLoader /> : null}
        <View style={styles.inner}>
          <ScrollView
            className="h-[100%]  w-full"
            showsVerticalScrollIndicator={false}>
            <StepOne formik={formik} />
          </ScrollView>
          <View className="mt-5 flex justify-evenly">
            <Button name="Submit" onSubmit={formik.handleSubmit} />
          </View>
        </View>
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
