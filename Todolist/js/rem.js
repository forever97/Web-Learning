// js实现rem
var html = document.querySelector("html")
var resize = function(evt){
    var width = window.innerWidth
    var size = width / 3.75
    html.style.fontSize = size + 'px'
}
window.onresize = resize
resize()