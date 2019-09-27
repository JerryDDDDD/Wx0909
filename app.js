var data = require("./common/js/data.js");

var api = require("./common/js/request.js");

//app.js
App({
  onLaunch: function () {

    api.Request.test;
    let that = this;
    // 检查登录状态
    that.checkLoginStatus();

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },

  // 检查登录状态
  checkLoginStatus: function () {
    let that = this;
    // 获取登录标志变量
    let isLogin = wx.getStorageSync("isLogin");
    if (isLogin) {
      // 如果已经登录, 检查Session是否过期
      // 微信默认session时间为2小时
      wx.checkSession({
        success: function () {
          // 从本地存储中获存储的登录用户的信息
          let userStorageInfo = wx.getStorageSync("userInfo");
          if (userStorageInfo) {
            // 如果userStorageInfo 不为空
            that.globalData.userInfo = JSON.parse(userStorageInfo);
          } else {
            that.showInfo("登录信息缺失");
            console.error("登录信息字段缺失");
          }
        },
        fail: function () {
          that.doLogin();
        }
      });
    } else {
      that.doLogin();
    }
  },

  // 登录处理函数
  doLogin: function () {
    let that = this;
    wx.login({
      success: function (loginRes) {
        if (loginRes.code) {
          wx.getUserInfo({
            // 是否带上登录认证信息, 带上会返回敏感信息 检查登录状态, 不带上则不会
            withCredentials: true,
            success: function (infoRes) {
              wx.request({
                url: data.DATA.ServerBaseUrl + data.DATA.DoLoginUrl,
                data: {
                  code: loginRes.code,                    // 临时登录凭证
                  rawData: infoRes.rawData,               // 用户非敏感信息
                  signature: infoRes.signature,           // 签名
                  encryptedData: infoRes.encryptedData,   // 用户敏感信息
                  iv: infoRes.iv                          // 解密算法的向量
                },
                header: { 'content-type': 'application/json' },
                method: 'get',
                dataType: 'json',
                responseType: 'text',
                success: (result) => {
                  console.log("请求成功");
                  // 自己后台处理后登录成功回调
                  if (result.data.code == 200) {
                    wx.setStorageSync("cookie", result.header["Set-Cookie"]);
                    that.globalData.userInfo = result.data.data;
                    wx.setStorageSync('userInfo', JSON.stringify(result.data.data));
                    wx.setStorageSync('loginFlag', true);
                  }
                },
                fail: () => {
                  console.log("请求失败");
                },
                complete: () => {
                  console.log("请求完成");
                }
              });
            },
          });
        }
      }
    });
  }
})