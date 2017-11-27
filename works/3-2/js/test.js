window.onload = function () {
    galleryOnclick();
    setime();
    movement = setInterval(function () {
        const rightArrow = document.getElementById("a_right");
        rightArrow.click(); /* 这个定时器设置的是间隔一段时间之后点击右箭头按钮到下一张 */
    }, 5000)
}




/* 初始函数状态 */
var button = document.getElementsByClassName("button");
var aOnclick = button[0].getElementsByTagName("a");
aOnclick[0].style.background = "#aaa"; /* 一开始在首页轮播图给下面的按钮有一个a的灰色默认值 */

var text = document.getElementsByClassName("list_left")[0].getElementsByTagName("li")[0];
text.style.background = "rgba(77,85,107,1)"; /* 一开始在FAQ默认给第一个问题背景色 */

const origionH2 = document.getElementById("ul_a").getElementsByTagName("h2")[0].firstChild.textContent;
const origionP = document.getElementById("ul_a").getElementsByTagName("p")[0].firstChild.textContent;



/* 便历鼠标事件函数 */
function galleryOnclick() {
    /* 给首页底部的的方形选择按钮加上onclick效果 切换图片 */
    var button = document.getElementsByClassName("button");
    var aOnclick = button[0].getElementsByTagName("a");

    for (i = 0; i <= aOnclick.length - 1; i++) {
        aOnclick[i].onclick = function () {
            clickButton(this); /* 点击时把a标签作为参数传递给clickButton()函数 */
            clearInterval(movement); /* 鼠标点击清除定时器  */
            movement = setInterval(function () {
                const rightArrow = document.getElementById("a_right");
                rightArrow.click();
            }, 5000) /* 停顿3s后继续自动轮播 */
            return false;
        }
    }

    /* 给FAQ长方形按钮加上onclick效果 切换文本框里对应的文字 */
    var ulli = document.getElementsByClassName("list_left")[0].getElementsByTagName("li");
    for (j = 0; j <= ulli.length - 1; j++) {
        ulli[j].onmouseover = function () {
            textchange(this);
            return false;
        }
    }
}


/* 轮播图思路分析  
图片和文字交换用的是不一样的思路 
图片专门设置了一个img标签作为占位符,改img标签下的src属性
文字则是把第一个a标签设置样式,直接改a中文本的内容

[点击下面的按钮换掉当前图片]
用一个img来做占位符
用a标签装图片和图片对应的文字
点击a标签时获取a的href属性
用a的href属性换掉img的src属性   即在img里显示a的href地址对应的图片 

[点击下面的按钮换掉图片文本框中的文字]
首先给第一个a的 h2 p 文本设计一个样式框
获取所点击的a标签下的h2 p的文本 放到第一个a里
*/

/* 首页底部的的方形选择按钮   点击时执行的*事件*/
function clickButton(wrap) { /* wrap传递的参数是被点击的a标签 */
    var button = document.getElementsByClassName("button");
    var aOnclick = button[0].getElementsByTagName("a");
    for (i = 0; i <= aOnclick.length - 1; i++) {
        aOnclick[i].style.background = "#000";
    } /* 先把所有按钮变成黑色底色 */

    /* 图片的改变 */
    var wrap_a = wrap.getAttribute("href"); /* 获取a标签的href属性 */
    var gallery = document.getElementById("gallery_wrap"); /* 获取img标签这个元素 */
    gallery.setAttribute("src", wrap_a); /* 修改img的src属性为 获取a标签的href属性 */
    wrap.style.background = "#aaa"; /* 把被点击的按钮变成灰色 */

    /*  */
    gallery.style.opacity = "0.3";
    fadeIn("gallery_wrap");

    /* 文字的改变 */
    var h2 = document.getElementById("ul_a").getElementsByTagName("h2")[0];
    h2.firstChild.textContent = origionH2; /* h2的标签重置为原来第一个a标签下文字的内容 */
    var hn = wrap.getElementsByTagName("h2")[0].firstChild.textContent;
    h2.firstChild.textContent = hn; /* 把现在a标签下的h2的内容给第一个a标签的文字内容 */

    var p2 = document.getElementById("ul_a").getElementsByTagName("p")[0];
    p2.firstChild.textContent = origionP; /* p的标签重置为原来第一个a标签下文字的内容 */
    var pn = wrap.getElementsByTagName("p")[0].firstChild.textContent;
    p2.firstChild.textContent = pn; /* 把现在a标签下的p的内容给第一个a标签的文字内容 */

}


