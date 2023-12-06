// 回忆坐标

export default (query, request) => {
  const data = {
    songId: query.id,
  }
  return request(
    'POST',
    `https://interface3.music.163.com/api/content/activity/music/first/listen/info`,
    data,
    {
      crypto: 'weapi',
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
    },
  )
}
