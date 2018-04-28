$(function () {
    /*$.ajax({
        type: 'get',
        url: '/login/getCode',
        data: {
            time: new Date()
        },
        success: function (data) {
            $("#checkCode").attr("src", data);
        }
    });*/
    $("#checkCode").attr("src", "/login/getCode?time=" + new Date());

    $("#clkLogin").click(function () {
        if (validator()) {

        }
    })
})
var validator = function () {

}