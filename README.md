# NeteaseCloudMusicApi_V8

> 基于 [ NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 改造的遵循 ECMAScript 规范的 API

> 理论上 基于 Google 的 V8 JavaScript 引擎 都可以快速调用

<img src="https://img.shields.io/npm/v/NeteaseCloudMusicApi.svg" alt="Version">
<img src="https://img.shields.io/badge/license-MIT-yellow" />

### 依赖于

- [ NeteaseCloudMusicApi ](https://github.com/Binaryify/NeteaseCloudMusicApi)

### 原理

不久前`NeteaseCloudMusicApi`的作者改写了项目，移除了加解密模块方面对 node 的依赖，

这时候项目本身要用到 node 的情况大部分就剩下，建立路由，发送请求等等。

将`NeteaseCloudMusicApi`中路由，进一步改造补充了几个全局函数，变量（`见/util/global_patch.js`），替换`module.exports`等等

这样以来我们使用其他语言（python，java）中基于 Google 的 V8 JavaScript 引擎的可以运行 js 代码的相关库就可以调用接口得到请求参数，再使

用对应语言封装网络请求就可以将`NeteaseCloudMusicApi`项目轻松移植到其他语言环境。

项目将原本的接口请求分为三个部分，请求前，发送请求和请求后，本项目用ESMAScript提供了请求前和请求后的部分，发送请求需要按照使用平台自己实现

请求前通过本项目的beforeRequest能够获取请求网易云相应接口的所有请求数据和地址，之后需要自己使用这些数据发送请求

请求后将对应请求数据传入afterRequest可以整合请求返回数据（大致和NeteaseCloudMusicApi项目保持一致）一些特殊接口也会调用afterRequest中的方法对数据进行特殊处理

### 使用

#### 直接浏览器使用（不支持发送请求，只能得到请求参数）

- 下载`/dist`下的`NeteaseCloudMusicApi.js`(或`NeteaseCloudMusicApi.min.js`)
- script 标签下导入`<script src="NeteaseCloudMusicApi.js"></script>`
- 调用函数`NeteaseCloudMusicApi.beforeRequest`和`NeteaseCloudMusicApi.afterRequest`(具体案例见`./test.js`)

#### 导入模块使用

- 导入`./index.js`,`import api from "./index.js"`
- 调用`api.beforeRequest`和`api.afterRequest`

> 注意： 第一个参数为 API 名称，第二个参数为 API 参数，具体 API 名称和参数请参考 [NeteaseCloudMusicApi 文档](https://docs.neteasecloudmusicapi.binaryify.com)，name 支持`/song/url/v1`和`song_url_v1`两种写法。

#### 其他语言调用

- 下载`/dist`下的`NeteaseCloudMusicApi.js`(或`NeteaseCloudMusicApi.min.js`)
- 根据情况调用`NeteaseCloudMusicApi.js`

### 开发

- 克隆项目 `git clone git@github.com:2061360308/NeteaseCloudMusicApi_V8.git`
- 安装依赖 `npm install`
- 打包 `npm run build`

#### `convert.py`

用来自动转换原`NeteaseCloudMusicApi`项目中的`node`语法的`python`小脚本。默认情况下它会将`./original/module`中的模块经过转换后复制到`./module`目录下，但是如果在`./special`有相应模块会优先使用

最后它还会将生成`./util/api.js`和`./util/afterRequestApi.js`俩个文件用来统一导入模块



### 测试

项目通过node环境的jest测试会出现错误（不理解）因为本来就不是写给node平台用的，所以没有仔细探究，而是通过我写的python sdk进行了测试

目前测试通过了200多个接口，具体情况请查看项目[NeteaseCloudMusic_PythonSDK](https://github.com/2061360308/NeteaseCloudMusic_PythonSDK)

### 相关

- **[NeteaseCloudMusic_PythonSDK](https://github.com/2061360308/NeteaseCloudMusic_PythonSDK)** 依赖本项目使用 python（py_mini_racer）开发的 SDK

### 特殊

> 与 NeteaseCloudMusicApi 原项目的一些差异

#### 获取歌单所有歌曲

**接口地址** : `/playlist/track/all`
**说明**: 

这个接口原作者设计原理是在内部先调用`/playlist/detail`这个接口，之后处理返回的数据，也就是说，`/playlist/track/all`依赖于`/playlist/detail`接口返回的结果.

而本项目的设计接口不方便做到一个接口里发送俩次请求，所以使用`/playlist/track/all`前你需要先调用`/playlist/detail`然后将返回结果作为`/playlist/track/all`的结果

**参数**: 

detail_result 和 trackIds 参数二选一（需要编码为 json 字符串输入）
		`detail_result`: `/playlist/detail`这个接口直接返回的数据，编码为 json
		`trackIds`: `/playlist/detail`返回数据中的`playlist.trackIds`，编码为 json

二者都传入优先`trackIds`
**示例**

```js
// 先请求 /playlist/detail
let request_param = api.beforeRequest('/playlist/detail', {
  "id": "24381616",
  cookie: cookie,
  realIP: getLocalIP(),
});

const response = await axios({
  method: request_param.method,
  url: request_param.url,
  data: request_param.data,
  headers: request_param.headers,
});

let response_result = {
  headers: response.headers,
  data: response.data,
  status: response.status,
};

let result = api.afterRequest(
  JSON.stringify(response_result),
  request_param.crypto,
  request_param.apiName
);

// 请求/playlist/track/all

let request_param2 = api.beforeRequest("/playlist/track/all", {
  detail_result: JSON.stringify(result), // 直接传入结果
  trackIds: JSON.stringify(result.data.playlist.trackIds), // 拿到trackIds传入， 这里俩个都使用优先trackIds
  cookie: cookie,
  realIP: getLocalIP(),
});

const response2 = await axios({
  method: request_param2.method,
  url: request_param2.url,
  data: request_param2.data,
  headers: request_param2.headers,
});

let response_result2 = {
  headers: response2.headers,
  data: response2.data,
  status: response2.status,
};

let result2 = api.afterRequest(
  JSON.stringify(response_result),
  request_param.crypto,
  request_param.apiName
);

console.log(JSON.stringify(result2, null, 4));
```

#### 云贝支出
**说明**: 不知道原项目怎么搞的，只在项目目录找到`yunbei_expense.js`所以这个接口的api名为`yunbei_expense`在原项目中为`yunbei_tasks_expense`请注意二者的不同

#### 云贝收入
**说明**: 不知道原项目怎么搞的，只在项目目录找到`yunbei_receipt.js`所以这个接口的api名为`yunbei_expense`在原项目中为`yunbei_tasks_receipt`请注意二者的不同


#### 内部版本接口
**说明**: 获取到所用原项目的版本号

**示例**
```js
api.inner_version
```


### 改进

> 下列 API 未支持

- apicache.js
- memory-cache.js
- request_reference.js
- avatar_upload.js
- cloud.js
- playlist_cover_update.js
- voice_upload.js
- register_anonimous.js
- verify_getQr.js

> 精力有限，大部分 API 未测试，欢迎提交 PR
