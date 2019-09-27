var api = require("./api.js");

var app = getApp();

// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userHeadPic: "../../images/login.png",
    userName: "点击登录"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onReady: function () {
    var userInfo = JSON.parse(wx.getStorageSync("userInfo"));
    this.setData({
      userHeadPic: userInfo.avatarUrl,
      userName: userInfo.nickName
    });
  },

  test: function () {
    console.log("on tap");
    api.Api.test().then(res => {
      console.log("log res ended");
      console.log(res);
    }, res => {
      console.log("error");
    });
  }
})