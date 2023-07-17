import {View, Text, Image} from 'react-native';
import React from 'react';
import ScreenWrapper from 'components/ScreenWrapper';
import {Button} from 'components/Button';
import {useGetAllDriversQuery, useGetSingleDriverQuery} from 'api';

export default function DriversDetails(props) {
  const id = props?.route?.params?.id;
  console.log(props?.route?.params);
  // const fetchDriversDetails = useGetSingleDriverQuery(id);
  // console.log('fetch single details ', fetchDriversDetails);
  return (
    <ScreenWrapper backBtn={true} navigation={props.navigation}>
      <View className=" px-4">
        <View className="w-full h-56 flex justify-between">
          <Image
            source={null}
            resizeMode={'center'}
            className="h-20 w-20 bg-green-900 self-center my-auto rounded-full"
          />
          <View>
            <Text className="font-bold text-lg text-center text-primary">
              Thomas Ejembi
            </Text>
            <Text className=" text-sm text-center text-black">
              2348171315756
            </Text>
          </View>
          <View className="mt-4">
            <Button name="Edit" onPress={() => console.log('edit value')} />
          </View>
        </View>
        <View className="flex flex-row justify-between  py-3 mt-3">
          <Text className="text-base font-bold text-darkgray text-left">
            Gender
          </Text>
          <Text className="text-base text-primary font-bold text-right">
            Male
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}
