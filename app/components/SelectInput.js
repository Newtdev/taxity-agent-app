import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

export default function SelectInput({data, onSelect, defaultValue, label}) {
  return (
    <View className="flex-1 h-12">
      <Text className="text-sm text-black mb-2">{label}</Text>
      <View className="border border-gray rounded-lg">
        <SelectDropdown
          defaultButtonText=""
          defaultValue={defaultValue}
          rowStyle={styles.rowStyle}
          buttonStyle={styles.button}
          buttonTextStyle={styles.buttonText}
          rowTextStyle={styles.rowText}
          dropdownStyle={styles.dropDown}
          data={data}
          searchPlaceHolder="search state"
          searchInputStyle={styles.searchStyle}
          search={true}
          onSelect={onSelect}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>
    </View>
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
  button: {
    width: '100%',
    height: '100%',
    paddingVertical: 10,
    border: 1,
    backgroundColor: 'transparent',
    borderColor: 'red',
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'left',
  },
  rowText: {fontSize: 16, textAlign: 'left'},
  dropDown: {
    width: '100%',
    fontSize: 12,
  },
  rowStyle: {width: '100%'},
  searchStyle: {width: '100%'},
});
