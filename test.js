// import api from "./index.js";
import api from "./index.js"
import config from "./test/other/config.json" assert { type: "json" };
import axios from "axios";
import os from "os";

// import afterRequest from "./util/afterRequest.js";

const cookie = config.settings.cookie;

const apiPath = "/inner/version";
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
  
  
  let response_result = {headers: response.headers, data: response.data, status: response.status};
  
  let result = api.afterRequest(JSON.stringify(response_result), request_param.crypto, request_param.apiName);
  
  console.log(JSON.stringify(result, null, 4));
  
}

main();