
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
        reader.onload = (function (file) {
            return function (e) {
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

/*
    获取浏览器agent
*/
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6; //IE版本<=7
        }
    } else if (isEdge) {
        return 'edge'; //edge
    } else if (isIE11) {
        return 11; //IE11  
    } else {
        return -1; //不是ie浏览器
    }
}

/*
    解构 url query
*/
function parseUrl(url) {
    if (url) {
        url = url.substr(url.indexOf("?") + 1);
    }

    if (url.length < 1) {
        return false
    }
    var result = {}, // save name value
        queryString = url || location.search.substring(1),
        reg = /([^&=]+)=([^&]*)/g,
        item
    while (item = reg.exec(queryString)) {
        result[decodeURIComponent(item[1])] = decodeURIComponent(item[2]);
    }
    return result;
}
export default {
    random: random,
    fileRead: fileRead,
    dateFormat: dateFormat,
    IEVersion: IEVersion,
    parseUrl: parseUrl
}
