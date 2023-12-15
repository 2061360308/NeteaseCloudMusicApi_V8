// 处理请求
// 要求返回数据的格式为
/*
* 
@param:result:
{
    status: 200,
    body: {},
    cookie: []
    headers: {
        'set-cookie': [] | []

    }
}
@param:crypto: "eapi", "weapi", "linuxapi"
*/
import encrypt from "./crypto.js";
import afterRequestApi from "./afterRequestApi.js";
import { cookieToJson } from "./index.js";

function hasApi(name) {
  return Object.keys(afterRequestApi).includes(name);
}

const afterRequest = (result, crypto, apiName) => {
  result = JSON.parse(result);
  const answer = { status: 500, body: {}, cookie: [] };

  const body = result.data;

  // let cookie = result.headers["Set-Cookie"];
  let cookie;

  for (let key in result.headers) {
    if (key.toLowerCase() === 'set-cookie') {
      cookie = result.headers[key];
      break;
    }
  }
  // console.log("得到了set-cookie 的值：", cookie);

  // 处理字符串格式的 cookie 到一个对象
  // if (typeof cookie === "string") {
  //   console.log("cookie 是 string", cookie);
  //   cookie = cookieToJson(cookie);
  // }

  // 处理数组格式的 cookie
  if (Array.isArray(cookie)) {
    cookie = cookie.join(';');
  }

  // 对象转换为数组
  // if(typeof cookie === 'object' && cookie !== null){
  //   console.log("cookie 是 object", cookie);
  //   cookie = Object.entries(cookie).map(([key, value]) => `${key}=${value}`);
  // }

  answer.cookie = cookie || "";
  
  // 不是浏览器Domain属性不重要
  // answer.cookie = (cookie || []).map((x) =>
  //   x.replace(/\s*Domain=[^(;|$)]+;*/, "")
  // );

  try {
    if (crypto === "eapi") {
      answer.body = JSON.parse(encrypt.decrypt(body));
    } else {
      answer.body = body;
    }

    if (answer.body.code) {
      answer.body.code = Number(answer.body.code);
    }

    answer.status = Number(answer.body.code || res.status);
    if (
      [201, 302, 400, 502, 800, 801, 802, 803].indexOf(answer.body.code) > -1
    ) {
      // 特殊状态码
      answer.status = 200;
    }
  } catch (e) {
    // console.log(e)
    try {
      answer.body = JSON.parse(body.toString());
    } catch (err) {
      // console.log(err)
      // can't decrypt and can't parse directly
      answer.body = body;
    }
    answer.status = result.status;
  }

  answer.status =
    100 < answer.status && answer.status < 600 ? answer.status : 400;

  // 处理特殊接口后续操作

  // if(result){
  //   // 处理返回数据
  //   console.log("reqponse_operate", reqponse_operate);
  // }
  // console.log(answer);
  if (hasApi(apiName)) {
    let result = afterRequestApi[apiName](JSON.stringify(answer));
    if (result.status) {
      answer.status = result.status;
    }
    if (result.body) {
      answer.body = result.body;
    }
    if (result.cookie) {
      answer.cookie = result.cookie;
    }
  }

  // 返回数据
  if (answer.status !== 200 || !answer.body) {
    return {
      code: answer.status,
      data: answer.body,
      msg: answer.body.msg || "请求遇到问题",
      others: {
        status: answer.status,
        body: answer.body,
      },
    };
  }

  if (answer.body.code == "301") {
    return {
      code: 301,
      data: null,
      msg: "需要登录",
    };
  }

  return {
    code: answer.body.code,
    data: answer.body,
    msg: answer.body.msg,
  };
};

export default afterRequest;
