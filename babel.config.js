module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    'nativewind/babel',
    // 'react-native-reanimated/plugin',

    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          test: './test',
          underscore: 'lodash',
        },
      },
    ],
  ],
};
