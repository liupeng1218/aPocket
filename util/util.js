;(function() {


  /**
   * 获取随机数组成的数组函数
   *
   * @param {Number} min
   * @param {Number} max
   * @param {Number} length
   * @returns
   */
  function PmathRandom(min, max, length) {
    if (arguments.length > 2) {
      var arr = []
      for (var i = 0; i < length; i++) {
        arr.push(Math.ceil(Math.random() * (max - min) + min))
      }
      return arr
    }
    return Math.ceil(Math.random() * (max - min) + min)
  }

  /**
   * 获取上传图像
   *
   * @param {DOM} 入口dom
   * @param {Number} size
   * @param {Object} 存贮渲染图像的对象
   * @param {Object} 存储上传文件的对象
   * @param {String} 错误提示
   */
  function fileRead(dom, size, img, date, error) {
    var ref = /image\/(jpeg||png)/i
    var file = dom.target.files[0]

    if (ref.test(file.type) && file.size < size) {
      var reader = new FileReader()
      reader.onload = (function(file) {
        return function(e) {
          img['url'] = this.result
        }
      })(file)
      reader.readAsDataURL(file)
      date = file
    } else if (file.length < 1) {
      error = '请选择文件!'
    } else {
      error = '请选择' + size / 1000 + 'kb以下的jpg/png文件!'
    }
  }

  var Uutil = {
    toK: toK,
    random: random,
    fileRead: fileRead
  }
  window.$Uutil = Uutil
  return Uutil
}.call(this))