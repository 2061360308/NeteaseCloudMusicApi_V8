// 用户详情

export default (query, request) => {
  return request(
    "POST",
    `https://music.163.com/weapi/v1/user/detail/${query.uid}`,
    {},
    {
      crypto: "weapi",
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
    }
  );
};
