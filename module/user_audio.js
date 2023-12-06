// 用户创建的电台

export default (query, request) => {
  const data = {
    userId: query.uid,
  }
  return request(
    'POST',
    `https://music.163.com/weapi/djradio/get/byuser`,
    data,
    {
      crypto: 'weapi',
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
    },
  )
}
