// 全部歌单分类

export default (query, request) => {
  return request(
    'POST',
    `https://music.163.com/weapi/playlist/catalogue`,
    {},
    {
      crypto: 'weapi',
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
    },
  )
}
