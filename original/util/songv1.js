import createRequestParam from "./request2.js";

function cookieToJson(cookie) {
  if (!cookie) return {};
  let cookieArr = cookie.split(";");
  let obj = {};
  cookieArr.forEach((i) => {
    let arr = i.split("=");
    obj[arr[0]] = arr[1];
  });
  return obj;
}

function songv1(query, request) {
  query.cookie.os = "android";
  query.cookie.appver = "8.10.05";
  const data = {
    ids: "[" + query.id + "]",
    level: query.level,
    encodeType: "flac",
  };
  if (data.level == "sky") {
    data.immerseType = "c51";
  }
  return request(
    "POST",
    `https://interface.music.163.com/eapi/song/enhance/player/url/v1`,
    data,
    {
      crypto: "eapi",
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
      url: "/api/song/enhance/player/url/v1",
    }
  );
}

function main() {
  let cookie =
    "MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/neapi/feedback; HTTPOnly;__csrf=f2479af05431c9fe000004d74b9eb43c; Max-Age=1296010; Expires=Wed, 20 Dec 2023 15:57:49 GMT; Path=/;;MUSIC_U=00F5809E26613FA34E24E56B87BB2D71C716ECA62F1D492FDDB5915792654A9C101BE0AFDDFB7A79A405394645D6A0BCCEF96AF99CD68BB226B3AD52F1A990A41E4D4E359E8FBE202B246A605453D0BA8EA9370E2CF943DC198B5ADF131DBD233495C69C0BA6B144FD3EB4A3D356B95B15FF8FA61D19A34DA56A980797377346706BD36CB666B2BA320AFF4E140BB208BBC6CBA15716BF7B98CB0A92EF1032735321FD39465B9E8B34E8C241A1BD5DA0C77501BF407AF6AA382C7B589AB18B92B856600EF1D81FC7A3E5B80339CC9DA04A0D32E85563B018CFDBEDC86F8972B6D78F6704AA10CEDBB7E43F3FC654D0D3EC885D09A503057B92912B28763893F0DDCE9995439D4E047867F8BDEB01C4B3C4C3717D3049C5A13BC16EF182455B02F3F9CA81185292BED1FD7493A07FCAB3B5676A7FD58F8BF4F5B09F752C6F235C034D297711FBE960A3CAF5504E62EF6547; Max-Age=15552000; Expires=Sun, 02 Jun 2024 15:57:39 GMT; Path=/; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_SNS=; Max-Age=0; Expires=Tue, 05 Dec 2023 15:57:39 GMT; Path=/;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1579621885297; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/api/feedback; HTTPOnly;MUSIC_R_T=1579622000495; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 19:11:46 GMT; Path=/weapi/feedback; HTTPOnly";
  let query = {
    id: 33894312,
    level: "exhigh",
    cookie: cookieToJson(cookie),
    realIP: "116.25.146.177",
  };

  let result = songv1(query, createRequestParam);

  console.log(result);

  //   let formattedResult = JSON.stringify(result, null, 2); // 格式化 JSON 对象

  //   vue.content = result;
  // return JSON.stringify(result, null, 2);
  return result;
}

export default main;
