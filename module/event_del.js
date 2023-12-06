// 删除动态

export default (query, request) => {
  const data = {
    id: query.evId,
  }
  return request('POST', `https://music.163.com/eapi/event/delete`, data, {
    crypto: 'weapi',
    cookie: query.cookie,
    proxy: query.proxy,
    realIP: query.realIP,
  })
}
