import {View, Text} from 'react-native';
import React, {useMemo} from 'react';
import ScreenWrapper from 'components/ScreenWrapper';
import {Button} from 'components/Button';
import {COLORS} from 'constant/Data';
import {APP_ROUTE} from 'constant/Routes';
import useUser from 'hooks/useUser';
import Icon, {Icons} from 'components/Icon';

export default function Profile(props) {
  const {user} = useUser();

  const dataArray = useMemo(() => {
    return [
      {name: 'First name', value: user?.firstName},
      {name: 'Last name', value: user?.lastName},
      {name: 'Mobile number', value: user?.phoneNumber},
      {name: 'Email', value: user?.email},
      {name: 'Gender', value: user?.gender},
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScreenWrapper backBtn={true} navigation={props.navigation}>
      <View className=" px-4">
        <View className="w-full h-56 flex ">
          <View className="p-6 w-34 mx-auto rounded-full bg-primary mb-6">
            <Icon
              type={Icons.Entypo}
              color={COLORS.white}
              name="user"
              size={56}
              style="mx-auto"
            />
          </View>

          <View className="">
            <Button
              name="Edit"
              onSubmit={() =>
                props.navigation.navigate(APP_ROUTE.editDriverInfo)
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
              <Text className="text-base capitalize text-primary font-bold text-right">
                {v?.value}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScreenWrapper>
  );
}
