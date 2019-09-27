//app.js
var req = require("./common/js/request.js")
var api = require("./api.js");
var data = require("./common/js/data.js")
App({
  onLaunch: function () {

    let that = this;
    that.checkLoginStatus();
  },
  globalData: {
    userInfo: null
  },

  /**
   * 检查登录状态
   */
  checkLoginStatus: function () {
    let that = this;
    // 如果已经登录, 检查Session是否过期
    // 微信默认session时间为2小时
    wx.checkSession({
      success: function () {
        // 从本地存储中获存储的登录用户的信息
        let userStorageInfo = wx.getStorageSync("userInfo");
        if (userStorageInfo != "") {
          // 如果userStorageInfo 不为空
          that.globalData.userInfo = JSON.parse(userStorageInfo);
        } else {
          // that.showInfo("登录信息缺失");
          // console.error("登录信息字段缺失");
          that.doLogin();
        }
      },
      fail: function () {
        that.doLogin();
      }
    });
  },

  /**
   * 登录处理函数
   */
  doLogin: function () {
    let that = this;
    wx.login({
      success: function (loginRes) {
        wx.getUserInfo({
          success: function (infoRes) {
            wx.setStorageSync("userInfo", infoRes.rawData);
            var loginParam = api.Api.loginParam(loginRes.code, infoRes.rawData, infoRes.signature, infoRes.encryptedData, infoRes.iv);
            console.log("loginParam ==> " + JSON.stringify(loginParam));
            var param = req.Request.params(data.Data.requestType.POST, data.Data.requestUrl.baseUrl + data.Data.requestUrl.loginUrl, JSON.stringify(loginParam));
            req.Request.myWxRequet(param).then(res => {
              if (res.data.code == 200) {
                wx.setStorageSync("token", res.data.data);
              }
            });
          }
        });
      }
    });
  }
})