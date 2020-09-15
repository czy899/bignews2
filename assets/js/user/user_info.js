$(function () {

    // 表单赋值
    function setInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                if (res.status === 0) {
                    layui.form.val("infoForm", res.data);
                }
            }
        })

    }

    setInfo()
    // 更新用户的基本信息
    $('.subForm').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            url: '/my/userinfo',
            type: 'post',
            data: $(this).serialize(),
            success: function (res) {
                layui.layer.msg(res.message)

                if (res.status === 0) {
                    window.parent.userInfo();
                }
            }
        })
    })

    // 重置
    $('.reset').click(function (e) {
        e.preventDefault();
        setInfo();
    })


})