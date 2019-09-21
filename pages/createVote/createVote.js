// pages/createVote/createVote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionList: [null, null]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 删除选项
   */
  removeOption: function (e) {
    console.log(e.currentTarget.dataset.index);
    var touchIndex = e.currentTarget.dataset.index;
    this.data.optionList.splice(touchIndex, 1);
    this.setData({
      optionList: this.data.optionList
    });
    console.log(this.data.optionList);
  },

  /**
   * 增加选项
   */
  addOption: function () {
    this.setData({
      optionList: this.data.optionList.concat([null])
    });
    console.log(this.data.optionList);
  },

  /**
   * 输入出发
   */
  inputChange: function (e) {
    var changeIdnex = e.currentTarget.dataset.index;
    console.log(e.detail.value);
    this.data.optionList[changeIdnex] = e.detail.value;
  },

  /**
   * 发起投票
   */
  createVote: function (e) {
    console.log("log");
    console.log(this.data.optionList);
    console.log(e.detail.value);
  },

  /**
   * 重置投票 
   */
  resetVote: function (e) {
    this.setData({
      optionList: [null, null]
    });
  }
})