/* 两边箭头点击切换下(上)一张按钮 */
function setime() {
    const img = document.getElementById("gallery_wrap");
    let images = document.getElementsByClassName("button")[0].getElementsByTagName("a");
    images = Array.prototype.slice.call(images);

    const leftArrow = document.getElementById("a_left");
    const rightArrow = document.getElementById("a_right");

    leftArrow.addEventListener("click", () => {
        let currentIndex = images.findIndex((item) => item.href === img.src);
        if (currentIndex === 0) currentIndex = images.length;
        const newImg = images[currentIndex - 1];
        img.src = newImg.href;

        img.style.opacity = "0.3";
        fadeIn("gallery_wrap");

        let button = document.getElementsByClassName("button");
        let aOnclick = button[0].getElementsByTagName("a");
        for (i = 0; i <= aOnclick.length - 1; i++) {
            aOnclick[i].style.background = "#000";
        }
        aOnclick[currentIndex - 1].style.background = "#aaa";

        var h2 = document.getElementById("ul_a").getElementsByTagName("h2")[0];
        h2.firstChild.textContent = origionH2;
        var hn = aOnclick[currentIndex - 1].getElementsByTagName("h2")[0];
        h2.firstChild.textContent = hn.firstChild.textContent;

        var p2 = document.getElementById("ul_a").getElementsByTagName("p")[0];
        p2.firstChild.textContent = origionP;
        var pn = aOnclick[currentIndex - 1].getElementsByTagName("p")[0];
        p2.firstChild.textContent = pn.firstChild.textContent;

        clearTimeout(movement);

        movement = setInterval(function () {
            const rightArrow = document.getElementById("a_right");
            rightArrow.click();
        }, 5000)

    });

    rightArrow.addEventListener("click", () => {
        let currentIndex = images.findIndex((item) => item.href === img.src);
        if (currentIndex === images.length - 1) currentIndex = -1;
        const newImg = images[currentIndex + 1];
        img.src = newImg.href;

        img.style.opacity = "0.3";
        fadeIn("gallery_wrap");

        let button = document.getElementsByClassName("button");
        let aOnclick = button[0].getElementsByTagName("a");
        for (i = 0; i <= aOnclick.length - 1; i++) {
            aOnclick[i].style.background = "#000";
        }
        aOnclick[currentIndex + 1].style.background = "#aaa";

        var h2 = document.getElementById("ul_a").getElementsByTagName("h2")[0];
        h2.firstChild.textContent = origionH2;
        var hn = aOnclick[currentIndex + 1].getElementsByTagName("h2")[0];
        h2.firstChild.textContent = hn.firstChild.textContent;

        var p2 = document.getElementById("ul_a").getElementsByTagName("p")[0];
        p2.firstChild.textContent = origionP;
        var pn = aOnclick[currentIndex + 1].getElementsByTagName("p")[0];
        p2.firstChild.textContent = pn.firstChild.textContent;

        clearTimeout(movement);

        movement = setInterval(function () {
            const rightArrow = document.getElementById("a_right");
            rightArrow.click();
        }, 5000)
    });
}


/*淡出效果函数 */
function fadeIn(id) {
    var elem = document.getElementById(id);
    var opa = parseFloat(elem.style.opacity);

    console.log(opa)
    if (opa >= 1) {
        return false;
    }
    if (opa < 1) {
        opa += 0.005;
    }
    var m = opa.toString();
    elem.style.opacity = m;

    var repeat = "fadeIn('" + id + "',)";
    move = setTimeout(repeat, 10);
}






/* FAQ鼠标滑过换字操作 */
function textchange(wrap) {
    var text = document.getElementsByClassName("list_right")[0].getElementsByTagName("li")[0].firstChild;
    var li = wrap.getElementsByTagName("p")[0].childNodes[0];
    text.textContent = li.textContent;

    var wra = document.getElementsByClassName("list_left")[0].getElementsByTagName("li");
    for (i = 0; i <= wra.length - 1; i++) {
        wra[i].style.background = "rgba(77,85,107,0.5)";
    }
    wrap.style.background = "rgba(77,85,107,1)";
}



var i_id = -1;
var timer = 0;
$(document).ready(function() {
    li_move();
    $('li.li_id').click(function() {
        var ddIndex = $(this).index() - 1;
        i_id = ddIndex;
        li_move();
    }) //小圆点控制
});
function li_move() {
    i_id++;
    if(i_id >= 4) {
        i_id = 0;
    }
    $('.hc-fly').css({ "height": "100vh", opacity: 0 });
    if(i_id < 4) {
        if(i_id == 0) {
            $('.hc-banner ol li').eq(i_id).addClass('red').siblings().removeClass('red');
            $('.hc-banner ul li').eq(i_id).fadeIn(100).siblings().fadeOut();
        }
        if(i_id == 1) {
            $('.hc-banner ol li').eq(i_id).addClass('red').siblings().removeClass('red');
            $('.hc-banner ul li').eq(i_id).fadeIn(100).siblings().fadeOut();

        }
        if(i_id == 2) {
            $('.hc-banner ol li').eq(i_id).addClass('red').siblings().removeClass('red');
            $('.hc-banner ul li').eq(i_id).fadeIn(100).siblings().fadeOut();
        }
        if(i_id == 3) {
            $('.hc-banner ol li').eq(i_id).addClass('red').siblings().removeClass('red');
            $('.hc-banner ul li').eq(i_id).fadeIn(100).siblings().fadeOut();
        }
    }
}
