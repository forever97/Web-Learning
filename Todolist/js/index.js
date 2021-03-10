
/* 读取本地存储并渲染 */
var todoList = localStorage.todoList?JSON.parse(localStorage.todoList):[]
render(todoList)

/* 获取输入 两种方式添加 */
var input = document.querySelector(".input")
var logo = document.querySelector(".logo")
// 监听logo点击
logo.onclick = function(){
    if(input.value!=""){
        todoList.push({ "isDone": false, "content": input.value })
        input.value = ""
        render(todoList)
    }
}
// 监听键盘 
input.onkeydown = function (evt) {
    // 回车
    if (evt.key == "Enter" && input.value!="") {
        todoList.push({ "isDone": false, "content": input.value })
        input.value = ""
        render(todoList)
    }
}

// 渲染函数
function render(todoList) {
    // 事项计数
    let doingCnt = 0;
    let doneCnt = 0;
    let doingNum = document.querySelector('.doing .num')
    let doneNum = document.querySelector('.done .num')

    // 把todoList存起来
    localStorage.todoList = JSON.stringify(todoList)

    // 获取列表并将内部清空，重新渲染
    let doingList = document.querySelector('.doing .list')
    let doneList = document.querySelector('.done .list')
    doingList.innerHTML = ""
    doneList.innerHTML = ""

    // 逐个元素渲染
    todoList.forEach(function (item, i) {
        if (item.isDone) {
            doneCnt++;
            let div = document.createElement("div")
            div.className = "item"
            // ${变量} 可以直接在反引号字符串中直接加入变量
            div.innerHTML = `<input type="checkbox" checked="checked" data-index="${i}">
                            <span class="content">${item.content}</span>
                            <button class="del" data-index="${i}">删除</button>`
            doneList.appendChild(div)
        } else {
            doingCnt++;
            let div = document.createElement("div")
            div.className = "item"
            // ${变量} 可以直接在反引号字符串中直接加入变量
            div.innerHTML = `<input type="checkbox" data-index="${i}">
                            <span class="content">${item.content}</span>
                            <button class="del" data-index="${i}">删除</button>`
            doingList.appendChild(div)
        }
    })

    doingNum.innerHTML = doingCnt
    doneNum.innerHTML = doneCnt
}

/* checkbox变动监听 */ 
var body = document.body
body.onchange = function (evt) {
    if (evt.target.getAttribute("type") == "checkbox") {
        let index = evt.target.dataset.index
        todoList[index].isDone = !todoList[index].isDone
        render(todoList)
    }
}

/* 删除按钮点击监听 */ 
body.onclick = function (evt) {
    if (evt.target.getAttribute("class") == "del") {
        let index = evt.target.dataset.index
        // console.log(index)
        todoList.splice(index, 1)
        render(todoList)
    }
}