var api = require("./api.js");
// pages/voteDetail/voteDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    voteNum: null,
    vote: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.voteNum);
    this.setData({
      voteNum: options.voteNum
    });
    api.Api.getVoteByNum(options.voteNum).then(res => {
      this.setData({
        vote: res.data.data
      });
    }, res => {
      console.log("获取失败");
      console.log(res.data);
    });

    wx.connectSocket({
      url: 'ws://192.168.1.36:10009/ws',
    });
    wx.onSocketOpen(function () {
      console.log("socket connect");
    })
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

  }
})