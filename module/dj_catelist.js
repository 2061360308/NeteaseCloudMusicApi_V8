// 电台分类列表

export default (query, request) => {
  return request(
    'POST',
    `https://music.163.com/weapi/djradio/category/get`,
    {},
    {
      crypto: 'weapi',
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
    },
  )
}
