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
