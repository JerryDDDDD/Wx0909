var Data = {
  // 请求方式
  requestType: {
    // Get
    GET: "GET",
    // POST
    POST: "POST",
  },

  /**
   * 状态码
   */
  statusCode: {
    //成功
    OK: 200,
    //正常失败
    ERROR: 201,
    // token过期
    TOKEN_EXPRISE: 202
  },

  // 请求地址
  requestUrl: {
    baseUrl: "http://127.0.0.1:30100",
    jsonEnd: ".json",
    testUrl: "/test/hello.json",

    loginUrl: "/user/doLogin.json",
    createVoteUrl: "/vote/create.json",
    getVoteByNnum: "/vote/getByNum/"

  }
}

module.exports = {
  Data: Data
}