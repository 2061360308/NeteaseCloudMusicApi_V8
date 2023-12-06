// 私人FM

export default (query, request) => {
  return request(
    'POST',
    `https://music.163.com/weapi/v1/radio/get`,
    {},
    {
      crypto: 'weapi',
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
    },
  )
}
