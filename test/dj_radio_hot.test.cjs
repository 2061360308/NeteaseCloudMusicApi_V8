// Description: test /dj/radio/hot
// Author: Lutong
// explain: 电台 - 类别热门电台

const api = require("../dist/NeteaseCloudMusicApi.cjs");
const os = require("os");
const fs = require("fs");
let config = require("./other/config.json");
const axios = require("axios");
const path = require("path");
const util = require("util");
const { addMsg } = require("jest-html-reporters/helper");

const apiPath = "/dj/radio/hot";

const cookie = config.settings.cookie;

function outputJson(obj) {
  name_str = apiPath.replace(/\//g, "_"); // 替换所有的 '/' 为 '_'
  name_str = name_str.replace(/^_/, ""); // 如果字符串以 '_' 开头，删除这个 '_'

  // 获取项目根目录的路径
  const projectRootPath = process.cwd();

  // 基于项目根目录的路径
  const filePath = path.join(projectRootPath, `/html-report/output/${name_str}.json`);
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 4));(filePath, JSON.stringify(obj, null, 4));
  return filePath;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


// 根据传入的result生成一个期望的对象的格式
function generateExpectObject(obj) {
  const result = {};
  for (const key in obj) {
    if (obj[key] === null) {
      result[key] = null;
    } else if (Array.isArray(obj[key])) {
      result[key] = obj[key].map(generateExpectObject);
    } else if (typeof obj[key] === "object") {
      result[key] = generateExpectObject(obj[key]);
    } else {
      result[key] = expect.any(obj[key].constructor);
    }
  }
  return result;
}

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if ("IPv4" !== iface.family || iface.internal !== false) {
        continue;
      }
      return iface.address;
    }
  }
}

async function main() {
  for (const [index, element] of config[apiPath].example.entries()) {
    let request_param = api.beforeRequest(apiPath, {
      ...element.query,
      cookie: cookie,
      realIP: getLocalIP(),
    });
    
    const response = await axios({
      method: request_param.method,
      url: request_param.url,
      data: request_param.data,
      headers: request_param.headers,
    });
    
    let response_result = {headers: response.headers, data: response.data, status: response.status};
    
    let result = api.afterRequest(JSON.stringify(response_result), request_param.crypto, request_param.apiName);

    let filePath = outputJson(result);
    // console.log(filePath);
    await addMsg({ message:  `消息输出：file:///${filePath}`});

    try{
      expect(result.code === 200 || result.data.code === 200).toBeTruthy();
    }catch (error) {
      throw new Error(`error：${error}\nresult：${JSON.stringify(result, null, 4)}\nresponse: ${JSON.stringify(response_result, null, 4)}`);
    }
  }
}

test(apiPath, async () => {
  await main();
});
