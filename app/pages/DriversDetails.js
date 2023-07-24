import {View, Text, Image, ActivityIndicator} from 'react-native';
import React, {useMemo} from 'react';
import ScreenWrapper from 'components/ScreenWrapper';
import {Button} from 'components/Button';
import {COLORS} from 'constant/Data';
import {APP_ROUTE} from 'constant/Routes';

export default function DriversDetails(props) {
  const driversData = props?.route?.params;

  const dataArray = useMemo(() => {
    const location = driversData?.location;
    const meta = driversData?.meta;

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
  }, [driversData?.location, driversData?.meta]);

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
              {`${driversData?.firstName} ${driversData?.lastName}`}
            </Text>
            <Text className=" text-sm text-center text-black">
              {driversData?.phoneNumber}
            </Text>
          </View>
          <View className="mt-4">
            <Button
              name="Edit"
              onSubmit={() =>
                props.navigation.navigate(APP_ROUTE.editDriverInfo, driversData)
              }
            />
          </View>
        </View>
        {dataArray?.map((v, i) => (
          <View key={i + 1} className="flex flex-row justify-between">
            <View className="flex flex-col basis-1/2 pl-4">
              <Text className="text-base font-bold text-darkgray text-left my-2 capitalize">
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
