export default function (msg = '提示信息') {
    let msgBox = document.createElement('div')
    msgBox.appendChild(document.createTextNode(msg))
    msgBox.style.background = "#303133"
    msgBox.style.color = "#fff"
    msgBox.style.position = "fixed"
    msgBox.style.borderRadius = "4px"
    msgBox.style.padding = "10px"
    msgBox.style.zIndex = "9999"
    msgBox.style.fontSize = "12px"
    msgBox.style.lineHeight = "1.2"
    msgBox.style.minWidth = "10px"
    msgBox.style.wordWrap = "break-word"
    msgBox.style.top = "50%"
    msgBox.style.left = "50%"
    msgBox.style.transform = "translate(-50%, -50%)"
    document.body.appendChild(msgBox)
    setTimeout(function () {
        document.body.removeChild(msgBox)
    }, 1000)
}