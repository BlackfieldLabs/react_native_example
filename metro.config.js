const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
module.exports = mergeConfig(getDefaultConfig(__dirname), {
  resolver: {
    assetExts: [
      ...(getDefaultConfig(__dirname).resolver.assetExts || []),
      'bin', // Add .bin files to the list of asset extensions
    ],
  },
});
