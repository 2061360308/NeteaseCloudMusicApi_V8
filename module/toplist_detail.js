// 所有榜单内容摘要

export default (query, request) => {
  return request(
    'POST',
    `https://music.163.com/weapi/toplist/detail`,
    {},
    {
      crypto: 'weapi',
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
    },
  )
}
