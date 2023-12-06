import pkg from '../package.json'
export default (query, request) => {
  return new Promise((resolve) => {
    return resolve({
      code: 200,
      status: 200,
      body: {
        code: 200,
        data: {
          version: pkg.version,
        },
      },
    })
  })
}
