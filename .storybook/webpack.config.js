const path = require("path");

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  storybookBaseConfig.module.rules.push({
    test: /\.(scss|css|less)$/,
    loaders: ["style-loader", "css-loader", "sass-loader", "less-loader"],
    include: path.resolve(__dirname, "../")
  });

  storybookBaseConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    exclude: /node_modules/
  });
  storybookBaseConfig.resolve.extensions.push(".ts", ".tsx");

  // Return the altered config
  return storybookBaseConfig;
};