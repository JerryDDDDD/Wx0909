var api = require("./api.js")
var req = require("../../common/js/request.js")
var data = require("../../common/js/data.js")
// pages/createVote/createVote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionList: [null, null]
  },

  /**
   * 删除选项
   */
  removeOption: function (e) {
    var touchIndex = e.currentTarget.dataset.index;
    this.data.optionList.splice(touchIndex, 1);
    this.setData({
      optionList: this.data.optionList
    });
  },

  /**
   * 增加选项
   */
  addOption: function () {
    this.setData({
      optionList: this.data.optionList.concat([null])
    });
  },

  /**
   * 输入出发
   */
  inputChange: function (e) {
    var changeIdnex = e.currentTarget.dataset.index;
    this.data.optionList[changeIdnex] = e.detail.value;
  },

  /**
   * 发起投票
   */
  createVote: function (e) {
    var createVote = api.Api.createVoteParam(e.detail.value.title, "测试", this.data.optionList);
    api.Api.createVote(createVote).then(res => {
      if (res.data.code == data.Data.statusCode.OK) {
        console.log("发起成功" + res.data.data);
        wx.redirectTo({
          url: '../voteDetail/voteDetail?voteNum=' + res.data.data,
        })
      }
    }, res => {
      console.log("发起失败");
    });
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