const path = require('path');

const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const OUTPUT_DIR = 'dist';
const DEV_SERVER_HOST = '0.0.0.0';

const optimizationDev = {
  removeAvailableModules: false,
  removeEmptyChunks: false,
  splitChunks: false,
};

const optimizationProd = {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      defaultVendors: {
        name: 'vendors',
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all',
      },
    },
  },
  runtimeChunk: 'single',
  moduleIds: 'deterministic',
  minimizer: [
    new TerserJSPlugin(),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        parser: safePostCssParser,
        map: {
          inline: false,
          annotation: true,
        },
      },
    }),
  ],
};

module.exports = {
  mode: isDev ? 'development' : 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  entry: {
    main: './src/index.tsx',
  },
  devtool: isDev ? 'inline-source-map' : 'source-map',
  devServer: isDev
    ? {
        compress: true,
        contentBase: path.resolve(process.cwd(), OUTPUT_DIR),
        historyApiFallback: true,
        host: DEV_SERVER_HOST,
        hot: true,
        overlay: {
          error: true,
        },
        stats: 'errors-only',
        writeToDisk: true,
      }
    : {},
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: isDev ? '[name]__[local]' : '[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: isDev },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: isDev },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new WebpackBar({ name: 'Web' }),
    isDev && new webpack.HotModuleReplacementPlugin(),
    isDev && new ReactRefreshWebpackPlugin(),
    isProd &&
      new MiniCssExtractPlugin({
        filename: 'main.styles.[contenthash:8].css',
        chunkFilename: '[name].styles.[contenthash:8].css',
      }),
  ].filter(Boolean),
  stats: isDev ? 'errors-only' : 'normal',
  output: {
    filename: isDev ? '[name].bundle.js' : '[name].bundle-[contenthash:8].js',
    chunkFilename: isDev
      ? '[name].chunk.js'
      : '[name].chunk.[contenthash:8].js',
    path: path.resolve(process.cwd(), OUTPUT_DIR),
    publicPath: '/',
  },
  optimization: isDev ? optimizationDev : optimizationProd,
};
