// 热搜列表
export default (query, request) => {
  const data = {}
  return request(
    'POST',
    `https://music.163.com/weapi/hotsearchlist/get`,
    data,
    {
      crypto: 'weapi',
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
    },
  )
}
