// import api from "./index.js";
import api from "./index.js"
import config from "./test/other/config.json" assert { type: "json" };
import axios from "axios";
import os from "os";

const cookie = config.settings.cookie;

const apiPath = "/login/refresh";
// const apiPath = "/captcha/sent";
// console.log("apiPath:::",config[apiPath]);
const element = config[apiPath].example[0];

// const element = {};

// element.query={};

// element.query={
//   phone: "15234941791",
// };

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

  // console.log("param:::",JSON.stringify({
  //   ...element.query,
  //   cookie: cookie,
  //   realIP: getLocalIP(),
  // }, null, 4));

  // console.log("request_param:::",request_param);

  // console.log("hearder", JSON.stringify(request_param.headers, null, 4));


  // console.log("query",{
  //   ...element.query,
  // });

  // console.log("request_param:::",JSON.stringify(request_param, null, 4));
  
  const response = await axios({
    method: request_param.method,
    url: request_param.url,
    data: request_param.data,
    headers: request_param.headers,
  });

  // console.log("response:::",response);
  
  let response_result = {headers: response.headers, data: response.data, status: response.status};

  // console.log("response_result:::",JSON.stringify(response_result, null, 4));
  
  let result = api.afterRequest(JSON.stringify(response_result), request_param.crypto, request_param.apiName);

  // console.log("result:::",JSON.stringify(result, null, 4));
  
  console.log(JSON.stringify(result, null, 4));
  
}

main();