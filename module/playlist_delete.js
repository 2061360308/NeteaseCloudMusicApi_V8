// 删除歌单

export default (query, request) => {
  query.cookie.os = 'pc'
  const data = {
    ids: '[' + query.id + ']',
  }
  return request('POST', `https://music.163.com/weapi/playlist/remove`, data, {
    crypto: 'weapi',
    cookie: query.cookie,
    proxy: query.proxy,
    realIP: query.realIP,
  })
}
