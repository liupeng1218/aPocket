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
// 获取随机数组成的数组函数，length，min，max
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
// 获取时间段
function adTime(date) {
    var time = date.getTime()
    var day = date.getDay();
    var t1 = new Date();
    var t2 = new Date();
    var t3 = new Date();
    var t4 = new Date();
    var t5 = new Date();
    var t6 = new Date();
    var t7 = new Date();
    var t8 = new Date();
    var t9 = new Date();
    var t10 = new Date();
    var t11 = new Date();
    var t12 = new Date();
    var t13 = new Date();
    var t14 = new Date();
    var t15 = new Date();
    var t16 = new Date();
    var timeArr = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, t16];
    var strArr = [];
    var htmlStr = "";
    if (day < 6) {
        var addTime = (6 - day) * 86400000;
        var newTime = time + addTime;
        for (var i = 0; i < timeArr.length; i++) {
            timeArr[i].setTime(newTime);
        }
    }

    for (var i = 0; i < timeArr.length; i++) {
        if (i > 0) {
            timeArr[i].setTime(timeArr[i - 1].getTime() + (7 * 86400000))
        }
        // console.log(timeArr[i]);
        getD = timeArr[i].getDate() < 10 ? "0" + timeArr[i].getDate() : timeArr[i].getDate();
        // console.log(timeArr[i].getDate());
        strArr[i] = timeArr[i].getMonth() + 1 + '.' + getD;

    }

    return strArr;

}
adTime(new Date())

// 遍历loc
for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).slice(0, 4) == 'myad') {
        console.log(localStorage.key(i));
    }
}
// 获取日期函数,dataArr为当前日期后30天日期数组
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期  
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0  
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0  
    return +m + "-" + d;
}


// 获取当前7天
var myDate = new Date(); //获取今天日期
myDate.setDate(myDate.getDate() - 7);
var dateArray = [];
var dateTemp;
var flag = 1;
for (var i = 0; i < 7; i++) {
    dateTemp = (myDate.getMonth() + 1) + "-" + myDate.getDate();
    dateArray.push(dateTemp);
    myDate.setDate(myDate.getDate() + flag);
}

// 读取上传图像
function fileRead(event, size, img, date) {
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