// 退出登录

export default (query, request) => {
  return request(
    'POST',
    `https://music.163.com/weapi/logout`,
    {},
    {
      crypto: 'weapi',
      ua: 'pc',
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
    },
  )
}
