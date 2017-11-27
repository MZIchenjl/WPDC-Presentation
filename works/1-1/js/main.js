var getPicHeight = function () {
    var height = $("#top").height()
    return height
}
var setWidth = function () {
    var width = $('.concent-header').width()
    $('.articlePhoto img').width(width) //时间轴上的图片与头部一直等宽
}
var navIntroduce = function () {
    $('#introduce').scrollspynav()
}
$(document).ready(function () {
    $(window).resize(function () {
        setWidth()
    })
    $("#loadingBox").click(function () {
        $("#loading").fadeOut(500)
        $('.source').fadeIn(1000)
        setWidth()
    })
    setTimeout(function () {
        $("#loading").fadeOut(500)
        $('.source').fadeIn(1000)
        setWidth()
    }, 2500)
    $(window).scroll(function () {
        var top = $(document).scrollTop()
        if (top > 350 && $(window).width() < 640) {
            $('#goTop').css('display', 'block')
        } else {
            $('#goTop').css('display', 'none')
        }
    })
    $('#weixinButton').on('click', function (e) {
        $('#weixinModel').modal();
    })
    $('#weiboButton').on('click', function (e) {
        $('#weiboModel').modal();
    })
    $('#qqButton').on('click', function (e) {
        $('#qqModel').modal();
    })
})