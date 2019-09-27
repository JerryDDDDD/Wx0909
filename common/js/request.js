var Request = {
    request: function (params) {
        return new Promise(function (resolve, reject) {
            wx.request({
                url: params.url,
                data: params.data,
                header: params.header,
                method: params.method,
                dataType: 'json',
                responseType: 'text',
                success: (result) => {
                    if (result != null) {
                        resolve(result);
                    }
                },
                fail: () => { },
                complete: () => { }
            });
        });
    },

    test: function () {
        console.log("开始测试");
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("成功");
                resolve("aaa");
            }, 1000);
        });
    }
}

module.exports.Request = Request;