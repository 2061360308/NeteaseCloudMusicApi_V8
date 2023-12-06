// 歌单打卡

export default (query, request) => {
  const data = {
    id: query.id,
  }
  return request(
    'POST',
    `https://music.163.com/api/playlist/update/playcount`,
    data,
    {
      crypto: 'weapi',
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
    },
  )
}
