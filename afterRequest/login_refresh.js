export default (response) => {
  response = JSON.parse(response);
  let cookie = response.cookie;
  if (Array.isArray(cookie)) {
    cookie = cookie.join(";");
  }
  if (response.body.code === 200) {
    response = {
      status: 200,
      body: {
        ...response.body,
        cookie: cookie,
      },
      cookie: cookie,
    };
  }

  return response;
};
