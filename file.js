export function fileExport(res) {
  console.log(res.data)
  const blob = new Blob([res.data]) //处理文档流
  const fileName = 'excel.xlsx'
  const elink = document.createElement('a')
  elink.download = fileName
  elink.style.display = 'none'
  elink.href = URL.createObjectURL(blob)
  document.body.appendChild(elink)
  elink.click()
  URL.revokeObjectURL(elink.href) // 释放URL 对象
  document.body.removeChild(elink)
}



export function downloadRes(response) {
  const filename = response.headers['content-disposition'].match(
    /filename=(.*);/
  )[1]
  // 首先要创建一个 Blob 对象（表示不可变、原始数据的类文件对象）
  const blob = new Blob([response.data])
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
  // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
    window.navigator.msSaveBlob(blob, decodeURI(filename))
  } else {
    const elink = document.createElement('a') // 创建一个<a>标签
    elink.style.display = 'none' // 隐藏标签
    elink.href = window.URL.createObjectURL(blob) // 配置href，指向本地文件的内存地址    
    elink.download = filename
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink) // 移除<a>标签
  }
}