var req = require("../../common/js/request.js");
var data = require("../../common/js/data.js");

var Api = {
    test: function () {
        return new Promise(function (reslove, reject) {
            var param = req.Request.params(data.Data.requestType.GET, data.Data.requestUrl.baseUrl + data.Data.requestUrl.testUrl, null, null);
            console.log(param);
            req.Request.myWxRequet(param).then(res => {
                reslove(res);
            }, res => {
                reject(res);
            });
        });
    }
}

module.exports = {
    Api: Api
}
