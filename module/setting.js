// 设置

export default (query, request) => {
  const data = {}
  return request('POST', `https://music.163.com/api/user/setting`, data, {
    crypto: 'weapi',
    cookie: query.cookie,
    proxy: query.proxy,
    realIP: query.realIP,
  })
}
