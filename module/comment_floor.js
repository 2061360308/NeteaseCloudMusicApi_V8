import config from '../util/config.json' assert { type: 'json' };const resourceTypeMap = config.resourceTypeMap;
export default (query, request) => {
  query.type = resourceTypeMap[query.type]
  const data = {
    parentCommentId: query.parentCommentId,
    threadId: query.type + query.id,
    time: query.time || -1,
    limit: query.limit || 20,
  }
  return request(
    'POST',
    `https://music.163.com/api/resource/comment/floor/get`,
    data,
    {
      crypto: 'weapi',
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
    },
  )
}
