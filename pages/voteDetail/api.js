var req = require("../../common/js/request.js");
var data = require("../../common/js/data.js");

var Api = {
  /**
   * 获取投票通过num
   */
  getVoteByNum: function (num) {
    return new Promise(function (resolve, reject) {
      var param = req.Request.params(data.Data.requestType.GET,
        data.Data.requestUrl.baseUrl + data.Data.requestUrl.getVoteByNnum + num + data.Data.requestUrl.jsonEnd, null);
      req.Request.myWxRequet(param).then(res => {
        res.data.code == data.Data.statusCode.OK ? resolve(res) : reject(res);
      }, res => { reject(res); });
    });
  }
}

module.exports = {
  Api: Api
}