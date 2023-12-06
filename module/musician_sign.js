// 音乐人签到

export default (query, request) => {
  const data = {}
  return request(
    'POST',
    `https://music.163.com/weapi/creator/user/access`,
    data,
    {
      crypto: 'weapi',
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
    },
  )
}
