// 多类型搜索

export default (query, request) => {
  const data = {
    type: query.type || 1,
    s: query.keywords || '',
  }
  return request(
    'POST',
    `https://music.163.com/weapi/search/suggest/multimatch`,
    data,
    {
      crypto: 'weapi',
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
    },
  )
}
