var req = require("../../common/js/request.js");
var data = require("../../common/js/data.js");

var Api = {
  /**
   * 构造create的参数
   */
  createVoteParam: function (voteTitle, voteContent, voteOption) {
    return {
      voteTitle: voteTitle,
      voteContent: voteContent,
      voteOption: voteOption
    }
  },

  createVote: function (createVoteParam) {
    return new Promise(function (reslove, reject) {
      var param = req.Request.params(data.Data.requestType.POST, data.Data.requestUrl.baseUrl + data.Data.requestUrl.createVoteUrl, JSON.stringify(createVoteParam));
      req.Request.myWxRequet(param).then(res => reslove(res), res => reject(res));
    });
  }

}

module.exports = {
  Api: Api
}