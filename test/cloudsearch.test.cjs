// import api from "../index.js";
// import config from "./other/config.json" assert { type: "json" };
// import axios from "axios";
// import os from "os";

const api = require("../dist/NeteaseCloudMusicApi.cjs");
const os = require("os");
let config = require("./other/config.json");
const axios = require("axios");

console.log(config);


// import afterRequest from "./util/afterRequest.js";

const cookie = config.settings.cookie;

const apiPath = "/cloudsearch";
const element = config[apiPath].example[0];

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

async function main(){
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
  
  // console.log(JSON.stringify(result, null, 4));
}

main();