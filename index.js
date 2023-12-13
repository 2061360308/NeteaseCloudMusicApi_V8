import beforeRequest from "./util/beforeRequest.js";
import afterRequest from "./util/afterRequest.js";
import this_package from "./package.json" assert { type: "json" };

const NeteaseCloudMusicApi_inner_version = "4.13.8"; // 本项目使用的 NeteaseCloudMusicApi 版本号
const NeteaseCloudMusicApi_V8_version = this_package.version; // 本项目的版本号

export default {
  beforeRequest,
  afterRequest,
  inner_version: () => {
    return {
      NeteaseCloudMusicApi: NeteaseCloudMusicApi_inner_version,
      NeteaseCloudMusicApi_V8: NeteaseCloudMusicApi_V8_version,
    };
  },
}; // 一个请求前钩子，一个请求后钩子
