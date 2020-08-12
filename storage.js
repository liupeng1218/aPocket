/*
 * @Description: storage tool
 * @Author: liupeng
 * @Date: 2020-03-20 17:25:19
 * @LastEditTime: 2020-03-23 13:32:58
 * @LastEditors: liupeng
 */

;(function(name, definition) {
  // 检测上下文环境是否为AMD或CMD
  var hasDefine = typeof define === 'function'
  // 检测上下文环境是否为Node
  var hasExports = typeof module !== 'function' && module.exports
  if (hasDefine) {
    // AMD环境或CMD环境
    define(definition)
  } else if (hasExports) {
    // 定义为普通Node模块
    module.exports = definition()
  } else {
    // 将模块的执行结果挂在window变量中，在浏览器中this指向window对象
    this[name] = definition()
  }
})('$Pstorage', function() {
  /**
   * localStorage 存贮
   * 目前对象值如果是函数 、RegExp等特殊对象存贮会被忽略
   * @param { String } key  属性
   * @param { string } value 值
   */
  const localStorageSet = (key, value) => {
    if (typeof value === 'object') value = JSON.stringify(value)
    localStorage.setItem(key, value)
  }

  /**
   * localStorage 获取
   * @param {String} key  属性
   */
  const localStorageGet = key => {
    return localStorage.getItem(key)
  }

  /**
   * localStorage 移除
   * @param {String} key  属性
   */
  const localStorageRemove = key => {
    localStorage.removeItem(key)
  }

  /**
   * localStorage 存贮某一段时间失效
   * @param {String} key  属性
   * @param {*} value 存贮值
   * @param { number } expire 过期时间,毫秒数
   */
  const localStorageSetExpire = (key, value, expire) => {
    if (typeof value === 'object') value = JSON.stringify(value)
    localStorage.setItem(key, value)
    setTimeout(() => {
      localStorage.removeItem(key)
    }, expire)
  }

  /**
   * sessionStorage 存贮
   * @param {String} key  属性
   * @param {*} value 值
   */
  const sessionStorageSet = (key, value) => {
    if (typeof value === 'object') value = JSON.stringify(value)
    sessionStorage.setItem(key, value)
  }

  /**
   * sessionStorage 获取
   * @param {String} key  属性
   */
  const sessionStorageGet = key => {
    return sessionStorage.getItem(key)
  }

  /**
   * sessionStorage 删除
   * @param {String} key  属性
   */
  const sessionStorageRemove = key => {
    sessionStorage.removeItem(key)
  }

  /**
   * sessionStorage 存贮某一段时间失效
   * @param {String} key  属性
   * @param {*} value 存贮值
   * @param {String} expire 过期时间,毫秒数
   */
  const sessionStorageSetExpire = (key, value, expire) => {
    if (typeof value === 'object') value = JSON.stringify(value)
    sessionStorage.setItem(key, value)
    setTimeout(() => {
      sessionStorage.removeItem(key)
    }, expire)
  }

  /**
   * cookie 存贮
   * @param {String} key  属性
   * @param {*} value  值
   * @param { String } expire  过期时间,单位天
   */
  const cookieSet = (key, value, expire) => {
    const d = new Date()
    d.setDate(d.getDate() + expire)
    document.cookie = `${key}=${value};expires=${d.toUTCString()}`
  }

  /**
   * cookie 获取
   * @param {String} key  属性
   */
  const cookieGet = key => {
    const cookieStr = unescape(document.cookie)
    const arr = cookieStr.split('; ')
    let cookieValue = ''
    for (let i = 0; i < arr.length; i++) {
      const temp = arr[i].split('=')
      if (temp[0] === key) {
        cookieValue = temp[1]
        break
      }
    }
    return cookieValue
  }

  /**
   * cookie 删除
   * @param {String} key  属性
   */
  const cookieRemove = key => {
    document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`
  }

  var Pstorage = {
    localStorageSet: localStorageSet,
    localStorageGet: localStorageGet,
    localStorageRemove: localStorageRemove,
    localStorageSetExpire: localStorageSetExpire,
    sessionStorageSet: sessionStorageSet,
    sessionStorageGet: sessionStorageGet,
    sessionStorageRemove: sessionStorageRemove,
    sessionStorageSetExpire: sessionStorageSetExpire,
    cookieSet: cookieSet,
    cookieGet: cookieGet,
    cookieRemove: cookieRemove
  }
  return Pstorage
})
