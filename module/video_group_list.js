// 视频标签列表

export default (query, request) => {
  const data = {}
  return request(
    'POST',
    `https://music.163.com/api/cloudvideo/group/list`,
    data,
    {
      crypto: 'weapi',
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
    },
  )
}
