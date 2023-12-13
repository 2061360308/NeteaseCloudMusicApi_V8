export default (response) => {
  response = JSON.parse(response);
  if (response.body.code === 200) {
    response = {
      status: 200,
      body: {
        ...JSON.parse(
          JSON.stringify(response.body).replace(
            /avatarImgId_str/g,
            "avatarImgIdStr"
          )
        ),
        cookie: response.cookie.join(";"),
      },
      cookie: response.cookie,
    };
  }
  return response;
};
