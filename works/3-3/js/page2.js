var lineB = document.getElementsByClassName("line")[0].getElementsByTagName("a"),
    index = 0,
    imgArray = ["list1", "list2", "list3", "list4", "list5", "list6"],
    lilist = document.getElementsByClassName("imglist")[0].getElementsByTagName("li");

//定义线型按钮的显示颜色
function lineColor() {
    for (var i in lineB) {
        if (i - 0 + 1) lineB[i].style.background = "#ccc";
    }
    lineB[index].style.background = "#45c17c";

}
lineColor();
//定义向下翻页按钮
function nextPic() {
    imgArray.unshift(imgArray[5]); //将最后一个元素赋值添加到第一个
    imgArray.pop(); //然后将最后一个元素删除
    for (var i in lilist) {
        if (i - 0 + 1) lilist[i].setAttribute("class", imgArray[i]);
    }
    index++; //下一个按钮
    if (index > 5) {
        index = 0;
    }
    lineColor();

}

function prePic() {
    imgArray.push(imgArray[0]); //将第一个元素赋值添加到最后一个
    imgArray.shift(); //然后将最后一个元素删除
    for (var i in lilist) {
        if (i - 0 + 1) lilist[i].setAttribute("class", imgArray[i]);
    }
    index--; //下一个按钮
    if (index < 0) {
        index = 5;
    }
    lineColor();
}
//3：绑定事件
document.addEventListener("click", function () {
    //console.log(event.target.parentNode.parentNode);
    var el = event.target.parentNode.parentNode;
    if (el.getAttribute("class") == "list3") {
        nextPic();
    } else if (el.getAttribute("class") == "list1") prePic();
})
timer = setInterval(nextPic, 2000); //每个两秒钟向下翻页
document.getElementsByClassName("carousel")[0].onmouseover = function () {
    clearInterval(timer);
}
document.getElementsByClassName("carousel")[0].onmouseout = function () {
    timer = setInterval(nextPic, 2000); //每个两秒钟向下翻页
}
