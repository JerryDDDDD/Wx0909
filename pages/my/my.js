var data = require('../../common/js/data')

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
    wx.getUserInfo({
      withCredentials: 'false',
      lang: 'zh_CN',
      timeout: 10000,
      success: (result) => {
        console.log(result);
        console.log(result.userInfo.nickName);
        this.setData({
          userHeadPic: result.userInfo.avatarUrl,
          userName: result.userInfo.nickName
        })
      },
      fail: () => { },
      complete: () => { }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 登录
   */
  doLogin: function () {
    console.log(data.DATA.ServerBaseUrl);
    wx.login({
      success: function (res) {
        console.log(res.code);
        if (res.code) {
          wx.request({
            url: data.DATA.ServerBaseUrl + data.DATA.DoLoginUrl,
            data: { "code": res.code },
            header: { 'content-type': 'application/json' },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {

            },
            fail: () => { },
            complete: () => { }
          });
        }
      }
    });
  }
})