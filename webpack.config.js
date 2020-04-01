const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//
// we need both 'vue-loader' and this plugin, similar to vue 2:
// https://vue-loader.vuejs.org/guide/#manual-setup
// copied from vue-next-webpack-preview
const { VueLoaderPlugin } = require('vue-loader')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: "[name].min.js",
    // available as global variable when using cdn build only, e.g not available when used with a bundler
    library: "vmc",
    // this is a must have for library
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true
              }
            },
          },
        ],
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader"
      //   }
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].min.css'
    })
  ],
  devtool: "source-map"
};
