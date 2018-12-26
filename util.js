/* 
    将数字转为每三位间隔样式 
*/
function toK(num) {
    var num = (num || 0).toString(),
        result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}

/* 获取随机数组成的数组函数
    min 随机最小值
    max 随机最大值
    length 随机个数
 */
function random(min, max, length) {
    if (arguments.length > 2) {
        var arr = []
        for (var i = 0; i < length; i++) {
            arr.push(Math.ceil(Math.random() * (max - min) + min))
        }
        return arr;
    }
    return Math.ceil(Math.random() * (max - min) + min)
}

/* 获取上传图像
    event 获取入口input
    size 尺寸控制
    img 渲染img
    date 图像储存容器
    error 错误提示
 */
function fileRead(event, size, img, date, error) {
    var ref = /image\/(jpeg||png)/i;
    var file = event.target.files[0];

    if (ref.test(file.type) && file.size < size) {
        var reader = new FileReader();
        reader.onload = (function(file) {
            return function(e) {
                img[url] = this.result;
            };
        })(file);
        reader.readAsDataURL(file);
        date = file
    } else if (file.length < 1) {
        error = "请选择文件!";
    } else {
        error = "请选择" + size / 1000 + "kb以下的jpg/png文件!";

    }
}

/*
    时间戳格式化
*/
function dateFormat(date) {
    var now = new Date(sj * 1000);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
}