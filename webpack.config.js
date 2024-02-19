const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: /\.(module|m)\.css$/,
                localIdentName: "[name]__[local]--[hash:hex:3]",
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.container.ModuleFederationPlugin({
      name: "foobar",
      filename: "remote-entry.js",
      exposes: {
        "./Header": "./src/components/header/index.tsx",
      },
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        // IMPORTANT: this causes "ERROR in SplitChunksPlugin Cache group "styles" conflicts with existing chunk..." during webpack serve
        styles: {
          name: "main",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
};
