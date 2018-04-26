/* 针对axios设置常用请求方式
    path 请求地址，必填
    其余参数通过对象的解构赋值，至少传递一个空对象
    type 请求类型，get,post,file 三种方式，默认为get，file为上传文件时的请求
    method 请求方式
    data 请求数据
    success 请求完成时回调
    failure 请求失败时回调
 */

export default function(path, { type = 'GET', method = 'GET', data = '', success, failure = '' }) {
    let options {
        method: method,
        url: path,
        data: data,
    }
    if (type == 'post') {
        options.transformRequest = [
            function(data) {
                var ret = ''
                for (var it in data) {
                    ret += encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                }
                return ret
            }
        ]
    }
    if (type == 'file') {
        options.headers = { 'Content-Type': 'multiple/form-data' }
    }
    axios(options).then(function(res) {
        success(res)
    }).catch(function(err) {
        if (failure) { failure(res) }
    })
}