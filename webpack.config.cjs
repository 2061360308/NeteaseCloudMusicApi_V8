const webpack = require("webpack");
const fs = require("fs");

const global_patch = fs.readFileSync("./util/global_patch.js", "utf8");

module.exports = [
  {
    optimization: {
      minimize: false,
    },
    entry: "./index.js",
    output: {
      filename: "NeteaseCloudMusicApi.js",
      path: __dirname + "/dist",
      library: "NeteaseCloudMusicApi",
      libraryExport: "default",
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    mode: "production",
    plugins: [new webpack.BannerPlugin({ banner: global_patch, raw: true })],
  },
  {
    optimization: {
      minimize: false,
    },
    entry: "./index.js",
    output: {
      filename: "NeteaseCloudMusicApi.cjs",
      path: __dirname + "/dist",
      library: "NeteaseCloudMusicApi",
      libraryExport: "default",
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    mode: "production",
    plugins: [new webpack.BannerPlugin({ banner: global_patch, raw: true })],
  },
  {
    optimization: {
      minimize: true,
    },
    entry: "./index.js",
    output: {
      filename: "NeteaseCloudMusicApi.min.js",
      path: __dirname + "/dist",
      library: "NeteaseCloudMusicApi",
      libraryExport: "default",
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    mode: "production",
    plugins: [new webpack.BannerPlugin({ banner: global_patch, raw: true })],
  },
];
