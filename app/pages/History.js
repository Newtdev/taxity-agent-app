import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from 'components/ScreenWrapper';
import Icon, {Icons} from 'components/Icon';
import {COLORS} from 'constant/Data';
import {useFetchAllDriversQuery} from 'api';
import FullPageLoader from 'components/FullPageLoader';

export default function History() {
  const [value, setValue] = useState('');
  const [listConfig, setListConfig] = useState({page: 1});

  const fetchDriverQueryResult = useFetchAllDriversQuery();

  console.log(fetchDriverQueryResult);
  // ON DRAG DOWN OF THE DRIVERS LIST REFRESH LIST
  const onRefresh = React.useCallback(() => {
    fetchDriverQueryResult.refetch();
  }, [fetchDriverQueryResult]);

  return (
    <ScreenWrapper>
      <View className="h-full">
        {fetchDriverQueryResult.isLoading ? <FullPageLoader /> : null}
        <View className="py-4 mt-6 px-3 h-full">
          <View className="h-36 rounded-2xl flex flex-row justify-between overflow-hidden bg-primary">
            <RecordComp
              name="Total"
              value={fetchDriverQueryResult?.total || 0}
            />

            <View className="h-[85%] my-auto rounded-lg bg-white w-0.5 " />
            <RecordComp
              name="Today"
              value={fetchDriverQueryResult?.driversCreatedTodayCount || 0}
            />
          </View>

          <View className="mt-4">
            <SearchInput
              placeholder="Search drivers by name, cars"
              onChangeText={text => setValue(text)}
              value={value}
            />
          </View>
          <View className="mt-6">
            <FlatList
              showsVerticalScrollIndicator={false}
              centerContent
              alwaysBounceVertical
              contentInset={{bottom: 10, top: 6}}
              keyboardDismissMode="none"
              refreshControl={
                <RefreshControl
                  refreshing={fetchDriverQueryResult?.isFetching}
                  onRefresh={onRefresh}
                />
              }
              className=" h-[50%] mb-6"
              data={fetchDriverQueryResult?.data}
              renderItem={({data}) => <DriverList data={data} />}
              keyExtractor={id => `${id}`}
              onEndReached={e => console.log(e)}
              ListEmptyComponent={<Text>Empty</Text>}
            />
          </View>
        </View>

        <Text>History</Text>
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
        className="py-3 rounded-lg px-3 flex-1"
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
const DriverList = () => {
  return (
    <TouchableOpacity className="h-20 mt-2 bg-lightGreen rounded-2xl flex flex-row overflow-hidden">
      <View className=" basis-14 border-r border-white flex justify-center items-center">
        <Icon
          type={Icons.EvilIcons}
          name="user"
          color={COLORS.gray}
          size={20}
        />
      </View>
      <View className=" basis-[57%] flex justify-evenly py-4 px-2">
        <Text className="font-bold text-base break-words text-black">
          Brad Johnson
        </Text>
        <Text className="text-sm text-black">Mazda 360 GT.</Text>
      </View>
      <View className=" basis-[40%] flex justify-center px-2">
        <Text className="text-xs text-black">09 : 34 AM </Text>
        <Text className="text-xs text-black">03 -10-2023 </Text>
      </View>
    </TouchableOpacity>
  );
};
