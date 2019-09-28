var loginApi = require("../../api.js");
var data = require("./data.js");
var Request = {
  /**
   * 数据请求参数
   * @param type 请求类型
   * @param url 请求路径
   * @param data 请求参数
   */
  params: function (type, url, data) {
    return {
      type: type,
      url: url,
      data: data
    };
  },

  /**
   * 自定义请求
   */
  myWxRequet: function (params) {
    let token = wx.getStorageSync("token");
    return new Promise(function (resolve, reject) {
      wx.request({
        url: params.url,
        data: params.data,
        header: {
          "Content-Type": "application/json",
          "token": token
        },
        method: params.type,
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          if (res.data.code == 202) {
            Request.login(res);
          }
          (res.data == "" || res.data == null) ? reject(res) : resolve(res);
        },
        fail: function (res) {
          reject(res);
        },
        complete: function (res) { },
      })
    });
  },

  login: function () {
    wx.login({
      success: function (loginRes) {
        wx.getUserInfo({
          success: function (infoRes) {
            wx.setStorageSync("userInfo", infoRes.rawData);
            var loginParam = loginApi.Api.loginParam(loginRes.code, infoRes.rawData, infoRes.signature, infoRes.encryptedData, infoRes.iv);
            var param = Request.params(data.Data.requestType.POST, data.Data.requestUrl.baseUrl + data.Data.requestUrl.loginUrl, JSON.stringify(loginParam));
            Request.myWxRequet(param).then(res => {
              if (res.data.code == 200) {
                wx.setStorageSync("token", res.data.data);
              }
            });
          }
        });
      }
    });
  }
}

module.exports = {
  Request: Request
}