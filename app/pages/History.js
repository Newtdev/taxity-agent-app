import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import ScreenWrapper from 'components/ScreenWrapper';
import Icon, {Icons} from 'components/Icon';
import {COLORS} from 'constant/Data';
import {useGetAllDriversQuery, useGetFetchMoreDriversQuery} from 'api';
import FullPageLoader from 'components/FullPageLoader';
import {useDispatch} from 'react-redux';
import {logOut} from 'features/appSlice';
import Ridges from 'assets/img/Ridges.png';
import {APP_ROUTE} from 'constant/Routes';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import {Button} from 'components/Button';

const useDebounce = value => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      setDebouncedValue(value);
    }, 3000);
    return () => clearTimeout(timeOutID);
  }, [value]);

  return {debouncedValue};
};

const EmptyList = ({data, fn}) => {
  return (
    <View className=" w-[60%] m-auto mt-24 flex justify-center items-center">
      {data?.length < 1 || data === undefined ? (
        <View>
          <Text className="text-black font-bold text-base mb-4">
            No data found
          </Text>
          <Button name="Reload" onSubmit={() => fn()} />
        </View>
      ) : null}
    </View>
  );
};

export default function History({navigation}) {
  const [value, setValue] = useState('');
  const {debouncedValue} = useDebounce(value);
  const [listPage, setListPage] = useState(1);
  const [fetchPagnatedData, setFetchPaginatedData] = useState(false);

  const dispatch = useDispatch();
  const fetchDriverQueryResult = useGetAllDriversQuery(
    {debouncedValue, listPage, limit: listPage * 10},
    {
      refetchOnReconnect: true,
    },
  );

  function resetRequest() {
    setListPage(() => 1);
  }
  // ON DRAG DOWN OF THE DRIVERS LIST REFRESH LISTd
  const onRefresh = React.useCallback(() => {
    fetchDriverQueryResult.refetch();
  }, [fetchDriverQueryResult]);

  const normalizedDriversData = useMemo(() => {
    const data = fetchDriverQueryResult?.currentData;

    return {
      drivers: data?.drivers?.data,
      total: data?.total,
      today: data?.driversCreatedTodayCount,
    };
  }, [fetchDriverQueryResult]);

  const RenderFooter = () => {
    try {
      if (fetchPagnatedData && fetchDriverQueryResult.isFetching) {
        return <ActivityIndicator size="large" color={COLORS.primary} />;
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScreenWrapper>
      <View className="h-full">
        {fetchDriverQueryResult.isLoading ? <FullPageLoader /> : null}
        <View className="py-4 mt-6 px-3 h-full">
          <ImageBackground source={Ridges} resizeMode="contain">
            <View className="h-36 rounded-2xl flex flex-row justify-between overflow-hidden bg-primary">
              <RecordComp
                name="Total"
                value={normalizedDriversData?.total || 0}
              />

              <View className="h-[85%] my-auto rounded-lg bg-white w-0.5 " />
              <RecordComp
                name="Today"
                value={normalizedDriversData?.today || 0}
              />
            </View>
          </ImageBackground>

          <View className="mt-4">
            <SearchInput
              placeholder="Search drivers by name, cars"
              onChangeText={text => setValue(text)}
              value={value}
            />
          </View>
          <View className="mt-6 relative ">
            <FlatList
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical
              contentInset={{bottom: 10, top: 6}}
              keyboardDismissMode="on-drag"
              refreshControl={
                <RefreshControl
                  refreshing={fetchDriverQueryResult?.isFetching}
                  onRefresh={onRefresh}
                />
              }
              className="h-[60%] mb-6"
              contentContainerStyle={{
                paddingBottom: 50,
              }}
              data={normalizedDriversData?.drivers}
              refreshing={fetchPagnatedData}
              renderItem={data => <DriverList data={data} />}
              keyExtractor={({id}) => `${id}`}
              onEndReachedThreshold={0.5}
              onEndReached={e => {
                if (e.distanceFromEnd > 0) {
                  setFetchPaginatedData(prev => !prev);

                  setListPage(prev => prev + 1);
                  console.log(listPage);
                } else {
                  setFetchPaginatedData(prev => !prev);
                }
                // setFetchPaginatedData(() => false);
              }}
              disableIntervalMomentum={true}
              ListEmptyComponent={
                <EmptyList
                  data={fetchDriverQueryResult?.currentData?.drivers?.data}
                  fn={resetRequest}
                />
              }
              ListFooterComponent={<RenderFooter />}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate(APP_ROUTE.registration)}
              className="h-14 w-14 bottom-0 rounded-full absolute right-0 bg-primary flex flex-row justify-between items-center">
              <Icon
                type={Icons.AntDesign}
                name="plus"
                size={24}
                style="mx-auto"
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

// Record top component
const RecordComp = ({name, value}) => {
  return (
    <View className="basis-[49%] bg-primary flex flex-row items-center justify-center">
      <Text className="font-bold text-white text-xl">{name}:</Text>
      <Text className="font-bold text-white text-2xl ml-2">{value}</Text>
    </View>
  );
};

// SEARCH INPUT
const SearchInput = ({
  placeholder,
  onFocus = () => {},
  onChangeText,
  value,
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <View
      className={`flex flex-row justify-between items-center border rounded-lg ${
        focus ? 'border-primary' : 'border-gray'
      }`}>
      <TextInput
        className="py-3 rounded-lg px-3 flex-1 text-black"
        placeholder={placeholder}
        inputMode="text"
        value={value}
        onFocus={() => {
          onFocus();
          setFocus(() => true);
        }}
        onChangeText={text => onChangeText(text)}
        onBlur={() => setFocus(() => false)}
      />
    </View>
  );
};

// DRIVER LIST COMPONENTS
const DriverList = ({data}) => {
  const navigation = useNavigation();
  const item = data?.item;
  return (
    <TouchableOpacity
      className="h-20 mt-2 bg-lightGreen rounded-2xl flex flex-row overflow-hidden"
      onPress={() => navigation.navigate(APP_ROUTE.drivers_details, item)}>
      <View className=" basis-14 border-r border-white flex justify-center items-center">
        <Icon
          type={Icons.EvilIcons}
          name="user"
          color={COLORS.gray}
          size={40}
        />
      </View>
      <View className=" basis-[57%] flex justify-evenly py-4 px-2">
        <Text className="font-bold text-base break-words text-black">
          {`${item?.firstName} ${item?.lastName}`}
        </Text>
        <Text className="text-xs text-black">{`${item?.meta?.carBrand} ${item?.meta?.carModel} ${item?.meta?.carPlateNumber}`}</Text>
      </View>
      <View className=" basis-[40%] flex justify-center px-2">
        {/* Time */}
        <Text className="text-xs text-black text-end">
          {format(new Date(item?.createdAt), 'HH:mm:ss')}
        </Text>
        {/* Date */}
        <Text className="text-xs text-black">
          {format(new Date(item?.createdAt), 'MM/dd/yyyy')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
