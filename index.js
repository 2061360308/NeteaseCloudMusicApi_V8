import api from "./api";
import { cookieToJson } from "./util/index.js";
import requset from "./util/request.js";

function hasApi(name) {
  return Object.keys(api).includes(name);
}

function apiRequest(name, query) {
  // 处理字符串格式的 cookie
  if (typeof query.cookie === "string") {
    query.cookie = cookieToJson(query.cookie);
  }

//   let query = params;

//   console.log("query", query);

  if (name.startsWith("/")) {
    name = name.slice(1);
  }
  name = name.replace(/\//g, "_");

//   console.log(name, hasApi(name));

  if (hasApi(name)) {
    return api[name](query, requset);
  } else {
    return { error: `api (${name}) not found` };
  }
}

export default apiRequest;
