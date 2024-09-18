const path = require('path');
const { getConfig } = require('react-native-builder-bob/babel-config');
const pkg = require('../package.json');

const root = path.resolve(__dirname, '..');

module.exports = function (api) {
  api.cache(true);

  return getConfig(
    {
      presets: ['babel-preset-expo'],
      plugins: [
        [
          'module-resolver',
          {
            extensions: [
              '.js',
              '.jsx',
              '.ts',
              '.tsx',
              '.ios.js',
              '.ios.jsx',
              '.ios.ts',
              '.ios.tsx',
              '.android.js',
              '.android.jsx',
              '.android.ts',
              '.android.tsx',
              '.json',
            ],
            alias: {
              '@screens': './src/screens',
              '@components': './src/components',
              '@navigations': './src/navigations',
            },
          },
        ],
      ],
    },
    { root, pkg }
  );
};
