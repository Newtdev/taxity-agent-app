import {View, Text, Image, ActivityIndicator} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import ScreenWrapper from 'components/ScreenWrapper';
import {Button} from 'components/Button';
import {useGetAllDriversQuery, useGetSingleDriverQuery} from 'api';
import {string} from 'yup';
import {splitByUpperCase} from 'utils';
import {COLORS} from 'constant/Data';

const keys = [
  'First name',
  'Last name',
  'Gender',
  'Phone number',
  'Car brand',
  'Car name',
];
export default function DriversDetails(props) {
  const dataArray = useMemo(() => {
    const driversData = props?.route?.params;
    const location = driversData?.location;
    const meta = driversData?.meta;
    console.log(driversData);

    return [
      {name: 'State', value: location?.state},
      {name: 'Bank name', value: meta?.bankName},
      {name: 'Account number', value: meta?.accountNumber},
      {name: 'Car brand', value: meta?.carBrand},
      {name: 'Car model', value: meta?.carModel},
      {name: 'Car color', value: meta?.carColor},
      {name: 'Car plate Number', value: meta?.carPlateNumber},
      {name: "Driver's license number", value: meta?.driverLicenseNumber},
    ];
  }, [props?.route?.params]);

  return (
    <ScreenWrapper backBtn={true} navigation={props.navigation}>
      <View className=" px-4">
        <View className="w-full h-56 flex justify-between mb-6">
          <Image
            source={{uri: props?.route?.params?.kyc?.identificationImage?.url}}
            loadingIndicatorSource={
              <ActivityIndicator color={COLORS.primary} size="small" />
            }
            resizeMode="center"
            className="h-20 w-20 self-center my-auto rounded-full"
          />
          <View>
            <Text className="font-bold text-lg text-center text-primary">
              {`${dataArray[0]?.value} ${dataArray[1]?.value}`}
            </Text>
            <Text className=" text-sm text-center text-black">
              {dataArray[2]?.value}
            </Text>
          </View>
          <View className="mt-4">
            <Button name="Edit" onPress={() => console.log('edit value')} />
          </View>
        </View>
        {dataArray?.map(v => (
          <View className="flex flex-row justify-between">
            <View className="flex flex-col basis-1/2 pl-4">
              <Text
                // key={i + 1}
                className="text-base font-bold text-darkgray text-left my-2 capitalize">
                {v?.name}
              </Text>
            </View>
            <View className="basis-1/2 pr-4">
              <Text className="text-base text-primary font-bold text-right">
                {v?.value}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScreenWrapper>
  );
}
