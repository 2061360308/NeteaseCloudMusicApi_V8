# NeteaseCloudMusicApi_V8
> 基于 [ NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 改造的遵循 ECMAScript 规范的API

> 理论上 基于 Google 的 V8 JavaScript 引擎 都可以快速调用

<img src="https://img.shields.io/npm/v/NeteaseCloudMusicApi.svg" alt="Version">
![License](https://img.shields.io/badge/license-MIT-yellow)

### 依赖于
- [ NeteaseCloudMusicApi ](https://github.com/Binaryify/NeteaseCloudMusicApi)

### 原理
不久前`NeteaseCloudMusicApi`的作者改写了项目，移除了加解密模块方面对node的依赖，
这时候项目本身要用到node的情况大部分就剩下，建立路由，发送请求等等。
将`NeteaseCloudMusicApi`中路由，进一步改造补充了几个全局函数，变量（`见/util/global_patch.js`），替换`module.exports`等等
这样以来我们使用其他语言（python，java）中基于 Google 的 V8 JavaScript 引擎的可以运行js代码的相关库就可以调用接口得到请求参数，再使用对应语言封装网络请求就可以将`NeteaseCloudMusicApi`项目轻松移植到其他语言环境。

### 使用

#### 直接浏览器使用（不支持发送请求，只能得到请求参数）
- 下载`/dist`下的`NeteaseCloudMusicApi.js`(或`NeteaseCloudMusicApi.min.js`)
- script标签下导入`<script src="NeteaseCloudMusicApi.js"></script>`
- 调用函数`NeteaseCloudMusicApi(name, query)`(具体案例见`/test`)

> 注意： 第一个参数为API名称，第二个参数为API参数，具体API名称和参数请参考 [NeteaseCloudMusicApi文档](https://docs.neteasecloudmusicapi.binaryify.com)，name支持`/song/url/v1`和`song_url_v1`两种写法。

#### 其他语言调用
- 下载`/dist`下的`NeteaseCloudMusicApi.js`(或`NeteaseCloudMusicApi.min.js`)
- 根据情况调用`NeteaseCloudMusicApi.js`

### 开发
- 克隆项目 `git clone git@github.com:2061360308/NeteaseCloudMusicApi_V8.git`
- 安装依赖 `npm install`
- 打包 `npm run build`

`convert.py`是用来自动转换原`NeteaseCloudMusicApi`项目中的`node`语法的`python`小脚本

### 相关

- **[NeteaseCloudMusic_PythonSDK](https://github.com/2061360308/NeteaseCloudMusic_PythonSDK)** 依赖本项目使用python（py_mini_racer）开发的SDK


### 改进
> 下列API未支持
> 
- apicache.js
- memory-cache.js
- request_reference.js
- avatar_upload.js
- cloud.js
- playlist_cover_update.js
- voice_upload.js
- register_anonimous.js
- verify_getQr.js

> 精力有限，大部分API未测试，欢迎提交PR
