/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import Icon, {Icons} from 'components/Icon';
import {COLORS} from 'constant/Data';
import {Text, TouchableOpacity, View} from 'react-native';

export function AppNavigation({state, descriptors, navigation}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        console.log(label);

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center flex-row justify-center gapx-6 w-2">
            <View
              className="flex basis-[50%] flex-row items-center gap-x-1 px-2 py-1 rounded-full"
              style={{backgroundColor: isFocused ? '#fff' : 'transparent'}}>
              <Icon
                type={Icons.AntDesign}
                name={label.toLowerCase()}
                color={!isFocused ? COLORS.white : '#111'}
              />

              <Text
                style={{
                  color: isFocused ? '#222' : 'transparent',
                  display: isFocused ? 'flex' : 'none',
                }}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
