module.exports = {
  babel: {
    presets: [],
    plugins: [],
    loaderOptions: {
      cacheDirectory: false,
      cacheCompression: false,
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      // Turn off fast refresh to avoid the runtime.js errors
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        'react-refresh/runtime': require.resolve('react-refresh/runtime'),
      };

      return webpackConfig;
    },
  },
};
